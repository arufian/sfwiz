import { spawn } from 'node:child_process';
import { AuthInfo } from '@salesforce/core';
import { parseSfOrgList } from '~/sf/orgs';

export interface OrgEntry {
  alias: string | undefined;
  username: string;
  orgId: string;
  instanceUrl: string;
  isDefaultDevHub: boolean;
  isDefault: boolean;
  connectedStatus: string;
}

/** Async spawn `sf org list --json`, return raw stdout or null on failure. */
function runSfOrgList(timeoutMs = 30_000): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn('sf', ['org', 'list', '--json'], { env: process.env });
    let stdout = '';
    let settled = false;
    const finish = (val: string | null) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };
    child.stdout?.on('data', (d) => {
      stdout += String(d);
    });
    child.on('error', () => finish(null));
    child.on('close', (code) => finish(code === 0 || stdout.trim() ? stdout : null));
    setTimeout(() => {
      if (!settled) {
        try {
          child.kill('SIGKILL');
        } catch {}
        finish(null);
      }
    }, timeoutMs).unref?.();
  });
}

/**
 * List all locally authenticated orgs.
 *
 * Shells out to `sf org list --json` because `@salesforce/core`
 * `AuthInfo.listAllAuthorizations()` returned 0 entries on this machine
 * even when the CLI saw 20 — likely a config-store path mismatch
 * inside the bundled core. The CLI is the canonical source of truth for
 * `sf` credentials anyway, so we rely on it.
 */
export async function listOrgs(): Promise<OrgEntry[]> {
  const out = await runSfOrgList();
  if (!out) return [];
  return parseSfOrgList(out);
}

/** Get connection fields (instanceUrl + accessToken) for a username/alias. */
export async function getConnection(
  usernameOrAlias: string,
): Promise<{ instanceUrl: string; accessToken: string }> {
  const authInfo = await AuthInfo.create({ username: usernameOrAlias });
  const fields = authInfo.getFields(true);
  return {
    instanceUrl: fields.instanceUrl ?? '',
    accessToken: fields.accessToken ?? '',
  };
}
