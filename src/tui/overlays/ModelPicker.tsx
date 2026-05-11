/** @jsxImportSource @opentui/react */
import type { ModelChoice } from '~/llm/list-models';

const ACCENT = '#4fc3f7';
const DIM = '#888';
const OK = '#7ec699';
const BG = '#0a1628';

export function ModelPicker({
  models,
  selected,
  loading,
  currentId,
}: {
  models: ModelChoice[];
  selected: number;
  loading: boolean;
  currentId: string | null;
}) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={68} backgroundColor={BG}>
      <text style={{ bg: BG, fg: DIM }}>{'── select model ────────────────────────────────────────'}</text>
      <text style={{ bg: BG }}> </text>
      {loading ? (
        <text style={{ bg: BG, fg: DIM }}>{'  fetching models…'}</text>
      ) : models.length === 0 ? (
        <text style={{ bg: BG, fg: DIM }}>{'  no models available'}</text>
      ) : (
        models.map((m, i) => {
          const isSel = i === selected;
          const isCurrent = m.id === currentId;
          const marker = isSel ? '● ' : '○ ';
          const tag = isCurrent ? ' (current)' : m.recommended ? ' ★' : '';
          return (
            <text key={m.id} style={{ bg: BG, fg: isSel ? ACCENT : isCurrent ? OK : '#aaa' }}>
              {`${marker}${m.displayName}${tag}`}
            </text>
          );
        })
      )}
      <text style={{ bg: BG }}> </text>
      <text style={{ bg: BG, fg: DIM }}>{'↑/↓ select · Enter confirm · Esc cancel'}</text>
    </box>
  );
}
