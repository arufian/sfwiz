import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool } from '~/tools/types';

export const grepTool: Tool = {
  name: 'grep',
  description: 'Search for a pattern in files using ripgrep (rg). Returns matching lines.',
  parameters: z.object({
    pattern: z.string().describe('Regex pattern to search for'),
    path: z.string().describe('Directory or file to search'),
    fileGlob: z.string().optional().describe('File glob filter, e.g. "*.ts"'),
    ignoreCase: z.boolean().default(false),
    maxResults: z.number().int().min(1).max(500).default(100),
  }),
  async execute({ pattern, path, fileGlob, ignoreCase, maxResults }) {
    const args = ['--line-number', '--no-heading', `--max-count=${maxResults}`];
    if (ignoreCase) args.push('--ignore-case');
    if (fileGlob) args.push('--glob', fileGlob);
    args.push(pattern, path);

    const result = spawnSync('rg', args, { encoding: 'utf8', maxBuffer: 2 * 1024 * 1024 });
    if (result.error) throw result.error;
    return result.stdout || '(no matches)';
  },
};
