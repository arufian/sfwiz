import { describe, expect, test } from 'bun:test';
import { CollectionMeta } from '~/scraper/types';

describe('CollectionMeta', () => {
  test('valid meta with etag', () => {
    const result = CollectionMeta.safeParse({
      url: 'https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/',
      lastScrape: '2026-04-25T03:00:00Z',
      etag: '"abc123"',
      lastModified: 'Wed, 25 Apr 2026 00:00:00 GMT',
      chunkCount: 243,
      bytes: 1_234_567,
    });
    expect(result.success).toBe(true);
  });

  test('etag and lastModified can be null', () => {
    const result = CollectionMeta.safeParse({
      url: 'https://example.com',
      lastScrape: '2026-04-25T00:00:00Z',
      etag: null,
      lastModified: null,
      chunkCount: 10,
      bytes: 1000,
    });
    expect(result.success).toBe(true);
  });

  test('rejects invalid URL', () => {
    const result = CollectionMeta.safeParse({
      url: 'not-a-url',
      lastScrape: '2026-04-25T00:00:00Z',
      etag: null,
      lastModified: null,
      chunkCount: 1,
      bytes: 100,
    });
    expect(result.success).toBe(false);
  });

  test('rejects negative chunkCount', () => {
    const result = CollectionMeta.safeParse({
      url: 'https://example.com',
      lastScrape: '2026-04-25T00:00:00Z',
      etag: null,
      lastModified: null,
      chunkCount: -1,
      bytes: 100,
    });
    expect(result.success).toBe(false);
  });
});
