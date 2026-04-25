import { describe, expect, test } from 'bun:test';
import { DestructiveOpGate } from '~/tools/gate';

describe('DestructiveOpGate', () => {
  test('allows non-destructive tool without ask_user', () => {
    const gate = new DestructiveOpGate([]);
    expect(() => gate.check('read_file')).not.toThrow();
  });

  test('blocks sf_deploy_start without prior ask_user', () => {
    const gate = new DestructiveOpGate([]);
    expect(() => gate.check('sf_deploy_start')).toThrow(/ask_user/);
  });

  test('allows sf_deploy_start with recent ask_user', () => {
    const gate = new DestructiveOpGate([
      { toolName: 'ask_user', callId: 'c1', turnIndex: 0 },
    ]);
    expect(() => gate.check('sf_deploy_start', 0)).not.toThrow();
  });

  test('blocks if ask_user was too far back (beyond within:N)', () => {
    const gate = new DestructiveOpGate([
      { toolName: 'ask_user', callId: 'c1', turnIndex: 0 },
    ]);
    // within: 3 means ask_user must be within last 3 turns
    expect(() => gate.check('sf_deploy_start', 5)).toThrow(/ask_user/);
  });

  test('records tool call history', () => {
    const gate = new DestructiveOpGate([]);
    gate.record('ask_user', 'c1', 0);
    expect(() => gate.check('sf_deploy_start', 0)).not.toThrow();
  });
});
