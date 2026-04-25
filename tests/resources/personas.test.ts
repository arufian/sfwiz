import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const PERSONAS_DIR = join(import.meta.dir, '../../resources/personas');
const REFERENCES_DIR = join(import.meta.dir, '../../resources/references');

const EXPECTED_PERSONAS = ['org-admin', 'designer', 'developer', 'reviewer', 'qa', 'deploy-manager'];
const EXPECTED_REFERENCES = [
  'governor-limits', 'lwc-patterns', 'soql-guide', 'apex-testing',
  'scratch-org-workflow', 'security-checklist', 'metadata-types',
  'deploy-checklist', 'admin-settings-registry', 'release-cadence',
];

describe('persona markdown files', () => {
  test('all 6 persona files exist', () => {
    const files = readdirSync(PERSONAS_DIR).map((f) => f.replace('.md', ''));
    for (const name of EXPECTED_PERSONAS) {
      expect(files).toContain(name);
    }
  });

  test('each persona file is non-empty (> 100 bytes)', () => {
    for (const name of EXPECTED_PERSONAS) {
      const path = join(PERSONAS_DIR, `${name}.md`);
      const stat = statSync(path);
      expect(stat.size).toBeGreaterThan(100);
    }
  });

  test('each persona file has a # heading', () => {
    for (const name of EXPECTED_PERSONAS) {
      const content = readFileSync(join(PERSONAS_DIR, `${name}.md`), 'utf8');
      expect(content).toMatch(/^# /m);
    }
  });

  test('reviewer persona mentions read-only constraint', () => {
    const content = readFileSync(join(PERSONAS_DIR, 'reviewer.md'), 'utf8');
    expect(content.toLowerCase()).toContain('read-only');
  });

  test('reviewer persona specifies JSON output format', () => {
    const content = readFileSync(join(PERSONAS_DIR, 'reviewer.md'), 'utf8');
    expect(content).toContain('"approved"');
    expect(content).toContain('"issues"');
  });

  test('qa persona mentions coverage threshold', () => {
    const content = readFileSync(join(PERSONAS_DIR, 'qa.md'), 'utf8');
    expect(content).toContain('75%');
  });
});

describe('reference markdown files', () => {
  test('all 10 reference files exist', () => {
    const files = readdirSync(REFERENCES_DIR).map((f) => f.replace('.md', ''));
    for (const name of EXPECTED_REFERENCES) {
      expect(files).toContain(name);
    }
  });

  test('each reference file is non-empty (> 100 bytes)', () => {
    for (const name of EXPECTED_REFERENCES) {
      const path = join(REFERENCES_DIR, `${name}.md`);
      const stat = statSync(path);
      expect(stat.size).toBeGreaterThan(100);
    }
  });

  test('governor-limits has the 100 SOQL limit', () => {
    const content = readFileSync(join(REFERENCES_DIR, 'governor-limits.md'), 'utf8');
    expect(content).toContain('100');
  });
});

describe('hash drift detection', () => {
  test('sha256 of each persona file is stable (snapshot)', () => {
    const hashes: Record<string, string> = {};
    for (const name of EXPECTED_PERSONAS) {
      const content = readFileSync(join(PERSONAS_DIR, `${name}.md`), 'utf8');
      hashes[name] = createHash('sha256').update(content).digest('hex').slice(0, 16);
    }
    // Snapshot: if files drift, this test will fail and alert to review changes
    expect(hashes).toMatchSnapshot();
  });
});
