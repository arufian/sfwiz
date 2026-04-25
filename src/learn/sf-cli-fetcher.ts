/**
 * Fetches the Salesforce unified SF CLI reference and converts it to markdown files
 * suitable for qmd embedding. Writes to ~/.sfwiz/knowledge/sf-cli-ref/
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { KNOWLEDGE_DIR } from '~/knowledge/collections';

const SF_CLI_REF_URL =
  'https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_unified.htm';

const CACHE_FILE = join(KNOWLEDGE_DIR, 'sf-cli-ref', '.cache.json');
const OUT_DIR = join(KNOWLEDGE_DIR, 'sf-cli-ref');

interface CacheState {
  etag?: string;
  lastModified?: string;
  fetchedAt?: number;
}

function loadCache(): CacheState {
  try {
    return JSON.parse(readFileSync(CACHE_FILE, 'utf8')) as CacheState;
  } catch {
    return {};
  }
}

function saveCache(state: CacheState) {
  writeFileSync(CACHE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

/** Naive HTML → plain text converter for CLI reference pages. */
function htmlToMarkdown(html: string): string {
  return html
    // Strip <script> and <style> blocks
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    // Headers
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level, content) => {
      const text = content.replace(/<[^>]+>/g, '').trim();
      return `\n${'#'.repeat(Number(level))} ${text}\n`;
    })
    // Code blocks
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, content) => {
      const text = content.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
      return `\n\`\`\`\n${text.trim()}\n\`\`\`\n`;
    })
    // Inline code
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, content) => `\`${content.replace(/<[^>]+>/g, '').trim()}\``)
    // Bold
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, (_, _t, c) => `**${c.replace(/<[^>]+>/g, '').trim()}**`)
    // List items
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, content) => `- ${content.replace(/<[^>]+>/g, '').trim()}`)
    // Paragraphs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => `\n${content.replace(/<[^>]+>/g, '').trim()}\n`)
    // Table rows → pipe-separated
    .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_, content) => {
      const cells = [...content.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(
        (m: RegExpMatchArray) => m[1]?.replace(/<[^>]+>/g, '').trim() ?? '',
      );
      return `| ${cells.join(' | ')} |\n`;
    })
    // Strip remaining tags
    .replace(/<[^>]+>/g, '')
    // HTML entities
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    // Collapse excess blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function fetchSfCliRef(force = false): Promise<{ updated: boolean; error?: string }> {
  mkdirSync(OUT_DIR, { recursive: true });
  const cache = loadCache();

  // Skip if fetched within last 7 days (unless forced)
  if (!force && cache.fetchedAt && Date.now() - cache.fetchedAt < 7 * 24 * 60 * 60 * 1000) {
    return { updated: false };
  }

  const headers: Record<string, string> = {
    'User-Agent': 'sfwiz-learn/0.1 (educational use)',
    Accept: 'text/html',
  };
  if (cache.etag) headers['If-None-Match'] = cache.etag;
  if (cache.lastModified) headers['If-Modified-Since'] = cache.lastModified;

  let res: Response;
  try {
    res = await fetch(SF_CLI_REF_URL, { headers });
  } catch (err) {
    return { updated: false, error: String(err) };
  }

  if (res.status === 304) {
    saveCache({ ...cache, fetchedAt: Date.now() });
    return { updated: false };
  }
  if (!res.ok) {
    return { updated: false, error: `HTTP ${res.status}` };
  }

  const newCache: CacheState = {
    etag: res.headers.get('ETag') ?? undefined,
    lastModified: res.headers.get('Last-Modified') ?? undefined,
    fetchedAt: Date.now(),
  };

  const html = await res.text();
  const markdown = htmlToMarkdown(html);

  // Write main reference file
  writeFileSync(join(OUT_DIR, 'sf-cli-reference.md'), `# Salesforce CLI (sf) Unified Command Reference\n\nSource: ${SF_CLI_REF_URL}\n\n${markdown}`, 'utf8');

  // Also write a small index file for quick lookup
  const commandPattern = /^##\s+(sf\s+\S+)/gm;
  const commands: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = commandPattern.exec(markdown)) !== null) {
    if (m[1]) commands.push(m[1].trim());
  }
  if (commands.length > 0) {
    writeFileSync(
      join(OUT_DIR, 'sf-cli-index.md'),
      `# SF CLI Command Index\n\n${commands.map((c) => `- \`${c}\``).join('\n')}\n`,
      'utf8',
    );
  }

  saveCache(newCache);
  return { updated: true };
}

/** Check whether sf-cli-ref has been fetched at least once. */
export function sfCliRefExists(): boolean {
  return existsSync(join(OUT_DIR, 'sf-cli-reference.md'));
}
