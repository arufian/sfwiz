import type { SideView } from '~/types/ui';
import { ACCENT, DIM, OK } from '~/ui/theme';
import { DeployView, type DeployData } from '~/ui/side/DeployView';
import { KnowledgeView, type KnowledgeData } from '~/ui/side/KnowledgeView';
import { PersonaView } from '~/ui/side/PersonaView';
import { SoqlView, type SoqlData } from '~/ui/side/SoqlView';
import { TestsView, type TestsData } from '~/ui/side/TestsView';
import { TokensView, type TokensBreakdown } from '~/ui/side/TokensView';

export interface OrgSummary {
  alias: string;
  status: 'connected' | 'disconnected';
  /** Optional — only set for scratch orgs. */
  scratchDaysLeft?: number;
}

export interface ModelSummary {
  /** Provider id, e.g. "anthropic". */
  provider: string;
  /** Display name, e.g. "Sonnet 4.6" — not the raw model id. */
  name: string;
}

export interface TokenSummary {
  used: number;
  estimatedCostUsd: number;
}

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

function MetaBlock({
  org,
  model,
  tokens,
}: {
  org: OrgSummary | null;
  model: ModelSummary | null;
  tokens: TokenSummary | null;
}) {
  return (
    <box style={{ flexDirection: 'column', marginTop: 1 }}>
      <text content="Salesforce" style={{ fg: DIM }} />
      {org ? (
        <>
          <box style={{ flexDirection: 'row' }}>
            <text content="● " style={{ fg: org.status === 'connected' ? OK : DIM }} />
            <text content={org.alias} />
          </box>
          {typeof org.scratchDaysLeft === 'number' ? (
            <text content={` scratch · ${org.scratchDaysLeft} days left`} style={{ fg: DIM }} />
          ) : null}
        </>
      ) : (
        <text content=" no org · /login or /orgs" style={{ fg: DIM }} />
      )}
      <box style={{ marginTop: 1 }}>
        <text content="Model" style={{ fg: DIM }} />
      </box>
      <text content={model?.name ?? 'not set'} />
      {tokens ? (
        <box style={{ flexDirection: 'row' }}>
          <text content={`${fmtTokens(tokens.used)} `} style={{ fg: DIM }} />
          <text content={`$${tokens.estimatedCostUsd.toFixed(2)}`} style={{ fg: ACCENT }} />
        </box>
      ) : (
        <text content="0 tokens" style={{ fg: DIM }} />
      )}
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
  org,
  model,
  tokens,
  data,
}: {
  view: SideView;
  org: OrgSummary | null;
  model: ModelSummary | null;
  tokens: TokenSummary | null;
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
      <MetaBlock org={org} model={model} tokens={tokens} />
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
