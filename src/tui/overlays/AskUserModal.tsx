/** @jsxImportSource @opentui/react */
import type { AskUserPayload } from '~/tools/types';

const WARN = '#f8c200';
const ACCENT = '#4fc3f7';
const DIM = '#555';
const BG = '#1a1206';

export function AskUserModal({
  payload,
  selected,
}: {
  payload: AskUserPayload;
  selected: number;
}) {
  const maxLen = Math.max(...payload.options.map((o) => o.label.length), 20);
  const width = Math.max(52, maxLen + 12);

  return (
    <box
      border={true}
      borderStyle="rounded"
      borderColor={WARN}
      width={width}
    >
      <text fg={DIM}>{`── ${payload.header} ${'─'.repeat(Math.max(2, width - payload.header.length - 6))}`}</text>
      <text>{payload.question}</text>
      <text>{' '}</text>
      {payload.options.map((opt, i) => (
        <text key={opt.label} fg={i === selected ? ACCENT : '#aaa'}>
          {`${i === selected ? '● ' : '○ '}${opt.label}${opt.description ? `  ${opt.description}` : ''}`}
        </text>
      ))}
      <text>{' '}</text>
      <text fg={DIM}>{'↑/↓ select · Enter confirm · Esc cancel'}</text>
    </box>
  );
}
