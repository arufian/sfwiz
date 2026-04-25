import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

const Params = z.object({
  metadata: z.array(z.string()).min(1).describe('Metadata component names to retrieve, e.g. ["ApexClass:MyClass"]'),
  targetOrg: z.string().optional().describe('Org username or alias. Defaults to ctx.org.'),
});

export const sfRetrieve: Tool<typeof Params> = {
  name: 'sf_retrieve',
  description: 'Retrieve metadata from a Salesforce org using `sf project retrieve start`.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org. Set a target org first.');
    const projectRoot = ctx.session.projectRoot;

    const result = spawnSync(
      'sf',
      ['project', 'retrieve', 'start', '--metadata', args.metadata.join(','), '--target-org', org, '--json'],
      { cwd: projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 120_000 },
    );
    if (result.error) throw result.error;
    return JSON.parse(result.stdout || '{}') as unknown;
  },
};
