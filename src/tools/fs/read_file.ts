import { z } from 'zod';
import { readFileSync } from 'fs';
import type { Tool } from '~/tools/types';

export const readFileTool: Tool = {
  name: 'read_file',
  description: 'Read the contents of a file. Path must be absolute or relative to cwd.',
  parameters: z.object({
    path: z.string().describe('Absolute or relative file path'),
    startLine: z.number().int().min(1).optional().describe('Start reading from this line (1-indexed)'),
    endLine: z.number().int().min(1).optional().describe('Stop at this line (inclusive)'),
  }),
  async execute({ path, startLine, endLine }) {
    const raw = readFileSync(path, 'utf8');
    if (startLine === undefined && endLine === undefined) return raw;
    const lines = raw.split('\n');
    const start = (startLine ?? 1) - 1;
    const end = endLine ?? lines.length;
    return lines.slice(start, end).join('\n');
  },
};
