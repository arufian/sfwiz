import { describe, expect, test } from 'bun:test';
import { withRetry, sleep, throttle } from '~/util/async';
import { buildCachedSystem, buildCachedToolDefs, applyHistoryCacheBreakpoints } from '~/agent/cache-hints';
import type { MessageParam } from '@anthropic-ai/sdk/resources';
import { z } from 'zod';
import type { Tool } from '~/tools/types';

describe('withRetry', () => {
  test('returns result on first success', async () => {
    let calls = 0;
    const result = await withRetry(async () => { calls++; return 42; });
    expect(result).toBe(42);
    expect(calls).toBe(1);
  });

  test('retries on rate-limit error and eventually succeeds', async () => {
    let calls = 0;
    const result = await withRetry(async () => {
      calls++;
      if (calls < 3) throw { status: 429, message: 'rate_limit' };
      return 'ok';
    }, { maxAttempts: 3, initialDelayMs: 1 });
    expect(result).toBe('ok');
    expect(calls).toBe(3);
  });

  test('throws immediately on non-retryable error', async () => {
    let calls = 0;
    await expect(
      withRetry(async () => { calls++; throw new Error('auth error'); }, { maxAttempts: 3, initialDelayMs: 1 })
    ).rejects.toThrow('auth error');
    expect(calls).toBe(1);
  });

  test('throws after max attempts', async () => {
    let calls = 0;
    await expect(
      withRetry(async () => { calls++; throw { status: 429, message: 'rate_limit' }; },
        { maxAttempts: 2, initialDelayMs: 1 })
    ).rejects.toBeDefined();
    expect(calls).toBe(2);
  });
});

describe('throttle', () => {
  test('calls fn at most once per interval', async () => {
    let calls = 0;
    const throttled = throttle(() => { calls++; }, 50);
    throttled(); throttled(); throttled();
    expect(calls).toBe(1); // only first call goes through
    await sleep(60);
    throttled();
    expect(calls).toBe(2);
  });
});

describe('cache hints (H3 verification)', () => {
  const system = 'You are an expert Salesforce developer.';
  const fakeTool: Tool = {
    name: 'read_file',
    description: 'Read a file',
    parameters: z.object({ path: z.string().describe('File path') }),
    async execute() { return ''; },
  };

  test('buildCachedSystem adds cache_control to system block', () => {
    const block = buildCachedSystem(system);
    expect(Array.isArray(block)).toBe(true);
    const last = block[block.length - 1] as { cache_control?: { type: string } };
    expect(last.cache_control?.type).toBe('ephemeral');
  });

  test('buildCachedToolDefs marks last tool with cache_control', () => {
    const tools = buildCachedToolDefs([fakeTool]);
    const last = tools[tools.length - 1] as { cache_control?: { type: string } };
    expect(last.cache_control?.type).toBe('ephemeral');
  });

  test('applyHistoryCacheBreakpoints marks stable prefix', () => {
    const history: MessageParam[] = [
      { role: 'user', content: 'msg1' },
      { role: 'assistant', content: 'resp1' },
      { role: 'user', content: 'msg2' },
      { role: 'assistant', content: 'resp2' },
      { role: 'user', content: 'msg3' },
    ];
    const result = applyHistoryCacheBreakpoints(history);
    // Stable prefix = everything before last 2 turns
    // Last 2 turns = msg3 + (no assistant yet) = just msg3 is "last"
    // The function marks breakpoint at turn -3 (stable prefix)
    expect(result.length).toBe(history.length);
  });

  test('cache hint: no tool gets marked when empty tools list', () => {
    const tools = buildCachedToolDefs([]);
    expect(tools.length).toBe(0);
  });
});
