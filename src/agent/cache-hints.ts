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
    const properties: Record<string, { type: string; description?: string }> = {};
    const required: string[] = [];
    if (shape && 'shape' in shape) {
      const s = shape.shape as Record<string, { _def: ZodDef; description?: string }>;
      for (const [key, val] of Object.entries(s)) {
        const { jsonType, isOptional, description } = unwrapZod(val._def);
        const prop: { type: string; description?: string } = { type: jsonType };
        const desc = description ?? val.description;
        if (desc) prop.description = desc;
        properties[key] = prop;
        if (!isOptional) required.push(key);
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

interface ZodDef {
  typeName?: string;
  type?: string;
  description?: string;
  innerType?: { _def: ZodDef };
  defaultValue?: () => unknown;
}

/**
 * Unwrap ZodOptional / ZodDefault / ZodNullable layers and return the
 * underlying JSON-schema type. Zod v4 stores typeName under several keys
 * (`typeName` legacy / `type` v4) so check both.
 */
function unwrapZod(def: ZodDef): { jsonType: string; isOptional: boolean; description?: string } {
  let isOptional = false;
  let cur: ZodDef | undefined = def;
  let description: string | undefined;
  while (cur) {
    const tn = cur.typeName ?? cur.type;
    if (cur.description) description = description ?? cur.description;
    if (tn === 'ZodOptional' || tn === 'optional' || tn === 'ZodDefault' || tn === 'default' || tn === 'ZodNullable' || tn === 'nullable') {
      isOptional = true;
      cur = cur.innerType?._def;
      continue;
    }
    return { jsonType: zodTypeToJsonType(tn ?? ''), isOptional, description };
  }
  return { jsonType: 'string', isOptional, description };
}

function zodTypeToJsonType(zodTypeName: string): string {
  if (zodTypeName === 'ZodString' || zodTypeName === 'string') return 'string';
  if (zodTypeName === 'ZodNumber' || zodTypeName === 'number') return 'number';
  if (zodTypeName === 'ZodBoolean' || zodTypeName === 'boolean') return 'boolean';
  if (zodTypeName === 'ZodArray' || zodTypeName === 'array') return 'array';
  if (zodTypeName === 'ZodObject' || zodTypeName === 'object') return 'object';
  if (zodTypeName === 'ZodEnum' || zodTypeName === 'enum') return 'string';
  return 'string';
}
