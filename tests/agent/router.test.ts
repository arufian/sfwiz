import { afterAll, describe, expect, test } from 'bun:test';
import { route } from '~/agent/router';
import { __setQueryImpl } from '~/agent/subagents';

interface FakeQueryArgs {
  prompt: string | AsyncIterable<unknown>;
  options?: { agent?: string };
}

/**
 * Stub the @anthropic-ai/claude-agent-sdk `query()` async generator.
 * Yields `system/init` (with a session_id) then a single `result/success` whose
 * `result` payload is whatever the test wants (JSON for structured personas).
 */
function makeStubQuery(resultByAgent: Record<string, string>) {
  return function fakeQuery(opts: FakeQueryArgs) {
    const agent = opts.options?.agent ?? 'unknown';
    const result = resultByAgent[agent] ?? '';
    async function* gen(): AsyncGenerator<unknown, void, unknown> {
      yield {
        type: 'system',
        subtype: 'init',
        session_id: `sess-${agent}`,
        agents: [agent],
        apiKeySource: 'ANTHROPIC_API_KEY' as const,
        claude_code_version: '0.0.0',
        cwd: '/tmp',
        tools: [],
        mcp_servers: [],
        model: 'stub',
      };
      yield {
        type: 'result',
        subtype: 'success',
        duration_ms: 1,
        duration_api_ms: 1,
        is_error: false,
        num_turns: 2,
        result,
        stop_reason: 'end_turn',
        total_cost_usd: 0.0001,
        usage: {},
        modelUsage: {},
        permission_denials: [],
      };
    }
    return gen();
  } as unknown as Parameters<typeof __setQueryImpl>[0];
}

const original = __setQueryImpl(
  makeStubQuery({
    reviewer: JSON.stringify({
      issues: [
        { severity: 'error', file: 'AccountService.cls', line: 42, message: 'SOQL in loop' },
      ],
      summary: 'governor risk',
      approved: false,
    }),
    qa: JSON.stringify({
      passed: 10,
      failed: 1,
      coverage: 78.5,
      failures: [{ class: 'AccountTest', method: 'testInsert', message: 'NPE' }],
    }),
    'org-admin': JSON.stringify({
      operation: 'permset.assign',
      before: 'no permset',
      after: 'permset assigned',
      warnings: [],
    }),
    designer: 'Design proposal: extend Opportunity sObject with new field…',
    developer: 'Implementation summary: edited AccountService.cls + 1 test.',
    'deploy-manager': 'Deploy summary: pushed to scratch org sf-demo.',
  }),
);

afterAll(() => {
  __setQueryImpl(original);
});

describe('router → subagent (SDK isolation)', () => {
  test('reviewer returns structured ReviewerOutput', async () => {
    const r = await route({ persona: 'reviewer', prompt: 'review this diff' });
    expect(r.persona).toBe('reviewer');
    if (r.persona !== 'reviewer') return;
    expect(r.output.approved).toBe(false);
    expect(r.output.issues[0]?.severity).toBe('error');
    expect(r.sessionId).toBe('sess-reviewer');
  });

  test('qa returns structured QaOutput', async () => {
    const r = await route({ persona: 'qa', prompt: 'run tests' });
    expect(r.persona).toBe('qa');
    if (r.persona !== 'qa') return;
    expect(r.output.passed).toBe(10);
    expect(r.output.failed).toBe(1);
    expect(r.output.failures).toHaveLength(1);
  });

  test('org-admin returns structured OrgAdminOutput', async () => {
    const r = await route({ persona: 'org-admin', prompt: 'assign permset' });
    expect(r.persona).toBe('org-admin');
    if (r.persona !== 'org-admin') return;
    expect(r.output.operation).toBe('permset.assign');
  });

  test('designer returns plain text via subagent', async () => {
    const r = await route({ persona: 'designer', prompt: 'design forecast LWC' });
    expect(r.persona).toBe('designer');
    if (r.persona !== 'designer') return;
    expect(r.output).toContain('Design proposal');
    expect(r.sessionId).toBe('sess-designer');
  });

  test('developer returns plain text via subagent', async () => {
    const r = await route({ persona: 'developer', prompt: 'implement field' });
    expect(r.persona).toBe('developer');
    if (r.persona !== 'developer') return;
    expect(r.output).toContain('Implementation summary');
  });

  test('deploy-manager returns plain text via subagent', async () => {
    const r = await route({ persona: 'deploy-manager', prompt: 'deploy to scratch' });
    expect(r.persona).toBe('deploy-manager');
    if (r.persona !== 'deploy-manager') return;
    expect(r.output).toContain('Deploy summary');
  });

  test('developer → reviewer re-dispatch on issues (scripted multi-step)', async () => {
    // First, developer ships changes.
    const dev = await route({ persona: 'developer', prompt: 'add field' });
    expect(dev.persona).toBe('developer');

    // Orchestrator then routes to reviewer for critique.
    const rev = await route({
      persona: 'reviewer',
      prompt: 'review the change',
      inputs: { from: 'developer' },
    });
    expect(rev.persona).toBe('reviewer');
    if (rev.persona !== 'reviewer') return;
    // Reviewer flagged an issue → orchestrator re-dispatches to developer.
    expect(rev.output.approved).toBe(false);
    const fix = await route({ persona: 'developer', prompt: 'fix SOQL-in-loop' });
    expect(fix.persona).toBe('developer');
  });
});
