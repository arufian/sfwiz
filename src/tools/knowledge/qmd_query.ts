import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool } from '~/tools/types';

const Params = z.object({
  query: z.string().min(1).describe('Natural-language query or structured lex:/vec: query document'),
  collection: z.enum(['apex-ref', 'lwc-guide', 'sf-releases']).optional().describe('Restrict search to one collection'),
  topK: z.number().int().min(1).max(20).default(5),
  mode: z.enum(['query', 'search', 'vsearch']).default('search').describe('search=BM25 (fast), vsearch=vector, query=hybrid+LLM'),
});

export const qmdQuery: Tool<typeof Params> = {
  name: 'qmd_query',
  description: 'Search the sfwiz knowledge base (Apex ref, LWC guide, SF release notes) using qmd.',
  parameters: Params,
  async execute(args) {
    const extraArgs: string[] = ['--top-k', String(args.topK)];
    if (args.collection) extraArgs.push('--collection', args.collection);

    const r = spawnSync('qmd', [args.mode, args.query, ...extraArgs], {
      encoding: 'utf8',
      maxBuffer: 2 * 1024 * 1024,
      timeout: 30_000,
    });

    if (r.error) throw r.error;
    if (r.status !== 0) throw new Error(`qmd exited ${r.status}: ${r.stderr?.slice(0, 300)}`);

    return { output: r.stdout, collection: args.collection ?? 'all', query: args.query };
  },
};
