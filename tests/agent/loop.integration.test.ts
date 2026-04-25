/**
 * M3 integration test — guards against silent tool-schema drop.
 *
 * Injects a custom fetch into the Anthropic client to capture outgoing
 * request bodies without hitting the real API. This is the H2 fix from the
 * Opus review: intercept at the HTTP layer, not via SDK method stubs.
 */
import { describe, expect, test, beforeEach } from 'bun:test';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageCreateParamsStreaming } from '@anthropic-ai/sdk/resources/messages';
import { AgentLoop } from '~/agent/loop';
import { z } from 'zod';
import type { Tool } from '~/tools/types';

const echoTool = {
  name: 'echo',
  description: 'Echo the message back',
  parameters: z.object({ message: z.string() }),
  async execute({ message }: { message: string }) {
    return { echo: message };
  },
} satisfies Tool;

/** Build a proper Anthropic SSE byte stream from event objects. */
function sseBytes(events: Array<{ type: string } & Record<string, unknown>>): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  // Anthropic SSE requires "event: <type>" before "data: <json>"
  const chunks = events.map((e) =>
    enc.encode(`event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`),
  );
  return new ReadableStream({
    start(controller) {
      for (const c of chunks) controller.enqueue(c);
      controller.close();
    },
  });
}

type SseEvent = { type: string } & Record<string, unknown>;

function makeTextResponse(text: string): Response {
  const events: SseEvent[] = [
    { type: 'message_start', message: { id: 'm1', type: 'message', role: 'assistant', content: [], model: 'claude-sonnet-4-6', stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } } },
    { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } },
    { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text } },
    { type: 'content_block_stop', index: 0 },
    { type: 'message_delta', delta: { stop_reason: 'end_turn', stop_sequence: null }, usage: { output_tokens: 5 } },
    { type: 'message_stop' },
  ];
  return new Response(sseBytes(events), { status: 200, headers: { 'content-type': 'text/event-stream' } });
}

function makeToolResponse(toolName: string, toolInput: Record<string, unknown>, toolCallId: string): Response {
  const events: SseEvent[] = [
    { type: 'message_start', message: { id: 'm1', type: 'message', role: 'assistant', content: [], model: 'claude-sonnet-4-6', stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } } },
    { type: 'content_block_start', index: 0, content_block: { type: 'tool_use', id: toolCallId, name: toolName, input: {} } },
    { type: 'content_block_delta', index: 0, delta: { type: 'input_json_delta', partial_json: JSON.stringify(toolInput) } },
    { type: 'content_block_stop', index: 0 },
    { type: 'message_delta', delta: { stop_reason: 'tool_use', stop_sequence: null }, usage: { output_tokens: 8 } },
    { type: 'message_stop' },
  ];
  return new Response(sseBytes(events), { status: 200, headers: { 'content-type': 'text/event-stream' } });
}

/** Create an AgentLoop backed by a capture-and-mock fetch. */
function makeTestLoop(opts: { tools?: Tool[] } = {}) {
  const capturedBodies: MessageCreateParamsStreaming[] = [];
  let callCount = 0;

  const mockFetch = async (_input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const body = JSON.parse((init?.body ?? '{}') as string) as MessageCreateParamsStreaming;
    capturedBodies.push(body);
    callCount++;
    return callCount === 1
      ? makeToolResponse('echo', { message: 'hello' }, 'call_abc123')
      : makeTextResponse('Done.');
  };

  const client = new Anthropic({ apiKey: 'sk-ant-test', fetch: mockFetch as typeof fetch });

  const loop = new AgentLoop({
    systemPrompt: 'You are a test assistant.',
    tools: opts.tools ?? [echoTool],
    client,
  });

  return { loop, capturedBodies };
}

describe('AgentLoop — tool schema forwarding (H2 guard)', () => {
  test('tools array is non-empty in outgoing request', async () => {
    const { loop, capturedBodies } = makeTestLoop();
    await loop.run([{ role: 'user', content: 'call echo with hello' }]);

    expect(capturedBodies.length).toBeGreaterThanOrEqual(1);
    const firstBody = capturedBodies[0]!;
    expect(Array.isArray(firstBody.tools)).toBe(true);
    expect((firstBody.tools ?? []).length).toBeGreaterThan(0);
    expect((firstBody.tools ?? [])[0]?.name).toBe('echo');
  });

  test('cache_control present on system and last tool-def (H3 — breakpoints 1+2)', async () => {
    const { loop, capturedBodies } = makeTestLoop();
    await loop.run([{ role: 'user', content: 'test' }]);

    const body = capturedBodies[0]!;

    // Breakpoint 1: system must be an array with cache_control on the last block.
    expect(Array.isArray(body.system)).toBe(true);
    const sysBlocks = body.system as Array<{ type: string; cache_control?: { type: string } }>;
    expect(sysBlocks[sysBlocks.length - 1]?.cache_control?.type).toBe('ephemeral');

    // Breakpoint 2: last tool-def must have cache_control.
    const tools = body.tools ?? [];
    expect(tools.length).toBeGreaterThan(0);
    expect((tools[tools.length - 1] as { cache_control?: { type: string } })?.cache_control?.type).toBe('ephemeral');
  });

  test('tool_result injected in second turn (manual tool loop)', async () => {
    const { loop, capturedBodies } = makeTestLoop();
    await loop.run([{ role: 'user', content: 'call echo' }]);

    // Must have made two requests: tool_use turn + continuation.
    expect(capturedBodies.length).toBe(2);
    const secondBody = capturedBodies[1]!;
    const msgs = secondBody.messages;
    const toolResultMsg = msgs.find(
      (m) =>
        Array.isArray(m.content) &&
        (m.content as Array<{ type: string }>).some((c) => c.type === 'tool_result'),
    );
    expect(toolResultMsg).toBeDefined();
  });

  test('event ordering: thinking → stream → tool:running → tool:done → done', async () => {
    const { loop } = makeTestLoop();
    const events: string[] = [];
    loop.on('turn:thinking', () => events.push('thinking'));
    loop.on('turn:stream', () => events.push('stream'));
    loop.on('tool:running', () => events.push('tool:running'));
    loop.on('tool:done', () => events.push('tool:done'));
    loop.on('turn:done', () => events.push('done'));

    await loop.run([{ role: 'user', content: 'test' }]);

    expect(events[0]).toBe('thinking');
    expect(events).toContain('tool:running');
    expect(events).toContain('tool:done');
    expect(events[events.length - 1]).toBe('done');
  });

  test('AbortController aborts the loop', async () => {
    const ac = new AbortController();
    const client = new Anthropic({
      apiKey: 'sk-ant-test',
      fetch: async () => {
        await new Promise((r) => setTimeout(r, 50));
        return makeTextResponse('hello');
      },
    });
    const loop = new AgentLoop({ systemPrompt: 'test', tools: [], abortController: ac, client });
    ac.abort();
    await expect(loop.run([{ role: 'user', content: 'test' }])).rejects.toThrow();
  });
});
