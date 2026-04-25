import { z } from 'zod';

export const PermissionMode = z.enum(['ask', 'auto-edit', 'yolo']);
export type PermissionMode = z.infer<typeof PermissionMode>;

export const LLMConfig = z.object({
  // v1 = Anthropic only. Multi-provider deferred to v2.
  provider: z.literal('anthropic'),
  model: z.string(),
  apiKeyEnv: z.string().default('ANTHROPIC_API_KEY'),
  // API key stored directly (set via TUI setup flow; overrides apiKeyEnv)
  apiKey: z.string().optional(),
});
export type LLMConfig = z.infer<typeof LLMConfig>;

export const KnowledgeConfig = z.object({
  dir: z.string().default('~/.sfwiz/knowledge'),
  collections: z
    .array(z.enum(['apex-ref', 'lwc-guide', 'sf-releases']))
    .default(['apex-ref', 'lwc-guide', 'sf-releases']),
  qmdBin: z.string().default('qmd'),
  autoInstall: z.boolean().default(true),
});
export type KnowledgeConfig = z.infer<typeof KnowledgeConfig>;

export const LearnConfig = z.object({
  enabled: z.boolean().default(true),
  cronLocal: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .default('03:00'),
  onBootDriftCheck: z.boolean().default(true),
  releaseSeasonsKept: z.number().int().min(1).max(6).default(3),
  userAgent: z.string().default('sfwiz-learn/0.x'),
  rateLimitPerHost: z.number().min(0.1).max(10).default(1),
});
export type LearnConfig = z.infer<typeof LearnConfig>;

export const Config = z.object({
  version: z.literal(1),
  llm: LLMConfig,
  permissionMode: PermissionMode.default('ask'),
  salesforce: z.object({
    defaultOrgAlias: z.string().nullable(),
    preferredAuthMethod: z.literal('sfcli'),
  }),
  tui: z
    .object({
      theme: z.enum(['auto', 'light', 'dark']).default('auto'),
      chordTimeoutMs: z.number().min(100).max(3000).default(800),
      reducedMotion: z.boolean().default(false),
      bgColorIdx: z.number().int().min(0).max(5).default(0),
    })
    .default(() => ({ theme: 'auto' as const, chordTimeoutMs: 800, reducedMotion: false, bgColorIdx: 0 })),
  session: z
    .object({
      retentionDays: z.number().int().min(1).max(365).default(30),
      dir: z.string().default('~/.sfwiz/session'),
    })
    .default(() => ({ retentionDays: 30, dir: '~/.sfwiz/session' })),
  telemetry: z
    .object({
      enabled: z.boolean().default(false),
    })
    .default(() => ({ enabled: false })),
  knowledge: KnowledgeConfig.default(() => ({
    dir: '~/.sfwiz/knowledge',
    collections: ['apex-ref', 'lwc-guide', 'sf-releases'] as ('apex-ref' | 'lwc-guide' | 'sf-releases')[],
    qmdBin: 'qmd',
    autoInstall: true,
  })),
  learn: LearnConfig.default(() => ({
    enabled: true,
    cronLocal: '03:00',
    onBootDriftCheck: true,
    releaseSeasonsKept: 3,
    userAgent: 'sfwiz-learn/0.x',
    rateLimitPerHost: 1,
  })),
  agent: z
    .object({
      thinkingMode: z.boolean().default(false),
      maxToolRoundsPerTurn: z.number().int().min(1).max(100).default(20),
    })
    .default(() => ({ thinkingMode: false, maxToolRoundsPerTurn: 20 })),
});
export type Config = z.infer<typeof Config>;
