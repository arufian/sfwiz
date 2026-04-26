import { spawn } from 'node:child_process';
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

/** Async spawn an sf command, return raw stdout or null on failure. */
function runSfCmd(args: string[], timeoutMs = 30_000): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn('sf', args, { env: process.env });
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
        try { child.kill('SIGKILL'); } catch {}
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
  const out = await runSfCmd(['org', 'list', '--json']);
  if (!out) return [];
  return parseSfOrgList(out);
}

/**
 * Get connection fields (instanceUrl + accessToken) for a username/alias.
 *
 * Uses `sf org display --json` instead of `@salesforce/core` AuthInfo.create
 * because AuthInfo has a config-store path mismatch in the bundled binary
 * (same issue as AuthInfo.listAllAuthorizations — see listOrgs comment above).
 */
export async function getConnection(
  usernameOrAlias: string,
): Promise<{ instanceUrl: string; accessToken: string }> {
  const out = await runSfCmd(['org', 'display', '--target-org', usernameOrAlias, '--json']);
  if (!out) throw new Error(`sf org display failed for "${usernameOrAlias}"`);

  let parsed: { result?: { instanceUrl?: string; accessToken?: string } };
  try {
    parsed = JSON.parse(out) as typeof parsed;
  } catch {
    throw new Error(`sf org display returned invalid JSON for "${usernameOrAlias}"`);
  }

  const instanceUrl = parsed.result?.instanceUrl ?? '';
  const accessToken = parsed.result?.accessToken ?? '';
  if (!accessToken) throw new Error(`No access token for "${usernameOrAlias}". Re-authenticate with sf login web.`);

  return { instanceUrl, accessToken };
}
