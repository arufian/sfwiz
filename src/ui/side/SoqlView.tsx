import { DIM } from '~/ui/theme';

export function SoqlView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="SOQL" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="SELECT Id, Name, StageName" style={{ fg: DIM }} />
        <text content="FROM Opportunity" style={{ fg: DIM }} />
        <text content="WHERE IsClosed = false" style={{ fg: DIM }} />
        <text content="LIMIT 50" style={{ fg: DIM }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="006... Acme Bid         Prospecting" />
        <text content="006... Initech Renewal  Negotiation" />
        <text content="006... Umbrella POC     Qualification" />
        <text content="… 47 more" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
