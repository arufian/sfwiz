/** @jsxImportSource @opentui/react */
import type { PermissionMode } from '~/config/schema';

const ACCENT = '#4fc3f7';
const DIM = '#888';
const WARN = '#f8c200';

export interface ModelChoice {
  id: string;
  label: string;
  desc: string;
}

export const MODEL_CHOICES: ModelChoice[] = [
  {
    id: 'claude-sonnet-4-6',
    label: 'Sonnet 4.6  (recommended — fast + cheap)',
    desc: 'Best for most code tasks.',
  },
  {
    id: 'claude-opus-4-7',
    label: 'Opus 4.7  (deepest reasoning)',
    desc: 'Best for design + reviewer judgment.',
  },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5  (lightweight)', desc: 'Cheapest; for quick tasks.' },
];

export const PERMISSION_CHOICES: { id: PermissionMode; label: string; desc: string }[] = [
  {
    id: 'ask',
    label: 'ask        (default — prompt before writes/shell)',
    desc: 'Safest. Recommended for first-time users.',
  },
  {
    id: 'auto-edit',
    label: 'auto-edit  (auto-allow edits inside this folder)',
    desc: 'Faster for development; shell still prompts.',
  },
  {
    id: 'yolo',
    label: 'auto       (auto-allow all non-destructive ops)',
    desc: 'Fastest. Destructive SF ops are still gated.',
  },
];

export function FirstRunWizard({
  step,
  selectedModel,
  selectedPerm,
}: {
  step: 'model' | 'permission';
  selectedModel: number;
  selectedPerm: number;
}) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={70}>
      <text fg={ACCENT}>{'  sfwiz — first-run setup'}</text>
      <text> </text>
      {step === 'model' ? (
        <>
          <text>{'  Pick the default Claude model:'}</text>
          <text> </text>
          {MODEL_CHOICES.map((m, i) => (
            <text key={m.id} fg={i === selectedModel ? ACCENT : '#aaa'}>
              {`  ${i === selectedModel ? '● ' : '○ '}${m.label}`}
            </text>
          ))}
          <text> </text>
          <text fg={DIM}>{`  ${MODEL_CHOICES[selectedModel]?.desc ?? ''}`}</text>
          <text> </text>
          <text fg={DIM}>{'  ↑/↓ select · Enter next · Esc skip'}</text>
        </>
      ) : (
        <>
          <text>{'  Pick the default permission mode:'}</text>
          <text> </text>
          {PERMISSION_CHOICES.map((p, i) => (
            <text key={p.id} fg={i === selectedPerm ? ACCENT : '#aaa'}>
              {`  ${i === selectedPerm ? '● ' : '○ '}${p.label}`}
            </text>
          ))}
          <text> </text>
          <text fg={DIM}>{`  ${PERMISSION_CHOICES[selectedPerm]?.desc ?? ''}`}</text>
          <text> </text>
          <text fg={WARN}>
            {'  Destructive Salesforce ops always require ask_user confirmation.'}
          </text>
          <text> </text>
          <text fg={DIM}>{'  ↑/↓ select · Enter finish · Esc skip'}</text>
        </>
      )}
    </box>
  );
}
