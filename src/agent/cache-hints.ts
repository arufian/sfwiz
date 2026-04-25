import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import type { Tool } from '~/tools/types';

const EPHEMERAL = { type: 'ephemeral' } as const;

/**
 * Build system prompt blocks with cache_control on the last block.
 * Opus H3: breakpoint 1 = system prompt.
 */
export function buildCachedSystem(
  systemPrompt: string,
): Array<{ type: 'text'; text: string; cache_control?: { type: 'ephemeral' } }> {
  return [{ type: 'text', text: systemPrompt, cache_control: EPHEMERAL }];
}

/**
 * Convert Tool[] to Anthropic tool definitions with cache_control on the last entry.
 * Opus H3: breakpoint 2 = tool definitions.
 */
export function buildCachedToolDefs(tools: Tool[]): Array<{
  name: string;
  description: string;
  input_schema: { type: 'object'; properties: Record<string, unknown>; required?: string[] };
  cache_control?: { type: 'ephemeral' };
}> {
  return tools.map((tool, i) => {
    const shape = tool.parameters._def;
    // Zod v4 object schema -> JSON schema (simplified; handles flat objects only).
    const properties: Record<string, { type: string; description?: string }> = {};
    const required: string[] = [];
    if (shape && 'shape' in shape) {
      const s = shape.shape as Record<string, { _def: { typeName: string; description?: string } }>;
      for (const [key, val] of Object.entries(s)) {
        properties[key] = { type: zodTypeToJsonType(val._def.typeName) };
        required.push(key);
      }
    }
    const def: {
      name: string;
      description: string;
      input_schema: { type: 'object'; properties: Record<string, unknown>; required: string[] };
      cache_control?: { type: 'ephemeral' };
    } = {
      name: tool.name,
      description: tool.description,
      input_schema: { type: 'object', properties, required },
    };
    // Cache_control on the LAST tool only (breakpoint 2).
    if (i === tools.length - 1) def.cache_control = EPHEMERAL;
    return def;
  });
}

/**
 * Apply cache breakpoints to conversation history.
 * Opus H3: breakpoint 3 = stable prefix (everything older than last 2 turns).
 * Breakpoint 4 = last assistant message.
 *
 * Re-marks breakpoint 3 every call (called before each API request).
 */
export function applyHistoryCacheBreakpoints(messages: MessageParam[]): MessageParam[] {
  if (messages.length < 3) return messages;

  const result = messages.map((m) => ({ ...m }));
  const stableCutoff = result.length - 2;

  // Breakpoint 3: last message in the stable prefix.
  const stableMsg = result[stableCutoff - 1];
  if (stableMsg) {
    result[stableCutoff - 1] = markLastBlock(stableMsg, EPHEMERAL);
  }

  // Breakpoint 4: last assistant message.
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i]?.role === 'assistant') {
      result[i] = markLastBlock(result[i]!, EPHEMERAL);
      break;
    }
  }

  return result;
}

function markLastBlock(
  msg: MessageParam,
  cc: { type: 'ephemeral' },
): MessageParam {
  if (typeof msg.content === 'string') {
    return {
      ...msg,
      content: [{ type: 'text', text: msg.content, cache_control: cc }],
    };
  }
  if (Array.isArray(msg.content) && msg.content.length > 0) {
    const content = [...msg.content];
    const last = content[content.length - 1]!;
    content[content.length - 1] = { ...last, cache_control: cc } as typeof last;
    return { ...msg, content };
  }
  return msg;
}

function zodTypeToJsonType(zodTypeName: string): string {
  if (zodTypeName === 'ZodString') return 'string';
  if (zodTypeName === 'ZodNumber') return 'number';
  if (zodTypeName === 'ZodBoolean') return 'boolean';
  if (zodTypeName === 'ZodArray') return 'array';
  if (zodTypeName === 'ZodObject') return 'object';
  return 'string';
}
