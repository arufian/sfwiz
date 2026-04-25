import { load } from 'cheerio';
import { htmlToMd } from '~/scraper/html-to-md';
import type { Adapter } from '~/scraper/types';

/** Scrape Apex Developer Reference. Omits ConnectApi namespace. */
export const apexRefAdapter: Adapter = {
  name: 'apex-ref',
  baseUrl: 'https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/',
  rateLimit: 1,

  shouldSkip(url: string): boolean {
    return url.includes('ConnectApi');
  },

  async extract(html: string, url: string): Promise<{ title: string; markdown: string; url: string } | null> {
    if (this.shouldSkip(url)) return null;

    const $ = load(html);
    const title = $('h1, .article-title, title').first().text().trim() || url;
    const md = htmlToMd(html, '.article-body, main, article');

    if (md.length < 50) return null;
    return { title, markdown: `# ${title}\n\n${md}`, url };
  },
};
