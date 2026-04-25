import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';

export interface SfProject {
  root: string;
  packageDirectories: string[];
  namespace: string;
  sourceApiVersion: string;
}

/** Walk up from cwd to find sfdx-project.json. Returns null if not found. */
export function findSfProject(cwd: string): SfProject | null {
  let dir = cwd;
  for (let i = 0; i < 20; i++) {
    const candidate = join(dir, 'sfdx-project.json');
    if (existsSync(candidate)) {
      try {
        const raw = JSON.parse(readFileSync(candidate, 'utf8')) as {
          packageDirectories?: { path: string }[];
          namespace?: string;
          sourceApiVersion?: string;
        };
        return {
          root: dir,
          packageDirectories: (raw.packageDirectories ?? []).map((d) => d.path),
          namespace: raw.namespace ?? '',
          sourceApiVersion: raw.sourceApiVersion ?? '60.0',
        };
      } catch {
        return null;
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}
