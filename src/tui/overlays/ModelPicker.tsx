/** @jsxImportSource @opentui/react */
import type { ModelChoice } from '~/llm/list-models';

const ACCENT = '#4fc3f7';
const DIM = '#888';
const OK = '#7ec699';

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
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={68}>
      <text fg={DIM}>{'── select model ────────────────────────────────────────'}</text>
      <text> </text>
      {loading ? (
        <text fg={DIM}>{'  fetching models…'}</text>
      ) : models.length === 0 ? (
        <text fg={DIM}>{'  no models available'}</text>
      ) : (
        models.map((m, i) => {
          const isSel = i === selected;
          const isCurrent = m.id === currentId;
          const marker = isSel ? '● ' : '○ ';
          const tag = isCurrent ? ' (current)' : m.recommended ? ' ★' : '';
          return (
            <text key={m.id} fg={isSel ? ACCENT : isCurrent ? OK : '#aaa'}>
              {`${marker}${m.displayName}${tag}`}
            </text>
          );
        })
      )}
      <text> </text>
      <text fg={DIM}>{'↑/↓ select · Enter confirm · Esc cancel'}</text>
    </box>
  );
}
