import { describe, expect, test } from 'bun:test';
import { AskUserPayload } from '~/tools/types';

describe('AskUserPayload schema', () => {
  test('accepts a fully-specified payload', () => {
    const r = AskUserPayload.parse({
      question: 'Deploy?',
      header: 'Deploy SF',
      options: [
        { label: 'Yes', description: 'Run deploy' },
        { label: 'No', description: 'Skip' },
      ],
      multiSelect: false,
    });
    expect(r.options).toHaveLength(2);
    expect(r.multiSelect).toBe(false);
  });

  test('fills in defaults when description and multiSelect are omitted', () => {
    const r = AskUserPayload.parse({
      question: 'Pick one',
      header: 'Pick',
      options: [{ label: 'A' }, { label: 'B' }],
    });
    expect(r.options[0]?.description).toBe('');
    expect(r.multiSelect).toBe(false);
  });

  test('truncates over-long headers instead of rejecting', () => {
    const longHeader = 'A'.repeat(70);
    const r = AskUserPayload.parse({
      question: 'q?',
      header: longHeader,
      options: [{ label: 'a' }, { label: 'b' }],
    });
    expect(r.header.length).toBeLessThanOrEqual(40);
    expect(r.header.endsWith('…')).toBe(true);
  });

  test('rejects header over 80 chars (clearly malformed)', () => {
    expect(() =>
      AskUserPayload.parse({
        question: 'q?',
        header: 'x'.repeat(120),
        options: [{ label: 'a' }, { label: 'b' }],
      }),
    ).toThrow();
  });

  test('rejects single-option payload (must have 2+)', () => {
    expect(() =>
      AskUserPayload.parse({
        question: 'q?',
        header: 'h',
        options: [{ label: 'a' }],
      }),
    ).toThrow();
  });
});
