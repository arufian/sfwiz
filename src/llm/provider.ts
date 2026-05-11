import { openai, createOpenAI } from '@ai-sdk/openai';
import { google, createGoogleGenerativeAI } from '@ai-sdk/google';
import type { LanguageModel } from 'ai';

export type NonAnthropicProvider = 'openai' | 'google';

/**
 * Returns an AI-SDK LanguageModel for non-Anthropic providers.
 * Anthropic uses its own SDK directly (preserves prompt-caching).
 */
export function getAIModel(
  provider: NonAnthropicProvider,
  modelId: string,
  apiKey: string,
): LanguageModel {
  switch (provider) {
    case 'openai':
      return createOpenAI({ apiKey })(modelId);
    case 'google':
      return createGoogleGenerativeAI({ apiKey })(modelId);
  }
}
