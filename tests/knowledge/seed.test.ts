import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { seedKnowledgeFromBundle } from '~/knowledge/seed';

describe('seedKnowledgeFromBundle', () => {
  let target: string;

  beforeEach(() => {
    target = mkdtempSync(join(tmpdir(), 'sfwiz-seed-'));
  });

  afterEach(() => {
    rmSync(target, { recursive: true, force: true });
  });

  test('copies bundled markdown for apex-ref + jsforce into empty target', () => {
    const result = seedKnowledgeFromBundle({ targetDir: target });

    const apex = result.seeded.find((s) => s.collection === 'apex-ref');
    const jsforce = result.seeded.find((s) => s.collection === 'jsforce');

    expect(apex).toBeDefined();
    expect(apex?.files).toBeGreaterThan(100);
    expect(jsforce).toBeDefined();
    expect(jsforce?.files).toBeGreaterThan(0);

    expect(
      readdirSync(join(target, 'apex-ref')).filter((f) => f.endsWith('.md')).length,
    ).toBeGreaterThan(100);
    expect(
      readdirSync(join(target, 'jsforce')).filter((f) => f.endsWith('.md')).length,
    ).toBeGreaterThan(0);
  });

  test('skips collections that already have content', () => {
    const apexDir = join(target, 'apex-ref');
    mkdirSync(apexDir, { recursive: true });
    writeFileSync(join(apexDir, 'preexisting.md'), '# stub');

    const result = seedKnowledgeFromBundle({ targetDir: target });

    const skipped = result.skipped.find((s) => s.collection === 'apex-ref');
    expect(skipped?.reason).toBe('already has content');
    expect(readdirSync(apexDir)).toContain('preexisting.md');
    // Did not overwrite — still only the stub.
    expect(readdirSync(apexDir).filter((f) => f.endsWith('.md')).length).toBe(1);
  });

  test('reports collections not in the bundle as skipped', () => {
    const result = seedKnowledgeFromBundle({ targetDir: target });

    // lwc-guide, sf-releases, sf-cli-ref are not pre-bundled.
    for (const name of ['lwc-guide', 'sf-releases', 'sf-cli-ref'] as const) {
      const skipped = result.skipped.find((s) => s.collection === name);
      expect(skipped?.reason).toBe('not in bundle');
    }
  });

  test('is idempotent — second call seeds nothing new', () => {
    seedKnowledgeFromBundle({ targetDir: target });
    const result2 = seedKnowledgeFromBundle({ targetDir: target });
    expect(result2.seeded).toHaveLength(0);
    expect(result2.skipped.find((s) => s.collection === 'apex-ref')?.reason).toBe(
      'already has content',
    );
  });
});
