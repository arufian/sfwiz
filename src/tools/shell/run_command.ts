import { z } from 'zod';
import { spawn } from 'child_process';
import type { Tool } from '~/tools/types';

const ALLOWED_COMMANDS = new Set([
  'sf', 'git', 'node', 'bun', 'npm', 'npx', 'pnpm', 'yarn',
  'rg', 'ripgrep', 'chokidar-cli', 'open',
]);

const MAX_OUTPUT_BYTES = 10 * 1024 * 1024;

export const runCommandTool: Tool = {
  name: 'run_command',
  description:
    'Execute a whitelisted shell command. Never passes raw user string to shell — always array args.',
  parameters: z.object({
    command: z.string().describe('The base command (must be in whitelist)'),
    args: z
      .union([
        z.array(z.string()),
        z.string().transform((s) => {
          // LLM sometimes passes args as a JSON-encoded string e.g. '["org","list"]'
          try {
            const parsed = JSON.parse(s);
            if (Array.isArray(parsed)) return parsed.filter((a): a is string => typeof a === 'string');
          } catch {}
          return s.split(/\s+/).filter(Boolean);
        }),
      ])
      .optional()
      .default([])
      .describe('Arguments as array of strings (no shell interpolation). String form or JSON-encoded array are both accepted.'),
    cwd: z.string().optional().describe('Working directory'),
    timeoutMs: z.coerce.number().int().min(1).max(300_000).optional().default(60_000),
  }),
  async execute({ command, args, cwd, timeoutMs }) {
    if (!ALLOWED_COMMANDS.has(command)) {
      throw new Error(
        `Command "${command}" is not in the whitelist. Allowed: ${[...ALLOWED_COMMANDS].join(', ')}`,
      );
    }
    return await new Promise<string>((resolve, reject) => {
      const child = spawn(command, args, {
        cwd,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env },
      });
      let stdout = '';
      let stderr = '';
      let bytes = 0;
      let timedOut = false;
      let killedForOverflow = false;

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGTERM');
      }, timeoutMs);

      child.stdout?.setEncoding('utf8');
      child.stderr?.setEncoding('utf8');
      child.stdout?.on('data', (chunk: string) => {
        bytes += Buffer.byteLength(chunk);
        if (bytes > MAX_OUTPUT_BYTES) {
          if (!killedForOverflow) {
            killedForOverflow = true;
            child.kill('SIGTERM');
          }
          return;
        }
        stdout += chunk;
      });
      child.stderr?.on('data', (chunk: string) => {
        bytes += Buffer.byteLength(chunk);
        if (bytes > MAX_OUTPUT_BYTES) {
          if (!killedForOverflow) {
            killedForOverflow = true;
            child.kill('SIGTERM');
          }
          return;
        }
        stderr += chunk;
      });

      // Decline any interactive "Did you mean…?" prompt and close stdin.
      // Without this, a typo'd sf subcommand blocks waiting for confirmation.
      try {
        child.stdin?.write('n\n');
        child.stdin?.end();
      } catch {
        // stdin may already be closed; ignore.
      }

      child.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
      child.on('close', (code) => {
        clearTimeout(timer);
        const output = stdout + (stderr ? `\n[stderr]\n${stderr}` : '');
        if (killedForOverflow) {
          reject(new Error(`Command produced more than ${MAX_OUTPUT_BYTES} bytes and was killed.`));
          return;
        }
        if (timedOut) {
          reject(new Error(`Command timed out after ${timeoutMs}ms:\n${output}`));
          return;
        }
        if (code !== 0) {
          const trimmed = output.trim();
          if (trimmed) {
            // Has output → partial success (e.g. sf org list with some expired orgs).
            // Resolve so agent sees the data; annotate with exit code.
            resolve(`${trimmed}\n[exit ${code ?? 'null'}]`);
          } else {
            reject(new Error(`Command failed (exit ${code ?? 'null'})`));
          }
          return;
        }
        resolve(output.trim());
      });
    });
  },
};
