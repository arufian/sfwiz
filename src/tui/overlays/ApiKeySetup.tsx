/** @jsxImportSource @opentui/react */

const ACCENT = '#4fc3f7';
const DIM = '#888';
const WARN = '#f8c200';

interface ProviderKeyInfo {
  title: string;
  hint: string;
  url: string;
  prefix: string;
}

const PROVIDER_INFO: Record<string, ProviderKeyInfo> = {
  anthropic: {
    title: 'Anthropic API key required',
    hint: 'Paste your key (starts with sk-ant- or sk-proj-) into the input below',
    url: 'console.anthropic.com/settings/keys',
    prefix: 'sk-ant- or sk-proj-',
  },
  openai: {
    title: 'OpenAI API key required',
    hint: 'Paste your key (starts with sk-proj- or sk-) into the input below',
    url: 'platform.openai.com/api-keys',
    prefix: 'sk-',
  },
  google: {
    title: 'Google AI API key required',
    hint: 'Paste your Gemini API key into the input below',
    url: 'aistudio.google.com/apikey',
    prefix: 'any non-empty string',
  },
};

export function ApiKeySetup({
  error,
  provider = 'anthropic',
}: {
  error?: string | null;
  provider?: string;
}) {
  const info = PROVIDER_INFO[provider] ?? PROVIDER_INFO['anthropic']!;
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={68}>
      <text fg={ACCENT}>{`  sfwiz — ${info.title}`}</text>
      <text> </text>
      <text>{`  ${info.hint}`}</text>
      <text>{'  and press Enter. The input clears the moment you submit.'}</text>
      <text> </text>
      <text fg={DIM}>{`  Get one at ${info.url}`}</text>
      <text fg={DIM}>{'  Saved to ~/.sfwiz/config.json (chmod 600, owner-only).'}</text>
      <text> </text>
      <text fg={WARN}>{'  Heads-up: the key is briefly visible while you paste it.'}</text>
      <text fg={WARN}>{'  Avoid screen-shares during this step.'}</text>
      <text> </text>
      {error ? <text fg="#ef5350">{`  Error: ${error}`}</text> : null}
    </box>
  );
}
