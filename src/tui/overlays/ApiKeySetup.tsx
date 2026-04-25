/** @jsxImportSource @opentui/react */

const ACCENT = '#4fc3f7';
const DIM = '#555';

export function ApiKeySetup({ error }: { error?: string | null }) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={64}>
      <text fg={ACCENT}>{'  sfwiz — API key required'}</text>
      <text>{' '}</text>
      <text>{'  Paste your Anthropic API key below and press Enter.'}</text>
      <text fg={DIM}>{'  Get one at: console.anthropic.com/settings/keys'}</text>
      <text>{' '}</text>
      <text fg={DIM}>{'  Saved to ~/.sfwiz/config.json — never logged.'}</text>
      <text>{' '}</text>
      {error ? <text fg="#ef5350">{`  Error: ${error}`}</text> : null}
      <text fg={DIM}>{'  Type key in the input below, then press Enter.'}</text>
    </box>
  );
}
