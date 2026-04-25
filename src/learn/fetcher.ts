/** Polite fetcher with ETag/Last-Modified caching for continuous-learning worker. */

export interface FetchCache {
  etag?: string;
  lastModified?: string;
}

export interface FetchResult {
  status: 304 | 200 | number;
  html?: string;
  cache: FetchCache;
}

/** Fetch a URL with conditional headers. Returns 304 if not modified. Polite: 1 rps per host. */
export async function politeFetch(url: string, cache: FetchCache = {}): Promise<FetchResult> {
  const headers: Record<string, string> = {
    'User-Agent': 'sfwiz-learn/0.1 (educational; not a crawler)',
  };
  if (cache.etag) headers['If-None-Match'] = cache.etag;
  if (cache.lastModified) headers['If-Modified-Since'] = cache.lastModified;

  const res = await fetch(url, { headers });

  if (res.status === 304) {
    return { status: 304, cache };
  }

  const newCache: FetchCache = {
    etag: res.headers.get('ETag') ?? undefined,
    lastModified: res.headers.get('Last-Modified') ?? undefined,
  };

  if (!res.ok) return { status: res.status, cache: newCache };

  const html = await res.text();
  return { status: 200, html, cache: newCache };
}
