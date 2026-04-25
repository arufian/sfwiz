import { spawnSync } from 'child_process';
import type { OrgEntry } from '~/sf/auth';

interface SfOrgListOutput {
  status: number;
  result: {
    nonScratchOrgs?: SfRawOrg[];
    scratchOrgs?: SfRawOrg[];
  };
}

interface SfRawOrg {
  alias?: string;
  username: string;
  orgId?: string;
  instanceUrl?: string;
  isDefaultDevHubUsername?: boolean;
  isDefaultUsername?: boolean;
  connectedStatus?: string;
  status?: string;
}

/** Parse output of `sf org list --json` into OrgEntry[]. */
export function parseSfOrgList(jsonOutput: string): OrgEntry[] {
  let parsed: SfOrgListOutput;
  try {
    parsed = JSON.parse(jsonOutput) as SfOrgListOutput;
  } catch {
    return [];
  }

  const { nonScratchOrgs = [], scratchOrgs = [] } = parsed.result ?? {};
  const all = [...nonScratchOrgs, ...scratchOrgs];

  return all.map((o) => ({
    alias: o.alias ?? undefined,
    username: o.username,
    orgId: o.orgId ?? '',
    instanceUrl: o.instanceUrl ?? '',
    isDefaultDevHub: o.isDefaultDevHubUsername ?? false,
    isDefault: o.isDefaultUsername ?? false,
    connectedStatus: o.connectedStatus ?? o.status ?? 'unknown',
  }));
}

/** Shell out to `sf org list --json` and return parsed orgs. Throws if sf not found. */
export function listOrgsCli(): OrgEntry[] {
  const result = spawnSync('sf', ['org', 'list', '--json'], { encoding: 'utf8' });
  if (result.error) throw result.error;
  return parseSfOrgList(result.stdout ?? '');
}
