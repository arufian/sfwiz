import { spawn } from 'child_process';

interface RunSfOptions {
  cwd?: string;
  timeoutMs?: number;
  maxBufferBytes?: number;
}

/**
 * Async wrapper for `sf ... --json` commands.
 * Replaces spawnSync so the event loop stays unblocked during deploys,
 * test runs, and scratch-org creates (which can take 5-10 minutes).
 */
export async function runSfJson(args: string[], opts: RunSfOptions = {}): Promise<unknown> {
  const { cwd, timeoutMs = 120_000, maxBufferBytes = 10 * 1024 * 1024 } = opts;
  return new Promise((resolve, reject) => {
    const child = spawn('sf', args, {
      cwd,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let stdout = '';
    let stderr = '';
    let bytes = 0;
    let settled = false;
    let timedOut = false;

    const settle = (fn: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn();
    };

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGTERM');
    }, timeoutMs);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk: string) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes < maxBufferBytes) stdout += chunk;
    });
    child.stderr.on('data', (chunk: string) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes < maxBufferBytes) stderr += chunk;
    });
    child.on('error', (err) => settle(() => reject(err)));
    child.on('close', () =>
      settle(() => {
        if (timedOut) {
          reject(new Error(`sf command timed out after ${timeoutMs}ms`));
          return;
        }
        const raw = stdout.trim() || '{}';
        try {
          resolve(JSON.parse(raw));
        } catch {
          const hint = stderr ? `\nstderr: ${stderr.slice(0, 200)}` : '';
          reject(new Error(`sf returned invalid JSON: ${raw.slice(0, 200)}${hint}`));
        }
      }),
    );
  });
}
