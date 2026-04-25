import { spawn } from 'child_process';

export interface LoginKickOptions {
  onLine?: (line: string) => void;
  onDone?: (code: number | null) => void;
}

/**
 * Spawn `sf login web` non-interactively.
 * Calls onLine for each stdout line (browser URL appears here).
 * Calls onDone when process exits.
 * Returns abort function.
 */
export function kickSfLoginWeb(opts: LoginKickOptions = {}): () => void {
  const proc = spawn('sf', ['login', 'web'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  let done = false;
  const finish = (code: number | null) => {
    if (!done) { done = true; opts.onDone?.(code); }
  };

  const handleData = (chunk: Buffer) => {
    const lines = chunk.toString('utf8').split('\n').filter(Boolean);
    for (const line of lines) opts.onLine?.(line);
  };

  proc.stdout.on('data', handleData);
  proc.stderr.on('data', handleData);
  proc.on('error', () => finish(null));
  proc.on('close', finish);

  return () => proc.kill('SIGTERM');
}
