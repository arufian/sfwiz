/**
 * sfwiz — Phase 3 PoC (UI only, fake data)
 *
 * Single-file OpenTUI/React skeleton to lock UX before M1.
 * No LLM, no Salesforce calls. All data is static fixtures.
 *
 * Run:  bun run poc
 * Keys: Ctrl+B tree · mouse wheel scroll · PgUp/PgDn · Ctrl+D demo · Ctrl+K modal · Ctrl+H help · Ctrl+Q quit
 * Input: Enter submits · Shift+Enter (or Alt/Ctrl+Enter) inserts newline
 */

import { createCliRenderer, TextAttributes, type TextareaRenderable } from '@opentui/core';
import { createRoot, useKeyboard, useTerminalDimensions } from '@opentui/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const ACCENT = '#00D1E6';
const DIM = '#7d8590';
const BORDER = '#30363d';
const OK = '#3fb950';
const WARN = '#d29922';
const ERR = '#f85149';
const INFLIGHT = '#58a6ff';
const CONFLICT = '#bc8cff';

// ─── Fixtures ────────────────────────────────────────────────────────────────

const FIXTURE = {
  org: { alias: 'acme-scratch', status: 'connected' as const },
  model: { provider: 'anthropic', name: 'Sonnet 4.6' },
  session: 's:9f2c',
  tokens: { used: 12_400, cost: 0.07 },
  build: 'ok' as 'ok' | 'fail' | 'running',
  tests: { coverage: 91, failing: 0 },
  knowledge: 'fresh' as 'fresh' | 'embedding' | 'stale' | 'ref-only' | 'error',
};

type SyncState = 'synced' | 'dirty' | 'delete' | 'loose' | 'conflict' | 'inflight';

interface TreeItem {
  name: string;
  state: SyncState;
}

interface TreeGroup {
  label: string;
  items: TreeItem[];
}

const TREE_GROUPS: TreeGroup[] = [
  {
    label: 'apex',
    items: [
      { name: 'AccountHandler.cls', state: 'synced' },
      { name: 'OpportunityTrigger.trigger', state: 'dirty' },
      { name: 'LegacyRouter.cls', state: 'delete' },
    ],
  },
  {
    label: 'lwc',
    items: [
      { name: 'oppForecast', state: 'dirty' },
      { name: 'accountTile', state: 'inflight' },
    ],
  },
  { label: 'flows', items: [{ name: 'Opp_Assign_Flow', state: 'synced' }] },
  { label: 'objects', items: [{ name: 'Account.object', state: 'conflict' }] },
  { label: 'permsets', items: [{ name: 'OppForecaster', state: 'synced' }] },
];

type ChatBlock =
  | { kind: 'user'; text: string }
  | { kind: 'assistant'; text: string }
  | { kind: 'divider'; persona: string }
  | { kind: 'thinking'; elapsedS: number }
  | {
      kind: 'tool';
      name: string;
      status: 'running' | 'done' | 'error' | 'warn';
      elapsedMs?: number;
      summary: string;
      detail?: string;
      expanded?: boolean;
    };

type PermissionMode = 'ask' | 'auto-edit' | 'yolo';
const PERMISSION_MODES: PermissionMode[] = ['ask', 'auto-edit', 'yolo'];

const INITIAL_CHAT: ChatBlock[] = [
  { kind: 'divider', persona: 'designer' },
  {
    kind: 'user',
    text: 'Build a forecast LWC that rolls up open Opportunities per AE this quarter.',
  },
  {
    kind: 'assistant',
    text: 'Mapped to a 3-component LWC with @wire ApexMethod. Handing to developer…',
  },
  { kind: 'divider', persona: 'developer' },
  {
    kind: 'tool',
    name: 'sf_query',
    status: 'done',
    elapsedMs: 340,
    summary: 'SELECT Id,Name FROM Opportunity LIMIT 10 → 10 rows',
    detail: 'args   { query: "SELECT Id,Name FROM Opportunity LIMIT 10" }\nresult [ 10 rows ]',
    expanded: false,
  },
  {
    kind: 'assistant',
    text:
      'Generated `OppForecastController.cls` + `oppForecast` LWC bundle.\n' +
      'Requesting reviewer pass before deploy.',
  },
  { kind: 'divider', persona: 'reviewer' },
  {
    kind: 'tool',
    name: 'reviewer',
    status: 'warn',
    summary: 'issues · 2 critical · 1 info',
    detail:
      'critical  OpportunityTrigger:18   FLS not enforced before DML\n' +
      'critical  OppHandler:44           SOQL inside for loop\n' +
      'info      LWC oppForecast         Consider @wire instead of imperative Apex',
    expanded: true,
  },
  { kind: 'divider', persona: 'developer' },
  { kind: 'assistant', text: 'Re-dispatched. Fixing FLS enforcement + bulkifying SOQL.' },
  {
    kind: 'tool',
    name: 'read_file',
    status: 'done',
    elapsedMs: 14,
    summary: 'force-app/main/default/classes/OppHandler.cls → 128 lines',
  },
  {
    kind: 'tool',
    name: 'grep',
    status: 'done',
    elapsedMs: 38,
    summary: "pattern 'for.*SOQL' → 1 match at OppHandler.cls:44",
  },
  {
    kind: 'assistant',
    text:
      'Refactor plan:\n' +
      '  1. Hoist query above the loop, bind to a Map keyed by AE id.\n' +
      '  2. Wrap DML in Security.stripInaccessible() with AccessType.UPDATABLE.\n' +
      '  3. Add OppHandler_Test.bulkUpdate_PositiveCase for 200 rows.',
  },
  {
    kind: 'tool',
    name: 'write_file',
    status: 'done',
    elapsedMs: 22,
    summary: 'OppHandler.cls → 141 lines (+13)',
    detail:
      '- SOQL query hoisted to line 38.\n' +
      '- Security.stripInaccessible wrapper added at line 52.\n' +
      '- Bulkification confirmed for 200+ rows.',
    expanded: false,
  },
  { kind: 'divider', persona: 'reviewer' },
  {
    kind: 'tool',
    name: 'reviewer',
    status: 'done',
    elapsedMs: 1_820,
    summary: 'pass · 0 critical · 0 high · 2 info',
    detail:
      'info  OppHandler:38       Consider caching the AE map for repeated calls.\n' +
      'info  oppForecast.js:24   Consider @wire for reactive refresh.',
  },
  { kind: 'divider', persona: 'qa' },
  {
    kind: 'tool',
    name: 'sf_run_tests',
    status: 'done',
    elapsedMs: 14_320,
    summary: '12 run · 12 pass · cov 88% · 14.3s',
    detail:
      'OppHandler_Test.updateIsWon              pass  420ms\n' +
      'OppHandler_Test.bulkUpdate               pass  1103ms\n' +
      'OppHandler_Test.bulkUpdate_PositiveCase  pass  980ms\n' +
      'OppFlow_Test.happyPath                   pass  660ms\n' +
      'OppForecastController_Test.byOwner       pass  520ms',
    expanded: true,
  },
  {
    kind: 'assistant',
    text: 'All tests green. Coverage 88% (> 75% gate). Handing to deploy-manager.',
  },
  { kind: 'divider', persona: 'deploy-manager' },
  {
    kind: 'tool',
    name: 'ask_user',
    status: 'done',
    elapsedMs: 4_200,
    summary: 'selected: Scratch org (acme-scratch)',
  },
  {
    kind: 'tool',
    name: 'sf_deploy_start',
    status: 'done',
    elapsedMs: 8_940,
    summary: 'deployed 7 components · acme-scratch · 8.9s',
    detail:
      'OppHandler.cls                          updated\n' +
      'OppHandler_Test.cls                     updated\n' +
      'OpportunityTrigger.trigger              updated\n' +
      'oppForecast/oppForecast.js              updated\n' +
      'oppForecast/oppForecast.html            updated\n' +
      'oppForecast/oppForecast.js-meta.xml     updated\n' +
      'OppForecaster (PermissionSet)           created',
  },
  { kind: 'assistant', text: 'Deploy complete. Tree refreshed: all sync dots green.' },
  { kind: 'user', text: 'nice. can you also generate a list view + add it to the page layout?' },
  { kind: 'divider', persona: 'designer' },
  {
    kind: 'assistant',
    text:
      'Scoping: `Opportunities — Open (My AE)` list view + layout assignment.\n' +
      'Filters: IsClosed = false AND Owner.IsActive = true.\n' +
      'Columns: Name · Amount · CloseDate · StageName · Owner.Name.',
  },
  { kind: 'divider', persona: 'developer' },
  {
    kind: 'tool',
    name: 'sf_describe',
    status: 'done',
    elapsedMs: 180,
    summary: 'Opportunity → 42 fields, 3 record types',
  },
  {
    kind: 'tool',
    name: 'qmd_query',
    status: 'done',
    elapsedMs: 92,
    summary: 'lwc-guide: "list view + record page layout" → 4 chunks',
  },
  {
    kind: 'tool',
    name: 'write_file',
    status: 'done',
    elapsedMs: 18,
    summary: 'Opportunity_Open_By_AE.listView-meta.xml → 38 lines',
  },
  {
    kind: 'tool',
    name: 'write_file',
    status: 'done',
    elapsedMs: 14,
    summary: 'Opportunity-Opportunity Layout.layout-meta.xml → 2 edits',
  },
  { kind: 'divider', persona: 'reviewer' },
  {
    kind: 'tool',
    name: 'reviewer',
    status: 'done',
    elapsedMs: 720,
    summary: 'pass · 0 issues',
  },
  { kind: 'divider', persona: 'qa' },
  {
    kind: 'tool',
    name: 'sf_metadata_validate',
    status: 'done',
    elapsedMs: 2_100,
    summary: 'static validation ok · no test rerun needed',
  },
  { kind: 'divider', persona: 'deploy-manager' },
  {
    kind: 'tool',
    name: 'ask_user',
    status: 'done',
    elapsedMs: 3_100,
    summary: 'selected: Scratch org (acme-scratch)',
  },
  {
    kind: 'tool',
    name: 'sf_deploy_start',
    status: 'done',
    elapsedMs: 3_400,
    summary: 'deployed 2 components · 3.4s',
  },
  { kind: 'user', text: '/tests run all' },
  { kind: 'divider', persona: 'qa' },
  {
    kind: 'tool',
    name: 'sf_run_tests',
    status: 'done',
    elapsedMs: 21_400,
    summary: '14 run · 14 pass · cov 89% · 21.4s',
  },
  { kind: 'user', text: 'show me the last 5 deploys for this org' },
  {
    kind: 'tool',
    name: 'sf_deploy_history',
    status: 'done',
    elapsedMs: 90,
    summary: '5 entries',
    detail:
      '08:14:22  OK    7 comp   OppHandler + LWC bundle   8.9s\n' +
      '08:22:41  OK    2 comp   listView + layout         3.4s\n' +
      '07:55:10  OK   14 comp   perm-sets refresh         6.1s\n' +
      '06:40:02  FAIL  3 comp   namespace mismatch        0.9s\n' +
      '06:45:18  OK    3 comp   retry after namespace fix 2.0s',
    expanded: true,
  },
  {
    kind: 'assistant',
    text:
      'Snapshot above. The earlier failure at 6:40 was recovered by the 6:45 retry. ' +
      'No rollback needed.',
  },
  { kind: 'user', text: 'how many open opps > $50k per AE this quarter?' },
  { kind: 'divider', persona: 'developer' },
  {
    kind: 'tool',
    name: 'sf_sobject_describe',
    status: 'done',
    elapsedMs: 120,
    summary: 'Opportunity → 42 fields · Owner lookup confirmed',
  },
  {
    kind: 'tool',
    name: 'sf_query',
    status: 'done',
    elapsedMs: 410,
    summary: 'SOQL → 6 rows · aggregated by OwnerId',
    detail:
      'SELECT Owner.Name ownerName, COUNT(Id) cnt, SUM(Amount) total\n' +
      'FROM Opportunity\n' +
      "WHERE IsClosed = false AND Amount > 50000\n" +
      '  AND CloseDate = THIS_QUARTER\n' +
      'GROUP BY Owner.Name\n' +
      'ORDER BY SUM(Amount) DESC',
    expanded: true,
  },
  {
    kind: 'assistant',
    text:
      'Open opps > $50k this quarter (6 AEs):\n' +
      '  Priya Natarajan   7 opps   $812k\n' +
      '  Marcus Chen       5 opps   $640k\n' +
      '  Dana Ortiz        4 opps   $515k\n' +
      '  Lee Takahashi     3 opps   $298k\n' +
      '  Sam Okoro         2 opps   $184k\n' +
      '  Kim Alvarez       1 opp    $72k\n' +
      'Total pipeline: $2.52M across 22 opps.',
  },
  {
    kind: 'user',
    text:
      "run SOQL: SELECT Id, Name, StageName, Amount FROM Opportunity WHERE Owner.Name = 'Marcus Chen' AND IsClosed = false",
  },
  { kind: 'divider', persona: 'developer' },
  {
    kind: 'tool',
    name: 'sf_query',
    status: 'done',
    elapsedMs: 260,
    summary: '5 rows returned',
    detail:
      '006Hp00001AcmeBid      Acme Tier-2 Expansion   Negotiation    $185,000\n' +
      '006Hp00001InitReN      Initech Renewal FY27    Proposal       $142,500\n' +
      '006Hp00001UmbPOC       Umbrella Security POC   Qualification   $98,000\n' +
      '006Hp00001HoliAdd      Holi Corp Add-On        Prospecting     $124,000\n' +
      '006Hp00001VertPl       Vertex Platform Deal    Negotiation     $90,500',
    expanded: true,
  },
  {
    kind: 'assistant',
    text:
      '5 open opps for Marcus Chen. 2 in Negotiation ($275.5k), 1 Proposal ($142.5k), ' +
      '1 Qualification ($98k), 1 Prospecting ($124k).',
  },
  { kind: 'user', text: 'top 3 accounts by open pipeline?' },
  { kind: 'divider', persona: 'developer' },
  {
    kind: 'tool',
    name: 'sf_query',
    status: 'done',
    elapsedMs: 380,
    summary: 'SOQL aggregate → 3 rows',
    detail:
      'SELECT Account.Name accName, SUM(Amount) total, COUNT(Id) cnt\n' +
      'FROM Opportunity\n' +
      'WHERE IsClosed = false\n' +
      'GROUP BY Account.Name\n' +
      'ORDER BY SUM(Amount) DESC\n' +
      'LIMIT 3',
  },
  {
    kind: 'assistant',
    text:
      'Top-3 accounts by open pipeline:\n' +
      '  1. Acme Corp         $412k   4 opps\n' +
      '  2. Initech           $298k   3 opps\n' +
      '  3. Umbrella Systems  $246k   2 opps',
  },
];

interface PersonaStep {
  name: string;
  state: 'done' | 'active' | 'pending' | 'failed';
}

const PERSONA_PIPELINE: PersonaStep[] = [
  { name: 'designer', state: 'done' },
  { name: 'developer', state: 'active' },
  { name: 'reviewer', state: 'pending' },
  { name: 'qa', state: 'pending' },
  { name: 'deploy-manager', state: 'pending' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SYNC: Record<SyncState, { symbol: string; color: string }> = {
  synced: { symbol: '●', color: OK },
  dirty: { symbol: '◆', color: ERR },
  delete: { symbol: '✗', color: ERR },
  loose: { symbol: '·', color: DIM },
  conflict: { symbol: '!', color: CONFLICT },
  inflight: { symbol: '⋯', color: INFLIGHT },
};

function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function clockHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatusBar({ mode }: { mode: PermissionMode }) {
  const f = FIXTURE;
  const orgColor = f.org.status === 'connected' ? OK : ERR;
  const buildMark = f.build === 'ok' ? '✓' : f.build === 'fail' ? '✗' : '⋯';
  const buildColor = f.build === 'ok' ? OK : f.build === 'fail' ? ERR : INFLIGHT;
  const kb =
    f.knowledge === 'fresh'
      ? { t: '📚 ✓', c: OK }
      : f.knowledge === 'embedding'
        ? { t: '📚 ⋯', c: INFLIGHT }
        : f.knowledge === 'stale'
          ? { t: '📚 !', c: WARN }
          : f.knowledge === 'ref-only'
            ? { t: '📚 ref-only', c: WARN }
            : { t: '📚 ✗', c: ERR };
  const modeBadge =
    mode === 'yolo'
      ? { t: 'YOLO', c: WARN }
      : mode === 'auto-edit'
        ? { t: 'AUTO', c: INFLIGHT }
        : { t: 'ASK', c: DIM };
  const sep = <text content=" · " style={{ fg: DIM }} />;

  return (
    <box
      style={{
        border: true,
        borderColor: BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 3,
        flexShrink: 0,
      }}
    >
      <text content={f.org.alias} style={{ fg: orgColor }} />
      {sep}
      <text content={f.model.provider} style={{ fg: DIM }} />
      <text content={` ${f.model.name}`} />
      {sep}
      <text content={f.session} style={{ fg: DIM }} />
      {sep}
      <text content={`${fmtTokens(f.tokens.used)} / $${f.tokens.cost.toFixed(2)}`} />
      {sep}
      <text content={`${buildMark} build`} style={{ fg: buildColor }} />
      {sep}
      <text
        content={f.tests.failing === 0 ? `${f.tests.coverage}%` : `✗ ${f.tests.failing} failing`}
        style={{ fg: f.tests.failing === 0 ? OK : ERR }}
      />
      {sep}
      <text content={kb.t} style={{ fg: kb.c }} />
      {sep}
      <text content={modeBadge.t} style={{ fg: modeBadge.c, attributes: TextAttributes.BOLD }} />
      {sep}
      <text content={clockHHMM()} style={{ fg: DIM }} />
    </box>
  );
}

function EmbedProgressBar({
  progress,
  collection,
  item,
  done,
  total,
}: {
  progress: number;
  collection: string;
  item: string;
  done: number;
  total: number;
}) {
  const cells = 16;
  const filled = Math.max(0, Math.min(cells, Math.round((progress / 100) * cells)));
  const bar = '█'.repeat(filled) + '░'.repeat(cells - filled);
  const color = progress >= 100 ? OK : ACCENT;
  return (
    <box
      style={{
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 1,
        flexShrink: 0,
        backgroundColor: '#0a1a1f',
      }}
    >
      <text content="Knowledge  " style={{ bg: '#0a1a1f', fg: DIM }} />
      <text content={bar} style={{ bg: '#0a1a1f', fg: color }} />
      <text content={`  ${String(progress).padStart(3)}%  `} style={{ bg: '#0a1a1f' }} />
      <text content={collection} style={{ bg: '#0a1a1f', fg: ACCENT }} />
      <text content={` · ${item} `} style={{ bg: '#0a1a1f', fg: DIM }} />
      <text content={`(${done}/${total})`} style={{ bg: '#0a1a1f', fg: DIM }} />
    </box>
  );
}

function TreePanel() {
  const totalDirty = TREE_GROUPS.reduce(
    (n, g) => n + g.items.filter((i) => i.state !== 'synced' && i.state !== 'loose').length,
    0,
  );
  return (
    <box
      style={{
        border: true,
        borderColor: BORDER,
        width: 30,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'column',
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text content="tree" />
        <text content={` · ${totalDirty} changed`} style={{ fg: DIM }} />
      </box>
      {TREE_GROUPS.map((g) => (
        <box key={g.label} style={{ flexDirection: 'column', marginTop: 1 }}>
          <text content={g.label} style={{ fg: DIM }} />
          {g.items.map((it) => {
            const s = SYNC[it.state];
            const strike = it.state === 'delete';
            return (
              <box key={it.name} style={{ flexDirection: 'row' }}>
                <text content="  " />
                <text content={s.symbol} style={{ fg: s.color }} />
                <text content=" " />
                <text
                  content={it.name}
                  style={{
                    fg: strike ? ERR : undefined,
                    attributes: strike ? TextAttributes.STRIKETHROUGH : TextAttributes.NONE,
                  }}
                />
              </box>
            );
          })}
        </box>
      ))}
      <box style={{ marginTop: 1 }}>
        <text content="Ctrl+B hide · Ctrl+D demo · r refresh" style={{ fg: DIM }} />
      </box>
    </box>
  );
}

const SPLASH_TIPS: string[] = [
  'try "build a forecast LWC" to kick off the designer → developer flow',
  'use /orgs to switch between scratch + sandbox targets',
  'Ctrl+K opens the deploy-target picker · Enter in picker confirms',
  'Shift+Enter adds a newline · paste multi-line prompts freely',
  'Ctrl+D loads the demo conversation · Ctrl+D again to clear',
  '/tests run OppHandler_Test · /settings Account · /users inactive',
];

function pickTip(): string {
  return SPLASH_TIPS[Math.floor(Math.random() * SPLASH_TIPS.length)] ?? SPLASH_TIPS[0]!;
}

function SplashView({ tip }: { tip: string }) {
  return (
    <box
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ascii-font text="sfwiz" font="block" style={{ color: ACCENT }} />
      <box style={{ marginTop: 2, flexDirection: 'row' }}>
        <text content="tab " style={{ fg: ACCENT }} />
        <text content="personas   " style={{ fg: DIM }} />
        <text content="ctrl+k " style={{ fg: ACCENT }} />
        <text content="deploy   " style={{ fg: DIM }} />
        <text content="ctrl+h " style={{ fg: ACCENT }} />
        <text content="help" style={{ fg: DIM }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content="● " style={{ fg: WARN }} />
        <text content="Tip " style={{ fg: WARN, attributes: TextAttributes.BOLD }} />
        <text content={tip} style={{ fg: DIM }} />
      </box>
    </box>
  );
}

const CAPABILITY_HINTS: { icon: string; text: string }[] = [
  { icon: '⚡', text: '"show me open opps > $100k this quarter"' },
  { icon: '🧪', text: '/tests run OppHandler_Test' },
  { icon: '👥', text: '/users list inactive' },
  { icon: '⚙', text: '/settings Account · 42 types' },
  { icon: '🚀', text: '/deploy → picks scratch or existing org' },
  { icon: '❓', text: '/help · Ctrl+H for keybindings' },
];

function CapabilityCard() {
  return (
    <box
      style={{
        border: true,
        borderColor: ACCENT,
        borderStyle: 'rounded',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
      }}
    >
      <text content="what can sfwiz do today" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {CAPABILITY_HINTS.map((h) => (
          <box key={h.text} style={{ flexDirection: 'row' }}>
            <text content={`${h.icon} `} />
            <text content={h.text} style={{ fg: DIM }} />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="Ctrl+B tree · Ctrl+D demo · Ctrl+H help"
          style={{ fg: DIM }}
        />
      </box>
    </box>
  );
}

function Equalizer({
  color = INFLIGHT,
  label,
  bars = 9,
}: {
  color?: string;
  label?: string;
  bars?: number;
}) {
  const HEIGHTS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => Math.floor(Math.random() * HEIGHTS.length)),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setHeights((hs) =>
        hs.map((h) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(0, Math.min(HEIGHTS.length - 1, h + delta));
        }),
      );
    }, 130);
    return () => clearInterval(id);
  }, []);

  const line = heights.map((h) => HEIGHTS[h]).join('');
  return (
    <box style={{ flexDirection: 'row' }}>
      {label ? <text content={`${label}  `} style={{ fg: DIM }} /> : null}
      <text
        content={line}
        style={{ fg: color, attributes: TextAttributes.BOLD }}
      />
    </box>
  );
}

function ToolBlock({
  b,
  onToggle,
}: {
  b: Extract<ChatBlock, { kind: 'tool' }>;
  onToggle?: () => void;
}) {
  const color =
    b.status === 'done'
      ? OK
      : b.status === 'warn'
        ? WARN
        : b.status === 'error'
          ? ERR
          : INFLIGHT;
  const meta = b.elapsedMs != null ? `done · ${b.elapsedMs}ms` : b.status;
  const isRunning = b.status === 'running';
  const hasDetail = !!b.detail;
  const caret = b.expanded ? '▾' : hasDetail ? '▸' : '·';
  return (
    <box
      style={{ flexDirection: 'column' }}
      onMouseDown={(e) => {
        if (hasDetail && e.modifiers.ctrl) {
          onToggle?.();
        }
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text content={`${caret} `} style={{ fg: color }} />
        <text content={b.name} />
        <text content={` (${meta}) `} style={{ fg: DIM }} />
        <text content={b.summary} />
        {hasDetail ? (
          <text
            content={b.expanded ? '  · ⌃click to collapse' : '  · ⌃click to expand'}
            style={{ fg: DIM }}
          />
        ) : null}
      </box>
      {isRunning ? (
        <box style={{ marginLeft: 2 }}>
          <Equalizer color={INFLIGHT} />
        </box>
      ) : null}
      {b.expanded && b.detail
        ? b.detail.split('\n').map((line, i) => (
            <box key={`${b.name}-d-${i}`} style={{ flexDirection: 'row' }}>
              <text content="  " />
              <text content={line} style={{ fg: DIM }} />
            </box>
          ))
        : null}
    </box>
  );
}

function ChatBlocks({
  blocks,
  onToggleTool,
}: {
  blocks: ChatBlock[];
  onToggleTool?: (index: number) => void;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        const key = `b-${i}`;
        if (b.kind === 'user') {
          return (
            <box
              key={key}
              style={{
                flexDirection: 'row',
                backgroundColor: '#0d2a33',
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <text content="❯ " style={{ bg: '#0d2a33', fg: ACCENT }} />
              <text content={b.text} style={{ bg: '#0d2a33' }} />
            </box>
          );
        }
        if (b.kind === 'assistant') {
          return (
            <box key={key} style={{ flexDirection: 'column', marginBottom: 1 }}>
              {b.text.split('\n').map((line, j) => (
                <text key={`${key}-${j}`} content={line} />
              ))}
            </box>
          );
        }
        if (b.kind === 'divider') {
          return (
            <text
              key={key}
              content={`── persona → ${b.persona} ──────────────────────────`}
              style={{ fg: DIM }}
            />
          );
        }
        if (b.kind === 'thinking') {
          return (
            <box key={key} style={{ flexDirection: 'column', marginBottom: 1 }}>
              <box style={{ flexDirection: 'row' }}>
                <text content="▍ " style={{ fg: INFLIGHT }} />
                <text content={`thinking… ${b.elapsedS}s`} style={{ fg: DIM }} />
              </box>
              <box style={{ marginLeft: 2 }}>
                <Equalizer color={INFLIGHT} />
              </box>
            </box>
          );
        }
        return (
          <ToolBlock key={key} b={b} onToggle={() => onToggleTool?.(i)} />
        );
      })}
    </>
  );
}

function ChatPanel({
  blocks,
  onToggleTool,
}: {
  blocks: ChatBlock[];
  onToggleTool?: (index: number) => void;
}) {
  return (
    <scrollbox
      style={{
        rootOptions: { backgroundColor: 'transparent' },
        viewportOptions: { backgroundColor: 'transparent' },
        wrapperOptions: { backgroundColor: 'transparent' },
        contentOptions: { backgroundColor: 'transparent' },
        scrollbarOptions: {
          showArrows: true,
          trackOptions: { foregroundColor: ACCENT, backgroundColor: BORDER },
        },
        border: true,
        borderColor: BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexGrow: 1,
      }}
      contentOptions={{ flexDirection: 'column' }}
    >
      {blocks.length === 0 ? (
        <CapabilityCard />
      ) : (
        <ChatBlocks blocks={blocks} onToggleTool={onToggleTool} />
      )}
    </scrollbox>
  );
}

function PersonaView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Pipeline" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {PERSONA_PIPELINE.map((p) => {
          const sym =
            p.state === 'done'
              ? '✓'
              : p.state === 'active'
                ? '▸'
                : p.state === 'failed'
                  ? '✗'
                  : '·';
          const color =
            p.state === 'done'
              ? OK
              : p.state === 'active'
                ? ACCENT
                : p.state === 'failed'
                  ? ERR
                  : DIM;
          return (
            <box key={p.name} style={{ flexDirection: 'row' }}>
              <text content={`${sym} `} style={{ fg: color }} />
              <text content={p.name} />
              <text content={` ${p.state}`} style={{ fg: DIM }} />
            </box>
          );
        })}
      </box>
    </box>
  );
}

function TestsView() {
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

function SoqlView() {
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

function KnowledgeView() {
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

function DeployView() {
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

type SideView = 'persona' | 'tests' | 'soql' | 'knowledge' | 'deploy';
const SIDE_VIEWS: SideView[] = ['persona', 'tests', 'soql', 'knowledge', 'deploy'];

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

function SidePanel({ view }: { view: SideView }) {
  return (
    <box
      style={{
        border: true,
        borderColor: BORDER,
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

function ToastBar({ msg }: { msg: string }) {
  return (
    <box
      style={{
        backgroundColor: OK,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 1,
        flexShrink: 0,
      }}
    >
      <text content="OKAY! " style={{ bg: OK, fg: '#000000', attributes: TextAttributes.BOLD }} />
      <text content={msg} style={{ bg: OK, fg: '#000000' }} />
    </box>
  );
}

const INPUT_KEY_BINDINGS = [
  { name: 'return', action: 'submit' as const },
  { name: 'return', shift: true, action: 'newline' as const },
  { name: 'return', meta: true, action: 'newline' as const },
  { name: 'return', ctrl: true, action: 'newline' as const },
];

function InputLine({
  inputRef,
  focused,
  onSubmit,
}: {
  inputRef: React.RefObject<TextareaRenderable | null>;
  focused: boolean;
  onSubmit: () => void;
}) {
  return (
    <box
      style={{
        border: true,
        borderColor: focused ? ACCENT : BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <box style={{ flexDirection: 'row', flexShrink: 0 }}>
        <text content="❯ " style={{ fg: ACCENT }} />
        <textarea
          ref={inputRef}
          focused={focused}
          keyBindings={INPUT_KEY_BINDINGS}
          onSubmit={onSubmit}
          placeholder='ask anything... "Fix FLS on OppHandler"'
          placeholderColor={DIM}
          style={{ flexGrow: 1, minHeight: 1, maxHeight: 8 }}
        />
      </box>
    </box>
  );
}

function AskUserModal({ selected }: { selected: number }) {
  const options = [
    'Scratch org (acme-scratch)',
    'Existing org (acme-uat) — prod-adjacent',
    "Local only (validate, don't deploy)",
    'Cancel',
  ];
  const BG = '#1a1206';
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: WARN,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 62,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <text
        content="── persona: deploy-manager ────────────────────"
        style={{ bg: BG, fg: DIM }}
      />
      <box style={{ marginTop: 1 }}>
        <text content="Deploy target?" style={{ bg: BG }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {options.map((o, i) => (
          <text
            key={o}
            content={`${i === selected ? '● ' : '○ '}${o}`}
            style={{ bg: BG, fg: i === selected ? ACCENT : undefined }}
          />
        ))}
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="preview ───────────────────────────────────" style={{ bg: BG, fg: DIM }} />
        <text content=" sf project deploy start \\" style={{ bg: BG, fg: DIM }} />
        <text content="   --target-org acme-scratch \\" style={{ bg: BG, fg: DIM }} />
        <text content="   --test-level RunLocalTests" style={{ bg: BG, fg: DIM }} />
      </box>
      <box style={{ marginTop: 1 }}>
        <text content="↑/↓ select · Enter confirm · Esc cancel · Ctrl+K close demo" style={{ bg: BG, fg: DIM }} />
      </box>
    </box>
  );
}

function TrustWorkspacePrompt({ cwd, selected }: { cwd: string; selected: number }) {
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: WARN,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 72,
        flexDirection: 'column',
        backgroundColor: '#1a1206',
      }}
    >
      <text
        content="Accessing workspace:"
        style={{ bg: '#1a1206', fg: WARN, attributes: TextAttributes.BOLD }}
      />
      <box style={{ marginTop: 1 }}>
        <text content={cwd} style={{ bg: '#1a1206' }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text
          content="Quick safety check: Is this a project you created or one you trust?"
          style={{ bg: '#1a1206', fg: DIM }}
        />
        <text
          content="(Your own code, a well-known OSS project, or work from your team.)"
          style={{ bg: '#1a1206', fg: DIM }}
        />
        <text
          content="If not, take a moment to review what's in this folder first."
          style={{ bg: '#1a1206', fg: DIM }}
        />
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="sfwiz will be able to read, edit, and execute files here."
          style={{ bg: '#1a1206' }}
        />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {['Yes, I trust this folder', 'No, exit'].map((label, i) => (
          <box key={label} style={{ flexDirection: 'row' }}>
            <text
              content={i === selected ? '❯ ' : '  '}
              style={{ bg: '#1a1206', fg: ACCENT }}
            />
            <text content={`${i + 1}. `} style={{ bg: '#1a1206', fg: DIM }} />
            <text
              content={label}
              style={{ bg: '#1a1206', fg: i === selected ? ACCENT : undefined }}
            />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="↑/↓ choose · Enter confirm · Esc cancel"
          style={{ bg: '#1a1206', fg: DIM }}
        />
      </box>
    </box>
  );
}

interface PaletteEntry {
  id: string;
  label: string;
  desc: string;
  accel?: string;
}

const PALETTE_ENTRIES: PaletteEntry[] = [
  { id: 'new-session', label: 'New Session', desc: 'start fresh session', accel: 'Ctrl+N' },
  { id: 'sessions', label: 'Sessions', desc: 'list past sessions', accel: 'Ctrl+S' },
  { id: 'switch-model', label: 'Switch Model', desc: 'pick provider / model', accel: 'Ctrl+L' },
  { id: 'thinking', label: 'Enable Thinking Mode', desc: 'extended thinking (Opus)' },
  { id: 'yolo', label: 'Toggle Yolo Mode', desc: 'auto-approve non-destructive ops' },
  { id: 'permissions', label: '/permissions', desc: 'ask / auto-edit / yolo' },
  { id: 'orgs', label: '/orgs', desc: 'list + switch Salesforce orgs' },
  { id: 'tests', label: '/tests', desc: 'run Apex tests' },
  { id: 'deploy', label: '/deploy', desc: 'deploy to target org' },
  { id: 'settings', label: '/settings', desc: '42-type settings registry' },
  { id: 'users', label: '/users', desc: 'list + manage users' },
  { id: 'knowledge', label: '/knowledge', desc: 'qmd collections' },
  { id: 'learn', label: '/learn refresh', desc: 'refresh knowledge' },
  { id: 'provider', label: '/provider', desc: 'switch LLM provider' },
  { id: 'help', label: 'Toggle Help', desc: 'keybindings overlay', accel: 'Ctrl+H' },
  { id: 'init', label: 'Initialize Project', desc: 'seed sfwiz.config' },
  { id: 'quit', label: 'Quit', desc: 'exit sfwiz', accel: 'Ctrl+Q' },
];

function fuzzyMatch(entry: PaletteEntry, q: string): boolean {
  if (q.length === 0) return true;
  const hay = `${entry.label} ${entry.desc}`.toLowerCase();
  const needle = q.toLowerCase();
  let i = 0;
  for (const ch of hay) {
    if (ch === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return false;
}

function CommandPalette({
  filter,
  selected,
  entries,
}: {
  filter: string;
  selected: number;
  entries: PaletteEntry[];
}) {
  const visible = entries.slice(0, 9);
  const BG = '#061a1f';
  const ACTIVE_BG = '#0d3a44';
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: ACCENT,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 68,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text
          content="Commands "
          style={{ bg: BG, fg: ACCENT, attributes: TextAttributes.BOLD }}
        />
        <text content={'/'.repeat(50)} style={{ bg: BG, fg: ACCENT }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content="❯ " style={{ bg: BG, fg: ACCENT }} />
        <text
          content={filter.length === 0 ? 'type to filter' : filter}
          style={{ bg: BG, fg: filter.length === 0 ? DIM : undefined }}
        />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {visible.length === 0 ? (
          <text content="no matches" style={{ bg: BG, fg: DIM }} />
        ) : (
          visible.map((e, i) => {
            const active = i === selected;
            const bg = active ? ACTIVE_BG : BG;
            return (
              <box key={e.id} style={{ flexDirection: 'row', backgroundColor: bg }}>
                <text
                  content={active ? '▍ ' : '  '}
                  style={{ bg, fg: active ? ACCENT : DIM }}
                />
                <text
                  content={e.label.padEnd(26)}
                  style={{
                    bg,
                    fg: active ? ACCENT : undefined,
                    attributes: active ? TextAttributes.BOLD : TextAttributes.NONE,
                  }}
                />
                <text
                  content={e.desc.slice(0, 28).padEnd(28)}
                  style={{ bg, fg: DIM }}
                />
                <text content={e.accel ?? ''} style={{ bg, fg: DIM }} />
              </box>
            );
          })
        )}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="tab switch · ↑/↓ choose · enter confirm · esc cancel"
          style={{ bg: BG, fg: DIM }}
        />
      </box>
    </box>
  );
}

function HelpOverlay() {
  const rows: [string, string][] = [
    ['mouse wheel', 'fluid scroll in chat'],
    ['PgUp / PgDn', 'scroll chat by page'],
    ['Enter', 'submit input'],
    ['Shift/Alt+Enter', 'newline in input'],
    ['Ctrl+B', 'toggle file tree'],
    ['Alt+[ / Alt+]', 'cycle side panel view'],
    ['Shift+Tab', 'cycle perm mode (ask/auto/yolo)'],
    ['Ctrl+D', 'load/clear demo conversation'],
    ['Ctrl+T', 'toggle toast bar'],
    ['Ctrl+K', 'demo: ask_user modal'],
    ['/ (at empty input)', 'open command palette'],
    ['Ctrl+P', 'command palette (Crush-style)'],
    ['Ctrl+G', 'demo: embed progress bar'],
    ['Ctrl+Y', 'demo: thinking line + cloud'],
    ['Ctrl+R', 'demo: running deploy (toggle)'],
    ['Ctrl+W', 'demo: trust-workspace prompt'],
    ['Ctrl+Click tool', 'expand/collapse tool block'],
    ['Ctrl+H', 'this help'],
    ['Ctrl+C / Ctrl+Q', 'quit'],
  ];
  const BG = '#0d1117';
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: ACCENT,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 64,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <text
        content="Keybindings"
        style={{ bg: BG, attributes: TextAttributes.BOLD }}
      />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {rows.map(([k, v]) => (
          <box key={k} style={{ flexDirection: 'row', backgroundColor: BG }}>
            <text content={k.padEnd(20)} style={{ bg: BG, fg: ACCENT }} />
            <text content={v} style={{ bg: BG }} />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1, backgroundColor: BG }}>
        <text content="Esc / Ctrl+H to close" style={{ bg: BG, fg: DIM }} />
      </box>
    </box>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const EMBED_ITEMS = [
  'Database.update',
  'Schema.SObjectType',
  'System.AccessLevel',
  'Messaging.SingleEmailMessage',
  'Test.startTest',
  'UserInfo.getUserId',
  'Trigger.newMap',
  'Limits.getDmlStatements',
  'Http.send',
  'System.enqueueJob',
];

function App() {
  const { width, height } = useTerminalDimensions();
  const [treeOpen, setTreeOpen] = useState(false);
  const [sideView, setSideView] = useState<SideView>('persona');
  const [blocks, setBlocks] = useState<ChatBlock[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSel, setModalSel] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [trustOpen, setTrustOpen] = useState(true);
  const [trustSel, setTrustSel] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState('');
  const [paletteSel, setPaletteSel] = useState(0);
  const [mode, setMode] = useState<PermissionMode>('ask');
  const [embedProgress, setEmbedProgress] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(
    'trust workspace to continue · Enter to confirm',
  );
  const inputRef = useRef<TextareaRenderable | null>(null);
  const splashTip = useMemo(() => pickTip(), []);
  const isSplash = blocks.length === 0;
  const cwd = useMemo(() => process.cwd(), []);

  const paletteMatches = useMemo(
    () => PALETTE_ENTRIES.filter((e) => fuzzyMatch(e, paletteFilter)),
    [paletteFilter],
  );

  // Embed-progress animation: tick 0 → 100 over ~10 s.
  useEffect(() => {
    if (embedProgress === null) return;
    if (embedProgress >= 100) {
      const done = setTimeout(() => {
        setEmbedProgress(null);
        setToast('knowledge embed complete · 243 chunks indexed');
      }, 1500);
      return () => clearTimeout(done);
    }
    const id = setTimeout(() => {
      setEmbedProgress((p) => (p === null ? null : Math.min(100, p + 3)));
    }, 260);
    return () => clearTimeout(id);
  }, [embedProgress]);

  const embedCurrent = (() => {
    if (embedProgress === null) return null;
    const total = EMBED_ITEMS.length * 25;
    const done = Math.floor((embedProgress / 100) * total);
    const item = EMBED_ITEMS[done % EMBED_ITEMS.length] ?? EMBED_ITEMS[0]!;
    return { collection: 'apex-ref', item, done, total };
  })();

  const handleSubmit = () => {
    const t = inputRef.current?.plainText ?? '';
    if (t.trim().length === 0) {
      if (isSplash) setToast('type something first · splash stays until you ask');
      return;
    }
    setBlocks((bs) => [...bs, { kind: 'user', text: t.trim() }]);
    inputRef.current?.setText('');
  };

  const cyclePermissionMode = () => {
    setMode((m) => {
      const i = PERMISSION_MODES.indexOf(m);
      const next = PERMISSION_MODES[(i + 1) % PERMISSION_MODES.length] ?? 'ask';
      setToast(
        next === 'yolo'
          ? 'permission mode: YOLO · auto-approve all non-destructive ops'
          : next === 'auto-edit'
            ? 'permission mode: AUTO · auto-approve edits inside cwd'
            : 'permission mode: ASK · prompt per file-op',
      );
      return next;
    });
  };

  const toggleThinking = () => {
    setBlocks((bs) => {
      const last = bs[bs.length - 1];
      if (last && last.kind === 'thinking') return bs.slice(0, -1);
      return [...bs, { kind: 'thinking', elapsedS: Math.floor(Math.random() * 4) + 1 }];
    });
  };

  useKeyboard((key) => {
    if (trustOpen) {
      if (key.name === 'up') {
        setTrustSel((s) => Math.max(0, s - 1));
        key.preventDefault();
      } else if (key.name === 'down') {
        setTrustSel((s) => Math.min(1, s + 1));
        key.preventDefault();
      } else if (key.name === 'return') {
        if (trustSel === 0) {
          setTrustOpen(false);
          setToast(`workspace trusted · added to ~/.sfwiz/trusted-workspaces.json`);
        } else {
          setToast('would exit · demo stays running (Ctrl+Q to really quit)');
        }
        key.preventDefault();
      } else if (key.name === 'escape') {
        setToast('would exit · demo stays running');
        key.preventDefault();
      } else if (key.sequence === '1') {
        setTrustSel(0);
        key.preventDefault();
      } else if (key.sequence === '2') {
        setTrustSel(1);
        key.preventDefault();
      }
      return;
    }
    if (paletteOpen) {
      if (key.name === 'escape' || (key.ctrl && key.name === 'p')) {
        setPaletteOpen(false);
        key.preventDefault();
      } else if (key.name === 'up') {
        setPaletteSel((s) => Math.max(0, s - 1));
        key.preventDefault();
      } else if (key.name === 'down') {
        setPaletteSel((s) =>
          Math.min(Math.min(paletteMatches.length, 9) - 1, s + 1),
        );
        key.preventDefault();
      } else if (key.name === 'return') {
        const pick = paletteMatches[paletteSel];
        if (pick) {
          if (pick.id === 'yolo') {
            setMode('yolo');
            setToast('permission mode: YOLO · auto-approve all non-destructive ops');
          } else if (pick.id === 'permissions') {
            cyclePermissionMode();
          } else if (pick.id === 'quit') {
            setToast('would quit · Ctrl+Q to really quit');
          } else {
            setToast(`would run: ${pick.label}`);
          }
        }
        setPaletteOpen(false);
        key.preventDefault();
      } else if (key.name === 'backspace') {
        setPaletteFilter((f) => f.slice(0, -1));
        setPaletteSel(0);
        key.preventDefault();
      } else if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
        const code = key.sequence.charCodeAt(0);
        if (code >= 32 && code < 127) {
          setPaletteFilter((f) => f + key.sequence);
          setPaletteSel(0);
          key.preventDefault();
        }
      }
      return;
    }
    if (helpOpen) {
      if (key.name === 'escape' || (key.ctrl && key.name === 'h')) {
        setHelpOpen(false);
        key.preventDefault();
      }
      return;
    }
    if (modalOpen) {
      if (key.name === 'up') {
        setModalSel((s) => Math.max(0, s - 1));
        key.preventDefault();
      } else if (key.name === 'down') {
        setModalSel((s) => Math.min(3, s + 1));
        key.preventDefault();
      } else if (key.name === 'return' || key.name === 'escape' || (key.ctrl && key.name === 'k')) {
        setModalOpen(false);
        key.preventDefault();
      }
      return;
    }
    // Global shortcuts — preventDefault so textarea does not consume them
    // (textarea binds Ctrl+D=delete, Ctrl+K=delete-to-line-end etc).
    if (key.ctrl && key.name === 'h') {
      setHelpOpen(true);
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'q') {
      key.preventDefault();
      renderer.destroy();
      process.nextTick(() => process.exit(0));
      return;
    }
    // Ctrl+C handled by createCliRenderer({ exitOnCtrlC: true }).
    if (key.ctrl && key.name === 'b') {
      setTreeOpen((v) => !v);
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'w') {
      setTrustOpen(true);
      setTrustSel(0);
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'p') {
      setPaletteOpen(true);
      setPaletteFilter('');
      setPaletteSel(0);
      key.preventDefault();
      return;
    }
    // Bare "/" at start of empty input → open palette (Claude-Code / Crush style).
    if (key.sequence === '/' && !key.ctrl && !key.meta && !key.shift) {
      const cur = inputRef.current?.plainText ?? '';
      if (cur.length === 0) {
        setPaletteOpen(true);
        setPaletteFilter('');
        setPaletteSel(0);
        key.preventDefault();
        return;
      }
    }
    if (key.ctrl && key.name === 'g') {
      setEmbedProgress((p) => (p === null ? 0 : null));
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'y') {
      toggleThinking();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'r') {
      setBlocks((bs) => {
        const last = bs[bs.length - 1];
        if (last && last.kind === 'tool' && last.name === 'sf_deploy_start' && last.status === 'running') {
          const doneBlock: ChatBlock = {
            kind: 'tool',
            name: 'sf_deploy_start',
            status: 'done',
            elapsedMs: 6_800,
            summary: 'deployed 4 components · acme-scratch · 6.8s',
          };
          return [...bs.slice(0, -1), doneBlock];
        }
        const runningBlock: ChatBlock = {
          kind: 'tool',
          name: 'sf_deploy_start',
          status: 'running',
          summary: 'deploying to acme-scratch… 4 components',
        };
        return [...bs, runningBlock];
      });
      key.preventDefault();
      return;
    }
    if (key.shift && key.name === 'tab') {
      cyclePermissionMode();
      key.preventDefault();
      return;
    }
    // Side-panel cycle on Alt+[ / Alt+] so bare [ / ] type into input.
    if (key.meta && key.name === '[') {
      const i = SIDE_VIEWS.indexOf(sideView);
      setSideView(SIDE_VIEWS[(i - 1 + SIDE_VIEWS.length) % SIDE_VIEWS.length] ?? 'persona');
      key.preventDefault();
      return;
    }
    if (key.meta && key.name === ']') {
      const i = SIDE_VIEWS.indexOf(sideView);
      setSideView(SIDE_VIEWS[(i + 1) % SIDE_VIEWS.length] ?? 'persona');
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'd') {
      setBlocks((bs) => {
        const next = bs.length === 0 ? INITIAL_CHAT : [];
        setToast(next.length === 0 ? 'cleared chat' : `loaded demo · ${next.length} blocks`);
        return next;
      });
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 't') {
      setToast((v) =>
        v ? null : 'deployed 2 components to acme-scratch · 3.4s · 14 tests pass',
      );
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'k') {
      setModalOpen(true);
      setModalSel(0);
      key.preventDefault();
      return;
    }
  });

  return (
    <box style={{ flexDirection: 'column', width, height }}>
      <StatusBar mode={mode} />
      {embedCurrent ? (
        <EmbedProgressBar
          progress={embedProgress ?? 0}
          collection={embedCurrent.collection}
          item={embedCurrent.item}
          done={embedCurrent.done}
          total={embedCurrent.total}
        />
      ) : null}
      {isSplash ? (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          <SplashView tip={splashTip} />
          <SidePanel view={sideView} />
        </box>
      ) : (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          {treeOpen ? <TreePanel /> : null}
          <ChatPanel
            blocks={blocks}
            onToggleTool={(index) =>
              setBlocks((bs) => {
                const next = [...bs];
                const b = next[index];
                if (b && b.kind === 'tool') {
                  next[index] = { ...b, expanded: !b.expanded };
                }
                return next;
              })
            }
          />
          <SidePanel view={sideView} />
        </box>
      )}
      {toast ? <ToastBar msg={toast} /> : null}
      <InputLine
        inputRef={inputRef}
        focused={!modalOpen && !helpOpen && !trustOpen && !paletteOpen}
        onSubmit={handleSubmit}
      />
      {modalOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 3),
            left: Math.floor((width - 62) / 2),
          }}
        >
          <AskUserModal selected={modalSel} />
        </box>
      ) : null}
      {helpOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 4),
            left: Math.floor((width - 54) / 2),
          }}
        >
          <HelpOverlay />
        </box>
      ) : null}
      {paletteOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <CommandPalette
            filter={paletteFilter}
            selected={paletteSel}
            entries={paletteMatches}
          />
        </box>
      ) : null}
      {trustOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 72) / 2),
          }}
        >
          <TrustWorkspacePrompt cwd={cwd} selected={trustSel} />
        </box>
      ) : null}
    </box>
  );
}

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 60,
  useMouse: true,
  useKittyKeyboard: {},
});

// Safety net: if destroy() is skipped (uncaught crash, SIGHUP on terminal close),
// still reset the terminal so mouse-tracking doesn't spew CSI sequences after exit.
const restoreTty = () => {
  try {
    process.stdout.write(
      '\x1b[?1000l\x1b[?1002l\x1b[?1003l\x1b[?1006l\x1b[?1015l\x1b[?25h\x1b[?1049l',
    );
  } catch {}
};
process.on('exit', restoreTty);
for (const sig of ['SIGHUP', 'SIGTERM', 'SIGQUIT'] as const) {
  process.on(sig, () => {
    try {
      renderer.destroy();
    } catch {}
    restoreTty();
    process.exit(0);
  });
}

createRoot(renderer).render(<App />);
