import { DIM, INFLIGHT, OK } from '~/ui/theme';

export function KnowledgeView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Knowledge" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <box style={{ flexDirection: 'row' }}>
          <text content="● " style={{ fg: OK }} />
          <text content="apex-ref" />
        </box>
        <text content="  812 chunks · 9.6 MB · 14h ago" style={{ fg: DIM }} />
        <box style={{ flexDirection: 'row' }}>
          <text content="⋯ " style={{ fg: INFLIGHT }} />
          <text content="lwc-guide" />
        </box>
        <text content="  218 chunks · embed 43%" style={{ fg: DIM }} />
        <box style={{ flexDirection: 'row' }}>
          <text content="● " style={{ fg: OK }} />
          <text content="sf-releases (3 seasons)" />
        </box>
        <text content="  spring-26 · summer-26 · winter-26" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
