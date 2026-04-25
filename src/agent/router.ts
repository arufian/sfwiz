import type { AgentLoop } from '~/agent/loop';
import type { MessageParam } from '@anthropic-ai/sdk/resources';
import { runSubagent } from '~/agent/subagents';
import { z } from 'zod';

export type PersonaName = 'org-admin' | 'designer' | 'developer' | 'deploy-manager' | 'reviewer' | 'qa';

/** Personas that run via the main AgentLoop (streaming @anthropic-ai/sdk). */
const MAIN_LOOP_PERSONAS = new Set<PersonaName>(['designer', 'developer', 'deploy-manager']);

/** Personas that run as isolated claude-agent-sdk subagents. */
const SUBAGENT_PERSONAS = new Set<PersonaName>(['org-admin', 'reviewer', 'qa']);

export const ReviewerOutputSchema = z.object({
  issues: z.array(z.object({
    severity: z.enum(['error', 'warning', 'info']),
    file: z.string(),
    line: z.number().optional(),
    message: z.string(),
  })),
  summary: z.string(),
  approved: z.boolean(),
});
export type ReviewerOutput = z.infer<typeof ReviewerOutputSchema>;

export const QaOutputSchema = z.object({
  passed: z.number(),
  failed: z.number(),
  coverage: z.number(),
  failures: z.array(z.object({
    class: z.string(),
    method: z.string(),
    message: z.string(),
  })),
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
}

export type RouteResult =
  | { persona: 'org-admin'; output: OrgAdminOutput; sessionId: string | null }
  | { persona: 'reviewer'; output: ReviewerOutput; sessionId: string | null }
  | { persona: 'qa'; output: QaOutput; sessionId: string | null }
  | { persona: 'designer' | 'developer' | 'deploy-manager'; output: string };

/**
 * Route a request to the appropriate execution path:
 * - Main loop personas: run via provided AgentLoop instance
 * - Subagent personas: run via claude-agent-sdk query()
 */
export async function route(
  opts: RouteOptions,
  mainLoop?: AgentLoop,
): Promise<RouteResult> {
  if (SUBAGENT_PERSONAS.has(opts.persona)) {
    if (opts.persona === 'org-admin') {
      const result = await runSubagent({
        name: 'org-admin',
        prompt: opts.prompt,
        inputs: opts.inputs,
        outputSchema: OrgAdminOutputSchema,
        cwd: opts.cwd,
        abortController: opts.abortController,
      });
      return { persona: 'org-admin', output: result.output, sessionId: result.sessionId };
    }

    if (opts.persona === 'reviewer') {
      const result = await runSubagent({
        name: 'reviewer',
        prompt: opts.prompt,
        inputs: opts.inputs,
        outputSchema: ReviewerOutputSchema,
        cwd: opts.cwd,
        abortController: opts.abortController,
      });
      return { persona: 'reviewer', output: result.output, sessionId: result.sessionId };
    }

    if (opts.persona === 'qa') {
      const result = await runSubagent({
        name: 'qa',
        prompt: opts.prompt,
        inputs: opts.inputs,
        outputSchema: QaOutputSchema,
        cwd: opts.cwd,
        abortController: opts.abortController,
      });
      return { persona: 'qa', output: result.output, sessionId: result.sessionId };
    }
  }

  if (MAIN_LOOP_PERSONAS.has(opts.persona)) {
    if (!mainLoop) throw new Error(`AgentLoop required for persona "${opts.persona}"`);
    const messages: MessageParam[] = [{ role: 'user', content: opts.prompt }];
    const output = await mainLoop.run(messages);
    return { persona: opts.persona as 'designer' | 'developer' | 'deploy-manager', output };
  }

  throw new Error(`Unknown persona: "${opts.persona}"`);
}
