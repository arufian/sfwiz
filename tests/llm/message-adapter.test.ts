import { describe, expect, test } from 'bun:test';
import { toCoreMessages, fromCoreAssistant, fromCoreToolResults } from '~/llm/message-adapter';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';

describe('toCoreMessages', () => {
  test('passes through plain user string', () => {
    const result = toCoreMessages([{ role: 'user', content: 'hello' }]);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ role: 'user', content: 'hello' });
  });

  test('passes through plain assistant string', () => {
    const result = toCoreMessages([{ role: 'assistant', content: 'hi there' }]);
    expect(result[0]).toMatchObject({ role: 'assistant', content: 'hi there' });
  });

  test('converts Anthropic tool_result user message to role:tool', () => {
    const msg: MessageParam = {
      role: 'user',
      content: [
        { type: 'tool_result', tool_use_id: 'call_1', content: 'file contents here' },
      ],
    };
    const result = toCoreMessages([msg]);
    expect(result).toHaveLength(1);
    expect(result[0]!.role).toBe('tool');
    const toolMsg = result[0] as { role: 'tool'; content: Array<{ toolCallId: string; output: { value: string } }> };
    expect(toolMsg.content[0]!.toolCallId).toBe('call_1');
    expect(toolMsg.content[0]!.output.value).toBe('file contents here');
  });

  test('converts Anthropic tool_use assistant message to tool-call part', () => {
    const msg: MessageParam = {
      role: 'assistant',
      content: [
        { type: 'text', text: 'let me check' },
        { type: 'tool_use', id: 'call_2', name: 'read_file', input: { path: '/foo.ts' } },
      ],
    };
    const result = toCoreMessages([msg]);
    expect(result[0]!.role).toBe('assistant');
    const c = result[0] as { role: 'assistant'; content: Array<{ type: string }> };
    expect(c.content[0]).toMatchObject({ type: 'text', text: 'let me check' });
    expect(c.content[1]).toMatchObject({ type: 'tool-call', toolCallId: 'call_2', toolName: 'read_file' });
  });

  test('mixed user content extracts text only', () => {
    const msg: MessageParam = {
      role: 'user',
      content: [
        { type: 'text', text: 'see this file' },
      ],
    };
    const result = toCoreMessages([msg]);
    expect(result[0]!.role).toBe('user');
  });
});

describe('fromCoreAssistant', () => {
  test('returns plain string when no tool calls', () => {
    const msg = fromCoreAssistant('hello', []);
    expect(msg).toMatchObject({ role: 'assistant', content: 'hello' });
  });

  test('builds content array with tool_use blocks', () => {
    const msg = fromCoreAssistant('checking', [
      { id: 'call_3', name: 'grep', args: { pattern: 'foo' } },
    ]);
    expect(msg.role).toBe('assistant');
    expect(Array.isArray(msg.content)).toBe(true);
    const content = msg.content as Array<{ type: string }>;
    expect(content.some((c) => c.type === 'text')).toBe(true);
    expect(content.some((c) => c.type === 'tool_use')).toBe(true);
  });

  test('omits text block when empty', () => {
    const msg = fromCoreAssistant('', [
      { id: 'call_4', name: 'list_files', args: { dir: '.' } },
    ]);
    const content = msg.content as Array<{ type: string }>;
    expect(content.every((c) => c.type !== 'text')).toBe(true);
  });
});

describe('fromCoreToolResults', () => {
  test('builds tool_result user message', () => {
    const msg = fromCoreToolResults([
      { toolCallId: 'call_5', result: 'result data' },
    ]);
    expect(msg.role).toBe('user');
    const content = msg.content as Array<{ type: string; tool_use_id: string; content: string }>;
    expect(content[0]).toMatchObject({
      type: 'tool_result',
      tool_use_id: 'call_5',
      content: 'result data',
    });
  });

  test('handles multiple results', () => {
    const msg = fromCoreToolResults([
      { toolCallId: 'a', result: 'r1' },
      { toolCallId: 'b', result: 'r2' },
    ]);
    const content = msg.content as Array<{ tool_use_id: string }>;
    expect(content).toHaveLength(2);
    expect(content[0]!.tool_use_id).toBe('a');
    expect(content[1]!.tool_use_id).toBe('b');
  });
});
