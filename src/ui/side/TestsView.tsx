import { DIM, ERR, OK } from '~/ui/theme';

export interface TestsData {
  ranAt: number;
  passed: number;
  failed: number;
  coveragePct: number;
  failures: { class: string; method: string; message: string }[];
}

export function TestsView({ data }: { data: TestsData | null }) {
  if (!data) {
    return (
      <box style={{ flexDirection: 'column' }}>
        <text content="Apex tests" />
        <text content="no test runs yet — invoke sf_run_tests" style={{ fg: DIM }} />
      </box>
    );
  }

  const total = data.passed + data.failed;
  const covColor = data.coveragePct >= 75 ? OK : ERR;

  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Apex tests" />
      <box style={{ flexDirection: 'row' }}>
        <text
          content={`${total} run · ${data.passed} pass · ${data.failed} fail · `}
          style={{ fg: DIM }}
        />
        <text content={`cov ${data.coveragePct}%`} style={{ fg: covColor }} />
      </box>
      {data.failures.length > 0 ? (
        <box style={{ marginTop: 1, flexDirection: 'column' }}>
          {data.failures.slice(0, 8).map((f, i) => (
            <box key={`${f.class}.${f.method}-${i}`} style={{ flexDirection: 'column' }}>
              <text content={`✗ ${f.class}.${f.method}`} style={{ fg: ERR }} />
              <text content={`   ${f.message}`} style={{ fg: DIM }} />
            </box>
          ))}
          {data.failures.length > 8 ? (
            <text content={`… ${data.failures.length - 8} more`} style={{ fg: DIM }} />
          ) : null}
        </box>
      ) : null}
    </box>
  );
}
