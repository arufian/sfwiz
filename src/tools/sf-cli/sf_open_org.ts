import { spawnSync } from 'child_process';
import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';

const Params = z.object({
  targetOrg: z.string().optional().describe('Org alias or username. Defaults to the active org.'),
});

export const sfOpenOrg: Tool<typeof Params> = {
  name: 'sf_open_org',
  description: 'Open a Salesforce org in the default browser using `sf org open`.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const target = args.targetOrg ?? ctx.org?.alias ?? ctx.org?.username;
    const cmd = target
      ? ['org', 'open', '--target-org', target]
      : ['org', 'open'];
    const result = spawnSync('sf', cmd, {
      encoding: 'utf8',
      timeout: 30_000,
    });
    if (result.error) throw result.error;
    return { opened: true, org: target ?? 'default', stdout: (result.stdout ?? '').trim() };
  },
};
