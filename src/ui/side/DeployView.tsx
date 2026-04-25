import { DIM, ERR } from '~/ui/theme';

export function DeployView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Deploy FAILED · 2.3s" style={{ fg: ERR }} />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="✗ OpportunityTrigger" style={{ fg: ERR }} />
        <text content="  L14 unknown field IsWon__c" style={{ fg: DIM }} />
        <text content="✗ OppHandler" style={{ fg: ERR }} />
        <text content="  L42 unused import" style={{ fg: DIM }} />
        <text content="✗ (permission) OppForecaster" style={{ fg: ERR }} />
      </box>
      <box style={{ marginTop: 1 }}>
        <text content="r retry · d drop · o open report" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
