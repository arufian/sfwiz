# Phase 4 — Implementation

Status: **ready**. Next: `phase-5-test.md`.

Contract for the build. Milestones executed in order unless marked parallel-safe. Each future session can pick up a single milestone without loading the whole plan.

---

## 0. Dev workflow conventions

- **Runtime**: Bun ≥ 1.1, Node compatibility ≥ 22 (for qmd peer).
- **Language**: TypeScript 5.6, `strict: true`, no implicit any.
- **Format + lint**: Biome (single tool). Config `biome.json` at repo root. Hook: format-on-save via editor.
- **Test runner**: `bun test`. No Jest / Vitest.
- **TDD**: every milestone starts with a failing test ("red"), then implementation ("green"), then refactor. Tests live next to code as `*.test.ts`.
- **Package manager**: `bun install`. Lockfile `bun.lock` committed.
- **Schemas**: Zod everywhere config / tool args / persona artifacts / session records cross trust boundaries. Infer types from Zod, not the other way round.
- **Imports**: bare specifiers + `~/*` path alias to `src/*`. Relative imports only within a feature folder.
- **No deps beyond whitelist**:
  - Runtime: `@anthropic-ai/sdk` (main loop — `messages.stream()` + manual tool dispatch + prompt-caching beta), `@anthropic-ai/claude-agent-sdk` (≥ 0.2.111 — subagents via `query()` + `AgentDefinition`; Opus 4.7 requires this version floor), `@modelcontextprotocol/sdk`, `jsforce`, `@salesforce/core`, `@opentui/react`, `@opentui/core`, `react`, `react-reconciler`, `chokidar`, `cheerio`, `turndown`, `zod`, `dayjs`. **Ink removed** (swapped to opentui during PoC). **Vercel AI SDK removed** (`ai`, `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/google`, `@ai-sdk/groq`) — v1 is Anthropic-only; multi-provider deferred to v2. Direct Anthropic SDK gives full control over the manual tool loop and avoids the cross-provider tool-call parity layer.
  - Dev: `@biomejs/biome`, `bun-types`, `@types/turndown`.
- **Commit style**: free-form but each milestone ends with a tagged commit `m01`, `m02`, … (tags, not branches).
- **Cache discipline** (Anthropic): pass `betas: ['prompt-caching-2024-07-31']` to `anthropic.messages.stream()` and tag stable blocks (system prompt, tool-defs, pinned reference snippets) with `cache_control: { type: 'ephemeral' }`. The Agent SDK enables prompt caching by default for subagents — no explicit flag needed; just keep system prompts stable. Volatile knowledge results (qmd query output, fresh tool results) are NOT cached.

---

## 1. Milestone summary

All milestones are MVP. `.agent` viewer (M16) deferred to v0.2 — judges lack Agentforce-licensed orgs.

| # | Milestone | Depends on | MVP |
|---|-----------|-----------|-----|
| M1 | Bootstrap project | — | ★ |
| M2 | Zod schemas + contracts | M1 | ★ |
| M3 | Agent loop (`messages.stream()` + manual tool loop) — tool-use integration test FIRST | M2 | ★ |
| M4 | Tool registry + fs/shell tools + `ask_user` modal | M3 | ★ |
| M5 | TUI skeleton (opentui, static data, panels, keybindings) — port from `src/poc.tsx` | M1 | ★ |
| M6 | Config + first-run wizard + Anthropic model picker | M4, M5 | ★ |
| M7 | Salesforce auth (`@salesforce/core` passthrough) + `/orgs` | M4 | ★ |
| M8 | Core SF tools (sf CLI + jsforce) | M7 | ★ |
| M9 | qmd lifecycle (detect, install, collections, MCP wire, `qmd_query`) | M4 | ★ |
| M10 | Scraper adapters (apex-ref, lwc-guide, sf-releases) | M9 | ★ |
| M11 | Continuous-learning worker | M10 | ★ |
| M12 | Dir-tree sync-status (chokidar + `sf project deploy preview`) | M5, M8 | ★ |
| M13 | Persona scaffold (shared + isolated) + runtime `ask_user` gate | M4, M8 | ★ |
| M14 | Persona prompts port + 10 reference MDs | M13 | ★ |
| M15 | Side panels: Settings, Users, Metadata, SOQL, Tests, Deploy report | M8, M13 | ★ |
| M16 | `.agent` viewer (read-only) | M5 | v0.2 |
| M17 | Streaming polish · error states · rate-limit · prompt-cache breakpoints | all | ★ |
| M18 | Packaging (`bun build --compile`) + docs + demo script | all | ★ |

---

## 2. File tree (every file, one-line purpose)

```
sfwiz/
├─ package.json                      sfwiz entry; bin: sfwiz → dist/cli.js
├─ bun.lock
├─ tsconfig.json                     strict TS + path alias ~/* → src/*
├─ biome.json                        format + lint config
├─ README.md                         quickstart + screenshots
├─ LICENSE                           TBD (Apache-2.0 candidate)
├─ .gitignore
├─ .env.example                      ANTHROPIC_API_KEY= …
├─ scripts/
│  ├─ dev.ts                         `bun scripts/dev.ts` — watch + restart
│  └─ build.ts                       `bun build --compile` wrapper
├─ resources/
│  ├─ personas/
│  │  ├─ org-admin.md                ported from plugin (anglicized)
│  │  ├─ designer.md
│  │  ├─ developer.md
│  │  ├─ reviewer.md
│  │  ├─ qa.md
│  │  └─ deploy-manager.md
│  ├─ references/                    10 guides ported from plugin
│  │  ├─ apex-best-practices.md
│  │  ├─ governor-limits.md
│  │  ├─ soql-best-practices.md
│  │  ├─ lwc-patterns.md
│  │  ├─ deployment-guide.md
│  │  ├─ flow-guide.md
│  │  ├─ custom-metadata.md
│  │  ├─ test-guide.md
│  │  ├─ org-setup.md
│  │  └─ metadata-permissions-layout.md
│  └─ templates/
│     ├─ project-scratch-def.json
│     └─ loadTestData.apex
├─ src/
│  ├─ cli.ts                         entry; parses argv, boots TUI or runs `--plain`
│  ├─ config/
│  │  ├─ schema.ts                   Zod: Config, LLMConfig, KnowledgeConfig, LearnConfig, PermissionMode
│  │  ├─ load.ts                     read ~/.sfwiz/config.json + env overlay
│  │  ├─ save.ts                     atomic write
│  │  ├─ first-run.ts                orchestrates wizard steps
│  │  └─ trust.ts                    trusted-workspaces.json CRUD (realpath-keyed)
│  ├─ agent/
│  │  ├─ loop.ts                     shared-loop messages.stream() + manual tool dispatch
│  │  ├─ subagents.ts                Agent SDK query() wrapper for reviewer + qa + scraper-embed worker
│  │  ├─ router.ts                   pick next persona, feedback dispatch
│  │  ├─ cache-hints.ts              Anthropic cache_control helpers (ephemeral breakpoints)
│  │  ├─ token-tracker.ts            per-session + per-persona counters
│  │  └─ types.ts                    Message, ContentBlock, ToolCall, ToolResult
│  ├─ tools/
│  │  ├─ registry.ts                 registerTool + listTools + executeTool
│  │  ├─ types.ts                    Tool<A,R> Zod-typed wrapper
│  │  ├─ gate.ts                     runtime gate: permission-mode dispatch + destructive-op ask_user enforcement
│  │  ├─ permission-mode.ts          ask | auto-edit | yolo; per-tool approval policy
│  │  ├─ interaction/
│  │  │  └─ ask_user.ts              structured prompt; resolves via TUI event bus
│  │  ├─ fs/
│  │  │  ├─ read_file.ts
│  │  │  ├─ list_files.ts
│  │  │  ├─ edit_file.ts             exact-string replacement
│  │  │  ├─ write_file.ts
│  │  │  └─ grep.ts                  ripgrep spawn
│  │  ├─ shell/
│  │  │  └─ run_command.ts           whitelisted cmd exec
│  │  ├─ sf-cli/
│  │  │  ├─ org-list.ts
│  │  │  ├─ org-describe.ts
│  │  │  ├─ project-retrieve.ts
│  │  │  ├─ project-deploy-validate.ts
│  │  │  ├─ project-deploy-start.ts
│  │  │  ├─ apex-run-tests.ts
│  │  │  ├─ apex-run-anonymous.ts
│  │  │  ├─ org-create-scratch.ts
│  │  │  └─ org-assign-permset.ts
│  │  ├─ jsforce/
│  │  │  ├─ client.ts                client factory; cached by org alias
│  │  │  ├─ query.ts                 SOQL
│  │  │  ├─ query-tooling.ts
│  │  │  ├─ sobject-describe.ts
│  │  │  ├─ dml.ts
│  │  │  ├─ metadata-retrieve.ts     umbrella ZIP extract
│  │  │  └─ metadata-deploy.ts
│  │  ├─ admin/
│  │  │  ├─ settings-registry.ts     42-type catalog (ported from settings-cli)
│  │  │  ├─ settings-get.ts
│  │  │  ├─ settings-set.ts
│  │  │  ├─ user-list.ts
│  │  │  ├─ user-create.ts
│  │  │  ├─ user-assign-permset.ts
│  │  │  └─ permset-list.ts
│  │  ├─ agentforce/
│  │  │  ├─ agent-file-parse.ts
│  │  │  └─ agent-file-lint.ts
│  │  ├─ knowledge/
│  │  │  ├─ qmd-query.ts             spawns qmd or via MCP client
│  │  │  ├─ qmd-status.ts
│  │  │  ├─ learn-refresh.ts
│  │  │  ├─ learn-status.ts
│  │  │  └─ release-season.ts
│  │  └─ index.ts                    default registry composition
│  ├─ personas/
│  │  ├─ types.ts                    Persona schema + tool-allowlist type
│  │  ├─ registry.ts                 loads resources/personas/*.md into typed objects
│  │  └─ gate.ts                     rate-limit + ask_user enforcement per persona
│  ├─ llm/
│  │  ├─ client.ts                   Anthropic SDK singleton (env-keyed; betas array)
│  │  ├─ stream.ts                   messages.stream() wrapper — manual tool-use loop, cache_control hints, AbortController
│  │  ├─ model-picker.ts             first-run picker for Opus / Sonnet / Haiku (Anthropic-only)
│  │  └─ models-catalog.ts           static Anthropic model list (Opus 4.7, Sonnet 4.6, Haiku 4.5)
│  ├─ sf/
│  │  ├─ auth.ts                     @salesforce/core passthrough
│  │  ├─ orgs.ts                     sf org list --json parser
│  │  ├─ login-kick.ts               spawn sf login web inside TUI
│  │  ├─ project.ts                  detect force-app, sfdx-project.json
│  │  └─ source-tracking.ts          sf project deploy/retrieve preview --json
│  ├─ session/
│  │  ├─ store.ts                    ~/.sfwiz/session/<id>.json CRUD
│  │  ├─ id.ts                       hash(org + project + timestamp)
│  │  └─ retention.ts                30-day purge
│  ├─ knowledge/
│  │  ├─ qmd-install.ts              detect + `npm i -g @tobilu/qmd`
│  │  ├─ collections.ts              add/remove/list collections
│  │  ├─ mcp-client.ts               MCP over stdio to qmd mcp
│  │  ├─ layout.ts                   path resolver ~/.sfwiz/knowledge/<name>
│  │  └─ meta.ts                     .meta.json read/write
│  ├─ learn/
│  │  ├─ worker.ts                   Bun Worker entry; cron + drift
│  │  ├─ scheduler.ts                dayjs-based daily cron + catch-up
│  │  ├─ bus.ts                      event bus to main thread (status updates)
│  │  └─ logger.ts                   rotating log ~/.sfwiz/learn.log
│  ├─ scraper/
│  │  ├─ types.ts                    Adapter interface
│  │  ├─ fetcher.ts                  polite fetch + ETag cache + 1 rps per host
│  │  ├─ html-to-md.ts               cheerio + turndown wrapper
│  │  ├─ adapters/
│  │  │  ├─ apex-ref.ts              omit ConnectApi; naming apex_*_*.md
│  │  │  ├─ lwc-guide.ts
│  │  │  └─ sf-releases.ts           season detector + 3-season rolling
│  │  └─ run.ts                      CLI-style runner for /learn refresh
│  ├─ tui/
│  │  ├─ App.tsx                     root; panels + layout
│  │  ├─ layout/
│  │  │  ├─ StatusBar.tsx
│  │  │  ├─ DirTree.tsx              sync-status tree
│  │  │  ├─ Chat.tsx                 streaming messages + tool blocks
│  │  │  └─ SidePanel.tsx            switchable views
│  │  ├─ views/
│  │  │  ├─ PersonaView.tsx
│  │  │  ├─ TestsView.tsx
│  │  │  ├─ SoqlView.tsx
│  │  │  ├─ SettingsView.tsx
│  │  │  ├─ UsersView.tsx
│  │  │  ├─ MetadataView.tsx
│  │  │  ├─ DeployReportView.tsx
│  │  │  ├─ KnowledgeView.tsx
│  │  │  ├─ LearnLogView.tsx
│  │  │  ├─ AgentViewerView.tsx
│  │  │  └─ TokensView.tsx
│  │  ├─ overlays/
│  │  │  ├─ AskUserModal.tsx         ask_user tool modal
│  │  │  ├─ CommandPalette.tsx       Ctrl+P (or bare `/`) fuzzy (slash-commands + toggles)
│  │  │  ├─ Help.tsx                 F1
│  │  │  ├─ FirstRunWizard.tsx
│  │  │  ├─ TrustWorkspacePrompt.tsx per-cwd trust gate (renders pre-anything)
│  │  │  └─ PermissionPrompt.tsx     per-op approve/deny (mode=ask); bypassed by auto-edit/yolo
│  │  ├─ hooks/
│  │  │  ├─ useFocus.ts              Tab / Shift+Tab cycle
│  │  │  ├─ useKeymap.ts             chord + global keybindings
│  │  │  └─ useEventBus.ts
│  │  ├─ theme.ts                    colors + symbols
│  │  └─ events.ts                   typed event bus (agent ↔ tui)
│  ├─ dispatcher/
│  │  ├─ input.ts                    parse chat vs slash vs @ vs #
│  │  ├─ slash.ts                    slash-command registry
│  │  └─ commands/
│  │     ├─ orgs.ts
│  │     ├─ login.ts
│  │     ├─ model.ts                 (v1: switch Anthropic model; v2: add provider.ts)
│  │     ├─ models.ts
│  │     ├─ project.ts
│  │     ├─ scratch.ts
│  │     ├─ deploy.ts
│  │     ├─ retrieve.ts
│  │     ├─ tests.ts
│  │     ├─ soql.ts
│  │     ├─ settings.ts
│  │     ├─ users.ts
│  │     ├─ persona.ts
│  │     ├─ review.ts
│  │     ├─ qa.ts
│  │     ├─ knowledge.ts
│  │     ├─ learn.ts                 status / refresh / pause / resume
│  │     ├─ tokens.ts
│  │     ├─ resume.ts
│  │     ├─ sessions.ts
│  │     ├─ help.ts
│  │     └─ quit.ts
│  └─ util/
│     ├─ async.ts                    pMap, retry, backoff
│     ├─ path.ts                     home-dir, ensureDir
│     ├─ zx-lite.ts                  spawn + buffered stdout/stderr helper
│     └─ logger.ts                   pino-lite
└─ tests/
   ├─ fixtures/                      sample SFDX projects, HTML pages, qmd responses
   ├─ agent/
   │  ├─ loop.integration.test.ts    tool-use surface assertion (fails if tools ignored)
   │  └─ router.test.ts
   ├─ tools/
   │  ├─ ask_user.test.ts
   │  ├─ gate.test.ts                destructive-op runtime gate
   │  └─ registry.test.ts
   ├─ scraper/
   │  ├─ apex-ref.test.ts            golden-file MD for 5 sample pages
   │  ├─ lwc-guide.test.ts
   │  └─ sf-releases.season.test.ts
   ├─ learn/
   │  └─ scheduler.test.ts
   ├─ sf/
   │  └─ orgs.test.ts
   └─ tui/
      ├─ AskUserModal.test.tsx       via @opentui/core/testing helpers
      └─ Chat.stream.test.tsx
```

---

## 3. Core type contracts (Zod — place in `src/**/schema.ts`)

### 3.1 Config (`src/config/schema.ts`)

```ts
import { z } from 'zod';

export const LLMConfig = z.object({
  // v1 = Anthropic only. Multi-provider deferred to v2 (the field is kept for forward compat).
  provider: z.literal('anthropic'),
  model: z.string(), // claude-opus-4-7 | claude-sonnet-4-6 | claude-haiku-4-5-20251001
  apiKeyEnv: z.string().default('ANTHROPIC_API_KEY'),
});

export const KnowledgeConfig = z.object({
  dir: z.string().default('~/.sfwiz/knowledge'),
  collections: z.array(z.enum(['apex-ref', 'lwc-guide', 'sf-releases'])).default([
    'apex-ref', 'lwc-guide', 'sf-releases',
  ]),
  qmdBin: z.string().default('qmd'),
  autoInstall: z.boolean().default(true),
});

export const LearnConfig = z.object({
  enabled: z.boolean().default(true),
  cronLocal: z.string().regex(/^\d{2}:\d{2}$/).default('03:00'),
  onBootDriftCheck: z.boolean().default(true),
  releaseSeasonsKept: z.number().int().min(1).max(6).default(3),
  userAgent: z.string().default('sfwiz-learn/0.x'),
  rateLimitPerHost: z.number().min(0.1).max(10).default(1),
});

export const Config = z.object({
  version: z.literal(1),
  llm: LLMConfig,
  salesforce: z.object({
    defaultOrgAlias: z.string().nullable(),
    preferredAuthMethod: z.literal('sfcli'),
  }),
  tui: z.object({
    theme: z.enum(['auto', 'light', 'dark']).default('auto'),
    chordTimeoutMs: z.number().min(100).max(3000).default(800),
    reducedMotion: z.boolean().default(false),
  }),
  session: z.object({
    retentionDays: z.number().int().min(1).max(365).default(30),
    dir: z.string().default('~/.sfwiz/session'),
  }),
  telemetry: z.object({ enabled: z.boolean().default(false) }),
  knowledge: KnowledgeConfig,
  learn: LearnConfig,
});

export type Config = z.infer<typeof Config>;
```

### 3.2 Tools (`src/tools/types.ts`)

```ts
import type { z, ZodTypeAny } from 'zod';

export interface Tool<A extends ZodTypeAny, R> {
  name: string;
  description: string;
  parameters: A;
  execute(args: z.infer<A>, ctx: ToolContext): Promise<R>;
  // persona scoping; undefined = available to all
  allowedPersonas?: ReadonlyArray<PersonaName>;
  // runtime gate: require prior ask_user within N turns
  requiresUserConfirmation?: { within: number; ref: string };
  // rate limit per persona per turn
  rateLimitPerTurn?: Partial<Record<PersonaName, number>>;
}

export interface ToolContext {
  org: OrgHandle | null;
  jsforce: () => Promise<Connection>;
  sf: SFCliRunner;
  session: SessionHandle;
  emit: (e: ToolEvent) => void;
  // ask_user uses this to await TUI
  askUser: (q: AskUserPayload) => Promise<AskUserResult>;
}
```

### 3.3 `ask_user` (`src/tools/interaction/ask_user.ts`)

```ts
export const AskUserPayload = z.object({
  question: z.string().min(1),
  header: z.string().max(12),
  options: z.array(z.object({
    label: z.string(),
    description: z.string(),
    preview: z.string().optional(),
  })).min(2).max(6),
  multiSelect: z.boolean().default(false),
});
export const AskUserResult = z.object({
  selected: z.union([z.string(), z.array(z.string())]),
  notes: z.string().nullable(),
});
```

### 3.4 Persona (`src/personas/types.ts`)

```ts
export const PersonaName = z.enum([
  'org-admin', 'designer', 'developer', 'reviewer', 'qa', 'deploy-manager',
]);
export const Persona = z.object({
  name: PersonaName,
  promptPath: z.string(),          // resources/personas/<name>.md
  model: z.enum(['sonnet', 'opus', 'haiku']),
  allowedTools: z.array(z.string()),
  loopMode: z.enum(['shared', 'isolated']),
  askUserLimitPerTurn: z.number().int().min(0).max(10).default(1),
});
```

### 3.5 Session (`src/session/types.ts`)

```ts
export const SessionRecord = z.object({
  id: z.string(),                   // hash(org+project+ts)
  createdAt: z.string(),            // ISO
  org: z.string().nullable(),
  projectRoot: z.string(),
  tokens: z.object({
    input: z.number(), output: z.number(), cached: z.number(), cost: z.number(),
  }),
  conversation: z.array(MessageRecord),
  artifacts: z.record(z.string(), z.string()),  // phase → path
});
```

### 3.6 Scraper adapter (`src/scraper/types.ts`)

```ts
export interface Adapter {
  name: 'apex-ref' | 'lwc-guide' | 'sf-releases';
  detectEntrypoints(): Promise<string[]>;
  shouldInclude(url: string): boolean;
  toSlug(url: string): string;
  extractMarkdown(html: string, url: string): string;
  writeMeta(meta: CollectionMeta): Promise<void>;
}
export const CollectionMeta = z.object({
  url: z.string().url(),
  lastScrape: z.string(),           // ISO
  etag: z.string().nullable(),
  lastModified: z.string().nullable(),
  chunkCount: z.number().int(),
  bytes: z.number().int(),
});
```

---

## 4. Per-milestone checklists

Format: **goal · acceptance · files touched · commands · test-first notes**.

### M1 — Bootstrap

- Goal: repo compiles + `bun test` runs a placeholder passing test.
- Acceptance: `bun run build` emits `dist/cli.js`; `./dist/cli.js --version` prints.
- Files: `package.json`, `tsconfig.json`, `biome.json`, `.gitignore`, `src/cli.ts`, `tests/sanity.test.ts`.
- Commands: `bun init -y`, `bun add -d @biomejs/biome bun-types`, `bun add zod`, `bun biome init`.
- Tests-first: `tests/sanity.test.ts` asserts `1+1===2`. Commit `m01`.

### M2 — Schemas + contracts

- Goal: every cross-boundary type has a Zod schema; inferred TS types exported.
- Acceptance: `bun test tests/schemas/*` all green; `tsc --noEmit` clean.
- Files: `src/config/schema.ts`, `src/tools/types.ts`, `src/personas/types.ts`, `src/session/types.ts`, `src/scraper/types.ts`, `tests/schemas/config.test.ts`, more.
- Tests-first: feed malformed JSON → expect Zod error. Commit `m02`.

### M3 — Agent loop (tool-use integration test FIRST)

- Goal: agent loop streams text via `anthropic.messages.stream()`, executes tools manually, appends `tool_result` content blocks, continues stream, exits on `stop_reason !== 'tool_use'`. **Critical bug guard: assert real tool schema reaches the Anthropic API.** Emits lifecycle events for TUI indicators.
- Acceptance:
  - `tests/agent/loop.integration.test.ts` runs the loop against a stubbed Anthropic transport (intercept `fetch` or inject a mock client); asserts the outgoing request body's `tools` array reached the API and is non-empty; asserts loop executed a mock tool and injected `tool_result` for the next turn; asserts stream events (`message_start`, `content_block_delta`, `message_delta` with `stop_reason='tool_use'`, `message_stop`) drive the loop correctly.
  - Loop handles mid-stream `Ctrl+C` cancel via AbortController (passed to `messages.stream({ signal })`).
  - Loop emits 4 event kinds on its EventEmitter (consumed by `Chat.tsx` for §5.10 indicators): `turn:thinking` (after send, before first delta), `turn:stream` (first delta), `tool:pending|running|done|error` (per tool call), `turn:done`. Unit test subscribes + asserts ordering.
  - Prompt-cache breakpoints applied: system prompt block + tool-defs block carry `cache_control: { type: 'ephemeral' }`. `betas: ['prompt-caching-2024-07-31']` set on client. Cache-read / cache-creation token counts captured in `token-tracker`.
- Files: `src/agent/loop.ts`, `src/agent/types.ts`, `src/agent/token-tracker.ts`, `src/agent/cache-hints.ts`, `src/llm/client.ts`, `src/llm/stream.ts`.
- Deps: `@anthropic-ai/sdk`.
- Tests-first: **red test** stubs the SDK transport to capture outgoing request; expects `tools` property populated and non-empty AND `cache_control` present on stable blocks. Implementation passes when the loop actually forwards the tool schema (the sfcode bug guard). Commit `m03`.

### M4 — Tool registry + fs/shell + `ask_user` modal + permission mode

- Goal: registry APIs, fs + shell + ask_user tools, TUI modal stub wired to tool, permission-mode runtime gate.
- Acceptance:
  - `registerTool` + `listTools` + `executeTool(name,args,ctx)` unit-tested.
  - `ask_user` resolves via injected `ctx.askUser`.
  - `@opentui/core/testing` helpers render `AskUserModal` + `PermissionPrompt` with sample payloads and verify focus / key / mouse input.
  - `permissionMode` (`ask` | `auto-edit` | `yolo`) enforced in `src/tools/permission-mode.ts`:
    - `ask` — every file-op (`edit_file`, `write_file`, shell), out-of-cwd `read_file`, and any tool writing outside cwd triggers `PermissionPrompt` modal (approve once / approve session / deny).
    - `auto-edit` — auto-approve `edit_file`/`write_file` inside cwd + `read_file`/`list_files` anywhere; still prompt for `run_command`, deletes, fetches outside cwd, and any sf destructive op.
    - `yolo` — auto-approve all above; destructive SF ops (`sf_deploy_start` to prod, `sf_assign_permset` in prod) remain hard-gated through `ask_user` regardless of mode.
  - `runtime gate` (`src/tools/gate.ts`) rejects `sf_deploy_start` if no matching ask_user confirmation in last N turns — tested with fake history. Gate composes permission-mode check + destructive-op check.
  - Mode toggle: `/permissions` slash command + `Shift+Tab` chord cycle `ask → auto-edit → yolo → ask`. Status bar segment shows current mode with colored badge (`ASK` dim, `AUTO` blue, `YOLO` warning).
  - Tests cover each mode × each tool category matrix + destructive-op override.
- Files: `src/tools/registry.ts`, `src/tools/gate.ts`, `src/tools/permission-mode.ts`, `src/tools/interaction/ask_user.ts`, `src/tools/fs/*`, `src/tools/shell/run_command.ts`, `src/tui/overlays/AskUserModal.tsx`, `src/tui/overlays/PermissionPrompt.tsx`, `src/dispatcher/commands/permissions.ts`, `tests/tools/*`.
- Commit `m04`.

### M5 — TUI skeleton

- Goal: opentui app renders status bar + dir tree + chat + side panel + input line with static fixtures. Tab/Shift+Tab cycle focus. Ctrl+C quit (2× rule). Port incrementally from `src/poc.tsx` (the phase-3 PoC file which already renders the full layout with fake data).
- Acceptance: snapshot test of initial render; keystroke drives focus; mouse wheel scrolls chat; `--plain` flag strips ANSI + animations for CI / SSH.
- Files: `src/tui/App.tsx`, `src/tui/layout/*`, `src/tui/hooks/useFocus.ts`, `src/tui/hooks/useKeymap.ts`, `src/tui/theme.ts`, `src/tui/events.ts`, `tests/tui/App.test.tsx`.
- Deps: `@opentui/react`, `@opentui/core`, `react`. Loaders (spinner + equalizer) are hand-rolled — see `Equalizer` in `src/poc.tsx`.
- Tests-first: snapshot failing until `App.tsx` returns expected layout. Commit `m05`.

### M6 — Config + first-run wizard + Anthropic model picker + trust prompt

- Goal: load `~/.sfwiz/config.json`; if absent, run wizard in `FirstRunWizard.tsx`. Wizard uses `ask_user` semantics internally. Add per-cwd trust gate (runs **before** any other TUI render, including first-run wizard).
- Acceptance:
  - Wizard produces valid Config JSON (including `permissionMode`), written atomically. Env-var overlay applied.
  - **Model picker** (NOT provider picker): wizard step picks one of Opus 4.7 / Sonnet 4.6 / Haiku 4.5 as the default for the main loop. Persona-specific model assignments (Opus for reviewer/designer, Sonnet for developer/qa/deploy-manager, Haiku for lightweight tools) are baked into `resources/personas/*.md` metadata, not user-configurable in v1.
  - `/model` slash command swaps the default live (replaces v0 plan's `/provider`). Multi-provider behavior deferred to v2 — when added, `/provider` returns and stacks above `/model`.
  - `TrustWorkspacePrompt.tsx` renders full-screen on launch if `realpath(cwd)` ∉ `~/.sfwiz/trusted-workspaces.json`. Choosing "Yes" appends `{path, firstTrustedAt, lastSeenAt}`; choosing "No" exits code 0.
  - `--trust-this-workspace` CLI flag bypasses the prompt non-interactively; writes trust record.
  - Trust-list schema Zod-validated; malformed file → treat as empty + back up to `.corrupted-<ts>`.
  - Wizard step picks initial `permissionMode`; stored in config.
  - Integration test: fresh `~/.sfwiz` → launch → TrustPrompt → wizard → main TUI, all keystrokes driven.
- Files: `src/config/load.ts`, `src/config/save.ts`, `src/config/first-run.ts`, `src/config/trust.ts`, `src/tui/overlays/FirstRunWizard.tsx`, `src/tui/overlays/TrustWorkspacePrompt.tsx`, `src/llm/model-picker.ts`, `src/llm/models-catalog.ts`, `tests/config/trust.test.ts`.
- Commit `m06`.

### M7 — SF auth + `/orgs`

- Goal: `@salesforce/core` reads `sf` authenticated orgs. Slash command `/orgs` lists; selection persists to config. Empty list → inline `sf login web` kick.
- Acceptance: `tests/sf/orgs.test.ts` parses fake `sf org list --json` fixture; login-kick spawns child + polls.
- Files: `src/sf/auth.ts`, `src/sf/orgs.ts`, `src/sf/login-kick.ts`, `src/dispatcher/commands/orgs.ts`, `src/dispatcher/commands/login.ts`.
- Commit `m07`.

### M8 — Core SF tools

- Goal: `sf_query`, `sf_retrieve`, `sf_deploy_validate`, `sf_deploy_start`, `sf_run_tests`, `sf_scratch_create`, `sf_assign_permset`, `sf_sobject_describe`, `sf_apex_run_anonymous`, jsforce DML + metadata retrieve/deploy (umbrella pattern).
- Acceptance: each tool has unit test with mocked `sf` binary / jsforce connection. Destructive tools gated.
- Files: `src/tools/sf-cli/*`, `src/tools/jsforce/*`, `src/sf/project.ts`, `src/sf/source-tracking.ts`.
- Commit `m08`.

### M9 — qmd lifecycle + embed progress

- Goal: detect qmd, optional auto-install, register 3 collections, MCP wire. `qmd_query` tool callable end-to-end. Stream embed progress to TUI status bar per phase-3-poc §8a.
- Acceptance:
  - Integration test spawns real qmd binary against a tiny fixture collection; asserts MD chunks returned.
  - `qmd-install.ts` pipes npm progress lines (parse `npm install` stderr for `[#####     ]` style or fall back to step count) and publishes events on `learn/bus`; `StatusBar.tsx` renders the aggregate bar + tail item from §8a.
  - Embed phase: each qmd `embed` invocation emits `(collection, done, total, currentItem)` tuples via stdout JSON stream (wrap qmd spawn; fall back to percent-only if qmd version lacks JSON progress).
  - Main TUI remains responsive during install + embed (embed runs in Bun Worker; events coalesced ≤ 10 Hz).
  - Snapshot test of `StatusBar` rendering at 0% / 48% / 100% + error states.
- Files: `src/knowledge/*`, `src/knowledge/qmd-install.ts`, `src/tools/knowledge/qmd-query.ts`, `src/tools/knowledge/qmd-status.ts`, `src/dispatcher/commands/knowledge.ts`, `src/tui/views/KnowledgeView.tsx`, `src/tui/layout/StatusBar.tsx`, `src/learn/bus.ts`, `tests/knowledge/embed-progress.test.ts`.
- Commit `m09`.

### M10 — Scraper adapters

- Goal: 3 adapters produce golden-file MD for sample HTML fixtures. ConnectApi omitted. Season detector picks current + previous 2.
- Acceptance: `tests/scraper/*` passes against committed HTML fixtures.
- Files: `src/scraper/*`, `tests/scraper/*`, `tests/fixtures/html/*`.
- Deps: `cheerio`, `turndown`.
- Commit `m10`.

### M11 — Continuous-learning worker

- Goal: Bun Worker spins up per TUI session. Daily cron + boot drift check. HEAD-diff. Polite fetch. Emits events to main thread. `/learn status|refresh|pause|resume` wired.
- Acceptance: simulated clock test triggers scheduled run; HEAD 304 skips; 200 rewrites MD + bumps meta; event bus delivers status strings.
- Files: `src/learn/*`, `src/dispatcher/commands/learn.ts`, `src/tui/views/LearnLogView.tsx`.
- Commit `m11`.

### M12 — Dir-tree sync-status

- Goal: DirTree panel shows green/red/white per spec. `chokidar` watches FS; `sf project deploy preview --json` cached.
- Acceptance: snapshot test with fake preview JSON; keystrokes (r, d, Space) dispatch correct events.
- Files: `src/tui/layout/DirTree.tsx`, `src/sf/source-tracking.ts`, `src/tui/events.ts`.
- Commit `m12`.

### M13 — Persona scaffold

- Goal: shared loop (`@anthropic-ai/sdk` `messages.stream()`, M3) runs `designer → developer → deploy-manager`; **subagents via `@anthropic-ai/claude-agent-sdk` `query()` + `AgentDefinition`** for reviewer + qa. Runtime `ask_user` gate enforced (M4 logic wired to real deploys).
- Acceptance:
  - `src/agent/subagents.ts` exposes a `runSubagent({ name, prompt, inputs, outputSchema })` helper that wraps `query()`. Each named subagent is declared as an `AgentDefinition` with explicit `tools` whitelist:
    - `reviewer`: `tools: ["Read", "Glob", "Grep"]` — read-only, returns structured JSON critique. Model: `claude-opus-4-7` (matches locked decision; voice-rich critique).
    - `qa`: `tools: ["Read", "Bash"]` — runs `sf apex run test --code-coverage` via Bash, returns `{ passed, coverage, failures }`. Model: `claude-sonnet-4-6`.
  - Subagent results consumed via the `query()` async generator: walk messages, capture `system/init.session_id` for resumption, parse the final `result` message into the Zod `outputSchema`.
  - Scripted conversation fixture runs through full flow with mocked Anthropic transport + Agent SDK `query()` stub; reviewer returns structured JSON; developer re-dispatch on issues.
  - Hooks demonstrated: a `PostToolUse` hook (matcher `Edit|Write`) writes an audit line per write — proves the SDK hook surface is wired even though reviewer is read-only.
- Files: `src/agent/router.ts`, `src/agent/subagents.ts`, `src/personas/registry.ts`, `src/personas/gate.ts`.
- Commit `m13`.

### M14 — Persona prompts port + references

- Goal: 6 persona MDs (anglicized from plugin Japanese) + 10 reference MDs loaded into `resources/`. Persona registry uses them.
- Acceptance: `resources/personas/*.md` parseable; startup diffs against committed hashes to detect drift.
- Files: `resources/personas/*.md`, `resources/references/*.md`.
- Commit `m14`.

### M15 — Side panels + command palette

- Goal: Settings (42-type tree), Users (filters + CRUD), Metadata (retrieve inventory), SOQL (editor + grid), Tests (runs + coverage), Deploy report. Plus `CommandPalette.tsx` (Ctrl+P or bare `/` on empty input) per phase-3-poc §10.
- Acceptance:
  - Snapshot tests per view; each drives its underlying tools.
  - Palette renders centered overlay; fuzzy matcher passes 12 test cases (prefix, subsequence, score ordering, case-insensitive); `↑/↓/Enter/Esc` drive selection; palette entries auto-generated from dispatcher command registry + a small static toggle list (Thinking Mode, Yolo, Help, Init Project, Background Color, Quit, Sessions, Switch Model).
  - Reduced-motion disables dim-overlay animation.
- Files: `src/tui/views/*.tsx`, `src/tools/admin/*`, `src/dispatcher/commands/*`, `src/tui/overlays/CommandPalette.tsx`, `src/util/fuzzy.ts`, `tests/tui/CommandPalette.test.tsx`.
- Commit `m15`.

### M16 — `.agent` viewer

- Goal: parse `.agent` file → tree view (read-only). Linter surface-checks.
- Acceptance: fixture `.agent` renders; linter detects missing required sections.
- Files: `src/tools/agentforce/*`, `src/tui/views/AgentViewerView.tsx`.
- Commit `m16`.

### M17 — Polish

- Goal: streaming tool-call render; full error states from phase-3 §5; rate-limit retry with backoff; Anthropic `cacheControl` breakpoints; tokens panel; reduced-motion path; `--plain` verified for CI.
- Acceptance: QA checklist covers every phase-3 failure state; cache hit rate ≥ 70% in a 10-turn scripted session.
- Files: `src/agent/cache-hints.ts` (verified), `src/tui/views/TokensView.tsx`, `src/util/async.ts`.
- Commit `m17`.

### M18 — Packaging

- Goal: single binary via `bun build --compile --target=bun-darwin-arm64 ./src/cli.ts --outfile sfwiz`. Repeat for linux-x64, linux-arm64, darwin-x64. Demo-recording checklist.
- Acceptance: each binary starts on a fresh machine without Bun installed; size ≤ 60 MB.
- Files: `scripts/build.ts`, `README.md`, release workflow.
- Commit `m18` + tag `v0.1.0`.

---

## 5. Security + safety notes

- **Never log raw API keys**. Keys come from env only; config stores the *env-var name*, not the value.
- **Persona `reviewer` cannot Edit / write to disk**. Enforced both by tool-allowlist filter and by omitting `edit_file`/`write_file` from its `ctx`.
- **`run_command` whitelist**: `sf`, `git`, `node`, `bun`, `npm`, `npx`, `pnpm`, `yarn`, `rg`, `ripgrep`, `chokidar-cli`, `open`. Reject everything else. Never pass raw user shell string; always array args.
- **File writes outside project root** require explicit `ask_user` confirmation (runtime gate).
- **Destructive SF ops** (deploy-to-existing-org, permset assign in prod): gated via `ask_user` + a live org-type check (`sf org display` → `IsProduction`).
- **Scraper**: respects `robots.txt`; honors `X-Robots-Tag`; identifies itself in User-Agent; 1 req/s per host; max 3 retries with exponential backoff on 429/5xx.

---

## 6. Open questions carried to phase-5 / phase-6

- Integration-test infrastructure for qmd + scraper: Playwright-style fixture server, or ship golden HTML files and mock fetch?
- Signed binaries for macOS (Gatekeeper): Apple Developer ID required; in scope for hackathon or post-launch?
- License for ported persona prompts — clarify reuse rights before `m14`.
- Anonymized telemetry: build now (opt-in) or defer entirely?
- What's the minimum org type needed for the demo video? (Developer Edition is free + fast; scratch adds setup friction.)
