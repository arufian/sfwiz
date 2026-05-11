/** @jsxImportSource @opentui/react */
import { ACCENT, DIM, OK, WARN } from '~/ui/theme';

export interface EmbedRow {
  collection: string;
  status: 'pending' | 'running' | 'done' | 'error';
  done: number;
  total: number;
  currentItem: string;
  error?: string;
}

export function EmbedScreen({
  rows,
  overallPct,
}: {
  rows: EmbedRow[];
  overallPct: number;
}) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={72}>
      <text fg={ACCENT}>{'  Step 2 — embedding Salesforce reference docs'}</text>
      <text fg={DIM}>{'  This indexes Apex / LWC / release-notes locally so the agent'}</text>
      <text fg={DIM}>{"  can answer platform questions without re-fetching every turn."}</text>
      <text> </text>
      <text>{`  overall  ${renderBar(overallPct, 32)}  ${overallPct}%`}</text>
      <text> </text>
      {rows.map((r) => {
        const mark =
          r.status === 'done'
            ? '✓'
            : r.status === 'running'
              ? '⋯'
              : r.status === 'error'
                ? '✗'
                : '·';
        const fg =
          r.status === 'done'
            ? OK
            : r.status === 'error'
              ? WARN
              : r.status === 'running'
                ? ACCENT
                : DIM;
        const pct = r.total > 0 ? Math.round((r.done / r.total) * 100) : 0;
        return (
          <text key={r.collection} fg={fg}>
            {`  ${mark} ${r.collection.padEnd(12)} ${renderBar(pct, 18)}  ${r.status === 'done' && r.total === 0 ? 'done' : `${r.done}/${r.total || '?'}`}  ${(r.currentItem || r.error || '').slice(0, 22)}`}
          </text>
        );
      })}
      <text> </text>
      <text fg={DIM}>{'  Press Esc to skip this step. You can re-run /learn later.'}</text>
    </box>
  );
}

function renderBar(pct: number, width = 24): string {
  const filled = Math.min(width, Math.max(0, Math.round((pct / 100) * width)));
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}
