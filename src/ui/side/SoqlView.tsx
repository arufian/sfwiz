import { ACCENT, DIM, ERR } from '~/ui/theme';

export interface SoqlData {
  soql: string;
  totalSize: number;
  rows: string[];
  error?: string;
}

export function SoqlView({ data }: { data: SoqlData | null }) {
  if (!data) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="SOQL" />
        <text content="no query yet — invoke sf_query" style={{ fg: DIM }} />
      </box>
    );
  }

  const queryLines = data.soql.split('\n').slice(0, 6);

  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="SOQL" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {queryLines.map((line, i) => (
          <text key={`q-${i}-${line.slice(0, 8)}`} content={line} style={{ fg: ACCENT }} />
        ))}
      </box>
      {data.error ? (
        <box style={{ marginTop: 1 }}>
          <text content={data.error} style={{ fg: ERR }} />
        </box>
      ) : (
        <box style={{ marginTop: 1, flexDirection: 'column' }}>
          <text content={`${data.totalSize} rows`} style={{ fg: DIM }} />
          {data.rows.slice(0, 8).map((row, i) => (
            <text key={`r-${i}-${row.slice(0, 12)}`} content={row} />
          ))}
          {data.rows.length > 8 ? (
            <text content={`… ${data.rows.length - 8} more`} style={{ fg: DIM }} />
          ) : null}
        </box>
      )}
    </box>
  );
}
