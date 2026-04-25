import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

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

    // Write apex code to temp file (sf apex run reads from --file)
    const tmpFile = `/tmp/sfwiz-apex-${Date.now()}.apex`;
    await Bun.write(tmpFile, args.apexCode);

    try {
      const result = spawnSync(
        'sf',
        ['apex', 'run', '--target-org', org, '--file', tmpFile, '--json'],
        { cwd: ctx.session.projectRoot, encoding: 'utf8', maxBuffer: 1024 * 1024 },
      );
      if (result.error) throw result.error;
      return JSON.parse(result.stdout || '{}') as unknown;
    } finally {
      await Bun.file(tmpFile).exists().then((exists) => {
        if (exists) return Bun.write(tmpFile, ''); // clear sensitive code
      });
    }
  },
};
