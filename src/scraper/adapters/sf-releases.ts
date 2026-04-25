import { load } from 'cheerio';
import { htmlToMd } from '~/scraper/html-to-md';
import type { Adapter } from '~/scraper/types';

export const sfReleasesAdapter: Adapter = {
  name: 'sf-releases',
  baseUrl: 'https://help.salesforce.com/s/articleView',
  rateLimit: 1,

  shouldSkip(_url: string): boolean {
    return false;
  },

  async extract(html: string, url: string): Promise<{ title: string; markdown: string; url: string } | null> {
    const $ = load(html);
    const title = $('h1, .article-title, title').first().text().trim() || url;
    // Release note pages use .content-wrapper or article-body
    const md = htmlToMd(html, '.content-wrapper, .article-body, main, article');

    if (md.length < 50) return null;
    return { title, markdown: `# ${title}\n\n${md}`, url };
  },
};
