/** @jsxImportSource @opentui/react */

const ACCENT = '#4fc3f7';
const DIM = '#888';
const OK = '#22c55e';
const BG = '#0a1628';

export interface ProviderEntry {
  id: string;
  name: string;
  status: 'available' | 'soon';
  detail: string;
}

export const PROVIDERS: ProviderEntry[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    status: 'available',
    detail: 'Claude Opus / Sonnet / Haiku — sk-ant-… or sk-proj-…',
  },
  { id: 'openai', name: 'OpenAI', status: 'soon', detail: 'GPT — coming in v2' },
  { id: 'google', name: 'Google', status: 'soon', detail: 'Gemini — coming in v2' },
  { id: 'groq', name: 'Groq', status: 'soon', detail: 'Llama / Mixtral — coming in v2' },
];

export function ProviderPicker({ selected }: { selected: number }) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={68} backgroundColor={BG}>
      <text style={{ bg: BG, fg: ACCENT }}>{'  /provider — choose LLM provider'}</text>
      <text style={{ bg: BG }}> </text>
      {PROVIDERS.map((p, i) => {
        const focused = i === selected;
        const arrow = focused ? '▸ ' : '  ';
        const tag = p.status === 'available' ? '[available]' : '[soon]';
        const tagFg = p.status === 'available' ? OK : DIM;
        return (
          <box key={p.id} style={{ flexDirection: 'row' }} backgroundColor={BG}>
            <text style={{ bg: BG, fg: focused ? ACCENT : DIM }}>{arrow + p.name.padEnd(12)}</text>
            <text style={{ bg: BG, fg: tagFg }}>{tag.padEnd(14)}</text>
            <text style={{ bg: BG, fg: DIM }}>{p.detail}</text>
          </box>
        );
      })}
      <text style={{ bg: BG }}> </text>
      <text style={{ bg: BG, fg: DIM }}>{'  ↑/↓ select · Enter confirm · Esc cancel'}</text>
    </box>
  );
}
