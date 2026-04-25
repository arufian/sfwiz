import { DIM, ERR } from '~/ui/theme';

export function TestsView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Apex tests" />
      <text content="12 run · 9 pass · 3 fail · cov 72%" style={{ fg: DIM }} />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="✗ OppHandler_Test.updateIsWon" style={{ fg: ERR }} />
        <text content="   System.DmlException" style={{ fg: DIM }} />
        <text content="✗ OppHandler_Test.bulkUpdate" style={{ fg: ERR }} />
        <text content="   Assertion failed" style={{ fg: DIM }} />
        <text content="✗ OppFlow_Test.coverageOnly" style={{ fg: ERR }} />
        <text content="   coverage 38% (< 75%)" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
