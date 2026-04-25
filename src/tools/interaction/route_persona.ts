import { z } from 'zod';
import { PERSONA_NAMES, type PersonaName, route } from '~/agent/router';
import type { Tool, ToolContext } from '~/tools/types';

export const RoutePersonaArgs = z.object({
  persona: z.enum(PERSONA_NAMES as [PersonaName, ...PersonaName[]]),
  prompt: z.string().min(1).describe('Task to delegate to the chosen persona subagent.'),
  inputs: z.record(z.string(), z.unknown()).optional(),
});
export type RoutePersonaArgs = z.infer<typeof RoutePersonaArgs>;

/**
 * Route the current turn to one of the 6 isolated persona subagents.
 * The orchestrator picks a persona; the chosen persona runs via
 * @anthropic-ai/claude-agent-sdk query() with a strict tool whitelist.
 */
export const routePersonaTool: Tool<typeof RoutePersonaArgs> = {
  name: 'route_persona',
  description:
    'Delegate the current task to one of the 6 Salesforce persona subagents ' +
    '(org-admin, designer, developer, deploy-manager, reviewer, qa). ' +
    'Each persona has an SDK-enforced tool whitelist. Use reviewer for read-only critique, ' +
    'developer for Apex/LWC code, deploy-manager for sf CLI deploys, qa for Apex tests, ' +
    'org-admin for permission/sharing changes, designer for design proposals.',
  parameters: RoutePersonaArgs,
  async execute(args, ctx: ToolContext) {
    const result = await route({
      persona: args.persona,
      prompt: args.prompt,
      inputs: args.inputs,
      cwd: ctx.session.projectRoot,
    });
    return JSON.stringify(result);
  },
};
