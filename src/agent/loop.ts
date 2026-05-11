import EventEmitter from 'events';
import { streamText, type LanguageModel, type ToolSet, type ModelMessage } from 'ai';
import type Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import {
  applyHistoryCacheBreakpoints,
  buildCachedSystem,
  buildCachedToolDefs,
} from '~/agent/cache-hints';
import { TokenTracker } from '~/agent/token-tracker';
import type { AgentEventMap } from '~/agent/types';
import type { PermissionMode } from '~/config/schema';
import { getAnthropicClient } from '~/llm/client';
import { toCoreMessages, fromCoreAssistant, fromCoreToolResults, type StreamToolCall } from '~/llm/message-adapter';
import { DestructiveOpGate } from '~/tools/gate';
import { PermissionModeGuard } from '~/tools/permission-mode';
import type { Tool, ToolContext, OrgHandle } from '~/tools/types';

const DEFAULT_MODEL = 'claude-sonnet-4-6';
const MAX_TOOL_ROUNDS = 20;
const REPEAT_CALL_LIMIT = 3;

export interface AgentLoopOptions {
  systemPrompt: string;
  tools: Tool[];
  model?: string;
  /** AI-SDK LanguageModel — required when provider is 'openai' or 'google'. */
  aiModel?: LanguageModel;
  provider?: 'anthropic' | 'openai' | 'google';
  ctx?: Partial<ToolContext>;
  abortController?: AbortController;
  /** Anthropic SDK client — only used when provider === 'anthropic'. */
  client?: Anthropic;
  permissionMode?: PermissionMode;
  cwd?: string;
  maxToolRoundsPerTurn?: number;
  thinkingMode?: boolean;
  onPermissionPrompt?: (toolName: string, args: Record<string, unknown>) => Promise<boolean>;
}

type EmitArgs<K extends keyof AgentEventMap> = AgentEventMap[K];

export class AgentLoop extends EventEmitter {
  private readonly systemPrompt: string;
  private readonly tools: Tool[];
  private model: string;
  private aiModel: LanguageModel | null;
  private provider: 'anthropic' | 'openai' | 'google';
  private ctx: Partial<ToolContext>;
  private readonly abortController: AbortController;
  private readonly client: Anthropic | null;
  private permGuard: PermissionModeGuard;
  private readonly onPermissionPrompt: (
    toolName: string,
    args: Record<string, unknown>,
  ) => Promise<boolean>;
  private readonly maxToolRounds: number;
  private thinkingMode: boolean;
  private readonly cwd: string;
  private readonly toolCallCounts = new Map<string, number>();
  readonly tokenTracker = new TokenTracker();

  constructor(opts: AgentLoopOptions) {
    super();
    this.systemPrompt = opts.systemPrompt;
    this.tools = opts.tools;
    this.model = opts.model ?? DEFAULT_MODEL;
    this.provider = opts.provider ?? 'anthropic';
    this.aiModel = opts.aiModel ?? null;
    this.ctx = opts.ctx ?? {};
    this.abortController = opts.abortController ?? new AbortController();
    this.client = this.provider === 'anthropic' ? (opts.client ?? getAnthropicClient()) : null;
    this.cwd = opts.cwd ?? process.cwd();
    this.permGuard = new PermissionModeGuard(
      opts.permissionMode ?? 'ask',
      this.cwd,
    );
    this.onPermissionPrompt = opts.onPermissionPrompt ?? (async () => false);
    this.maxToolRounds = opts.maxToolRoundsPerTurn ?? MAX_TOOL_ROUNDS;
    this.thinkingMode = opts.thinkingMode ?? false;
  }

  updateConfig(opts: {
    model?: string;
    aiModel?: LanguageModel;
    permissionMode?: PermissionMode;
    thinkingMode?: boolean;
  }): void {
    if (opts.model !== undefined) this.model = opts.model;
    if (opts.aiModel !== undefined) this.aiModel = opts.aiModel;
    if (opts.thinkingMode !== undefined) this.thinkingMode = opts.thinkingMode;
    if (opts.permissionMode !== undefined) {
      this.permGuard = new PermissionModeGuard(opts.permissionMode, this.cwd);
    }
  }

  override emit<K extends keyof AgentEventMap>(event: K, ...args: EmitArgs<K>): boolean {
    return super.emit(event as string, ...args);
  }

  override on<K extends keyof AgentEventMap>(
    event: K,
    listener: (...args: EmitArgs<K>) => void,
  ): this {
    return super.on(event as string, listener as (...args: unknown[]) => void);
  }

  abort(): void {
    this.abortController.abort();
    this.removeAllListeners();
  }

  setOrg(org: OrgHandle | null): void {
    this.ctx = { ...this.ctx, org };
  }

  async run(initialMessages: MessageParam[]): Promise<string> {
    try {
      return await this._runInner(initialMessages);
    } catch (err) {
      this.emit('turn:done', '', []);
      throw err;
    }
  }

  private async _runInner(initialMessages: MessageParam[]): Promise<string> {
    if (this.provider !== 'anthropic') {
      return this._runAISDK(initialMessages);
    }
    return this._runAnthropic(initialMessages);
  }

  // ─── Anthropic path (unchanged — preserves prompt caching) ──────────────────

  private async _runAnthropic(initialMessages: MessageParam[]): Promise<string> {
    const messages: MessageParam[] = [...initialMessages];
    const systemBlocks = buildCachedSystem(this.systemPrompt);
    const toolDefs = buildCachedToolDefs(this.tools);
    const destructiveGate = new DestructiveOpGate();

    let round = 0;
    let finalText = '';

    const client = this.client!;

    while (round < this.maxToolRounds) {
      if (this.abortController.signal.aborted) {
        throw new DOMException('AgentLoop aborted', 'AbortError');
      }
      round++;

      this.emit('turn:thinking');

      const cachedMessages = applyHistoryCacheBreakpoints(messages);

      const stream = await client.messages.stream(
        {
          model: this.model,
          max_tokens: 8192,
          system: systemBlocks as Parameters<typeof client.messages.stream>[0]['system'],
          messages: cachedMessages,
          tools: toolDefs as Parameters<typeof client.messages.stream>[0]['tools'],
        },
        { signal: this.abortController.signal },
      );

      let assistantText = '';
      const toolCalls: Array<{ id: string; name: string; input: string }> = [];
      let currentTool: { id: string; name: string; input: string } | null = null;

      for await (const event of stream) {
        if (this.abortController.signal.aborted) {
          stream.abort();
          throw new DOMException('AgentLoop aborted', 'AbortError');
        }

        if (event.type === 'content_block_start') {
          if (event.content_block.type === 'tool_use') {
            currentTool = { id: event.content_block.id, name: event.content_block.name, input: '' };
          }
        } else if (event.type === 'content_block_delta') {
          if (event.delta.type === 'text_delta') {
            assistantText += event.delta.text;
            this.emit('turn:stream', event.delta.text);
          } else if (event.delta.type === 'input_json_delta' && currentTool) {
            currentTool.input += event.delta.partial_json;
          }
        } else if (event.type === 'content_block_stop') {
          if (currentTool) {
            toolCalls.push({ ...currentTool });
            currentTool = null;
          }
        } else if (event.type === 'message_delta') {
          const usage = event.usage;
          if (usage) {
            this.tokenTracker.record({
              inputTokens: 0,
              outputTokens: usage.output_tokens ?? 0,
              cacheCreationTokens: 0,
              cacheReadTokens: 0,
            });
          }
        } else if (event.type === 'message_start') {
          const usage = event.message.usage;
          if (usage) {
            this.tokenTracker.record({
              inputTokens: usage.input_tokens ?? 0,
              outputTokens: 0,
              cacheCreationTokens:
                (usage as { cache_creation_input_tokens?: number }).cache_creation_input_tokens ?? 0,
              cacheReadTokens:
                (usage as { cache_read_input_tokens?: number }).cache_read_input_tokens ?? 0,
            });
          }
        }
      }

      const finalMsg = await stream.finalMessage();
      const stopReason = finalMsg.stop_reason;

      if (assistantText || toolCalls.length > 0) {
        const content: MessageParam['content'] = [];
        if (assistantText) content.push({ type: 'text', text: assistantText });
        for (const tc of toolCalls) {
          let parsedInput: Record<string, unknown> = {};
          try {
            parsedInput = JSON.parse(tc.input || '{}') as Record<string, unknown>;
          } catch {}
          content.push({ type: 'tool_use', id: tc.id, name: tc.name, input: parsedInput });
        }
        messages.push({ role: 'assistant', content });
      }

      if (stopReason !== 'tool_use' || toolCalls.length === 0) {
        finalText = assistantText;
        break;
      }

      const toolResultContent: Array<{
        type: 'tool_result';
        tool_use_id: string;
        content: string;
      }> = [];

      for (const tc of toolCalls) {
        let parsedInput: Record<string, unknown> = {};
        try {
          parsedInput = JSON.parse(tc.input || '{}') as Record<string, unknown>;
        } catch {}
        const result = await this._executeTool(tc.id, tc.name, parsedInput, destructiveGate, round);
        if (result.type === 'gate_block') {
          toolResultContent.push({ type: 'tool_result', tool_use_id: tc.id, content: result.content });
        } else {
          toolResultContent.push({ type: 'tool_result', tool_use_id: tc.id, content: result.content });
        }
      }

      messages.push({ role: 'user', content: toolResultContent });
    }

    this.emit('turn:done', finalText, messages);
    return finalText;
  }

  // ─── AI-SDK path (OpenAI / Google) ──────────────────────────────────────────

  private async _runAISDK(initialMessages: MessageParam[]): Promise<string> {
    if (!this.aiModel) {
      throw new Error(`AgentLoop: aiModel is required for provider '${this.provider}'`);
    }

    const messages: MessageParam[] = [...initialMessages];
    const destructiveGate = new DestructiveOpGate();

    // Build AI-SDK ToolSet from Tool[] (parameters are already Zod schemas)
    const aiTools: ToolSet = {};
    for (const t of this.tools) {
      // AI-SDK v5 uses `inputSchema` (not `parameters`)
      aiTools[t.name] = { description: t.description, inputSchema: t.parameters } as ToolSet[string];
    }

    let round = 0;
    let finalText = '';

    while (round < this.maxToolRounds) {
      if (this.abortController.signal.aborted) {
        throw new DOMException('AgentLoop aborted', 'AbortError');
      }
      round++;

      this.emit('turn:thinking');

      const modelMessages = toCoreMessages(messages);

      const result = streamText({
        model: this.aiModel,
        system: this.systemPrompt,
        messages: modelMessages as ModelMessage[],
        tools: aiTools,
        maxOutputTokens: 8192,
        abortSignal: this.abortController.signal,
      });

      let assistantText = '';
      const toolCalls: StreamToolCall[] = [];

      for await (const chunk of result.fullStream) {
        if (this.abortController.signal.aborted) {
          throw new DOMException('AgentLoop aborted', 'AbortError');
        }

        if (chunk.type === 'text-delta') {
          assistantText += chunk.text;
          this.emit('turn:stream', chunk.text);
        } else if (chunk.type === 'tool-call') {
          toolCalls.push({
            id: chunk.toolCallId,
            name: chunk.toolName,
            args: (chunk.input ?? {}) as Record<string, unknown>,
          });
        } else if (chunk.type === 'finish') {
          this.tokenTracker.record({
            inputTokens: chunk.totalUsage.inputTokens ?? 0,
            outputTokens: chunk.totalUsage.outputTokens ?? 0,
            cacheCreationTokens: 0,
            cacheReadTokens: 0,
          });
        }
      }

      const finishReason = await result.finishReason;

      messages.push(fromCoreAssistant(assistantText, toolCalls));

      if (finishReason !== 'tool-calls' || toolCalls.length === 0) {
        finalText = assistantText;
        break;
      }

      const toolResultParts: Array<{ toolCallId: string; result: string }> = [];

      for (const tc of toolCalls) {
        const execResult = await this._executeTool(tc.id, tc.name, tc.args, destructiveGate, round);
        toolResultParts.push({ toolCallId: tc.id, result: execResult.content });
      }

      messages.push(fromCoreToolResults(toolResultParts));
    }

    this.emit('turn:done', finalText, messages);
    return finalText;
  }

  // ─── Shared tool execution (provider-agnostic) ──────────────────────────────

  private async _executeTool(
    callId: string,
    toolName: string,
    parsedInput: Record<string, unknown>,
    destructiveGate: DestructiveOpGate,
    round: number,
  ): Promise<{ content: string; type: 'ok' | 'gate_block' | 'error' }> {
    const tool = this.tools.find((t) => t.name === toolName);
    this.emit('tool:pending', callId, toolName, parsedInput);

    if (!tool) {
      this.emit('tool:error', callId, toolName, `Unknown tool: ${toolName}`);
      return { content: `Error: unknown tool "${toolName}"`, type: 'error' };
    }

    // Repeat-call guard
    if (toolName !== 'ask_user') {
      const sig = `${toolName}::${JSON.stringify(parsedInput)}`;
      const prev = this.toolCallCounts.get(sig) ?? 0;
      if (prev >= REPEAT_CALL_LIMIT) {
        const msg = `Repeated identical ${toolName} call blocked after ${prev} attempts`;
        this.emit('tool:error', callId, toolName, msg);
        return {
          content:
            `Error: ${msg}. You have already invoked ${toolName} with identical ` +
            `arguments ${prev} times. Stop retrying. Call ask_user to ask the ` +
            `user how to proceed (e.g. abort, change inputs, or skip this step) ` +
            `before attempting any further tool call.`,
          type: 'gate_block',
        };
      }
      this.toolCallCounts.set(sig, prev + 1);
    }

    // Destructive-op gate
    try {
      destructiveGate.check(toolName, round);
    } catch (gateErr) {
      const msg = gateErr instanceof Error ? gateErr.message : String(gateErr);
      this.emit('tool:error', callId, toolName, msg);
      return {
        content: `Error: ${msg} Call ask_user first and have the user confirm a non-cancel option.`,
        type: 'gate_block',
      };
    }

    // Permission-mode guard
    const isDestructive = ['sf_deploy_start', 'sf_scratch_create', 'sf_assign_permset'].includes(toolName);
    const autoAllowed = isDestructive ? true : this.permGuard.shouldAutoAllow(toolName, parsedInput);
    if (!autoAllowed) {
      const allowed = await this.onPermissionPrompt(toolName, parsedInput);
      if (!allowed) {
        this.emit('tool:error', callId, toolName, 'Denied by user');
        return { content: 'Error: user denied this tool call via the permission prompt.', type: 'error' };
      }
    }

    this.emit('tool:running', callId, toolName);
    try {
      const validated = tool.parameters.parse(parsedInput);
      const result = await tool.execute(validated, this.ctx as ToolContext);

      if (toolName === 'ask_user') {
        const r = result as { cancelled?: boolean } | string;
        const cancelled = typeof r === 'object' && r !== null && r.cancelled === true;
        if (!cancelled) destructiveGate.record('ask_user', callId, round);
      }

      this.emit('tool:done', callId, toolName, result);
      return {
        content: typeof result === 'string' ? result : JSON.stringify(result),
        type: 'ok',
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.emit('tool:error', callId, toolName, msg);
      return { content: `Error: ${msg}`, type: 'error' };
    }
  }
}
