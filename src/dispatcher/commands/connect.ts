import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';
import { kickSfLoginWeb } from '~/sf/login-kick';
import type { ToolContext } from '~/tools/types';

interface SfOrg {
  alias?: string;
  username: string;
  instanceUrl?: string;
  connectedStatus?: string;
  isDefaultUsername?: boolean;
}

interface SfOrgListResult {
  nonScratchOrgs?: SfOrg[];
  scratchOrgs?: SfOrg[];
}

export interface ConnectResult {
  connected: boolean;
  alias: string | null;
  username?: string;
  instanceUrl?: string;
}

export type ConnectPhase = 'fetching-orgs' | 'connecting' | 'logging-in' | 'idle';

/** Async shell-out, no event-loop block. Resolves with stdout or null on failure. */
function runJson(cmd: string, args: string[], opts: { cwd?: string; timeoutMs?: number } = {}): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd: opts.cwd, env: process.env });
    let stdout = '';
    let stderr = '';
    let settled = false;
    const finish = (val: string | null) => {
      if (settled) return;
      settled = true;
      resolve(val);
    };
    child.stdout?.on('data', (d) => { stdout += String(d); });
    child.stderr?.on('data', (d) => { stderr += String(d); });
    child.on('error', () => finish(null));
    child.on('close', (code) => {
      if (code === 0 || stdout.trim().length > 0) finish(stdout);
      else { void stderr; finish(null); }
    });
    if (opts.timeoutMs) {
      setTimeout(() => {
        if (!settled) { try { child.kill('SIGKILL'); } catch {} finish(null); }
      }, opts.timeoutMs).unref?.();
    }
  });
}

/** Run `sf org list --json` (async) and return Connected orgs only. */
async function sfOrgListConnected(): Promise<SfOrg[]> {
  const out = await runJson('sf', ['org', 'list', '--json'], { timeoutMs: 30_000 });
  if (!out) return [];
  try {
    const parsed = JSON.parse(out) as { result?: SfOrgListResult };
    const result = parsed.result ?? {};
    const all = [...(result.nonScratchOrgs ?? []), ...(result.scratchOrgs ?? [])];
    return all.filter((o) => o.connectedStatus === 'Connected');
  } catch {
    return [];
  }
}

/**
 * /connect — list authenticated SF orgs via `sf org list`, show selectable
 * modal, then set selected org as default and write sfdx-project.json.
 */
export async function connectCommand(
  ctx: ToolContext,
  cwd: string,
  onPhase: (p: ConnectPhase) => void = () => {},
): Promise<ConnectResult> {
  onPhase('fetching-orgs');
  const orgs = await sfOrgListConnected();
  onPhase('idle');

  const options: { label: string; description: string }[] = orgs.map((o) => {
    const label = o.alias ?? o.username;
    const isDefault = o.isDefaultUsername ? ' [default]' : '';
    return { label, description: `${o.username}${isDefault}` };
  });
  options.push({ label: 'Add new org', description: 'Open browser — sf login web' });
  options.push({ label: 'Cancel', description: '' });

  const answer = await ctx.askUser({
    question: orgs.length
      ? `${orgs.length} connected org${orgs.length === 1 ? '' : 's'} — select one`
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
    onPhase('logging-in');
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
    onPhase('idle');
    return { connected: true, alias: null };
  }

  onPhase('connecting');

  // Use instanceUrl from `sf org list` directly — no extra `sf org display` round trip.
  const orgEntry = orgs.find((o) => (o.alias ?? o.username) === picked);
  const instanceUrl = orgEntry?.instanceUrl ?? '';

  if (instanceUrl) {
    let domain: string;
    try {
      domain = new URL(instanceUrl).hostname;
    } catch {
      domain = instanceUrl;
    }
    const projectFile = join(cwd, 'sfdx-project.json');
    let project: Record<string, unknown> = {};
    if (existsSync(projectFile)) {
      try {
        project = JSON.parse(readFileSync(projectFile, 'utf8')) as Record<string, unknown>;
      } catch {}
    }
    project.sfdcLoginUrl = `https://${domain}`;
    writeFileSync(projectFile, JSON.stringify(project, null, 2) + '\n', 'utf8');
  }

  // Set as default org in sf CLI config — async, don't block the loop.
  await runJson('sf', ['config', 'set', `target-org=${picked}`], { cwd, timeoutMs: 15_000 });
  onPhase('idle');

  return {
    connected: true,
    alias: orgEntry?.alias ?? picked,
    username: orgEntry?.username,
    instanceUrl,
  };
}
