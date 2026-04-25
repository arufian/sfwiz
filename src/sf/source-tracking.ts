import { spawnSync } from 'child_process';

export type FileStatus = 'changed' | 'new' | 'deleted' | 'unchanged' | 'ignored' | 'conflict' | 'unknown';

export interface TrackedFile {
  path: string;
  status: FileStatus;
  type: string;
}

/** Run `sf project deploy preview --json` and parse result. Returns [] on error. */
export function getSourceTrackingStatus(projectRoot: string, targetOrg: string): TrackedFile[] {
  const result = spawnSync(
    'sf',
    ['project', 'deploy', 'preview', '--target-org', targetOrg, '--json'],
    { cwd: projectRoot, encoding: 'utf8' },
  );
  if (result.error || result.status !== 0) return [];

  try {
    const parsed = JSON.parse(result.stdout ?? '') as {
      result?: { toDeploy?: { path: string; type: string; operation: string }[] };
    };
    return (parsed.result?.toDeploy ?? []).map((f) => ({
      path: f.path,
      status: operationToStatus(f.operation),
      type: f.type,
    }));
  } catch {
    return [];
  }
}

function operationToStatus(op: string): FileStatus {
  switch (op.toLowerCase()) {
    case 'deploy': return 'changed';
    case 'add': return 'new';
    case 'delete': return 'deleted';
    default: return 'unknown';
  }
}
