import { z } from 'zod';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import type { Tool } from '~/tools/types';

export const writeFileTool: Tool = {
  name: 'write_file',
  description: 'Write content to a file. Creates parent directories as needed. Overwrites if exists.',
  parameters: z.object({
    path: z.string(),
    content: z.string(),
  }),
  async execute({ path, content }) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, 'utf8');
    return `Wrote ${path}`;
  },
};
