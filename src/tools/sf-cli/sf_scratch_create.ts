import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { runSfJson } from '~/tools/sf-cli/run-sf';

const Params = z.object({
  definitionFile: z.string().default('config/project-scratch-def.json'),
  alias: z.string().optional(),
  devHubOrg: z.string().optional().describe('Dev Hub org username or alias'),
  durationDays: z.number().int().min(1).max(30).default(7),
  setDefault: z.boolean().default(true),
});

export const sfScratchCreate: Tool<typeof Params> = {
  name: 'sf_scratch_create',
  description: 'Create a scratch org using `sf org create scratch`. DESTRUCTIVE — creates a new org.',
  parameters: Params,
  requiresUserConfirmation: { within: 3, ref: 'sf_scratch_create' },
  async execute(args, ctx: ToolContext) {
    const extra: string[] = [];
    if (args.alias) extra.push('--alias', args.alias);
    if (args.devHubOrg) extra.push('--target-dev-hub', args.devHubOrg);
    if (args.setDefault) extra.push('--set-default');

    return runSfJson(
      [
        'org', 'create', 'scratch',
        '--definition-file', args.definitionFile,
        '--duration-days', String(args.durationDays),
        '--json',
        ...extra,
      ],
      { cwd: ctx.session.projectRoot, timeoutMs: 10 * 60_000 },
    );
  },
};
