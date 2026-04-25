import type { PersonaName } from '~/agent/router';
import { PERSONA_REGISTRY } from '~/personas/registry';

/** Personas allowed to run destructive SF operations. */
const DEPLOY_PERSONAS = new Set<PersonaName>(['developer', 'deploy-manager']);

/** Reviewer is strictly read-only — enforce at persona gate level. */
const READ_ONLY_PERSONAS = new Set<PersonaName>(['reviewer']);

/** Tools always blocked for the reviewer persona (belt + suspenders, also enforced via subagent tool list). */
const REVIEWER_BLOCKED_TOOLS = new Set([
  'Write', 'Edit', 'Bash', 'sf_deploy_start', 'sf_scratch_create', 'sf_assign_permset',
]);

export interface PersonaGateResult {
  allowed: boolean;
  reason?: string;
}

/** Check whether a persona is allowed to execute a given tool. */
export function checkPersonaGate(persona: PersonaName, toolName: string): PersonaGateResult {
  if (READ_ONLY_PERSONAS.has(persona) && REVIEWER_BLOCKED_TOOLS.has(toolName)) {
    return { allowed: false, reason: `Persona "${persona}" is read-only; "${toolName}" is blocked.` };
  }

  const isDestructiveSf = ['sf_deploy_start', 'sf_scratch_create', 'sf_assign_permset'].includes(toolName);
  if (isDestructiveSf && !DEPLOY_PERSONAS.has(persona)) {
    return { allowed: false, reason: `Only developer/deploy-manager personas may run "${toolName}".` };
  }

  return { allowed: true };
}

/** Get the Claude model ID for a persona. */
export function getPersonaModel(persona: PersonaName): string {
  return PERSONA_REGISTRY[persona].model;
}
