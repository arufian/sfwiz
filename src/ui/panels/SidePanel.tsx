import { basename } from 'path';
import type { SideView } from '~/types/ui';
import { ACCENT, DIM } from '~/ui/theme';
import { DeployView, type DeployData } from '~/ui/side/DeployView';
import { KnowledgeView, type KnowledgeData } from '~/ui/side/KnowledgeView';
import { PersonaView } from '~/ui/side/PersonaView';
import { SoqlView, type SoqlData } from '~/ui/side/SoqlView';
import { TestsView, type TestsData } from '~/ui/side/TestsView';
import { TokensView, type TokensBreakdown } from '~/ui/side/TokensView';

export interface OrgSummary {
  alias: string;
  status: 'connected' | 'disconnected';
  scratchDaysLeft?: number;
}

export interface ModelSummary {
  provider: string;
  name: string;
}

export interface TokenSummary {
  used: number;
  estimatedCostUsd: number;
}

function LogoBlock() {
  return (
    <box style={{ flexDirection: 'column', marginBottom: 1 }}>
      <ascii-font text="sfwiz" font="grid" style={{ color: ACCENT }} />
    </box>
  );
}

function CwdBlock({ cwd }: { cwd: string }) {
  const home = process.env.HOME ?? '';
  const display = home && cwd.startsWith(home) ? `~${cwd.slice(home.length)}` : cwd;
  const dir = basename(display);
  return (
    <box style={{ flexDirection: 'column', marginTop: 1 }}>
      <text content="cwd" style={{ fg: DIM }} />
      <text content={dir} />
      <text content={display} style={{ fg: DIM }} />
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

export interface SidePanelData {
  deploy?: DeployData | null;
  tests?: TestsData | null;
  soql?: SoqlData | null;
  knowledge?: KnowledgeData | null;
  tokensBreakdown?: TokensBreakdown | null;
}

export function SidePanel({
  view,
  cwd,
  data,
}: {
  view: SideView;
  cwd: string;
  /** Legacy props kept for compatibility — no longer rendered (status bar shows them). */
  org?: OrgSummary | null;
  model?: ModelSummary | null;
  tokens?: TokenSummary | null;
  data?: SidePanelData;
}) {
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
      <CwdBlock cwd={cwd} />
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content={view} />
        <text content=" · Alt+[ ] cycle" style={{ fg: DIM }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {view === 'persona' && <PersonaView />}
        {view === 'tests' && <TestsView data={data?.tests ?? null} />}
        {view === 'soql' && <SoqlView data={data?.soql ?? null} />}
        {view === 'knowledge' && <KnowledgeView data={data?.knowledge ?? null} />}
        {view === 'deploy' && <DeployView data={data?.deploy ?? null} />}
        {view === 'tokens' && <TokensView data={data?.tokensBreakdown ?? null} />}
      </box>
      <KeybindHints />
    </box>
  );
}
