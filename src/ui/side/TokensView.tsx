import { ACCENT, DIM, OK, WARN } from '~/ui/theme';

export interface TokensBreakdown {
  input: number;
  output: number;
  cacheCreation: number;
  cacheRead: number;
  turns: number;
  costUsd: number;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function TokensView({ data }: { data: TokensBreakdown | null }) {
  if (!data) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="Tokens" />
        <text content="no usage yet — start chatting" style={{ fg: DIM }} />
      </box>
    );
  }

  const total = data.input + data.output + data.cacheCreation + data.cacheRead;
  const cacheTotal = data.cacheCreation + data.cacheRead;
  const cacheHitPct = cacheTotal > 0 ? Math.round((data.cacheRead / cacheTotal) * 100) : 0;

  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Tokens" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <box style={{ flexDirection: 'row' }}>
          <text content="total " style={{ fg: DIM }} />
          <text content={fmt(total)} />
        </box>
        <box style={{ flexDirection: 'row' }}>
          <text content="cost  " style={{ fg: DIM }} />
          <text content={`$${data.costUsd.toFixed(4)}`} style={{ fg: ACCENT }} />
        </box>
        <box style={{ flexDirection: 'row' }}>
          <text content="turns " style={{ fg: DIM }} />
          <text content={String(data.turns)} />
        </box>
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="Breakdown" style={{ fg: DIM }} />
        <box style={{ flexDirection: 'row' }}>
          <text content="↑ in    " style={{ fg: DIM }} />
          <text content={fmt(data.input)} />
        </box>
        <box style={{ flexDirection: 'row' }}>
          <text content="↓ out   " style={{ fg: DIM }} />
          <text content={fmt(data.output)} />
        </box>
        <box style={{ flexDirection: 'row' }}>
          <text content="✦ cache " style={{ fg: DIM }} />
          <text content={`${fmt(data.cacheCreation)} write · ${fmt(data.cacheRead)} read`} />
        </box>
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content={`cache hit ${cacheHitPct}%`}
          style={{ fg: cacheHitPct >= 70 ? OK : cacheHitPct >= 30 ? WARN : DIM }}
        />
      </box>
    </box>
  );
}
