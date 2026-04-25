import { load } from 'cheerio';
import TurndownService from 'turndown';

const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  fence: '```',
});

td.addRule('removeScript', {
  filter: ['script', 'style', 'noscript'],
  replacement: () => '',
});

td.addRule('preserveCodeBlocks', {
  filter: (node) => node.nodeName === 'CODE' && node.parentNode?.nodeName === 'PRE',
  replacement: (content, node, opts) => {
    const lang = (node as Element).getAttribute?.('class')?.match(/language-(\w+)/)?.[1] ?? '';
    return `${opts.fence}${lang}\n${content.trim()}\n${opts.fence}\n\n`;
  },
});

/** Convert an HTML string to Markdown. Removes nav/header/footer/ads. */
export function htmlToMd(html: string, mainSelector = 'main, article, .content, body'): string {
  const $ = load(html);

  // Remove noise
  $('nav, header, footer, .nav, .header, .footer, .sidebar, .ads, .cookie-banner, script, style').remove();

  const mainEl = $(mainSelector).first();
  const content = mainEl.length ? mainEl.html() ?? '' : $.html();

  return td.turndown(content).replace(/\n{3,}/g, '\n\n').trim();
}
