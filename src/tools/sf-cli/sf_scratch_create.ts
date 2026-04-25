import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool, ToolContext } from '~/tools/types';

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

    const result = spawnSync(
      'sf',
      [
        'org', 'create', 'scratch',
        '--definition-file', args.definitionFile,
        '--duration-days', String(args.durationDays),
        '--json',
        ...extra,
      ],
      { cwd: ctx.session.projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, timeout: 10 * 60 * 1000 },
    );
    if (result.error) throw result.error;
    return JSON.parse(result.stdout || '{}') as unknown;
  },
};
