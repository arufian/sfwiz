import type { ZodTypeAny, z } from 'zod';
import type { PersonaName } from '~/personas/types';

export interface ToolContext {
  org: OrgHandle | null;
  session: SessionHandle;
  emit: (e: ToolEvent) => void;
  askUser: (q: AskUserPayload) => Promise<AskUserResult>;
}

export interface OrgHandle {
  alias: string;
  username: string;
  instanceUrl: string;
  isProduction: boolean;
}

export interface SessionHandle {
  id: string;
  projectRoot: string;
}

export type ToolEventKind = 'tool:pending' | 'tool:running' | 'tool:done' | 'tool:error';

export interface ToolEvent {
  kind: ToolEventKind;
  toolName: string;
  callId: string;
  payload?: unknown;
  errorMessage?: string;
}

export interface Tool<A extends ZodTypeAny = ZodTypeAny, R = unknown> {
  name: string;
  description: string;
  parameters: A;
  execute(args: z.infer<A>, ctx: ToolContext): Promise<R>;
  allowedPersonas?: ReadonlyArray<PersonaName>;
  requiresUserConfirmation?: { within: number; ref: string };
  rateLimitPerTurn?: Partial<Record<PersonaName, number>>;
}

// ask_user payload / result schemas (used by both tool and TUI modal).
import { z as zod } from 'zod';

export const AskUserOption = zod.object({
  label: zod.string().min(1),
  description: zod.string().default(''),
  preview: zod.string().optional(),
});
export type AskUserOption = zod.infer<typeof AskUserOption>;

export const AskUserPayload = zod.object({
  question: zod.string().min(1),
  header: zod
    .string()
    .min(1)
    .max(80)
    .transform((s) => (s.length > 40 ? `${s.slice(0, 37)}…` : s)),
  options: zod.array(AskUserOption).min(2).max(6),
  multiSelect: zod.boolean().default(false),
});
export type AskUserPayload = zod.infer<typeof AskUserPayload>;

export const AskUserResult = zod.object({
  selected: zod.union([zod.string(), zod.array(zod.string())]),
  notes: zod.string().nullable(),
  cancelled: zod.boolean().default(false),
});
export type AskUserResult = zod.infer<typeof AskUserResult>;
