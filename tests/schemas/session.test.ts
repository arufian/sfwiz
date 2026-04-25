import { describe, expect, test } from 'bun:test';
import { SessionRecord, SessionResumeHandle } from '~/session/types';

describe('SessionRecord', () => {
  test('valid session record', () => {
    const result = SessionRecord.safeParse({
      id: 'abc123',
      createdAt: '2026-04-25T00:00:00Z',
      org: 'myorg',
      projectRoot: '/tmp/myproject',
      tokens: { input: 100, output: 50, cached: 20, cost: 0.01 },
      conversation: [],
      artifacts: {},
    });
    expect(result.success).toBe(true);
  });

  test('org can be null', () => {
    const result = SessionRecord.safeParse({
      id: 'abc123',
      createdAt: '2026-04-25T00:00:00Z',
      org: null,
      projectRoot: '/tmp',
      tokens: { input: 0, output: 0, cached: 0, cost: 0 },
      conversation: [],
      artifacts: {},
    });
    expect(result.success).toBe(true);
  });

  test('rejects missing required fields', () => {
    expect(SessionRecord.safeParse({ id: 'x' }).success).toBe(false);
  });
});

describe('SessionResumeHandle', () => {
  test('valid resume handle', () => {
    const result = SessionResumeHandle.safeParse({
      sessionId: 'uuid-abc',
      agentSdkSessionId: 'sdk-session-xyz',
      personaName: 'reviewer',
    });
    expect(result.success).toBe(true);
  });

  test('agentSdkSessionId optional', () => {
    const result = SessionResumeHandle.safeParse({
      sessionId: 'uuid-abc',
      personaName: 'qa',
    });
    expect(result.success).toBe(true);
  });
});
