import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

const Params = z.object({
  name: z.string().describe('Permission set API name'),
  targetOrg: z.string().optional(),
  onBehalfOf: z.string().optional().describe('Comma-separated usernames to assign to'),
});

export const sfAssignPermset: Tool<typeof Params> = {
  name: 'sf_assign_permset',
  description: 'Assign a permission set to users using `sf org assign permset`. DESTRUCTIVE — modifies org permissions.',
  parameters: Params,
  requiresUserConfirmation: { within: 3, ref: 'sf_assign_permset' },
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org.');

    const extra: string[] = [];
    if (args.onBehalfOf) extra.push('--on-behalf-of', args.onBehalfOf);

    const result = spawnSync(
      'sf',
      ['org', 'assign', 'permset', '--name', args.name, '--target-org', org, '--json', ...extra],
      { cwd: ctx.session.projectRoot, encoding: 'utf8', maxBuffer: 1024 * 1024 },
    );
    if (result.error) throw result.error;
    return JSON.parse(result.stdout || '{}') as unknown;
  },
};
