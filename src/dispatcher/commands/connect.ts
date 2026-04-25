import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { spawnSync } from 'child_process';
import { listOrgs } from '~/sf/auth';
import { kickSfLoginWeb } from '~/sf/login-kick';
import type { ToolContext } from '~/tools/types';

/**
 * /connect — list authenticated SF orgs and let user select one to activate,
 * or add a new org via `sf login web`.
 * After selecting an org, sets it as the default and updates sfdx-project.json.
 */
export async function connectCommand(
  ctx: ToolContext,
  cwd: string,
): Promise<{ connected: boolean; alias: string | null }> {
  const orgs = await listOrgs().catch(() => [] as Awaited<ReturnType<typeof listOrgs>>);

  const options: { label: string; description: string }[] = orgs.map((o) => ({
    label: o.alias ?? o.username,
    description: `${o.username} · ${o.instanceUrl}${o.isDefault ? ' [current default]' : ''}`,
  }));
  options.push({ label: 'Add new org', description: 'Open browser to log in with sf login web' });
  options.push({ label: 'Cancel', description: 'Keep current selection' });

  const answer = await ctx.askUser({
    question: orgs.length
      ? `${orgs.length} authenticated org${orgs.length === 1 ? '' : 's'} found. Which one to use?`
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
      let resolved = false;
      const abort = kickSfLoginWeb({
        onLine: (line) => {
          if (line.includes('Successfully authorized')) {
            if (!resolved) { resolved = true; resolve(); abort(); }
          }
        },
        onDone: () => { if (!resolved) { resolved = true; resolve(); } },
      });
    });
    return { connected: true, alias: null };
  }

  // User picked an existing org — set as default + update sfdx-project.json
  const org = orgs.find((o) => (o.alias ?? o.username) === picked);
  if (!org) return { connected: false, alias: null };

  // Set as default org via sf config set
  spawnSync('sf', ['config', 'set', 'target-org', org.alias ?? org.username], {
    encoding: 'utf8',
    cwd,
  });

  // Update sfdx-project.json if it exists
  const projectFile = join(cwd, 'sfdx-project.json');
  if (existsSync(projectFile)) {
    try {
      const raw = readFileSync(projectFile, 'utf8');
      const project = JSON.parse(raw) as Record<string, unknown>;
      project.sfdcLoginUrl = org.instanceUrl;
      writeFileSync(projectFile, JSON.stringify(project, null, 2), 'utf8');
    } catch {
      // Non-fatal — proceed even if update fails
    }
  }

  return { connected: true, alias: org.alias ?? org.username };
}
