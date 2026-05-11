import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

const Params = z.object({
  targetOrg: z.string().optional(),
  testLevel: z.enum(['NoTestRun', 'RunLocalTests', 'RunAllTestsInOrg']).default('RunLocalTests'),
  dryRun: z.boolean().default(false).describe('If true, run validate-only (no commit).'),
});

export const sfDeployStart: Tool<typeof Params> = {
  name: 'sf_deploy_start',
  description: 'Deploy source to a Salesforce org using `sf project deploy start`. DESTRUCTIVE — commits changes.',
  parameters: Params,
  requiresUserConfirmation: { within: 3, ref: 'sf_deploy_start' },
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org.');

    const cmd = args.dryRun ? 'validate' : 'start';
    return runSfJson(
      ['project', 'deploy', cmd, '--target-org', org, '--test-level', args.testLevel, '--json'],
      { cwd: ctx.session.projectRoot, timeoutMs: 300_000 },
    );
  },
};
