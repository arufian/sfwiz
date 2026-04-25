import type { ChatBlock } from '~/types/ui';

// ─── Fixtures ─────────────────────────────────────────────────────────────────

export const FIXTURE = {
  org: { alias: 'acme-scratch', status: 'connected' as const },
  model: { provider: 'anthropic', name: 'Sonnet 4.6' },
  session: 's:9f2c',
  tokens: { used: 12_400, cost: 0.07 },
  build: 'ok' as 'ok' | 'fail' | 'running',
  tests: { coverage: 91, failing: 0 },
  knowledge: 'fresh' as 'fresh' | 'embedding' | 'stale' | 'ref-only' | 'error',
};

// Task 2: every block gets id: crypto.randomUUID()
export const INITIAL_CHAT: ChatBlock[] = [
  { id: crypto.randomUUID(), kind: 'divider', persona: 'designer' },
  {
    id: crypto.randomUUID(),
    kind: 'user',
    text: 'Build a forecast LWC that rolls up open Opportunities per AE this quarter.',
  },
  {
    id: crypto.randomUUID(),
    kind: 'assistant',
    text: 'Mapped to a 3-component LWC with @wire ApexMethod. Handing to developer…',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_query',
    status: 'done',
    elapsedMs: 340,
    summary: 'SELECT Id,Name FROM Opportunity LIMIT 10 → 10 rows',
    detail: 'args   { query: "SELECT Id,Name FROM Opportunity LIMIT 10" }\nresult [ 10 rows ]',
    expanded: false,
  },
  {
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      'Generated `OppForecastController.cls` + `oppForecast` LWC bundle.\n' +
      'Requesting reviewer pass before deploy.',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'reviewer' },
  {
    id: crypto.randomUUID(),
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
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  { id: crypto.randomUUID(), kind: 'assistant', text: 'Re-dispatched. Fixing FLS enforcement + bulkifying SOQL.' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'read_file',
    status: 'done',
    elapsedMs: 14,
    summary: 'force-app/main/default/classes/OppHandler.cls → 128 lines',
  },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'grep',
    status: 'done',
    elapsedMs: 38,
    summary: "pattern 'for.*SOQL' → 1 match at OppHandler.cls:44",
  },
  {
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      'Refactor plan:\n' +
      '  1. Hoist query above the loop, bind to a Map keyed by AE id.\n' +
      '  2. Wrap DML in Security.stripInaccessible() with AccessType.UPDATABLE.\n' +
      '  3. Add OppHandler_Test.bulkUpdate_PositiveCase for 200 rows.',
  },
  {
    id: crypto.randomUUID(),
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
  { id: crypto.randomUUID(), kind: 'divider', persona: 'reviewer' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'reviewer',
    status: 'done',
    elapsedMs: 1_820,
    summary: 'pass · 0 critical · 0 high · 2 info',
    detail:
      'info  OppHandler:38       Consider caching the AE map for repeated calls.\n' +
      'info  oppForecast.js:24   Consider @wire for reactive refresh.',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'qa' },
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    kind: 'assistant',
    text: 'All tests green. Coverage 88% (> 75% gate). Handing to deploy-manager.',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'deploy-manager' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'ask_user',
    status: 'done',
    elapsedMs: 4_200,
    summary: 'selected: Scratch org (acme-scratch)',
  },
  {
    id: crypto.randomUUID(),
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
  { id: crypto.randomUUID(), kind: 'assistant', text: 'Deploy complete. Tree refreshed: all sync dots green.' },
  { id: crypto.randomUUID(), kind: 'user', text: 'nice. can you also generate a list view + add it to the page layout?' },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'designer' },
  {
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      'Scoping: `Opportunities — Open (My AE)` list view + layout assignment.\n' +
      'Filters: IsClosed = false AND Owner.IsActive = true.\n' +
      'Columns: Name · Amount · CloseDate · StageName · Owner.Name.',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_describe',
    status: 'done',
    elapsedMs: 180,
    summary: 'Opportunity → 42 fields, 3 record types',
  },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'qmd_query',
    status: 'done',
    elapsedMs: 92,
    summary: 'lwc-guide: "list view + record page layout" → 4 chunks',
  },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'write_file',
    status: 'done',
    elapsedMs: 18,
    summary: 'Opportunity_Open_By_AE.listView-meta.xml → 38 lines',
  },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'write_file',
    status: 'done',
    elapsedMs: 14,
    summary: 'Opportunity-Opportunity Layout.layout-meta.xml → 2 edits',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'reviewer' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'reviewer',
    status: 'done',
    elapsedMs: 720,
    summary: 'pass · 0 issues',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'qa' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_metadata_validate',
    status: 'done',
    elapsedMs: 2_100,
    summary: 'static validation ok · no test rerun needed',
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'deploy-manager' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'ask_user',
    status: 'done',
    elapsedMs: 3_100,
    summary: 'selected: Scratch org (acme-scratch)',
  },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_deploy_start',
    status: 'done',
    elapsedMs: 3_400,
    summary: 'deployed 2 components · 3.4s',
  },
  { id: crypto.randomUUID(), kind: 'user', text: '/tests run all' },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'qa' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_run_tests',
    status: 'done',
    elapsedMs: 21_400,
    summary: '14 run · 14 pass · cov 89% · 21.4s',
  },
  { id: crypto.randomUUID(), kind: 'user', text: 'show me the last 5 deploys for this org' },
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      'Snapshot above. The earlier failure at 6:40 was recovered by the 6:45 retry. ' +
      'No rollback needed.',
  },
  { id: crypto.randomUUID(), kind: 'user', text: 'how many open opps > $50k per AE this quarter?' },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  {
    id: crypto.randomUUID(),
    kind: 'tool',
    name: 'sf_sobject_describe',
    status: 'done',
    elapsedMs: 120,
    summary: 'Opportunity → 42 fields · Owner lookup confirmed',
  },
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    kind: 'user',
    text:
      "run SOQL: SELECT Id, Name, StageName, Amount FROM Opportunity WHERE Owner.Name = 'Marcus Chen' AND IsClosed = false",
  },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      '5 open opps for Marcus Chen. 2 in Negotiation ($275.5k), 1 Proposal ($142.5k), ' +
      '1 Qualification ($98k), 1 Prospecting ($124k).',
  },
  { id: crypto.randomUUID(), kind: 'user', text: 'top 3 accounts by open pipeline?' },
  { id: crypto.randomUUID(), kind: 'divider', persona: 'developer' },
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    kind: 'assistant',
    text:
      'Top-3 accounts by open pipeline:\n' +
      '  1. Acme Corp         $412k   4 opps\n' +
      '  2. Initech           $298k   3 opps\n' +
      '  3. Umbrella Systems  $246k   2 opps',
  },
];
