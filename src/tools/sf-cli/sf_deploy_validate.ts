import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

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
    const result = spawnSync(
      'sf',
      ['project', 'deploy', 'validate', '--target-org', org, '--test-level', args.testLevel, '--json'],
      { cwd: ctx.session.projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 300_000 },
    );
    if (result.error) throw result.error;
    return JSON.parse(result.stdout || '{}') as unknown;
  },
};
