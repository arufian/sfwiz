import { spawnSync } from 'child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
} from 'fs';
import { tmpdir } from 'os';
import { basename, join } from 'path';

export interface InitProjectResult {
  ok: boolean;
  message: string;
  created: string[];
}

/**
 * Initialize an SFDX project in `cwd` via the official `sf project generate`
 * CLI. Generates into a temp dir, then merges files into `cwd` (skipping any
 * already-existing files so we never overwrite user content).
 */
export function initProject(cwd: string): InitProjectResult {
  if (existsSync(join(cwd, 'sfdx-project.json'))) {
    return {
      ok: false,
      message: 'sfdx-project.json already exists in this directory.',
      created: [],
    };
  }

  const name = basename(cwd) || 'sfwiz-project';
  const tmp = mkdtempSync(join(tmpdir(), 'sfwiz-init-'));

  let result: InitProjectResult;
  try {
    const proc = spawnSync(
      'sf',
      ['project', 'generate', '--name', name, '--output-dir', tmp, '--manifest'],
      { encoding: 'utf8' },
    );
    if (proc.status !== 0) {
      const stderr = (proc.stderr || '').trim();
      const stdout = (proc.stdout || '').trim();
      const detail = stderr || stdout || `exit ${proc.status}`;
      return {
        ok: false,
        message: `sf project generate failed: ${detail}`,
        created: [],
      };
    }

    const generatedRoot = join(tmp, name);
    if (!existsSync(generatedRoot)) {
      return {
        ok: false,
        message: `sf project generate ran but did not produce ${generatedRoot}`,
        created: [],
      };
    }

    const created: string[] = [];
    for (const entry of readdirSync(generatedRoot)) {
      const src = join(generatedRoot, entry);
      const dst = join(cwd, entry);
      if (existsSync(dst)) continue;
      cpSync(src, dst, { recursive: true });
      created.push(entry);
    }

    result = {
      ok: true,
      message:
        created.length > 0
          ? `Initialized via sf project generate: ${created.join(', ')}`
          : 'sf project generate produced no new files (target already populated).',
      created,
    };
  } finally {
    try {
      rmSync(tmp, { recursive: true, force: true });
    } catch {}
  }
  return result;
}
