import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import type {
  ModelMessage,
  UserModelMessage,
  AssistantModelMessage,
  ToolModelMessage,
} from 'ai';

export interface StreamToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

// Anthropic content block shapes (subset we care about)
type AnthropicBlock =
  | { type: 'text'; text: string }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
  | { type: 'tool_result'; tool_use_id: string; content: string };

function isBlock(c: unknown): c is AnthropicBlock {
  return typeof c === 'object' && c !== null && 'type' in c;
}

/**
 * Convert Anthropic MessageParam[] → AI-SDK ModelMessage[].
 *
 * Key mapping:
 * - Anthropic tool results: role:'user' + [{type:'tool_result', tool_use_id, content}]
 *   → AI-SDK: role:'tool' + [{type:'tool-result', toolCallId, toolName, output:{type:'text',value}}]
 * - Anthropic tool calls: role:'assistant' + [{type:'tool_use', id, name, input}]
 *   → AI-SDK: role:'assistant' + [{type:'tool-call', toolCallId, toolName, input}]
 */
export function toCoreMessages(messages: MessageParam[]): ModelMessage[] {
  const result: ModelMessage[] = [];

  for (const msg of messages) {
    if (msg.role === 'user') {
      if (typeof msg.content === 'string') {
        result.push({ role: 'user', content: msg.content } satisfies UserModelMessage);
        continue;
      }
      if (Array.isArray(msg.content)) {
        const blocks = msg.content.filter(isBlock);
        const allToolResults = blocks.every((c) => c.type === 'tool_result');
        if (allToolResults) {
          const toolMsg: ToolModelMessage = {
            role: 'tool',
            content: blocks
              .filter((c): c is { type: 'tool_result'; tool_use_id: string; content: string } =>
                c.type === 'tool_result',
              )
              .map((c) => ({
                type: 'tool-result' as const,
                toolCallId: c.tool_use_id,
                toolName: '',
                output: { type: 'text' as const, value: c.content ?? '' },
              })),
          };
          result.push(toolMsg);
          continue;
        }
        // Mixed / text-only user content
        const textParts = blocks
          .filter((c): c is { type: 'text'; text: string } => c.type === 'text')
          .map((c) => ({ type: 'text' as const, text: c.text }));
        result.push({
          role: 'user',
          content: textParts.length > 0 ? textParts : '',
        } satisfies UserModelMessage);
      }
    } else if (msg.role === 'assistant') {
      if (typeof msg.content === 'string') {
        result.push({ role: 'assistant', content: msg.content } satisfies AssistantModelMessage);
        continue;
      }
      if (Array.isArray(msg.content)) {
        const blocks = msg.content.filter(isBlock);
        const parts: AssistantModelMessage['content'] = [];
        const partsArr: Array<
          | { type: 'text'; text: string }
          | { type: 'tool-call'; toolCallId: string; toolName: string; input: unknown }
        > = [];
        for (const c of blocks) {
          if (c.type === 'text') {
            partsArr.push({ type: 'text', text: c.text });
          } else if (c.type === 'tool_use') {
            partsArr.push({
              type: 'tool-call',
              toolCallId: c.id,
              toolName: c.name,
              input: c.input ?? {},
            });
          }
        }
        void parts;
        result.push({ role: 'assistant', content: partsArr } satisfies AssistantModelMessage);
      }
    }
  }

  return result;
}

/**
 * Build the Anthropic-format assistant MessageParam to append after an AI-SDK stream.
 */
export function fromCoreAssistant(text: string, toolCalls: StreamToolCall[]): MessageParam {
  if (toolCalls.length === 0) {
    return { role: 'assistant', content: text };
  }
  const content: MessageParam['content'] = [];
  if (text) content.push({ type: 'text', text });
  for (const tc of toolCalls) {
    content.push({ type: 'tool_use', id: tc.id, name: tc.name, input: tc.args });
  }
  return { role: 'assistant', content };
}

/**
 * Build the Anthropic-format tool_result MessageParam to append after tools run.
 */
export function fromCoreToolResults(
  results: Array<{ toolCallId: string; result: string }>,
): MessageParam {
  return {
    role: 'user',
    content: results.map((r) => ({
      type: 'tool_result' as const,
      tool_use_id: r.toolCallId,
      content: r.result,
    })),
  };
}
