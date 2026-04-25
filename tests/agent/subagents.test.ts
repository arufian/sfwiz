import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { z } from 'zod';

// Mock @anthropic-ai/claude-agent-sdk query() before importing subagents
const mockMessages: unknown[] = [];

function* fakeQueryGenerator(): Generator<unknown, void, unknown> {
  for (const msg of mockMessages) yield msg;
}

async function* fakeAsyncQueryGenerator(): AsyncGenerator<unknown, void, unknown> {
  for (const msg of mockMessages) {
    yield msg;
  }
}

// We can't easily mock ESM imports in bun:test without module mocking,
// so we test the supporting types and logic instead.

import { QaOutputSchema, ReviewerOutputSchema } from '~/agent/router';
import { QA_AGENT, REVIEWER_AGENT, getAuditLines } from '~/agent/subagents';
import { checkPersonaGate } from '~/personas/gate';
import { PERSONA_REGISTRY, getPersona } from '~/personas/registry';

describe('persona gate', () => {
  test('reviewer allowed to Write (for docs/review-report.md)', () => {
    // Reviewer may write the review report — Write is no longer blocked.
    const r = checkPersonaGate('reviewer', 'Write');
    expect(r.allowed).toBe(true);
  });

  test('reviewer blocked from Edit', () => {
    expect(checkPersonaGate('reviewer', 'Edit').allowed).toBe(false);
  });

  test('reviewer blocked from Bash', () => {
    expect(checkPersonaGate('reviewer', 'Bash').allowed).toBe(false);
  });

  test('reviewer allowed Read', () => {
    expect(checkPersonaGate('reviewer', 'Read').allowed).toBe(true);
  });

  test('reviewer allowed Grep', () => {
    expect(checkPersonaGate('reviewer', 'Grep').allowed).toBe(true);
  });

  test('designer blocked from sf_deploy_start', () => {
    const r = checkPersonaGate('designer', 'sf_deploy_start');
    expect(r.allowed).toBe(false);
    expect(r.reason).toContain('developer/deploy-manager');
  });

  test('developer allowed sf_deploy_start', () => {
    expect(checkPersonaGate('developer', 'sf_deploy_start').allowed).toBe(true);
  });

  test('deploy-manager allowed sf_scratch_create', () => {
    expect(checkPersonaGate('deploy-manager', 'sf_scratch_create').allowed).toBe(true);
  });

  test('developer not blocked on Read', () => {
    expect(checkPersonaGate('developer', 'Read').allowed).toBe(true);
  });
});

describe('persona registry', () => {
  test('reviewer model is opus', () => {
    const p = getPersona('reviewer');
    expect(p.model).toBe('claude-opus-4-7');
    expect(p.executionMode).toBe('subagent');
  });

  test('qa model is sonnet', () => {
    const p = getPersona('qa');
    expect(p.model).toBe('claude-sonnet-4-6');
  });

  test('designer uses subagent (SDK isolation)', () => {
    expect(getPersona('designer').executionMode).toBe('subagent');
    // Designer now writes docs/design.md — requires Write tool.
    expect(getPersona('designer').agentDefinition.tools).toContain('Write');
    expect(getPersona('designer').agentDefinition.tools).toContain('Read');
    expect(getPersona('designer').agentDefinition.model).toBe('claude-opus-4-7');
  });

  test('developer uses subagent (SDK isolation)', () => {
    expect(getPersona('developer').executionMode).toBe('subagent');
    expect(getPersona('developer').agentDefinition.tools).toContain('Edit');
    expect(getPersona('developer').agentDefinition.tools).toContain('Write');
  });

  test('deploy-manager uses subagent', () => {
    expect(getPersona('deploy-manager').executionMode).toBe('subagent');
    // Deploy manager now generates loadTestData.apex + calls sf org assign permset.
    expect(getPersona('deploy-manager').agentDefinition.tools).toContain('Read');
    expect(getPersona('deploy-manager').agentDefinition.tools).toContain('Bash');
  });

  test('all 6 personas defined', () => {
    expect(Object.keys(PERSONA_REGISTRY)).toHaveLength(6);
  });
});

describe('agent definitions (H1 subagent:* observability)', () => {
  test('reviewer tools include Write for review report', () => {
    // Reviewer writes docs/review-report.md — Write is required.
    expect(REVIEWER_AGENT.tools).toContain('Write');
    expect(REVIEWER_AGENT.tools).toContain('Read');
    // Edit and Bash remain blocked via gate.
    expect(REVIEWER_AGENT.tools).not.toContain('Edit');
    expect(REVIEWER_AGENT.tools).not.toContain('Bash');
  });

  test('reviewer model is opus-4-7', () => {
    expect(REVIEWER_AGENT.model).toBe('claude-opus-4-7');
  });

  test('qa tools include Bash and Write for test spec', () => {
    expect(QA_AGENT.tools).toContain('Bash');
    // QA writes docs/test-spec.md — Write required.
    expect(QA_AGENT.tools).toContain('Write');
  });

  test('qa model is sonnet-4-6', () => {
    expect(QA_AGENT.model).toBe('claude-sonnet-4-6');
  });
});

describe('ReviewerOutputSchema validation', () => {
  test('valid reviewer output parses', () => {
    const valid = {
      issues: [
        { severity: 'error', file: 'AccountService.cls', line: 42, message: 'SOQL in loop' },
      ],
      summary: 'Governor limit risk found.',
      approved: false,
    };
    expect(() => ReviewerOutputSchema.parse(valid)).not.toThrow();
  });

  test('approved=true with no issues', () => {
    const clean = { issues: [], summary: 'LGTM', approved: true };
    expect(ReviewerOutputSchema.parse(clean).approved).toBe(true);
  });

  test('invalid severity rejected', () => {
    const bad = {
      issues: [{ severity: 'critical', file: 'x.cls', message: 'x' }],
      summary: '',
      approved: false,
    };
    expect(() => ReviewerOutputSchema.parse(bad)).toThrow();
  });
});

describe('QaOutputSchema validation', () => {
  test('valid QA output parses', () => {
    const valid = {
      passed: 42,
      failed: 0,
      coverage: 87.5,
      failures: [],
    };
    expect(() => QaOutputSchema.parse(valid)).not.toThrow();
    expect(QaOutputSchema.parse(valid).coverage).toBe(87.5);
  });

  test('failures array has class/method/message', () => {
    const withFail = {
      passed: 40,
      failed: 2,
      coverage: 72.1,
      failures: [{ class: 'AccountTest', method: 'testInsert', message: 'NullPointerException' }],
    };
    expect(QaOutputSchema.parse(withFail).failures).toHaveLength(1);
  });
});

describe('audit log (PostToolUse hook demo)', () => {
  test('getAuditLines returns an array (initially empty or from prior tests)', () => {
    expect(Array.isArray(getAuditLines())).toBe(true);
  });
});
