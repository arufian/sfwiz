/**
 * H4 guard: verify claude-agent-sdk exports the expected surface before M13 wires it.
 * Runs a live smoke query only when ANTHROPIC_API_KEY is set.
 */
import { describe, expect, test } from 'bun:test';
import * as agentSdk from '@anthropic-ai/claude-agent-sdk';

describe('claude-agent-sdk shape', () => {
  test('query() function exists', () => {
    expect(typeof agentSdk.query).toBe('function');
  });

  test('tool() helper exists', () => {
    expect(typeof agentSdk.tool).toBe('function');
  });

  test('InMemorySessionStore exists', () => {
    expect(typeof agentSdk.InMemorySessionStore).toBe('function');
  });

  test('AgentDefinition type is structurally correct (build-time)', () => {
    // If this compiles, the type is present.
    const _def: agentSdk.AgentDefinition = {
      description: 'test',
      prompt: 'You are a test agent.',
      model: 'claude-sonnet-4-6',
      tools: ['Read'],
    };
    expect(_def.description).toBe('test');
  });
});

describe('claude-agent-sdk live smoke', () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  test.skipIf(!apiKey)('query() returns an AsyncGenerator', async () => {
    const q = agentSdk.query({
      prompt: 'Reply with exactly: OK',
      options: {
        abortController: new AbortController(),
        maxTurns: 1,
      },
    });
    // Verify it's an async iterable.
    expect(typeof q[Symbol.asyncIterator]).toBe('function');
    // Collect first few messages then abort.
    const msgs: agentSdk.SDKMessage[] = [];
    for await (const msg of q) {
      msgs.push(msg);
      if (msgs.length >= 3) break;
    }
    q.return(undefined);
    expect(msgs.length).toBeGreaterThan(0);
  });
});
