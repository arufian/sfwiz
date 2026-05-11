import { getAnthropicClient } from '~/llm/client';
import { ANTHROPIC_MODELS, modelsForProvider, type ProviderName } from '~/llm/models-catalog';

export interface ModelChoice {
  id: string;
  displayName: string;
  recommended?: boolean;
  provider?: ProviderName;
}

/**
 * List available models for the given provider.
 * For Anthropic, attempts a live API call and falls back to the static catalog.
 * For OpenAI and Google, returns the static catalog directly.
 */
export async function listAvailableModels(provider: ProviderName = 'anthropic'): Promise<ModelChoice[]> {
  if (provider !== 'anthropic') {
    return modelsForProvider(provider).map((m) => ({
      id: m.id,
      displayName: m.displayName,
      recommended: m.recommended,
      provider: m.provider,
    }));
  }

  try {
    const client = getAnthropicClient();
    const sdkClient = client as unknown as {
      models?: { list?: (params?: { limit?: number }) => Promise<{ data: Array<{ id: string; display_name?: string }> }> };
    };
    if (!sdkClient.models?.list) throw new Error('models.list not supported by SDK');
    const result = await sdkClient.models.list({ limit: 50 });
    if (!result?.data?.length) throw new Error('empty model list');
    return result.data.map((m) => {
      const cataloged = ANTHROPIC_MODELS.find((c) => c.id === m.id);
      return {
        id: m.id,
        displayName: m.display_name ?? cataloged?.displayName ?? m.id,
        recommended: cataloged?.recommended,
        provider: 'anthropic' as const,
      };
    });
  } catch {
    return ANTHROPIC_MODELS.map((m) => ({
      id: m.id,
      displayName: m.displayName,
      recommended: m.recommended,
      provider: 'anthropic' as const,
    }));
  }
}
