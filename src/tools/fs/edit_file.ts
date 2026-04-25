import { z } from 'zod';
import { readFileSync, writeFileSync } from 'fs';
import type { Tool } from '~/tools/types';

export const editFileTool: Tool = {
  name: 'edit_file',
  description:
    'Replace an exact string in a file. The old_string must appear exactly once. ' +
    'Use read_file first to get current content.',
  parameters: z.object({
    path: z.string(),
    old_string: z.string().min(1),
    new_string: z.string(),
  }),
  async execute({ path, old_string, new_string }) {
    const content = readFileSync(path, 'utf8');
    const count = content.split(old_string).length - 1;
    if (count === 0) throw new Error(`old_string not found in ${path}`);
    if (count > 1) throw new Error(`old_string is ambiguous (appears ${count} times) in ${path}`);
    writeFileSync(path, content.replace(old_string, new_string), 'utf8');
    return `Edited ${path}`;
  },
};
