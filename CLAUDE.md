# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo state

Phase-3 PoC shipped. Single-file runnable TUI at `src/poc.tsx` (~1860 lines) using `@opentui/react` + `@opentui/core` on Bun. Fake fixtures, no LLM, no Salesforce calls. Run: `bun run poc`. Project scaffolding in place: `package.json`, `tsconfig.json`, `.gitignore`, `bun.lockb`. Repo published to `git@github.com:arufian/sfwiz.git` (branch `main`, private until submission day).

2026-04-24 layered 5 new UX demos on top of PoC: trust-workspace first-run gate (`Ctrl+W` replay), permission-mode badge (`Shift+Tab` cycle `ASK → AUTO → YOLO`), command palette (`Ctrl+P` + bare `/` on empty input, Crush-style), knowledge-embed status-bar progress (`Ctrl+G`), thinking + running-deploy loaders (`Ctrl+Y` / `Ctrl+R`) with a 9-bar random-walk equalizer animation. Ctrl+Click replaces Ctrl+E for tool-block expand/collapse. See `.claude/plan/progress-2026-04-24.md` for session log. Next step is Phase 4 M1.

## RULES

- Before editing any file, read it first. Before modifying a function, grep for all callers. Research before you edit.
- **Keep CLAUDE.md in sync with project progress.** Whenever work changes the current phase, milestone status, repo state, or locked decisions, update the matching section in this file in the same change. Stale status (e.g. "Phase 3: spec only" after the PoC ships) is a bug — fix it before ending the turn. Applies to: `## Repo state`, `## Current phase`, `## Phase map` status column, `## Locked architecture decisions`, and any TODO checkboxes that were completed.
- **All planning docs live under `.claude/plan/` inside the project directory.** Any phase spec, milestone plan, design doc, RFC, or multi-step proposal must be written to `.claude/plan/<name>.md` and referenced from `CLAUDE.md`'s `## Phase map` (or equivalent index). Do not scatter planning files under the repo root, `docs/`, or memory. Memory is for cross-session rules and context, not project plans. When starting new planning work, read `.claude/plan/README.md` first — it is the index.

## TODO before flipping repo to public (submission day)

Repo is **private** until submission. Flip to public via `gh repo edit arufian/sfwiz --visibility public --accept-visibility-change-consequences`. Do the flip **~24 h before the deadline, not at the deadline** — judges may check URLs early; a 404 = DQ risk.

Pre-flip checklist:

- [ ] **Full-history audit** (not just HEAD): `git log -p | rg -n "/Users/|<author-username>|<author-email-prefix>@"` returns 0 hits. If hits found, `git filter-repo` or squash before flipping.
- [ ] **Secrets scan**: no `.env`, no `ANTHROPIC_API_KEY=sk-…`, no `sf` refresh tokens in any commit. `rg -n "sk-ant-|sk-proj-|AIza|xoxb-" $(git log --all --format=%H | head -50 | xargs -n1 git show --name-only)` style sweep.
- [ ] **README exists** with quickstart + demo-video link (phase-6 artifact) + "Managed Agents architecture" pointer.
- [ ] **Tag a stable release**: `git tag v0.1-hackathon-submit && git push origin v0.1-hackathon-submit` — gives judges a pinned SHA that can't drift.
- [ ] **Fresh-clone sanity**: `git clone … /tmp/sfwiz-verify && cd /tmp/sfwiz-verify && bun install && bun run poc` — must launch without editing anything.
- [ ] **Plan docs visibility decision**: `.gitignore` currently excludes `.claude/` — judges will NOT see phase plans, locked decisions, or the Managed-Agents architecture write-up. This directly hurts the **Best Managed Agents** prize ($5k) narrative, which is graded alongside code. Pick one:
  - (a) Un-ignore `.claude/plan/` before the flip (simplest; exposes private planning prose — re-read for tone).
  - (b) Copy the key plans to `docs/submission/*.md` (tracked): `managed-agents.md`, `architecture.md`, `locked-decisions.md`. Preferred — lets you curate for judges without dumping all planning noise.
- [ ] **Incognito verify post-flip**: open the repo URL in a private-browser window immediately after flipping. Confirm public render. Confirm tagged release appears on Releases tab.

## Goal

Ship **`sfwiz`** — a Claude-Code-style interactive TUI harness exclusively for the Salesforce ecosystem — to a hackathon with a demo video. Covers:

- Development (Apex / LWC / SOQL / metadata / deploy)
- Admin (org settings, users, permissions, sharing, 42-type Settings registry)
- Scratch-org + existing-org deploy lifecycle
- Multi-provider LLM (Vercel AI SDK)
- Hybrid subagent orchestration (design → develop → review → qa → deploy)
- Knowledge base + continuous learning via qmd (Apex ref, LWC guide, release notes)

## Current phase

**Phases 1, 2, 3 DONE. Next: Phase 4 M1.**

Phase 3 PoC shipped as `src/poc.tsx` — runnable single-file OpenTUI/React skeleton with fake data. Framework switched from Ink 5 → `@opentui/react` + `@opentui/core` during PoC (Ink mouse scroll was unworkable; opentui gives native `<scrollbox>`, mouse wheel, kitty keyboard, alt-screen). `.claude/plan/phase-3-poc.md` has been reconciled to opentui; `.claude/plan/phase-1-research.md` still lists Ink — reconcile before or during M1. Keybindings documented in `HelpOverlay` inside `src/poc.tsx`.

Next action for a fresh session: read `.claude/plan/progress-2026-04-24.md` for last-session hand-off, then `.claude/plan/phase-4-implementation.md` §1 M1. Either begin M1 or do the phase-1-research reconcile first (user's call).

## Phase map

| Phase            | Status                     | File                                     | When to open                                                            |
| ---------------- | -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| —                | —                          | `.claude/plan/README.md`                 | first, every session — index + locked decisions table                   |
| 1 Research       | done                       | `.claude/plan/phase-1-research.md`       | read once to absorb prior-art + 18 locked decisions                     |
| 2 Planning       | done                       | `.claude/plan/phase-2-planning.md`       | **source of truth for architecture** — re-open every session            |
| 3 PoC (UI only)  | done (opentui)             | `.claude/plan/phase-3-poc.md`            | PoC shipped at `src/poc.tsx` — Ink→opentui swap; reconcile spec in M1   |
| 4 Implementation | ready                      | `.claude/plan/phase-4-implementation.md` | **execute milestones in order**; each milestone is a standalone session |
| 5 Test           | ready                      | `.claude/plan/phase-5-test.md`           | runs after each milestone, not at end                                   |
| 6 Video          | ready                      | `.claude/plan/phase-6-video.md`          | final deliverable for hackathon submission                              |
| —                | —                          | `.claude/plan/internal-references.md`    | auto-memory index, prior-art pointers, runtime paths                    |
| —                | session hand-off           | `.claude/plan/progress-2026-04-24.md`    | last-session log: PoC polish + SOQL scenarios + 5 UX demos (trust / permission / palette / embed / loaders) |

## Hackathon context

- Deliverable: working binary + demo video (90–120 s).
- Judges likely without Agentforce-enabled orgs → Agentforce authoring deferred to v2; v1 ships a read-only `.agent` viewer only.
- Voice-over via local Coqui XTTS setup — English is user's third language; prefer voice-only narration.
- MVP subset = 12 of 18 milestones (see phase-4 §1, starred rows).

## Target prizes (special prizes · $5k Claude API credits each)

Primary target → **Best use of Claude Managed Agents**. Secondary → **"Keep Thinking"**. Tertiary → **Most Creative Opus 4.7 Exploration**.

### 🎯 Best use of Claude Managed Agents (PRIMARY — $5k)

> "For the team that leveraged the Claude platform the best. We're looking for the project that best uses Managed Agents to hand off meaningful, long-running tasks — not just a demo, but something you'd actually ship."

**Why sfwiz fits**:

- Hybrid persona orchestration (designer → developer → reviewer → qa → deploy-manager) = long-running, hand-off-heavy agent workflow
- Isolated reviewer + qa sub-loops = clean agent boundaries
- Continuous-learning background worker (daily scraper + qmd embed) = a true long-running task, not a one-shot demo
- `ask_user` tool with runtime gate on destructive ops = productionizable safety, not a toy

**How to leverage Managed Agents specifically** (design choices to make before M3):

- Use **Claude Agent SDK** / **Managed Agents API** for the reviewer + qa isolated sub-loops where available. Document the choice.
- Route long-running scrape-+-embed jobs through a managed-agent handoff (not a naive setInterval) so the orchestration is visible and observable in the Claude platform.
- Expose agent handoffs in the TUI (persona divider + side-panel "phase history") so judges can _see_ the managed-agent story live.

**Submission must describe** (graded alongside code):

- Exact Claude models per persona (Opus 4.7 for reviewer/designer; Sonnet 4.6 for developer/qa/deploy-manager; Haiku 4.5 for lightweight tools).
- Which tasks are handed off to Managed Agents vs. run locally.
- How long-running tasks (scraper, embed, e2e scratch-org flows) are orchestrated.
- Prompt caching strategy (stable system prompts + tool-defs with `cacheControl`).
- Tool schemas, ask_user gate, and isolated-loop architecture.

**TODO before submission**: write `docs/submission/managed-agents.md` covering all of the above with code pointers.

### 🧠 "Keep Thinking" Prize ($5k)

> "For the project that didn't stop at the first idea — and landed somewhere nobody saw coming."

**Angle**: TUI harness for Salesforce is itself an unexpected target for Claude (most agent demos go at web / GitHub / generic code). Pair that with continuous-learning scraping Salesforce docs → the agent actually _learns the platform_ over time. Emphasize in submission.

### 🎨 Most Creative Opus 4.7 Exploration ($5k)

> "For the project that treated Opus 4.7 as a creative medium… expressive, playful, strange, or alive."

**Angle**: use Opus 4.7 for the **designer** and **reviewer** personas where voice + judgment matter most. Let the reviewer write prose critique (not just JSON) for a "signature Opus feel" moment in the demo. Optional — don't trade Managed-Agents focus for it.

## Git workflow (after each phase completes)

Remote already exists: `git@github.com:arufian/sfwiz.git` (branch `main`, private until submission-day flip — see `## TODO before flipping…`). After each plan phase completes (spec + any required artifact), the session that finishes it must:

```bash
# 1. stage + commit (prefer explicit paths over `git add .`)
git add <changed-files>
git commit -m "phase-N: <short description>"

# 2. push
git push origin main

# 3. tag completed phase
git tag phase-N-done
git push origin phase-N-done
```

For Phase 4 (18 milestones), commit + push after **each milestone** (`m01` through `m18`), plus tag completed milestones. Not a single phase-4 commit.

Rules:

- **Never commit with unresolved local paths.** Grep audit `rg -n "/Users/|<author-username>|<author-email-prefix>@"` on staged diff must return 0 hits.
- **Never push an unverified build.** For code phases, `bun test` must pass.
- **Never force-push `main`.** History-rewrite only via squash-merge of a feature branch, or via `git filter-repo` with explicit user sign-off (submission-day scrub only).

## Locked architecture decisions (single-line reference — full rationale in phase-1 §3)

- **Runtime**: Bun 1.1+ · TypeScript 5.6 strict · Biome (format+lint) · `bun test`
- **TUI**: `@opentui/react` + `@opentui/core` 0.1.102+ · React 19 · `jsxImportSource: "@opentui/react"` · native `<scrollbox>` + mouse wheel + kitty keyboard · **switched from Ink 5 during PoC** (see `progress.md` §"Framework decision is now STALE"); `.claude/plan/phase-1-research.md` still lists Ink — reconcile in M1
- **LLM**: Vercel AI SDK (`ai`, `@ai-sdk/anthropic|openai|google|groq`) · multi-provider first-run picker · `/provider` switches live · Anthropic `cacheControl` breakpoints
- **Salesforce API**: `jsforce` 3 (REST/SOQL/Tooling/Metadata/Bulk)
- **Salesforce auth**: `@salesforce/core` 8 passthrough of `sf` CLI creds · `/orgs` command picks target · auto-run `sf login web` if empty list
- **Salesforce lifecycle**: shell out to `sf` CLI for scratch, deploy, retrieve, apex test
- **Subagents**: hybrid — shared agent loop for `designer → developer → deploy-manager`, isolated sub-loops for `reviewer` + `qa` (strict tool-scope)
- **Knowledge base**: `@tobilu/qmd` auto-installed · 3 collections under `~/.sfwiz/knowledge/` (`apex-ref` omit ConnectApi, `lwc-guide`, `sf-releases` current+prev-2 seasons) · MCP wire or in-proc stdio
- **Continuous learning**: opt-in Bun Worker · daily 03:00 local + on-boot drift · `fetch` + cheerio + turndown · polite 1 rps per host · ETag/Last-Modified cache
- **`ask_user` tool**: first-class + always-allowed · inline modal over chat · mandatory gate before `sf_deploy_start` / `sf_scratch_create` / `sf_assign_permset`
- **Trust workspace**: per-cwd prompt at every launch (`~/.sfwiz/trusted-workspaces.json` realpath-keyed) · `--trust-this-workspace` bypass · see phase-3-poc §8 step 0 + phase-4 M6
- **Permission mode**: `ask` (default) · `auto-edit` (auto-approve edits inside cwd) · `yolo` (auto-approve all non-destructive) · toggle via `/permissions` + `Shift+Tab` · destructive SF ops hard-gated regardless · see phase-4 M4
- **Loading states**: 4 distinct indicators — `thinking` (pre-first-token) · `streaming` (caret pulse) · `tool pending/running/done` · `deploy progress bar` · see phase-3-poc §5.10 + phase-4 M3 events
- **Knowledge bootstrap progress**: status-bar aggregate % + tailing current-item (`████ 48%  apex-ref · Database.update (117/243)`) · see phase-3-poc §8a + phase-4 M9
- **Command palette**: `Ctrl+P` (or bare `/` on empty input) Crush-style modal · fuzzy-filter over dispatcher command registry + static toggles · see phase-3-poc §10 + phase-4 M15

## Hard rules

1. **No mutation** of the author's prior local prototype repos (listed in `.claude/plan/internal-references.md`). Reuse via copy/port only.
2. **sf CLI owns lifecycle · jsforce owns runtime API.** Do not re-implement what `sf` already does (scratch, deploy, test, retrieve).
3. **Tool-use integration test FIRST** in M3 (`tests/agent/loop.integration.test.ts`). Guards the tool-schema-forwarding bug observed in a prior prototype (LLM SDK silently dropped the `tools` array on the outgoing request).
4. **Reviewer persona read-only.** Tool-scope strictly `ask_user`, `read_file`, `list_files`, `grep`, `sf_query`, `sf_sobject_describe`, `qmd_query`.
5. **Streaming mandatory from M3.** `streamText`, never `generateText`.
6. **Zero-config happy path**: if `sf` is logged in and `ANTHROPIC_API_KEY` set, `sfwiz` must work without further prompts (except first-run wizard).
7. **Every Zod schema gets a malformed-input test.** Phase-5 §2.

## Commands

Phase-3 PoC (current):

```bash
bun install                          # install deps
bun run poc                          # launch PoC TUI (src/poc.tsx) in real terminal
```

Post-M1 (not yet wired):

```bash
bun scripts/dev.ts                   # watch + restart TUI
bun test                             # run all tests
bun test tests/agent/loop.*          # run a single test file
bun test --coverage                  # 80% lines / 70% branches gate
bun scripts/check-coverage.ts        # enforce gate
bunx biome ci                        # lint + format check
bunx biome format --write .          # apply formatting
bun scripts/build.ts                 # bun build --compile → dist/sfwiz
./dist/sfwiz                         # run compiled binary
./dist/sfwiz --first-run             # force re-run setup wizard
./dist/sfwiz --plain                 # no-ANSI mode for CI / SSH
```

## Internal references (moved)

Auto-memory index, prior-art working dirs, and runtime paths live in `.claude/plan/internal-references.md`. Open that file when you need those pointers.
