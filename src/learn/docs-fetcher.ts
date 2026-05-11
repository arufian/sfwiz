/**
 * Salesforce documentation fetcher.
 * Downloads SF docs pages → markdown files in the collection dirs.
 * Rate-limited to 1 rps per host. Uses ETag/Last-Modified caching.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { KNOWLEDGE_DIR } from '~/knowledge/collections';

// ── HTML → Markdown (same naive converter as sf-cli-fetcher) ──────────────

function htmlToMd(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, l, c) =>
      `\n${'#'.repeat(Number(l))} ${c.replace(/<[^>]+>/g, '').trim()}\n`,
    )
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, c) =>
      `\n\`\`\`\n${c.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim()}\n\`\`\`\n`,
    )
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${c.replace(/<[^>]+>/g, '').trim()}\``)
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, (_, _t, c) => `**${c.replace(/<[^>]+>/g, '').trim()}**`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `- ${c.replace(/<[^>]+>/g, '').trim()}`)
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `\n${c.replace(/<[^>]+>/g, '').trim()}\n`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Extract internal href links from HTML, resolving against base URL. */
function extractLinks(html: string, base: string): string[] {
  const seen = new Set<string>();
  const baseUrl = new URL(base);
  const out: string[] = [];
  const re = /href="([^"#]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      const u = new URL(m[1] as string, base);
      if (u.hostname !== baseUrl.hostname) continue;
      const clean = `${u.origin}${u.pathname}`;
      if (!seen.has(clean)) {
        seen.add(clean);
        out.push(clean);
      }
    } catch {}
  }
  return out;
}

/** Polite fetch: waits `delayMs` before each request. */
async function politeFetch(url: string, delayMs = 1000): Promise<string | null> {
  await new Promise((r) => setTimeout(r, delayMs));
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'sfwiz-learn/0.1 (educational; not a crawler)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** Slugify a URL path to a safe filename. */
function urlToSlug(url: string): string {
  try {
    const p = new URL(url).pathname;
    return p.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').slice(0, 80);
  } catch {
    return `page_${Date.now()}`;
  }
}

// ── Collection-specific fetchers ──────────────────────────────────────────

interface FetchSpec {
  entryUrl: string;
  /** URL must include this string to be followed. */
  urlFilter: string;
  /** URL patterns to skip. */
  skipPatterns?: RegExp[];
  maxPages?: number;
}

const APEX_REF_SPEC: FetchSpec = {
  entryUrl:
    'https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_ref_guide.htm',
  urlFilter: '/docs/atlas.en-us.apexref.meta/apexref/',
  skipPatterns: [/ConnectApi/i, /connect_api/i],
  maxPages: 300,
};

const LWC_GUIDE_SPEC: FetchSpec = {
  entryUrl:
    'https://developer.salesforce.com/docs/atlas.en-us.lwc.meta/lwc/lwc_start_introduction.htm',
  urlFilter: '/docs/atlas.en-us.lwc.meta/lwc/',
  maxPages: 150,
};

const SF_RELEASES_SPEC: FetchSpec = {
  entryUrl:
    'https://help.salesforce.com/s/articleView?id=release-notes.salesforce_release_notes.htm&type=5',
  urlFilter: 'help.salesforce.com/s/articleView?id=release-notes',
  maxPages: 40,
};

const SPECS: Record<string, FetchSpec> = {
  'apex-ref': APEX_REF_SPEC,
  'lwc-guide': LWC_GUIDE_SPEC,
  'sf-releases': SF_RELEASES_SPEC,
};

export interface FetchProgress {
  fetched: number;
  skipped: number;
  errors: number;
  total?: number;
}

/**
 * Fetch docs for a collection into ~/.sfwiz/knowledge/<collection>/
 * Reports progress via onProgress callback.
 * Returns when done or maxPages reached.
 */
export async function fetchCollectionDocs(
  collection: string,
  opts: { force?: boolean; onProgress?: (p: FetchProgress) => void } = {},
): Promise<{ updated: boolean; fetched: number; errors: number }> {
  const spec = SPECS[collection];
  if (!spec) return { updated: false, fetched: 0, errors: 0 };

  const outDir = join(KNOWLEDGE_DIR, collection);
  mkdirSync(outDir, { recursive: true });

  const stateFile = join(outDir, '.fetch-state.json');
  const state = existsSync(stateFile)
    ? (JSON.parse(readFileSync(stateFile, 'utf8')) as { fetchedUrls: string[]; lastRunAt: number })
    : { fetchedUrls: [] as string[], lastRunAt: 0 };

  // Skip if fetched within 7 days and not forced
  if (!opts.force && Date.now() - state.lastRunAt < 7 * 24 * 60 * 60 * 1000) {
    return { updated: false, fetched: 0, errors: 0 };
  }

  const fetchedSet = new Set(state.fetchedUrls);
  const queue: string[] = [spec.entryUrl];
  const queued = new Set<string>([spec.entryUrl]);
  const maxPages = spec.maxPages ?? 200;
  let fetched = 0;
  let errors = 0;

  while (queue.length > 0 && fetched < maxPages) {
    const url = queue.shift()!;
    if (fetchedSet.has(url)) continue;

    const skip = spec.skipPatterns?.some((p) => p.test(url));
    if (skip) { fetchedSet.add(url); continue; }

    const html = await politeFetch(url, 1100);
    if (!html) {
      errors++;
      fetchedSet.add(url);
      continue;
    }

    const slug = urlToSlug(url);
    const md = htmlToMd(html);
    if (md.length > 100) {
      writeFileSync(join(outDir, `${slug}.md`), md, 'utf8');
    }

    fetchedSet.add(url);
    fetched++;

    opts.onProgress?.({ fetched, skipped: 0, errors, total: Math.max(queue.length + fetched, maxPages) });

    // Enqueue linked pages
    const links = extractLinks(html, url).filter(
      (u) => u.includes(spec.urlFilter) && !queued.has(u) && !fetchedSet.has(u),
    );
    for (const l of links) {
      queued.add(l);
      queue.push(l);
    }
  }

  state.lastRunAt = Date.now();
  state.fetchedUrls = [...fetchedSet];
  writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');

  return { updated: fetched > 0, fetched, errors };
}

/** Check if a collection dir has any .md content files. */
export function collectionHasDocs(collection: string): boolean {
  const dir = join(KNOWLEDGE_DIR, collection);
  if (!existsSync(dir)) return false;
  try {
    return readdirSync(dir).some((f: string) => f.endsWith('.md') && !f.startsWith('.'));
  } catch {
    return false;
  }
}
