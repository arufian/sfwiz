import { getAnthropicClient } from '~/llm/client';
import { ANTHROPIC_MODELS } from '~/llm/models-catalog';

export interface ModelChoice {
  id: string;
  displayName: string;
  recommended?: boolean;
}

/**
 * Fetch models advertised by the active provider. Anthropic SDK exposes
 * `client.models.list()`. Falls back to the static catalog if the call fails
 * (offline, no key, older SDK, etc).
 */
export async function listAvailableModels(): Promise<ModelChoice[]> {
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
      };
    });
  } catch {
    return ANTHROPIC_MODELS.map((m) => ({
      id: m.id,
      displayName: m.displayName,
      recommended: m.recommended,
    }));
  }
}
