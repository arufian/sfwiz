import { describe, expect, test, beforeEach } from 'bun:test';
import { learnBus } from '~/learn/bus';
import { renderBar, formatPercent } from '~/tui/layout/StatusBar';
import { detectQmd } from '~/knowledge/detect';
import { parseSfOrgList } from '~/sf/orgs';

describe('embed progress event bus', () => {
  test('emits and receives embed:progress events', () => {
    const events: unknown[] = [];
    const handler = (e: unknown) => events.push(e);
    learnBus.on('embed:progress', handler as Parameters<typeof learnBus.on>[1]);

    learnBus.emit('embed:progress', {
      kind: 'embed:progress',
      collection: 'apex-ref',
      done: 117,
      total: 243,
      currentItem: 'Database.update',
    });

    learnBus.off('embed:progress', handler as Parameters<typeof learnBus.on>[1]);
    expect(events).toHaveLength(1);
    expect((events[0] as { done: number }).done).toBe(117);
  });

  test('emits embed:done when collection finishes', () => {
    let done = false;
    learnBus.on('embed:done', () => { done = true; });
    learnBus.emit('embed:done', { kind: 'embed:done', collection: 'apex-ref' });
    expect(done).toBe(true);
  });

  test('emits embed:error on failure', () => {
    let errMsg = '';
    learnBus.on('embed:error', (e) => { errMsg = e.message; });
    learnBus.emit('embed:error', { kind: 'embed:error', collection: 'apex-ref', message: 'qmd embed exited 1' });
    expect(errMsg).toBe('qmd embed exited 1');
  });
});

describe('StatusBar rendering helpers', () => {
  test('renderBar at 0%', () => {
    const bar = renderBar(0, 9);
    expect(bar).toBe('░░░░░░░░░');
  });

  test('renderBar at 48%', () => {
    const bar = renderBar(48, 9);
    // 48% of 9 = 4.32 → 4 filled
    expect(bar).toBe('████░░░░░');
  });

  test('renderBar at 100%', () => {
    const bar = renderBar(100, 9);
    expect(bar).toBe('█████████');
  });

  test('formatPercent at 0/243', () => {
    expect(formatPercent(0, 243)).toBe('  0%');
  });

  test('formatPercent at 117/243 (≈48%)', () => {
    expect(formatPercent(117, 243)).toBe(' 48%');
  });

  test('formatPercent at 243/243', () => {
    expect(formatPercent(243, 243)).toBe('100%');
  });

  test('formatPercent with total=0 returns 0%', () => {
    expect(formatPercent(0, 0)).toBe('  0%');
  });
});

describe('qmd detection', () => {
  test('detectQmd returns QmdInfo or null (does not throw)', () => {
    const result = detectQmd();
    if (result !== null) {
      expect(typeof result.binPath).toBe('string');
      expect(typeof result.version).toBe('string');
    }
    // null is fine if qmd not installed
    expect(result === null || typeof result === 'object').toBe(true);
  });
});

describe('qmd_query schema', () => {
  test('requires non-empty query', async () => {
    const { qmdQuery } = await import('~/tools/knowledge/qmd_query');
    expect(() => qmdQuery.parameters.parse({ query: '' })).toThrow();
    expect(() => qmdQuery.parameters.parse({ query: 'Database.insert' })).not.toThrow();
  });

  test('topK max is 20', async () => {
    const { qmdQuery } = await import('~/tools/knowledge/qmd_query');
    expect(() => qmdQuery.parameters.parse({ query: 'x', topK: 21 })).toThrow();
    expect(() => qmdQuery.parameters.parse({ query: 'x', topK: 20 })).not.toThrow();
  });

  test('collection enum validation', async () => {
    const { qmdQuery } = await import('~/tools/knowledge/qmd_query');
    expect(() => qmdQuery.parameters.parse({ query: 'x', collection: 'invalid' })).toThrow();
    expect(() => qmdQuery.parameters.parse({ query: 'x', collection: 'apex-ref' })).not.toThrow();
  });
});
