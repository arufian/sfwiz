import { z } from 'zod';
import { unlink } from 'fs/promises';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

const Params = z.object({
  apexCode: z.string().min(1).describe('Apex code to execute anonymously'),
  targetOrg: z.string().optional(),
});

export const sfApexRunAnonymous: Tool<typeof Params> = {
  name: 'sf_apex_run_anonymous',
  description: 'Execute anonymous Apex code in a Salesforce org using `sf apex run`.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const org = args.targetOrg ?? ctx.org?.username;
    if (!org) throw new Error('No active org.');

    const tmpFile = `/tmp/sfwiz-apex-${Date.now()}.apex`;
    await Bun.write(tmpFile, args.apexCode);

    try {
      return await runSfJson(
        ['apex', 'run', '--target-org', org, '--file', tmpFile, '--json'],
        { cwd: ctx.session.projectRoot, timeoutMs: 60_000 },
      );
    } finally {
      await unlink(tmpFile).catch(() => {});
    }
  },
};
