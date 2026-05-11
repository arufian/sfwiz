import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

const Params = z.object({
  targetOrg: z.string().optional(),
  testLevel: z.enum(['RunLocalTests', 'RunAllTestsInOrg', 'RunSpecifiedTests']).default('RunLocalTests'),
  classNames: z.array(z.string()).optional().describe('Class names when testLevel=RunSpecifiedTests'),
  codeCoverage: z.boolean().default(true),
  outputDir: z.string().optional().describe('Directory to write test results'),
});

export const sfRunTests: Tool<typeof Params> = {
  name: 'sf_run_tests',
  description: 'Run Apex tests in a Salesforce org using `sf apex run test`.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org.');

    const extra: string[] = [];
    if (args.codeCoverage) extra.push('--code-coverage');
    if (args.outputDir) extra.push('--output-dir', args.outputDir);
    if (args.classNames?.length) extra.push('--class-names', args.classNames.join(','));

    return runSfJson(
      ['apex', 'run', 'test', '--target-org', org, '--test-level', args.testLevel, '--json', ...extra],
      { cwd: ctx.session.projectRoot, timeoutMs: 5 * 60_000 },
    );
  },
};
