export interface ModelEntry {
  id: string;
  alias: 'opus' | 'sonnet' | 'haiku';
  displayName: string;
  description: string;
  recommended: boolean;
}

export const ANTHROPIC_MODELS: ModelEntry[] = [
  {
    id: 'claude-opus-4-7',
    alias: 'opus',
    displayName: 'Claude Opus 4.7',
    description: 'Most capable — used for reviewer & designer personas',
    recommended: false,
  },
  {
    id: 'claude-sonnet-4-6',
    alias: 'sonnet',
    displayName: 'Claude Sonnet 4.6',
    description: 'Balanced speed + quality — recommended default',
    recommended: true,
  },
  {
    id: 'claude-haiku-4-5-20251001',
    alias: 'haiku',
    displayName: 'Claude Haiku 4.5',
    description: 'Fastest — for lightweight tool dispatch',
    recommended: false,
  },
];

export const DEFAULT_MODEL = 'claude-sonnet-4-6';
