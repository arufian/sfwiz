# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Confirmation & Clarification

- Use the AskUserQuestion tool for confirmations and choices, never plain text prompts.
- Do not mark phases/milestones as 'done' unless the actual implementation (not just the spec/doc) is complete and verified.
  Add under a new '## Privacy & Personal Info' section, or merge into existing writing/docs guidance.

## Privacy & Personal Info

- Never include personal directory paths, plugin names, account handles, or local machine identifiers in articles, docs, or commits.
- Before publishing any user-facing markdown, scan for leaked personal info and flag it for confirmation.
  Add under '## Debugging' or create a new '## Process Hygiene' section.

## Process Hygiene

- After making fixes that affect a running TUI/dev server, remind the user to restart the process before retesting.
- Avoid blocking calls (e.g., spawnSync) inside render/animation loops — use async equivalents.
  Add under a '## Claude Code Configuration' section.

## Settings Schema

- When editing `.claude/settings.json`, place `defaultMode` inside the `permissions` object, not at the top level. Valid values are documented modes (e.g., 'acceptEdits'), not 'acceptAll'.

## Repo state

**2026-04-26: Phase 4 supplement Stream B shipped (apex-ref + jsforce offline). Phase 5 BUG-1/2/3/4 resolved (a1477b2). Binary: `dist/sfwiz` (77.5 MB, +8 MB embedded knowledge bundle). 207 tests pass. Ready for E2E re-run.**

Earlier: 2026-04-25 — Phase 4 M1–M18 complete, 4 bugs found in E2E run.

M1–M18 complete — see `.claude/plan/phase-4-implementation.md` for per-milestone deliverables.

## RULES

- Before editing any file, read it first. Before modifying a function, grep for all callers. Research before you edit.
- **Keep CLAUDE.md in sync with project progress.** Whenever work changes the current phase, milestone status, repo state, or locked decisions, update the matching section in this file in the same change. Stale status (e.g. "Phase 3: spec only" after the PoC ships) is a bug — fix it before ending the turn. Applies to: `## Repo state`, `## Current phase`, `## Phase map` status column, `## Locked architecture decisions`, and any TODO checkboxes that were completed.
- **All planning docs live under `.claude/plan/` inside the project directory.** Any phase spec, milestone plan, design doc, RFC, or multi-step proposal must be written to `.claude/plan/<name>.md` and referenced from `CLAUDE.md`'s `## Phase map` (or equivalent index). Do not scatter planning files under the repo root, `docs/`, or memory. Memory is for cross-session rules and context, not project plans. When starting new planning work, read `.claude/plan/README.md` first — it is the index.
- **Commit and push after every change.** After modifying any code file or planning doc, stage the changed files, commit with a descriptive message, and push to `origin main`. No change should sit uncommitted. Use explicit file paths in `git add` (not `git add .`). Commit message format: `<type>(<scope>): <short description>` (e.g. `plan(phase-4): switch to Anthropic SDK`, `feat(m03): agent loop streaming`). Run `rg -n "/Users/|arufian@"` on the staged diff before committing — must return 0 hits.

## TODO before flipping repo to public (submission day)

Repo is **private** until submission. Flip to public via `gh repo edit arufian/sfwiz --visibility public --accept-visibility-change-consequences`. Do the flip **~24 h before the deadline, not at the deadline** — judges may check URLs early; a 404 = DQ risk.

Pre-flip checklist:

- [ ] **Full-history audit** (not just HEAD): `git log -p | rg -n "/Users/|<author-username>|<author-email-prefix>@"` returns 0 hits. If hits found, `git filter-repo` or squash before flipping.
- [ ] **Secrets scan**: no `.env`, no `ANTHROPIC_API_KEY=sk-…`, no `sf` refresh tokens in any commit. `rg -n "sk-ant-|sk-proj-|AIza|xoxb-" $(git log --all --format=%H | head -50 | xargs -n1 git show --name-only)` style sweep.
- [ ] **README exists** with quickstart + demo-video link (phase-6 artifact).
- [ ] **Fresh-clone sanity**: `git clone … /tmp/sfwiz-verify && cd /tmp/sfwiz-verify && bun install && bun run poc` — must launch without editing anything.
- [ ] **Plan docs visibility decision**: `.gitignore` currently excludes `.claude/` — judges will NOT see phase plans or locked decisions. Pick one:
  - (a) Un-ignore `.claude/plan/` before the flip (simplest; exposes private planning prose — re-read for tone).
  - (b) Copy the key plans to `docs/submission/*.md` (tracked): `architecture.md`, `locked-decisions.md`. Preferred — lets you curate for judges without dumping all planning noise.
- [ ] **Incognito verify post-flip**: open the repo URL in a private-browser window immediately after flipping. Confirm public render.

## Current phase

**Phase 5 bug-fix round 1 done (2026-04-26).** BUG-1/2/3/4 from E2E (`E2E-Test-Result.MD`) all resolved in `a1477b2`. Phase 4 supplement Stream B (offline knowledge for apex-ref + jsforce) shipped in `4eea1a5`. Binary at `dist/sfwiz` (77.5 MB, darwin-arm64).

Next action for a fresh session: re-run the E2E checklist against the new binary to verify BUG-2/3/4 do not reproduce. If clean, move to Phase 6 (Video) — read `.claude/plan/phase-6-video.md`. If new bugs surface, log to `E2E-Test-Result.MD` and continue Phase 5.

## Phase map

| Phase            | Status                      | File                                     | When to open                                                                         |
| ---------------- | --------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------ |
| —                | —                           | `.claude/plan/README.md`                 | first, every session — index + locked decisions table                                |
| 1 Research       | done                        | `.claude/plan/phase-1-research.md`       | read once to absorb prior-art + 18 locked decisions                                  |
| 2 Planning       | done                        | `.claude/plan/phase-2-planning.md`       | **source of truth for architecture** — re-open every session                         |
| 3 PoC (UI only)  | done (opentui)              | `.claude/plan/phase-3-poc.md`            | PoC shipped at `src/poc.tsx` — Ink→opentui swap; reconcile spec in M1                |
| 4 Implementation | **DONE** (M1–M18)           | `.claude/plan/phase-4-implementation.md` | all milestones shipped                                                               |
| 5 Test           | **bugs 1–4 fixed** (re-run pending) | `.claude/plan/phase-5-test.md`   | BUG-1/2/3/4 resolved 2026-04-26 (a1477b2). Re-run E2E to confirm before Phase 6.    |
| 6 Video          | blocked (wait Phase 5)      | `.claude/plan/phase-6-video.md`          | final deliverable for hackathon submission                                           |
| 4 supplement     | **partial** (B done, A pending) | `.claude/plan/phase-4-supplement-jsforce-and-knowledge.md` | Stream B M19–M25 done (apex-ref + jsforce shipped offline; 3 SF collections deferred to runtime fetch). Stream A M26–M32 (jsforce expansion) pending after Phase 5 bug-fix. |
| —                | —                           | `.claude/plan/internal-references.md`    | auto-memory index, prior-art pointers, runtime paths                                 |
| —                | session hand-off            | `.claude/plan/progress-2026-04-24.md`    | 2026-04-24: PoC polish + 5 UX demos (trust / permission / palette / embed / loaders) |
| —                | session hand-off            | `.claude/plan/progress-2026-04-25.md`    | 2026-04-25: Phase 4 M1–M18 complete — all milestones shipped + binary verified       |

## Code map

Read this before grepping. File paths are authoritative; terminology entries point straight at the implementation.

### Entrypoints & build

| Term                 | Path                                  | Notes                                                       |
| -------------------- | ------------------------------------- | ----------------------------------------------------------- |
| binary CLI           | `src/cli.ts`                          | argv parsing, `--first-run`, `--trust-this-workspace` flags |
| TUI launch           | `src/tui/launch.tsx`                  | `render(<App />)` mount; opentui root                       |
| dev runner           | `scripts/dev.ts`                      | watch + restart; QA flow                                    |
| build                | `scripts/build.ts`                    | `bun build --compile` → `dist/sfwiz`                        |
| coverage gate        | `scripts/check-coverage.ts`           | 80% lines / 70% branches                                    |
| PoC reference        | `src/poc.tsx`                         | original opentui PoC; many components later split to `src/ui/*` and `src/tui/*` |

### TUI shell (root container, layout, status)

| Term              | Path                            | Notes                                                  |
| ----------------- | ------------------------------- | ------------------------------------------------------ |
| App root          | `src/tui/App.tsx`               | giant container — overlays, key handlers, agent wiring |
| status bar (rich) | `src/tui/layout/StatusBar.tsx`  | active org, persona, mode, tokens                      |
| status bar (simple) | `src/ui/panels/StatusBar.tsx` | minimal variant                                        |
| dir tree (grouped)| `src/tui/layout/DirTree.tsx`    | left pane file tree                                    |
| theme tokens      | `src/ui/theme.ts`               | `ACCENT`, `DIM`, `BORDER`, `OK`, `WARN`, `ERR`, `BG_VARIANTS`, `getBgColor()` |
| event bus (TUI)   | `src/tui/events.ts`             | UI-side events                                         |
| global keys       | `src/ui/hooks/useGlobalKeys.ts` | top-level keybindings                                  |

### TUI overlays (modals over main view)

| Term               | Path                                         | Trigger                                  |
| ------------------ | -------------------------------------------- | ---------------------------------------- |
| command palette    | `src/tui/overlays/CommandPalette.tsx`        | `Ctrl+P` or bare `/` (active)            |
| command palette (PoC) | `src/ui/overlays/CommandPalette.tsx`      | older variant — not wired                |
| help overlay       | `src/ui/overlays/HelpOverlay.tsx`            | `Ctrl+H`                                 |
| trust workspace    | `src/ui/overlays/TrustWorkspacePrompt.tsx`   | first launch in cwd                      |
| permission prompt  | `src/tui/overlays/PermissionPrompt.tsx`      | tool requires user approval              |
| ask user modal     | `src/tui/overlays/AskUserModal.tsx` (+ `src/ui/overlays/AskUserModal.tsx`) | `ask_user` tool        |
| API key setup      | `src/tui/overlays/ApiKeySetup.tsx`           | first run, no key in `~/.sfwiz/config.json` |
| first-run wizard   | `src/tui/overlays/FirstRunWizard.tsx`        | `--first-run`                            |
| model picker       | `src/tui/overlays/ModelPicker.tsx`           | `/model`                                 |
| provider picker    | `src/tui/overlays/ProviderPicker.tsx`        | `/provider` (alias `/api-key`)           |

### TUI setup screens (one-shot wizards)

| Term         | Path                              |
| ------------ | --------------------------------- |
| setup chrome | `src/tui/setup/SetupChrome.tsx`   |
| qmd install  | `src/tui/setup/QmdScreen.tsx`     |
| embed screen | `src/tui/setup/EmbedScreen.tsx`   |

### Chat/IO panels

| Term            | Path                                  | Notes                                       |
| --------------- | ------------------------------------- | ------------------------------------------- |
| chat panel      | `src/ui/panels/ChatPanel.tsx`         | message list, tool blocks, expand/collapse  |
| input line      | `src/ui/panels/InputLine.tsx`         | `<textarea>` w/ native cursor + accent border |
| side panel      | `src/ui/panels/SidePanel.tsx`         | right pane host                             |
| tree panel      | `src/ui/panels/TreePanel.tsx`         | left tree wrapper                           |
| toast bar       | `src/ui/panels/ToastBar.tsx`          | transient notifications                     |
| embed progress  | `src/ui/panels/EmbedProgressBar.tsx`  | knowledge bootstrap %                       |
| markdown render | `src/ui/util/markdown.tsx`            | render assistant messages                   |

### Side views (right pane content)

| Term       | Path                              |
| ---------- | --------------------------------- |
| deploy     | `src/ui/side/DeployView.tsx`      |
| knowledge  | `src/ui/side/KnowledgeView.tsx`   |
| persona    | `src/ui/side/PersonaView.tsx`     |
| SOQL       | `src/ui/side/SoqlView.tsx`        |
| tests      | `src/ui/side/TestsView.tsx`       |
| tokens     | `src/ui/side/TokensView.tsx`      |

### Agent loop & LLM

| Term                | Path                          | Notes                                                                     |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| orchestrator loop   | `src/agent/loop.ts`           | `messages.stream()` + tool-use dispatch                                   |
| persona router      | `src/agent/router.ts`         | dispatch to subagent                                                      |
| persona subagents   | `src/agent/subagents.ts`      | 6 personas via `@anthropic-ai/claude-agent-sdk` `query()`                 |
| token tracker       | `src/agent/token-tracker.ts`  | input/output/cache counts                                                 |
| cache hints         | `src/agent/cache-hints.ts`    | `cache_control: ephemeral` placement                                      |
| agent types         | `src/agent/types.ts`          |                                                                           |
| Anthropic client    | `src/llm/client.ts`           | `getAnthropicClient()` — env fallback, config-file primary                |
| model catalog       | `src/llm/models-catalog.ts`   | static model id list + display names                                      |
| model list (live)   | `src/llm/list-models.ts`      | dynamic fetch                                                             |

### Personas

| Term               | Path                            | Notes                                              |
| ------------------ | ------------------------------- | -------------------------------------------------- |
| persona registry   | `src/personas/registry.ts`      | 6 personas: org-admin, designer, developer, deploy-manager, reviewer, qa |
| persona gate       | `src/personas/gate.ts`          | tool-scope enforcement per persona                 |
| persona types      | `src/personas/types.ts`         |                                                    |

### Tools (callable by agent)

| Term                  | Path                                                  | Notes                            |
| --------------------- | ----------------------------------------------------- | -------------------------------- |
| tool registry         | `src/tools/registry.ts`                               | name → handler map               |
| tool index            | `src/tools/index.ts`                                  | exports all tools                |
| tool gate             | `src/tools/gate.ts`                                   | permission check before exec     |
| permission mode       | `src/tools/permission-mode.ts`                        | `ask` / `auto-edit` / `yolo`     |
| tool types            | `src/tools/types.ts`                                  |                                  |
| **fs tools**          | `src/tools/fs/`                                       | `read_file`, `write_file`, `edit_file`, `list_files`, `grep` |
| **interaction**       | `src/tools/interaction/ask_user.ts` · `route_persona.ts` | first-class user prompt + persona dispatch |
| **jsforce tools**     | `src/tools/jsforce/`                                  | `sf_query` (SOQL), `sf_sobject_describe` |
| **knowledge tools**   | `src/tools/knowledge/qmd_query.ts` · `qmd_status.ts`  | qmd RAG queries                  |
| **sf-cli tools**      | `src/tools/sf-cli/`                                   | `sf_deploy_start`, `sf_deploy_validate`, `sf_retrieve`, `sf_run_tests`, `sf_apex_run_anonymous`, `sf_assign_permset`, `sf_open_org`, `sf_scratch_create` |
| **shell**             | `src/tools/shell/run_command.ts`                      | gated shell exec                 |

### Dispatcher (slash commands)

| Term              | Path                                           |
| ----------------- | ---------------------------------------------- |
| command registry  | `src/dispatcher/registry.ts`                   |
| `/connect`        | `src/dispatcher/commands/connect.ts`           |
| `/init`           | `src/dispatcher/commands/init.ts`              |
| `/knowledge`      | `src/dispatcher/commands/knowledge.ts`         |
| `/learn`          | `src/dispatcher/commands/learn.ts`             |
| `/login`          | `src/dispatcher/commands/login.ts`             |
| `/orgs`           | `src/dispatcher/commands/orgs.ts`              |
| `/sessions`       | `src/dispatcher/commands/sessions.ts`          |

### Config & state

| Term                | Path                          | Notes                                            |
| ------------------- | ----------------------------- | ------------------------------------------------ |
| config schema (zod) | `src/config/schema.ts`        |                                                  |
| config load         | `src/config/load.ts`          | reads `~/.sfwiz/config.json`                     |
| config save         | `src/config/save.ts`          | chmod 600                                        |
| permissions         | `src/config/permissions.ts`   | persisted allowlist                              |
| trust workspace     | `src/config/trust.ts`         | `~/.sfwiz/trusted-workspaces.json` realpath-keyed |
| first-run flag      | `src/config/first-run.ts`     |                                                  |
| session types       | `src/session/types.ts`        |                                                  |

### Salesforce integration

| Term            | Path                          | Notes                                          |
| --------------- | ----------------------------- | ---------------------------------------------- |
| auth (sf CLI)   | `src/sf/auth.ts`              | passthrough of `sf` cred store                 |
| connection      | `src/sf/connection.ts`        | jsforce connection builder                     |
| login kick      | `src/sf/login-kick.ts`        | spawns `sf login web` if no orgs               |
| orgs list       | `src/sf/orgs.ts`              | `sf org list` + display merge                  |
| project detect  | `src/sf/project.ts`           | sfdx-project.json detection                    |
| source tracking | `src/sf/source-tracking.ts`   |                                                |

### Knowledge base (qmd RAG)

| Term            | Path                              | Notes                                          |
| --------------- | --------------------------------- | ---------------------------------------------- |
| qmd install     | `src/knowledge/qmd-install.ts`    | auto-install on first run                      |
| collections     | `src/knowledge/collections.ts`    | apex-ref, lwc-guide, sf-releases               |
| detect          | `src/knowledge/detect.ts`         | resolve qmd binary                             |
| embed           | `src/knowledge/embed.ts`          | bootstrap progress                             |

### Continuous learning (worker)

| Term            | Path                          | Notes                                          |
| --------------- | ----------------------------- | ---------------------------------------------- |
| worker entry    | `src/learn/worker.ts`         | Bun Worker                                     |
| launcher        | `src/learn/launcher.ts`       | spawns worker                                  |
| scheduler       | `src/learn/scheduler.ts`      | daily 03:00 + on-boot drift                    |
| fetcher         | `src/learn/fetcher.ts`        | polite 1 rps, ETag/Last-Modified               |
| docs fetcher    | `src/learn/docs-fetcher.ts`   |                                                |
| sf-cli fetcher  | `src/learn/sf-cli-fetcher.ts` |                                                |
| event bus       | `src/learn/bus.ts`            | progress events to TUI                         |
| worker messages | `src/learn/worker-messages.ts`|                                                |

### Scraper (knowledge ingest)

| Term            | Path                                  | Notes                                |
| --------------- | ------------------------------------- | ------------------------------------ |
| html→md         | `src/scraper/html-to-md.ts`           | cheerio + turndown                   |
| season          | `src/scraper/season.ts`               | release season detection             |
| types           | `src/scraper/types.ts`                |                                      |
| **adapters**    | `src/scraper/adapters/apex-ref.ts` · `lwc-guide.ts` · `sf-releases.ts` | per-source adapters |

### Util / fixtures / types

| Term         | Path                          | Notes                                |
| ------------ | ----------------------------- | ------------------------------------ |
| async helpers| `src/util/async.ts`           |                                      |
| fuzzy match  | `src/util/fuzzy.ts`           | `fuzzyScore`, `FuzzyMatch`           |
| UI types     | `src/types/ui.ts`             | `PaletteEntry` etc.                  |
| fixtures     | `src/fixtures/`               | `chat`, `embed`, `misc`, `palette`, `tree` — demo data |

### Terminology cheat sheet

- **palette** — command palette modal (`Ctrl+P` / `/`)
- **dispatcher** — slash-command runner; not the agent loop
- **persona** — one of 6 SDK subagents (org-admin / designer / developer / deploy-manager / reviewer / qa)
- **orchestrator** — top-level agent loop in `src/agent/loop.ts` that routes to personas
- **gate** — permission/scope check; two flavors: `tools/gate.ts` (tool exec) and `personas/gate.ts` (persona tool-scope)
- **trust workspace** — per-cwd opt-in stored in `~/.sfwiz/trusted-workspaces.json`
- **permission mode** — `ask` / `auto-edit` / `yolo`; toggle via `/permissions` or `Shift+Tab`
- **embed** — knowledge-base bootstrap (qmd vector index build)
- **qmd** — `@tobilu/qmd`, the RAG store; `qmd_query` / `qmd_status` tools
- **learn worker** — background scraper + scheduler (Bun Worker, opt-in)
- **kick** — `src/sf/login-kick.ts` spawns `sf login web` when no orgs are connected
- **side view** — right-pane content (deploy / knowledge / persona / SOQL / tests / tokens)
- **route_persona** — orchestrator tool that dispatches a turn to a persona subagent
- **ask_user** — first-class always-allowed tool; mandatory gate before destructive SF ops
- **runtime config dir** — `~/.sfwiz/` (`config.json`, `trusted-workspaces.json`, `knowledge/`)

## Hackathon context

- Deliverable: working binary + demo video (90–120 s).
- Judges likely without Agentforce-enabled orgs → Agentforce authoring deferred to v2; v1 ships a read-only `.agent` viewer only.
- Voice-over via local Coqui XTTS setup — English is user's third language; prefer voice-only narration.
- MVP subset = 17 of 18 milestones (all except M16 `.agent` viewer — see phase-4 §1).

## Target prizes (special prizes · $5k Claude API credits each)

Primary target → **"Keep Thinking"**. Secondary → **Most Creative Opus 4.7 Exploration**.

### 🧠 "Keep Thinking" Prize (PRIMARY — $5k)

> "For the project that didn't stop at the first idea — and landed somewhere nobody saw coming."

**Angle**: TUI harness for Salesforce is itself an unexpected target for Claude (most agent demos go at web / GitHub / generic code). Pair that with continuous-learning scraping Salesforce docs → the agent actually _learns the platform_ over time. Emphasize in submission.

### 🎨 Most Creative Opus 4.7 Exploration ($5k)

> "For the project that treated Opus 4.7 as a creative medium… expressive, playful, strange, or alive."

**Angle**: surface Opus 4.7 for moments where voice + judgment matter (prose critique on tricky Apex / sharing-rule reasoning). Let Opus write prose, not just JSON, in the demo for a "signature Opus feel" moment.

## Git workflow (after each phase completes)

Remote already exists: `git@github.com:arufian/sfwiz.git` (branch `main`, private until submission-day flip — see `## TODO before flipping…`). After each plan phase completes (spec + any required artifact), the session that finishes it must:

```bash
# 1. stage + commit (prefer explicit paths over `git add .`)
git add <changed-files>
git commit -m "phase-N: <short description>"

# 2. push
git push origin main
```

Rules:

- **Never commit with unresolved local paths.** Grep audit `rg -n "/Users/|<author-username>|<author-email-prefix>@"` on staged diff must return 0 hits.
- **Never push an unverified build.** For code phases, `bun test` must pass.
- **Never force-push `main`.** History-rewrite only via squash-merge of a feature branch, or via `git filter-repo` with explicit user sign-off (submission-day scrub only).

## Locked architecture decisions (single-line reference — full rationale in phase-1 §3)

- **Runtime**: Bun 1.1+ · TypeScript 5.6 strict · Biome (format+lint) · `bun test`
- **TUI**: `@opentui/react` + `@opentui/core` 0.1.102+ · React 19 · `jsxImportSource: "@opentui/react"` · native `<scrollbox>` + mouse wheel + kitty keyboard
- **LLM (orchestrator)**: `@anthropic-ai/sdk` directly · `messages.stream()` with manual tool-use loop (check `stop_reason === 'tool_use'`, dispatch tool, inject `tool_result`, continue) · prompt caching via `betas: ['prompt-caching-2024-07-31']` + `cache_control: { type: 'ephemeral' }` on stable system + tool-defs blocks · v1 = Anthropic only; multi-provider (OpenAI/Google/Groq) deferred to v2
- **LLM (persona subagents)**: `@anthropic-ai/claude-agent-sdk` ≥ 0.2.111 · `query()` async generator with `AgentDefinition` · 6 persona subagents (org-admin / designer / developer / deploy-manager / reviewer / qa) with strict tool-scope · session capture via `system/init.session_id` for `resume` · Opus 4.7 (`claude-opus-4-7`) requires SDK ≥ 0.2.111
- **Salesforce API**: `jsforce` 3 (REST/SOQL/Tooling/Metadata/Bulk)
- **Salesforce auth**: `@salesforce/core` 8 passthrough of `sf` CLI creds · `/orgs` command picks target · auto-run `sf login web` if empty list
- **Salesforce lifecycle**: shell out to `sf` CLI for scratch, deploy, retrieve, apex test
- **Persona orchestration**: 1 orchestrator → 6 persona subagents · orchestrator runs via `@anthropic-ai/sdk` `messages.stream()` and dispatches the chosen persona via `@anthropic-ai/claude-agent-sdk` `query()` + `AgentDefinition` · structured JSON returned via the final `result` message and injected back into the orchestrator history as a tool-result
- **Knowledge base**: `@tobilu/qmd` auto-installed · 3 collections under `~/.sfwiz/knowledge/` (`apex-ref` omit ConnectApi, `lwc-guide`, `sf-releases` current+prev-2 seasons) · MCP wire or in-proc stdio
- **Continuous learning**: opt-in Bun Worker · daily 03:00 local + on-boot drift · `fetch` + cheerio + turndown · polite 1 rps per host · ETag/Last-Modified cache
- **`ask_user` tool**: first-class + always-allowed · inline modal over chat · mandatory gate before `sf_deploy_start` / `sf_scratch_create` / `sf_assign_permset`
- **Trust workspace**: per-cwd prompt at every launch (`~/.sfwiz/trusted-workspaces.json` realpath-keyed) · `--trust-this-workspace` bypass · see phase-3-poc §8 step 0 + phase-4 M6
- **Permission mode**: `ask` (default) · `auto-edit` (auto-approve edits inside cwd) · `yolo` (auto-approve all non-destructive) · toggle via `/permissions` + `Shift+Tab` · destructive SF ops hard-gated regardless · see phase-4 M4
- **Loading states**: 4 distinct indicators — `thinking` (pre-first-token) · `streaming` (caret pulse) · `tool pending/running/done` · `deploy progress bar` · see phase-3-poc §5.10 + phase-4 M3 events
- **Knowledge bootstrap progress**: status-bar aggregate % + tailing current-item (`████ 48%  apex-ref · Database.update (117/243)`) · see phase-3-poc §8a + phase-4 M9
- **Command palette**: `Ctrl+P` (or bare `/` on empty input) Crush-style modal · fuzzy-filter over dispatcher command registry + static toggles · see phase-3-poc §10 + phase-4 M15

## Coding workflow

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### Think before coding

Before implementing: state assumptions explicitly. If uncertain, ask. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so. If something is unclear, stop and name what's confusing.

### Simplicity first

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

### Surgical changes

Touch only what you must. Clean up only your own mess.

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove imports/variables/functions that YOUR changes made unused. Don't remove pre-existing dead code unless asked.

Every changed line should trace directly to the user's request.

### Goal-driven execution

Transform tasks into verifiable goals before starting:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan with verify steps before coding.

## Hard rules

1. **No mutation** of the author's prior local prototype repos (listed in `.claude/plan/internal-references.md`). Reuse via copy/port only.
2. **sf CLI owns lifecycle · jsforce owns runtime API.** Do not re-implement what `sf` already does (scratch, deploy, test, retrieve).
3. **Reviewer persona read-only.** Tool-scope strictly `ask_user`, `read_file`, `list_files`, `grep`, `sf_query`, `sf_sobject_describe`, `qmd_query`.
4. **Streaming mandatory.** `anthropic.messages.stream()` for the orchestrator; `query()` async generator for persona subagents. Never the non-streaming `messages.create()` for interactive turns.
5. **TUI-first API key flow**: there is no `.env` quickstart and no expected env var. On first launch sfwiz prompts for the Anthropic API key inside the TUI and persists it to `~/.sfwiz/config.json` (chmod 600). Rotation/provider switch happens via `/provider` (alias `/api-key`). `process.env.ANTHROPIC_API_KEY` is still honored as a dev-only fallback inside `getAnthropicClient()` but must not appear in user-facing docs.
6. **Every Zod schema gets a malformed-input test.** Phase-5 §2.

## Commands

> **NEVER use `bun run poc`. PoC phase is done. Use the commands below.**

```bash
bun install                          # install deps
bun scripts/dev.ts                   # watch + restart TUI (dev/QA)
bun test                             # run all tests
bun test tests/agent/loop.*          # run a single test file
bun test --coverage                  # 80% lines / 70% branches gate
bun scripts/check-coverage.ts        # enforce gate
bunx biome ci                        # lint + format check
bunx biome format --write .          # apply formatting
bun scripts/build.ts                 # bun build --compile → dist/sfwiz
./dist/sfwiz                         # run compiled binary (QA/demo)
./dist/sfwiz --first-run             # force re-run setup wizard
```

## Internal references (moved)

Auto-memory index, prior-art working dirs, and runtime paths live in `.claude/plan/internal-references.md`. Open that file when you need those pointers.
