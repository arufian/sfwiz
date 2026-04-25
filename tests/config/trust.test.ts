import { describe, expect, test, beforeEach, afterEach } from 'bun:test';
import { readdirSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { TrustStore } from '~/config/trust';

const TMP = join(tmpdir(), `sfwiz-trust-test-${Date.now()}`);

beforeEach(() => mkdirSync(TMP, { recursive: true }));
afterEach(() => rmSync(TMP, { recursive: true, force: true }));

describe('TrustStore', () => {
  test('isTrusted returns false for unknown path', () => {
    const store = new TrustStore(join(TMP, 'trusted.json'));
    expect(store.isTrusted('/tmp/myproject')).toBe(false);
  });

  test('trust + isTrusted roundtrip', () => {
    const store = new TrustStore(join(TMP, 'trusted.json'));
    store.trust('/tmp/myproject');
    expect(store.isTrusted('/tmp/myproject')).toBe(true);
  });

  test('persists across instances', () => {
    const path = join(TMP, 'trusted.json');
    new TrustStore(path).trust('/tmp/proj');
    expect(new TrustStore(path).isTrusted('/tmp/proj')).toBe(true);
  });

  test('handles corrupted file — treats as empty + backs up', () => {
    const path = join(TMP, 'trusted.json');
    writeFileSync(path, 'NOT JSON}}}');
    const store = new TrustStore(path);
    expect(store.isTrusted('/tmp/proj')).toBe(false);
    // Backup file should exist
    const files = readdirSync(TMP);
    expect(files.some((f) => f.includes('corrupted'))).toBe(true);
  });

  test('untrust removes entry', () => {
    const store = new TrustStore(join(TMP, 'trusted.json'));
    store.trust('/tmp/proj');
    store.untrust('/tmp/proj');
    expect(store.isTrusted('/tmp/proj')).toBe(false);
  });
});
