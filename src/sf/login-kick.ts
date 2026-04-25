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
  const proc = spawn('sf', ['login', 'web', '--json'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const handleData = (chunk: Buffer) => {
    const lines = chunk.toString('utf8').split('\n').filter(Boolean);
    for (const line of lines) opts.onLine?.(line);
  };

  proc.stdout.on('data', handleData);
  proc.stderr.on('data', handleData);
  proc.on('close', (code) => opts.onDone?.(code));

  return () => proc.kill('SIGTERM');
}
