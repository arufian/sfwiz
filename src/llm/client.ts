import Anthropic from '@anthropic-ai/sdk';

let _client: Anthropic | null = null;

/** Resolve the API key: explicit arg > env var > null. */
export function resolveApiKey(explicit?: string): string | null {
  if (explicit) return explicit;
  return process.env.ANTHROPIC_API_KEY ?? null;
}

/** Init the singleton client with an explicit key (called after TUI setup flow). */
export function initAnthropicClient(apiKey: string): Anthropic {
  _client = new Anthropic({
    apiKey,
    defaultHeaders: { 'anthropic-beta': 'prompt-caching-2024-07-31' },
  });
  return _client;
}

export function getAnthropicClient(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set. Run sfwiz and complete API key setup.');
  _client = new Anthropic({
    apiKey,
    defaultHeaders: { 'anthropic-beta': 'prompt-caching-2024-07-31' },
  });
  return _client;
}

// For testing: inject a custom client (e.g. with mocked fetch).
export function setAnthropicClient(client: Anthropic) {
  _client = client;
}

export function resetAnthropicClient() {
  _client = null;
}
