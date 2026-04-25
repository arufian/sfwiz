import { z } from 'zod';

export const PersonaName = z.enum([
  'org-admin',
  'designer',
  'developer',
  'reviewer',
  'qa',
  'deploy-manager',
]);
export type PersonaName = z.infer<typeof PersonaName>;

export const Persona = z.object({
  name: PersonaName,
  promptPath: z.string(),
  model: z.enum(['sonnet', 'opus', 'haiku']),
  allowedTools: z.array(z.string()),
  loopMode: z.enum(['shared', 'isolated']),
  askUserLimitPerTurn: z.number().int().min(0).max(10).default(1),
});
export type Persona = z.infer<typeof Persona>;

// Persona-to-model mapping (baked in, not user-configurable in v1).
export const PERSONA_MODELS: Record<PersonaName, 'opus' | 'sonnet' | 'haiku'> = {
  'org-admin': 'sonnet',
  designer: 'opus',
  developer: 'sonnet',
  reviewer: 'opus',
  qa: 'sonnet',
  'deploy-manager': 'sonnet',
};

export const MODEL_IDS: Record<'opus' | 'sonnet' | 'haiku', string> = {
  opus: 'claude-opus-4-7',
  sonnet: 'claude-sonnet-4-6',
  haiku: 'claude-haiku-4-5-20251001',
};
