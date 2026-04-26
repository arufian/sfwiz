import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';

export interface SfProject {
  root: string;
  packageDirectories: string[];
  namespace: string;
  sourceApiVersion: string;
}

/**
 * Read the default org alias/username from SF project config files.
 * Checks (in order): project .sf/config.json, project .sfdx/sfdx-config.json,
 * global ~/.sf/config.json, global ~/.sfdx/sfdx-config.json.
 */
export function resolveDefaultOrg(cwd: string): string | null {
  const candidates: { file: string; key: string }[] = [
    { file: join(cwd, '.sf', 'config.json'), key: 'target-org' },
    { file: join(cwd, '.sfdx', 'sfdx-config.json'), key: 'defaultusername' },
    { file: join(homedir(), '.sf', 'config.json'), key: 'target-org' },
    { file: join(homedir(), '.sfdx', 'sfdx-config.json'), key: 'defaultusername' },
  ];
  for (const { file, key } of candidates) {
    if (!existsSync(file)) continue;
    try {
      const raw = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
      if (typeof raw[key] === 'string' && raw[key]) return raw[key] as string;
    } catch {}
  }
  return null;
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
