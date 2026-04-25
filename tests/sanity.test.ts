import { describe, expect, test } from 'bun:test';

describe('sanity', () => {
  test('1 + 1 === 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('package version exists', async () => {
    const pkg = await import('../package.json', { with: { type: 'json' } });
    expect(pkg.default.version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
