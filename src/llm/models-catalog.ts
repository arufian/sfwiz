export type ProviderName = 'anthropic' | 'openai' | 'google';

export interface ModelEntry {
  provider: ProviderName;
  id: string;
  alias: string;
  displayName: string;
  description: string;
  recommended: boolean;
}

export const ANTHROPIC_MODELS: ModelEntry[] = [
  {
    provider: 'anthropic',
    id: 'claude-opus-4-7',
    alias: 'opus',
    displayName: 'Claude Opus 4.7',
    description: 'Most capable — used for reviewer & designer personas',
    recommended: false,
  },
  {
    provider: 'anthropic',
    id: 'claude-sonnet-4-6',
    alias: 'sonnet',
    displayName: 'Claude Sonnet 4.6',
    description: 'Balanced speed + quality — recommended default',
    recommended: true,
  },
  {
    provider: 'anthropic',
    id: 'claude-haiku-4-5-20251001',
    alias: 'haiku',
    displayName: 'Claude Haiku 4.5',
    description: 'Fastest — for lightweight tool dispatch',
    recommended: false,
  },
];

export const OPENAI_MODELS: ModelEntry[] = [
  {
    provider: 'openai',
    id: 'gpt-4o',
    alias: 'gpt4o',
    displayName: 'GPT-4o',
    description: 'Flagship multimodal model',
    recommended: true,
  },
  {
    provider: 'openai',
    id: 'gpt-4o-mini',
    alias: 'gpt4o-mini',
    displayName: 'GPT-4o mini',
    description: 'Fast and cost-efficient',
    recommended: false,
  },
  {
    provider: 'openai',
    id: 'o1',
    alias: 'o1',
    displayName: 'o1',
    description: 'Advanced reasoning',
    recommended: false,
  },
];

export const GOOGLE_MODELS: ModelEntry[] = [
  {
    provider: 'google',
    id: 'gemini-2.0-flash',
    alias: 'gemini-flash',
    displayName: 'Gemini 2.0 Flash',
    description: 'Fast multimodal — recommended default',
    recommended: true,
  },
  {
    provider: 'google',
    id: 'gemini-2.5-pro-preview-05-06',
    alias: 'gemini-pro',
    displayName: 'Gemini 2.5 Pro',
    description: 'Most capable Gemini',
    recommended: false,
  },
];

export const ALL_MODELS: ModelEntry[] = [
  ...ANTHROPIC_MODELS,
  ...OPENAI_MODELS,
  ...GOOGLE_MODELS,
];

export const DEFAULT_MODEL = 'claude-sonnet-4-6';

export const DEFAULT_MODEL_BY_PROVIDER: Record<ProviderName, string> = {
  anthropic: 'claude-sonnet-4-6',
  openai: 'gpt-4o',
  google: 'gemini-2.0-flash',
};

export function pickDefaultModel(alias: 'opus' | 'sonnet' | 'haiku'): string {
  return ANTHROPIC_MODELS.find((m) => m.alias === alias)?.id ?? DEFAULT_MODEL;
}

export function modelsForProvider(provider: ProviderName): ModelEntry[] {
  return ALL_MODELS.filter((m) => m.provider === provider);
}
