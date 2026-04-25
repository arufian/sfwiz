import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

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

    const result = spawnSync(
      'sf',
      ['apex', 'run', 'test', '--target-org', org, '--test-level', args.testLevel, '--json', ...extra],
      { cwd: ctx.session.projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 5 * 60 * 1000 },
    );
    if (result.error) throw result.error;
    return JSON.parse(result.stdout || '{}') as unknown;
  },
};
