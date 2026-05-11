import { z } from 'zod';
import { runSubagent } from '~/agent/subagents';

export type PersonaName =
  | 'org-admin'
  | 'designer'
  | 'developer'
  | 'deploy-manager'
  | 'reviewer'
  | 'qa';

export const PERSONA_NAMES: PersonaName[] = [
  'org-admin',
  'designer',
  'developer',
  'deploy-manager',
  'reviewer',
  'qa',
];

export const ReviewerOutputSchema = z.object({
  issues: z.array(
    z.object({
      severity: z.enum(['error', 'warning', 'info']),
      file: z.string(),
      line: z.number().optional(),
      message: z.string(),
    }),
  ),
  summary: z.string(),
  approved: z.boolean(),
});
export type ReviewerOutput = z.infer<typeof ReviewerOutputSchema>;

export const QaOutputSchema = z.object({
  passed: z.number(),
  failed: z.number(),
  coverage: z.number(),
  failures: z.array(
    z.object({
      class: z.string(),
      method: z.string(),
      message: z.string(),
    }),
  ),
});
export type QaOutput = z.infer<typeof QaOutputSchema>;

export const OrgAdminOutputSchema = z.object({
  operation: z.string(),
  before: z.string(),
  after: z.string(),
  warnings: z.array(z.string()),
});
export type OrgAdminOutput = z.infer<typeof OrgAdminOutputSchema>;

export interface RouteOptions {
  persona: PersonaName;
  prompt: string;
  inputs?: Record<string, unknown>;
  cwd?: string;
  abortController?: AbortController;
  /** Provider in use — subagents require Anthropic. */
  provider?: string;
}

export type RouteResult =
  | { persona: 'org-admin'; output: OrgAdminOutput; sessionId: string | null }
  | { persona: 'reviewer'; output: ReviewerOutput; sessionId: string | null }
  | { persona: 'qa'; output: QaOutput; sessionId: string | null }
  | {
      persona: 'designer' | 'developer' | 'deploy-manager';
      output: string;
      sessionId: string | null;
    };

/**
 * Route a request to the chosen persona.
 * Persona subagents require the Anthropic provider. For other providers,
 * returns a message instructing the user to switch.
 */
export async function route(opts: RouteOptions): Promise<RouteResult> {
  if (opts.provider && opts.provider !== 'anthropic') {
    const msg = `Persona subagents require the Anthropic provider. Switch via /provider to use the ${opts.persona} persona.`;
    return { persona: opts.persona as 'designer', output: msg, sessionId: null };
  }
  const common = {
    prompt: opts.prompt,
    inputs: opts.inputs,
    cwd: opts.cwd,
    abortController: opts.abortController,
  };

  switch (opts.persona) {
    case 'org-admin': {
      const r = await runSubagent({
        ...common,
        name: 'org-admin',
        outputSchema: OrgAdminOutputSchema,
      });
      return { persona: 'org-admin', output: r.output, sessionId: r.sessionId };
    }
    case 'reviewer': {
      const r = await runSubagent({
        ...common,
        name: 'reviewer',
        outputSchema: ReviewerOutputSchema,
      });
      return { persona: 'reviewer', output: r.output, sessionId: r.sessionId };
    }
    case 'qa': {
      const r = await runSubagent({
        ...common,
        name: 'qa',
        outputSchema: QaOutputSchema,
      });
      return { persona: 'qa', output: r.output, sessionId: r.sessionId };
    }
    case 'designer':
    case 'developer':
    case 'deploy-manager': {
      const r = await runSubagent<string>({ ...common, name: opts.persona });
      return { persona: opts.persona, output: r.output, sessionId: r.sessionId };
    }
  }
}
