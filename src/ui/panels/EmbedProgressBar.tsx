import { ACCENT, DIM, OK } from '~/ui/theme';

export function EmbedProgressBar({
  progress,
  collection,
  item,
  done,
  total,
}: {
  progress: number;
  collection: string;
  item: string;
  done: number;
  total: number;
}) {
  const cells = 16;
  const filled = Math.max(0, Math.min(cells, Math.round((progress / 100) * cells)));
  const bar = '█'.repeat(filled) + '░'.repeat(cells - filled);
  const color = progress >= 100 ? OK : ACCENT;
  return (
    <box
      style={{
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 1,
        flexShrink: 0,
        backgroundColor: '#0a1a1f',
      }}
    >
      <text content="Knowledge  " style={{ bg: '#0a1a1f', fg: DIM }} />
      <text content={bar} style={{ bg: '#0a1a1f', fg: color }} />
      <text content={`  ${String(progress).padStart(3)}%  `} style={{ bg: '#0a1a1f' }} />
      <text content={collection} style={{ bg: '#0a1a1f', fg: ACCENT }} />
      <text content={` · ${item} `} style={{ bg: '#0a1a1f', fg: DIM }} />
      <text content={`(${done}/${total})`} style={{ bg: '#0a1a1f', fg: DIM }} />
    </box>
  );
}
