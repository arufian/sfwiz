import { z } from 'zod';
import { PersonaName } from '~/personas/types';

const TokenUsage = z.object({
  input: z.number(),
  output: z.number(),
  cached: z.number(),
  cost: z.number(),
});

const MessageRecord = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.string(),
  personaName: PersonaName.nullable(),
  tokenUsage: TokenUsage.optional(),
});

export const SessionRecord = z.object({
  id: z.string(),
  createdAt: z.string(),
  org: z.string().nullable(),
  projectRoot: z.string(),
  tokens: TokenUsage,
  conversation: z.array(MessageRecord),
  artifacts: z.record(z.string(), z.string()),
});
export type SessionRecord = z.infer<typeof SessionRecord>;

// Captures the agent-sdk session_id for subagent resumption (H4 + LOW Opus concern).
export const SessionResumeHandle = z.object({
  sessionId: z.string(),
  agentSdkSessionId: z.string().optional(),
  personaName: PersonaName,
});
export type SessionResumeHandle = z.infer<typeof SessionResumeHandle>;
