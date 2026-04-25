import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool } from '~/tools/types';

const ALLOWED_COMMANDS = new Set([
  'sf', 'git', 'node', 'bun', 'npm', 'npx', 'pnpm', 'yarn',
  'rg', 'ripgrep', 'chokidar-cli', 'open',
]);

export const runCommandTool: Tool = {
  name: 'run_command',
  description:
    'Execute a whitelisted shell command. Never passes raw user string to shell — always array args.',
  parameters: z.object({
    command: z.string().describe('The base command (must be in whitelist)'),
    args: z.array(z.string()).default([]).describe('Arguments as array (no shell interpolation)'),
    cwd: z.string().optional().describe('Working directory'),
    timeoutMs: z.number().int().min(1).max(300_000).default(60_000),
  }),
  async execute({ command, args, cwd, timeoutMs }) {
    if (!ALLOWED_COMMANDS.has(command)) {
      throw new Error(
        `Command "${command}" is not in the whitelist. Allowed: ${[...ALLOWED_COMMANDS].join(', ')}`,
      );
    }
    const result = spawnSync(command, args, {
      encoding: 'utf8',
      cwd,
      timeout: timeoutMs,
      maxBuffer: 10 * 1024 * 1024,
    });
    if (result.error) throw result.error;
    const output = (result.stdout ?? '') + (result.stderr ? `\n[stderr]\n${result.stderr}` : '');
    if (result.status !== 0) {
      throw new Error(`Command failed (exit ${result.status ?? 'null'}):\n${output}`);
    }
    return output.trim();
  },
};
