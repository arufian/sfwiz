import { FIXTURE } from '~/fixtures/chat';
import type { SideView } from '~/types/ui';
import { ACCENT, DIM, ERR, OK } from '~/ui/theme';
import { DeployView } from '~/ui/side/DeployView';
import { KnowledgeView } from '~/ui/side/KnowledgeView';
import { PersonaView } from '~/ui/side/PersonaView';
import { SoqlView } from '~/ui/side/SoqlView';
import { TestsView } from '~/ui/side/TestsView';

function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function LogoBlock() {
  const stripe = '╱'.repeat(30);
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content={stripe} style={{ fg: ACCENT }} />
      <box style={{ flexDirection: 'row', marginTop: 1, marginBottom: 1 }}>
        <ascii-font text="SFWIZ" font="tiny" style={{ color: ACCENT }} />
      </box>
      <text content={stripe} style={{ fg: ACCENT }} />
    </box>
  );
}

function MetaBlock() {
  const f = FIXTURE;
  return (
    <box style={{ flexDirection: 'column', marginTop: 1 }}>
      <text content="Salesforce" style={{ fg: DIM }} />
      <box style={{ flexDirection: 'row' }}>
        <text content="● " style={{ fg: OK }} />
        <text content={f.org.alias} />
      </box>
      <text content=" scratch · 28 days left" style={{ fg: DIM }} />
      <box style={{ marginTop: 1 }}>
        <text content="Model" style={{ fg: DIM }} />
      </box>
      <text content={f.model.name} />
      <box style={{ flexDirection: 'row' }}>
        <text content={`${fmtTokens(f.tokens.used)} `} style={{ fg: DIM }} />
        <text content={`$${f.tokens.cost.toFixed(2)}`} style={{ fg: ACCENT }} />
      </box>
    </box>
  );
}

function KeybindHints() {
  const rows: [string, string][] = [
    ['Enter', 'send'],
    ['Shift+Enter', 'newline'],
    ['Ctrl+B', 'tree'],
    ['Ctrl+H', 'help'],
    ['Ctrl+Q', 'quit'],
  ];
  return (
    <box style={{ marginTop: 1, flexDirection: 'column' }}>
      <text content="Keys" style={{ fg: DIM }} />
      {rows.map(([k, v]) => (
        <box key={k} style={{ flexDirection: 'row' }}>
          <text content={k.padEnd(12)} style={{ fg: ACCENT }} />
          <text content={v} style={{ fg: DIM }} />
        </box>
      ))}
    </box>
  );
}

export function SidePanel({ view }: { view: SideView }) {
  return (
    <box
      style={{
        border: true,
        borderColor: '#30363d',
        width: 36,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'column',
      }}
    >
      <LogoBlock />
      <MetaBlock />
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content={view} />
        <text content=" · Alt+[ ] cycle" style={{ fg: DIM }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {view === 'persona' && <PersonaView />}
        {view === 'tests' && <TestsView />}
        {view === 'soql' && <SoqlView />}
        {view === 'knowledge' && <KnowledgeView />}
        {view === 'deploy' && <DeployView />}
      </box>
      <KeybindHints />
    </box>
  );
}
