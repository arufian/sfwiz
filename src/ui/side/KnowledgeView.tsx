import { DIM, ERR, INFLIGHT, OK } from '~/ui/theme';

export interface KnowledgeRow {
  collection: string;
  status: 'pending' | 'running' | 'done' | 'error';
  done: number;
  total: number;
  currentItem?: string;
  error?: string;
}

export interface KnowledgeData {
  qmdInstalled: boolean;
  qmdVersion?: string;
  rows: KnowledgeRow[];
  workerStatus?: string;
  lastRunAt?: number | null;
}

function symbolFor(status: KnowledgeRow['status']) {
  switch (status) {
    case 'done':
      return { sym: '● ', color: OK };
    case 'running':
      return { sym: '⋯ ', color: INFLIGHT };
    case 'error':
      return { sym: '✗ ', color: ERR };
    default:
      return { sym: '○ ', color: DIM };
  }
}

export function KnowledgeView({ data }: { data: KnowledgeData | null }) {
  if (!data) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="Knowledge" />
        <text content="loading qmd state…" style={{ fg: DIM }} />
      </box>
    );
  }

  if (!data.qmdInstalled) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="Knowledge" />
        <text content="qmd not installed" style={{ fg: ERR }} />
        <text content="run /knowledge → Install" style={{ fg: DIM }} />
      </box>
    );
  }

  return (
    <box style={{ flexDirection: 'column' }}>
      <box style={{ flexDirection: 'row' }}>
        <text content="Knowledge " />
        {data.qmdVersion ? <text content={`(qmd ${data.qmdVersion})`} style={{ fg: DIM }} /> : null}
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {data.rows.length === 0 ? (
          <text content="no collections registered" style={{ fg: DIM }} />
        ) : (
          data.rows.map((r) => {
            const { sym, color } = symbolFor(r.status);
            const tail =
              r.status === 'running' && r.total > 0
                ? `  ${r.done}/${r.total}${r.currentItem ? ` · ${r.currentItem}` : ''}`
                : r.status === 'error'
                  ? `  ${r.error ?? 'error'}`
                  : r.status === 'done'
                    ? `  ${r.done} chunks`
                    : '  pending';
            return (
              <box key={r.collection} style={{ flexDirection: 'column' }}>
                <box style={{ flexDirection: 'row' }}>
                  <text content={sym} style={{ fg: color }} />
                  <text content={r.collection} />
                </box>
                <text content={tail} style={{ fg: DIM }} />
              </box>
            );
          })
        )}
      </box>
      {data.workerStatus ? (
        <box style={{ marginTop: 1 }}>
          <text content={`worker: ${data.workerStatus}`} style={{ fg: DIM }} />
        </box>
      ) : null}
    </box>
  );
}
