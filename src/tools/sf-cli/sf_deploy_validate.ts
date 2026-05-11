import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

const Params = z.object({
  targetOrg: z.string().optional(),
  testLevel: z.enum(['NoTestRun', 'RunLocalTests', 'RunAllTestsInOrg']).default('RunLocalTests'),
});

export const sfDeployValidate: Tool<typeof Params> = {
  name: 'sf_deploy_validate',
  description: 'Validate a deployment without committing changes using `sf project deploy validate`.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org.');
    return runSfJson(
      ['project', 'deploy', 'validate', '--target-org', org, '--test-level', args.testLevel, '--json'],
      { cwd: ctx.session.projectRoot, timeoutMs: 300_000 },
    );
  },
};
