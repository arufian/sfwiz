import { describe, expect, test } from 'bun:test';
import { Config, LLMConfig, KnowledgeConfig, LearnConfig } from '~/config/schema';

describe('LLMConfig', () => {
  test('valid config', () => {
    const result = LLMConfig.safeParse({ provider: 'anthropic', model: 'claude-sonnet-4-6' });
    expect(result.success).toBe(true);
  });

  test('accepts openai provider', () => {
    const result = LLMConfig.safeParse({ provider: 'openai', model: 'gpt-4o' });
    expect(result.success).toBe(true);
  });

  test('accepts google provider', () => {
    const result = LLMConfig.safeParse({ provider: 'google', model: 'gemini-2.0-flash' });
    expect(result.success).toBe(true);
  });

  test('rejects unknown provider', () => {
    const result = LLMConfig.safeParse({ provider: 'groq', model: 'llama3' });
    expect(result.success).toBe(false);
  });

  test('apiKeys defaults to empty object', () => {
    const result = LLMConfig.parse({ provider: 'anthropic', model: 'claude-sonnet-4-6' });
    expect(result.apiKeys).toEqual({});
  });

  test('apiKeys stores per-provider keys', () => {
    const result = LLMConfig.parse({
      provider: 'openai',
      model: 'gpt-4o',
      apiKeys: { openai: 'sk-proj-abc', anthropic: 'sk-ant-xyz' },
    });
    expect(result.apiKeys['openai']).toBe('sk-proj-abc');
    expect(result.apiKeys['anthropic']).toBe('sk-ant-xyz');
  });

  test('defaults apiKeyEnv', () => {
    const result = LLMConfig.parse({ provider: 'anthropic', model: 'claude-opus-4-7' });
    expect(result.apiKeyEnv).toBe('ANTHROPIC_API_KEY');
  });
});

describe('KnowledgeConfig', () => {
  test('valid config with defaults', () => {
    const result = KnowledgeConfig.parse({});
    expect(result.collections).toContain('apex-ref');
    expect(result.autoInstall).toBe(true);
  });

  test('rejects unknown collection', () => {
    const result = KnowledgeConfig.safeParse({ collections: ['bad-collection'] });
    expect(result.success).toBe(false);
  });
});

describe('LearnConfig', () => {
  test('valid defaults', () => {
    const result = LearnConfig.parse({});
    expect(result.cronLocal).toBe('03:00');
    expect(result.rateLimitPerHost).toBe(1);
  });

  test('rejects bad cron format', () => {
    const result = LearnConfig.safeParse({ cronLocal: '3am' });
    expect(result.success).toBe(false);
  });
});

describe('Config', () => {
  test('full valid config', () => {
    const result = Config.safeParse({
      version: 1,
      llm: { provider: 'anthropic', model: 'claude-sonnet-4-6' },
      salesforce: { defaultOrgAlias: null, preferredAuthMethod: 'sfcli' },
      tui: {},
      session: {},
      telemetry: {},
      knowledge: {},
      learn: {},
    });
    expect(result.success).toBe(true);
  });

  test('rejects wrong version', () => {
    const result = Config.safeParse({ version: 2 });
    expect(result.success).toBe(false);
  });

  test('rejects malformed JSON structure', () => {
    const result = Config.safeParse(null);
    expect(result.success).toBe(false);
  });
});
