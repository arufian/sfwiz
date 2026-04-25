/**
 * One-off: fetch jsforce v3 docs into src/resources/knowledge/jsforce/.
 * jsforce v3 docs are single-page; we grab /document/ + /start/ + /download/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { htmlToMd } from '~/scraper/html-to-md';

const OUT_DIR = join(import.meta.dir, '..', 'src', 'resources', 'knowledge', 'jsforce');

const PAGES: { url: string; slug: string; title: string; selector?: string }[] = [
  {
    url: 'https://jsforce.github.io/document/',
    slug: 'document',
    title: 'JSforce Document (v3)',
    selector: '.container .content, .container, main, body',
  },
  {
    url: 'https://jsforce.github.io/start/',
    slug: 'start',
    title: 'JSforce Getting Started',
    selector: '.container .content, .container, main, body',
  },
  {
    url: 'https://jsforce.github.io/download/',
    slug: 'download',
    title: 'JSforce Download',
    selector: '.container .content, .container, main, body',
  },
];

async function fetchOne(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'sfwiz-fetch/0.1 (offline-bundle)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.error(`[fetch-fail ${res.status}] ${url}`);
      return null;
    }
    return await res.text();
  } catch (e) {
    console.error(`[fetch-err] ${url}: ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let ok = 0;
  let fail = 0;

  for (const page of PAGES) {
    process.stdout.write(`fetching ${page.url} ... `);
    const html = await fetchOne(page.url);
    if (!html) {
      fail++;
      console.log('FAIL');
      continue;
    }

    const md = htmlToMd(html, page.selector ?? 'main, article, .content, body');
    if (md.length < 200) {
      console.log(`SKIP (${md.length} bytes — too short)`);
      fail++;
      continue;
    }

    const out = `# ${page.title}\n\nSource: ${page.url}\n\n${md}\n`;
    writeFileSync(join(OUT_DIR, `${page.slug}.md`), out, 'utf8');
    ok++;
    console.log(`OK (${(md.length / 1024).toFixed(1)} KB)`);

    // polite 1 rps
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\nDone. ${ok} ok / ${fail} fail. Output: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
