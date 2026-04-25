import type { ToolContext } from '~/tools/types';
import { listOrgsCli } from '~/sf/orgs';
import { kickSfLoginWeb } from '~/sf/login-kick';
import type { OrgEntry } from '~/sf/auth';

export interface OrgsCommandResult {
  orgs: OrgEntry[];
  kicked: boolean;
}

/**
 * /orgs command handler.
 * Lists authenticated orgs. If empty, asks user then kicks `sf login web`.
 */
export async function orgsCommand(ctx: ToolContext): Promise<OrgsCommandResult> {
  let orgs: OrgEntry[];
  try {
    orgs = listOrgsCli();
  } catch {
    orgs = [];
  }

  if (orgs.length > 0) {
    return { orgs, kicked: false };
  }

  const answer = await ctx.askUser({
    question: 'No Salesforce orgs authenticated. Open browser to log in with `sf login web`?',
    header: 'SF Login',
    options: [
      { label: 'Yes', description: 'Open browser to authenticate' },
      { label: 'No', description: 'Skip for now' },
    ],
    multiSelect: false,
  });

  if (answer.selected === 'Yes') {
    await loginAndWait();
    try {
      orgs = listOrgsCli();
    } catch {
      orgs = [];
    }
    return { orgs, kicked: true };
  }

  return { orgs: [], kicked: false };
}

function loginAndWait(): Promise<void> {
  return new Promise((resolve) => {
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
}
