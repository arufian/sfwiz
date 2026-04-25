import Anthropic from '@anthropic-ai/sdk';

let _client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');
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
