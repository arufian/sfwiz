import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';
import { apexRefAdapter } from '~/scraper/adapters/apex-ref';
import { lwcGuideAdapter } from '~/scraper/adapters/lwc-guide';
import { sfReleasesAdapter } from '~/scraper/adapters/sf-releases';
import { getRecentSeasons } from '~/scraper/season';

const FIXTURES = join(import.meta.dir, '../fixtures/html');

function readFixture(name: string): string {
  return readFileSync(join(FIXTURES, name), 'utf8');
}

describe('apexRefAdapter', () => {
  test('extracts markdown from apex-ref sample', async () => {
    const html = readFixture('apex-ref-sample.html');
    const result = await apexRefAdapter.extract(html, 'https://developer.salesforce.com/docs/apexref/Database');
    expect(result).not.toBeNull();
    expect(result!.title).toContain('Database');
    expect(result!.markdown).toContain('Database Class');
    expect(result!.markdown).toContain('insert');
  });

  test('skips ConnectApi pages', async () => {
    const html = readFixture('apex-ref-connectapi.html');
    const url = 'https://developer.salesforce.com/docs/apexref/ConnectApi.ChatterUsers';
    expect(apexRefAdapter.shouldSkip(url)).toBe(true);
    const result = await apexRefAdapter.extract(html, url);
    expect(result).toBeNull();
  });

  test('markdown contains code block', async () => {
    const html = readFixture('apex-ref-sample.html');
    const result = await apexRefAdapter.extract(html, 'https://example.com/db');
    expect(result!.markdown).toContain('```');
  });

  test('returns null for near-empty page', async () => {
    const result = await apexRefAdapter.extract('<html><body><main></main></body></html>', 'https://x.com');
    expect(result).toBeNull();
  });
});

describe('lwcGuideAdapter', () => {
  test('extracts markdown from lwc-guide sample', async () => {
    const html = readFixture('lwc-guide-sample.html');
    const result = await lwcGuideAdapter.extract(html, 'https://developer.salesforce.com/docs/lwc');
    expect(result).not.toBeNull();
    expect(result!.title).toContain('LWC');
    expect(result!.markdown).toContain('Lightning Web Component');
  });

  test('does not skip any URL', () => {
    expect(lwcGuideAdapter.shouldSkip('https://anything.com')).toBe(false);
  });

  test('markdown contains HTML code block', async () => {
    const html = readFixture('lwc-guide-sample.html');
    const result = await lwcGuideAdapter.extract(html, 'https://x.com');
    expect(result!.markdown).toContain('template');
  });
});

describe('sfReleasesAdapter', () => {
  test('extracts markdown from sf-releases sample', async () => {
    const html = readFixture('sf-releases-sample.html');
    const result = await sfReleasesAdapter.extract(html, 'https://help.salesforce.com/spring25');
    expect(result).not.toBeNull();
    expect(result!.markdown).toContain("Spring");
  });

  test('removes nav and footer', async () => {
    const html = readFixture('sf-releases-sample.html');
    const result = await sfReleasesAdapter.extract(html, 'https://x.com');
    expect(result!.markdown).not.toContain('Salesforce Help'); // footer text
  });
});

describe('season detector', () => {
  test('returns 3 seasons', () => {
    const seasons = getRecentSeasons(new Date('2025-04-25'));
    expect(seasons).toHaveLength(3);
  });

  test('April 2025 = Spring 25', () => {
    const seasons = getRecentSeasons(new Date('2025-04-25'));
    expect(seasons[0]!.season).toBe('Spring');
    expect(seasons[0]!.year).toBe(2025);
  });

  test('seasons go back in time', () => {
    const seasons = getRecentSeasons(new Date('2025-04-25'));
    // Spring '25 → Winter '25 (prev of Spring = Winter same year) → Summer '24
    expect(seasons[1]!.season).toBe('Winter');
    expect(seasons[2]!.season).toBe('Summer');
    expect(seasons[2]!.year).toBe(2024);
  });

  test('August 2025 = Summer', () => {
    const seasons = getRecentSeasons(new Date('2025-08-01'));
    expect(seasons[0]!.season).toBe('Summer');
  });

  test('December 2025 = Winter', () => {
    const seasons = getRecentSeasons(new Date('2025-12-01'));
    expect(seasons[0]!.season).toBe('Winter');
  });
});
