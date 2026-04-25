import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';
import { kickSfLoginWeb } from '~/sf/login-kick';
import type { ToolContext } from '~/tools/types';

interface SfOrg {
  alias?: string;
  username: string;
  instanceUrl: string;
  connectedStatus?: string;
  isDefaultUsername?: boolean;
}

interface SfOrgListResult {
  nonScratchOrgs?: SfOrg[];
  scratchOrgs?: SfOrg[];
}

/** Run `sf org list --json` and return all orgs (scratch + non-scratch). */
function sfOrgList(): SfOrg[] {
  const r = spawnSync('sf', ['org', 'list', '--json'], {
    encoding: 'utf8',
    timeout: 30_000,
  });
  if (r.error || !r.stdout) return [];
  try {
    const parsed = JSON.parse(r.stdout) as { result?: SfOrgListResult };
    const result = parsed.result ?? {};
    return [
      ...(result.nonScratchOrgs ?? []),
      ...(result.scratchOrgs ?? []),
    ];
  } catch {
    return [];
  }
}

/**
 * Run `sf org display --target-org <alias> --json` and extract the instance URL.
 * Returns null if the command fails.
 */
function sfOrgDisplay(target: string): string | null {
  const r = spawnSync('sf', ['org', 'display', '--target-org', target, '--json'], {
    encoding: 'utf8',
    timeout: 30_000,
  });
  if (r.error || !r.stdout) return null;
  try {
    const parsed = JSON.parse(r.stdout) as { result?: { instanceUrl?: string } };
    return parsed.result?.instanceUrl ?? null;
  } catch {
    return null;
  }
}

/**
 * /connect — list authenticated SF orgs via `sf org list`, show selectable
 * modal, then set selected org as default and write sfdx-project.json.
 */
export async function connectCommand(
  ctx: ToolContext,
  cwd: string,
): Promise<{ connected: boolean; alias: string | null }> {
  // Run `sf org list` and wait for output
  const orgs = sfOrgList();

  const options: { label: string; description: string }[] = orgs.map((o) => {
    const label = o.alias ?? o.username;
    const status = o.connectedStatus === 'Connected' ? '✓' : o.connectedStatus ?? '?';
    const isDefault = o.isDefaultUsername ? ' [default]' : '';
    return {
      label,
      description: `${o.username}${isDefault} · ${status}`,
    };
  });
  options.push({ label: 'Add new org', description: 'Open browser — sf login web' });
  options.push({ label: 'Cancel', description: '' });

  const answer = await ctx.askUser({
    question: orgs.length
      ? `${orgs.length} org${orgs.length === 1 ? '' : 's'} found — select one to connect`
      : 'No orgs authenticated. Add one now?',
    header: '/connect',
    options,
    multiSelect: false,
  });

  const picked = Array.isArray(answer.selected) ? answer.selected[0] : answer.selected;
  if (!picked || picked === 'Cancel' || answer.cancelled) {
    return { connected: false, alias: null };
  }

  if (picked === 'Add new org') {
    await new Promise<void>((resolve) => {
      let done = false;
      const abort = kickSfLoginWeb({
        onLine: (line) => {
          if (line.includes('Successfully authorized') && !done) {
            done = true;
            resolve();
            abort();
          }
        },
        onDone: () => { if (!done) { done = true; resolve(); } },
      });
    });
    return { connected: true, alias: null };
  }

  // Get the org's domain via `sf org display`
  const instanceUrl = sfOrgDisplay(picked);
  if (!instanceUrl) {
    return { connected: false, alias: null };
  }

  // Extract domain from instanceUrl (e.g. https://foo.my.salesforce.com → foo.my.salesforce.com)
  let domain: string;
  try {
    domain = new URL(instanceUrl).hostname;
  } catch {
    domain = instanceUrl;
  }

  // Write / update sfdx-project.json in cwd
  const projectFile = join(cwd, 'sfdx-project.json');
  let project: Record<string, unknown> = {};
  if (existsSync(projectFile)) {
    try {
      project = JSON.parse(readFileSync(projectFile, 'utf8')) as Record<string, unknown>;
    } catch {}
  }
  project.sfdcLoginUrl = `https://${domain}`;
  writeFileSync(projectFile, JSON.stringify(project, null, 2) + '\n', 'utf8');

  // Also set as default org in sf CLI config
  spawnSync('sf', ['config', 'set', 'target-org', picked], {
    encoding: 'utf8',
    cwd,
  });

  return { connected: true, alias: picked };
}
