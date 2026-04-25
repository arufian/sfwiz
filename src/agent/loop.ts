import EventEmitter from 'events';
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
import { DestructiveOpGate } from '~/tools/gate';
import { PermissionModeGuard } from '~/tools/permission-mode';
import type { Tool, ToolContext } from '~/tools/types';

const DEFAULT_MODEL = 'claude-sonnet-4-6';
const MAX_TOOL_ROUNDS = 20; // guard against infinite loops

export interface AgentLoopOptions {
  systemPrompt: string;
  tools: Tool[];
  model?: string;
  ctx?: Partial<ToolContext>;
  abortController?: AbortController;
  client?: Anthropic;
  permissionMode?: PermissionMode;
  cwd?: string;
  /**
   * Called when PermissionModeGuard says a tool can't be auto-allowed.
   * Resolve true to allow this single call, false to deny.
   * If omitted, all non-auto calls are denied.
   */
  onPermissionPrompt?: (toolName: string, args: Record<string, unknown>) => Promise<boolean>;
}

type EmitArgs<K extends keyof AgentEventMap> = AgentEventMap[K];

export class AgentLoop extends EventEmitter {
  private readonly systemPrompt: string;
  private readonly tools: Tool[];
  private readonly model: string;
  private readonly ctx: Partial<ToolContext>;
  private readonly abortController: AbortController;
  private readonly client: Anthropic;
  private readonly permGuard: PermissionModeGuard;
  private readonly onPermissionPrompt: (
    toolName: string,
    args: Record<string, unknown>,
  ) => Promise<boolean>;
  readonly tokenTracker = new TokenTracker();

  constructor(opts: AgentLoopOptions) {
    super();
    this.systemPrompt = opts.systemPrompt;
    this.tools = opts.tools;
    this.model = opts.model ?? DEFAULT_MODEL;
    this.ctx = opts.ctx ?? {};
    this.abortController = opts.abortController ?? new AbortController();
    this.client = opts.client ?? getAnthropicClient();
    this.permGuard = new PermissionModeGuard(
      opts.permissionMode ?? 'ask',
      opts.cwd ?? process.cwd(),
    );
    this.onPermissionPrompt = opts.onPermissionPrompt ?? (async () => false);
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

  /**
   * Run the agentic loop.
   * - Emits lifecycle events for TUI indicators.
   * - Handles tool calls with manual dispatch (guards against silent tools drop).
   * - Applies 4-breakpoint prompt caching (Opus H3).
   */
  async run(initialMessages: MessageParam[]): Promise<string> {
    try {
      return await this._runInner(initialMessages);
    } catch (err) {
      // Emit turn:done('') so TUI clears the thinking/streaming indicator on fatal errors.
      this.emit('turn:done', '');
      throw err;
    }
  }

  private async _runInner(initialMessages: MessageParam[]): Promise<string> {
    const messages: MessageParam[] = [...initialMessages];
    const systemBlocks = buildCachedSystem(this.systemPrompt);
    const toolDefs = buildCachedToolDefs(this.tools);
    const destructiveGate = new DestructiveOpGate();

    let round = 0;
    let finalText = '';

    while (round < MAX_TOOL_ROUNDS) {
      if (this.abortController.signal.aborted) {
        throw new DOMException('AgentLoop aborted', 'AbortError');
      }
      round++;

      this.emit('turn:thinking');

      const cachedMessages = applyHistoryCacheBreakpoints(messages);

      const stream = await this.client.messages.stream(
        {
          model: this.model,
          max_tokens: 8192,
          system: systemBlocks as Parameters<typeof this.client.messages.stream>[0]['system'],
          messages: cachedMessages,
          tools: toolDefs as Parameters<typeof this.client.messages.stream>[0]['tools'],
        },
        { signal: this.abortController.signal },
      );

      let streamStarted = false;
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
            if (!streamStarted) {
              this.emit('turn:stream', event.delta.text);
              streamStarted = true;
            }
            assistantText += event.delta.text;
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
                (usage as { cache_creation_input_tokens?: number }).cache_creation_input_tokens ??
                0,
              cacheReadTokens:
                (usage as { cache_read_input_tokens?: number }).cache_read_input_tokens ?? 0,
            });
          }
        }
      }

      const finalMsg = await stream.finalMessage();
      const stopReason = finalMsg.stop_reason;

      // Push assistant turn to history.
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

      // Execute tool calls and collect results.
      const toolResultContent: Array<{
        type: 'tool_result';
        tool_use_id: string;
        content: string;
      }> = [];

      for (const tc of toolCalls) {
        const tool = this.tools.find((t) => t.name === tc.name);
        this.emit('tool:pending', tc.id, tc.name, tc.input);

        if (!tool) {
          this.emit('tool:error', tc.id, tc.name, `Unknown tool: ${tc.name}`);
          toolResultContent.push({
            type: 'tool_result',
            tool_use_id: tc.id,
            content: `Error: unknown tool "${tc.name}"`,
          });
          continue;
        }

        let parsedInput: Record<string, unknown> = {};
        try {
          parsedInput = JSON.parse(tc.input || '{}') as Record<string, unknown>;
        } catch {}

        // Destructive-op gate: hard-block destructive SF ops without a recent
        // non-cancelled ask_user confirmation. Locked rule (phase-1 §locked-decisions).
        try {
          destructiveGate.check(tc.name, round);
        } catch (gateErr) {
          const msg = gateErr instanceof Error ? gateErr.message : String(gateErr);
          this.emit('tool:error', tc.id, tc.name, msg);
          toolResultContent.push({
            type: 'tool_result',
            tool_use_id: tc.id,
            content: `Error: ${msg} Call ask_user first and have the user confirm a non-cancel option.`,
          });
          continue;
        }

        // Permission-mode guard: ask/auto-edit/yolo. Destructive ops bypass
        // (already enforced by DestructiveOpGate above; ALWAYS_PROMPT inside
        // PermissionModeGuard returns shouldAutoAllow=false → would prompt,
        // but we already did the ask_user-based gate so allow through here).
        const isDestructive = [
          'sf_deploy_start',
          'sf_scratch_create',
          'sf_assign_permset',
        ].includes(tc.name);
        const autoAllowed = isDestructive
          ? true
          : this.permGuard.shouldAutoAllow(tc.name, parsedInput);
        if (!autoAllowed) {
          const allowed = await this.onPermissionPrompt(tc.name, parsedInput);
          if (!allowed) {
            this.emit('tool:error', tc.id, tc.name, 'Denied by user');
            toolResultContent.push({
              type: 'tool_result',
              tool_use_id: tc.id,
              content: 'Error: user denied this tool call via the permission prompt.',
            });
            continue;
          }
        }

        this.emit('tool:running', tc.id, tc.name);
        try {
          const validated = tool.parameters.parse(parsedInput);
          const result = await tool.execute(validated, this.ctx as ToolContext);

          // Record ask_user confirmations (non-cancelled only) for the destructive gate.
          if (tc.name === 'ask_user') {
            const r = result as { cancelled?: boolean } | string;
            const cancelled = typeof r === 'object' && r !== null && r.cancelled === true;
            if (!cancelled) destructiveGate.record('ask_user', tc.id, round);
          }

          this.emit('tool:done', tc.id, tc.name, result);
          toolResultContent.push({
            type: 'tool_result',
            tool_use_id: tc.id,
            content: typeof result === 'string' ? result : JSON.stringify(result),
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          this.emit('tool:error', tc.id, tc.name, msg);
          toolResultContent.push({
            type: 'tool_result',
            tool_use_id: tc.id,
            content: `Error: ${msg}`,
          });
        }
      }

      messages.push({ role: 'user', content: toolResultContent });
    }

    this.emit('turn:done', finalText);
    return finalText;
  }
}
