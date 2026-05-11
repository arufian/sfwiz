import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

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

    return runSfJson(
      ['project', 'retrieve', 'start', '--metadata', args.metadata.join(','), '--target-org', org, '--json'],
      { cwd: ctx.session.projectRoot, timeoutMs: 120_000 },
    );
  },
};
