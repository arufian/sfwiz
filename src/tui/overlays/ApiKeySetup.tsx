/** @jsxImportSource @opentui/react */

const ACCENT = '#4fc3f7';
const DIM = '#888';
const WARN = '#f8c200';

export function ApiKeySetup({ error }: { error?: string | null }) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={68}>
      <text fg={ACCENT}>{'  sfwiz — Anthropic API key required'}</text>
      <text> </text>
      <text>{'  Paste your key (starts with sk-ant-) into the input below'}</text>
      <text>{'  and press Enter. The input clears the moment you submit.'}</text>
      <text> </text>
      <text fg={DIM}>{'  Get one at console.anthropic.com/settings/keys'}</text>
      <text fg={DIM}>{'  Saved to ~/.sfwiz/config.json (chmod 600, owner-only).'}</text>
      <text> </text>
      <text fg={WARN}>{'  Heads-up: the key is briefly visible while you paste it.'}</text>
      <text fg={WARN}>{'  Avoid screen-shares during this step.'}</text>
      <text> </text>
      {error ? <text fg="#ef5350">{`  Error: ${error}`}</text> : null}
    </box>
  );
}
