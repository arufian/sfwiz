import { spawnSync } from 'child_process';

export interface QmdInfo {
  binPath: string;
  version: string;
}

/** Find qmd binary. Checks PATH then common npm global locations. */
export function detectQmd(): QmdInfo | null {
  const candidates = ['qmd', ...(process.env.PATH?.split(':').map((p) => `${p}/qmd`) ?? [])];

  for (const bin of candidates) {
    const r = spawnSync(bin, ['--version'], { encoding: 'utf8', timeout: 5_000 });
    if (!r.error && r.status === 0) {
      const version = r.stdout.trim().replace(/^qmd\s+/, '');
      return { binPath: bin, version };
    }
  }
  return null;
}

export function requireQmd(): QmdInfo {
  const info = detectQmd();
  if (!info) throw new Error('qmd not found. Run /knowledge install to set it up.');
  return info;
}
