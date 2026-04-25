import { describe, expect, test } from 'bun:test';
import { z } from 'zod';
import { ToolRegistry } from '~/tools/registry';
import type { ToolContext } from '~/tools/types';

const stubCtx: ToolContext = {
  org: null,
  session: { id: 'test', projectRoot: '/tmp' },
  emit: () => {},
  askUser: async () => ({ selected: 'yes', notes: null, cancelled: false }),
};

const pingTool = {
  name: 'ping',
  description: 'Ping test',
  parameters: z.object({ msg: z.string() }),
  async execute({ msg }: { msg: string }) {
    return `pong: ${msg}`;
  },
};

describe('ToolRegistry', () => {
  test('registerTool + listTools', () => {
    const reg = new ToolRegistry();
    reg.registerTool(pingTool);
    const list = reg.listTools();
    expect(list.length).toBe(1);
    expect(list[0]?.name).toBe('ping');
  });

  test('executeTool succeeds', async () => {
    const reg = new ToolRegistry();
    reg.registerTool(pingTool);
    const result = await reg.executeTool('ping', { msg: 'hello' }, stubCtx);
    expect(result).toBe('pong: hello');
  });

  test('executeTool throws on unknown tool', async () => {
    const reg = new ToolRegistry();
    await expect(reg.executeTool('nope', {}, stubCtx)).rejects.toThrow('Unknown tool');
  });

  test('executeTool validates args with Zod', async () => {
    const reg = new ToolRegistry();
    reg.registerTool(pingTool);
    await expect(reg.executeTool('ping', { msg: 42 }, stubCtx)).rejects.toThrow();
  });

  test('duplicate registration throws', () => {
    const reg = new ToolRegistry();
    reg.registerTool(pingTool);
    expect(() => reg.registerTool(pingTool)).toThrow('already registered');
  });

  test('listTools returns Anthropic-compatible definitions', () => {
    const reg = new ToolRegistry();
    reg.registerTool(pingTool);
    const defs = reg.toAnthropicTools();
    expect(defs[0]?.name).toBe('ping');
    expect(defs[0]?.input_schema.type).toBe('object');
  });
});
