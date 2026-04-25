import { z } from 'zod';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import type { Tool } from '~/tools/types';

export const listFilesTool: Tool = {
  name: 'list_files',
  description: 'List files and directories in a path. Optionally recursive.',
  parameters: z.object({
    path: z.string().describe('Directory path to list'),
    recursive: z.boolean().default(false),
    pattern: z.string().optional().describe('Glob-like extension filter, e.g. ".ts"'),
  }),
  async execute({ path, recursive, pattern }) {
    return listDir(resolve(path), recursive, pattern);
  },
};

function listDir(dir: string, recursive: boolean, pattern?: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const results: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (pattern && !entry.name.endsWith(pattern)) {
      if (!entry.isDirectory()) continue;
    }
    results.push(full);
    if (recursive && entry.isDirectory()) {
      results.push(...listDir(full, true, pattern));
    }
  }
  return results;
}
