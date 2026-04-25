# Phase 5 — Test

Status: **ready**. Next: `phase-6-video.md`.

Runs after each milestone in phase-4, not only at the end.

---

## 1. Test pyramid

```
        ┌─────────────────────────┐
        │  Demo rehearsal (x1)    │   manual, taped
        └─────────────────────────┘
      ┌─────────────────────────────┐
      │  Manual QA checklist        │   phase-3 §5 states
      └─────────────────────────────┘
    ┌─────────────────────────────────┐
    │  Scratch-org e2e (4 scenarios)  │  GitHub Actions optional job
    └─────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  TUI interaction + snapshots        │  @opentui/core/testing
  └─────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  Integration (agent loop · qmd · …)     │  bun test
└─────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Unit                                        │  bun test, 80% lines / 70% branches
└─────────────────────────────────────────────┘
```

Targets:
- **Unit**: 80% lines, 70% branches. Gate in CI.
- **Integration**: per-milestone table (§3).
- **TUI**: every panel + overlay has one snapshot + one interaction test.
- **e2e**: 4 scratch-org scenarios; runs on tag push + weekly cron.
- **Manual QA**: checklist maps 1:1 to phase-3 §5 failure states.

---

## 2. Unit tests

Live next to code as `*.test.ts`. Rule: **if a Zod schema exists, test a malformed input**.

| Area | Key cases |
|------|-----------|
| `config/schema` | missing field → Zod error; env overlay wins over file; atomic save safe under concurrent writes |
| `agent/loop` | cancellation via AbortController; tool-result injection preserves `tool_use_id`; token counts accumulate |
| `agent/cache-hints` | stable prompt hash → cache-control breakpoint applied; prompt edit → breakpoint recomputed |
| `tools/registry` | dup register throws; unknown tool returns typed error; persona filter applies |
| `tools/gate` | missing prior `ask_user` → reject; matching selection within window → allow; 'cancel' result → reject |
| `tools/interaction/ask_user` | AbortController cancel resolves `{ selected: 'cancel' }`; multiSelect returns array |
| `tools/fs/edit_file` | non-unique `old_string` throws; missing file throws; preserves encoding |
| `tools/fs/grep` | ripgrep missing → fallback to JS regex; stderr surfaced |
| `tools/sf-cli/*` | arg arrays built without shell interpolation; exit code non-zero surfaced as typed error |
| `tools/jsforce/query` | SOQL-injection guard; timeout honored; pagination iterator |
| `tools/jsforce/metadata-retrieve` | umbrella Settings pattern: request `*` → ZIP → per-file extract; corrupt ZIP surfaces clear error |
| `tools/admin/settings-registry` | 42 types enumerated; category tree correct; unknown type rejected |
| `tools/knowledge/qmd-query` | stdin/stdout wire protocol with qmd; empty-result path; stale-collection warning |
| `tools/knowledge/release-season` | season detector handles mid-release bump (`spring-26` → `summer-26`) |
| `scraper/fetcher` | ETag 304 skips; 429 triggers backoff; rate-limit honored (1 rps per host) |
| `scraper/html-to-md` | golden-file MD for 5 sample pages per adapter |
| `scraper/adapters/apex-ref` | ConnectApi URLs filtered out; slug naming matches plugin convention |
| `scraper/adapters/sf-releases` | 3-season rolling window; older seasons pruned |
| `learn/scheduler` | simulated clock triggers daily at local 03:00; catch-up after sleep; pause/resume persists |
| `sf/orgs` | parses sf output fixture; empty list path surfaced |
| `sf/source-tracking` | merges deploy-preview + retrieve-preview into tree nodes |
| `session/store` | id stability; 30-day retention purge; concurrent write lock |
| `personas/gate` | rate-limit exceeded → error injected; reviewer tool-scope strict |
| `dispatcher/input` | `/cmd`, `@path`, `#memo` parsing ambiguity resolved deterministically |

Run: `bun test`. Coverage: `bun test --coverage` → `coverage/lcov.info`; enforce 80%/70% via `scripts/check-coverage.ts`.

---

## 3. Integration tests (per milestone)

| Milestone | Integration test |
|-----------|------------------|
| M3 | **`tests/agent/loop.integration.test.ts`** — stub Anthropic provider; assert outgoing request contains `tools: { … }` with full schema; assert returned `tool-call` gets executed and result injected. **Guards the sfcode bug.** |
| M4 | `tests/tools/gate.integration.test.ts` — full gate: mock history with/without confirming ask_user; run `sf_deploy_start`; verify allow/reject + re-dispatch |
| M6 | `tests/config/first-run.integration.test.ts` — simulated wizard keystrokes → valid Config on disk |
| M7 | `tests/sf/auth.integration.test.ts` — with `sf` CLI stub; org-list → pick → `@salesforce/core` Connection |
| M8 | `tests/tools/sf.integration.test.ts` — fake `sf` binary; each CLI wrapper run end-to-end |
| M9 | `tests/knowledge/qmd.integration.test.ts` — real qmd binary against tiny fixture collection; query returns expected chunks |
| M10 | `tests/scraper/roundtrip.integration.test.ts` — fixture HTTP server serves sample pages; adapter writes MD to tmp dir; compare to golden |
| M11 | `tests/learn/worker.integration.test.ts` — spawn Bun Worker with in-memory clock; simulate 7 days; assert daily runs + pause/resume |
| M13 | `tests/agent/router.integration.test.ts` — scripted conversation runs `designer → developer → reviewer(fail) → developer → reviewer(pass) → qa → deploy-manager(ask_user) → deploy` |

Each integration test runs < 10 s. Slowest (M10 fixture server) parallelized via `bun test --parallel`.

---

## 4. TUI tests

`@opentui/core/testing` (includes `createMockMouse`, keystroke injection, buffer snapshot helpers) for render + interaction. `ink-testing-library` no longer applies since the TUI swapped to opentui in phase-3 PoC.

| File | Covers |
|------|--------|
| `tests/tui/App.test.tsx` | initial render snapshot; Tab/Shift+Tab cycle |
| `tests/tui/StatusBar.test.tsx` | all segments (org green/yellow/red, knowledge states, tokens) |
| `tests/tui/DirTree.test.tsx` | sync-status color mapping; keybindings r/d/Space/←/→/Enter |
| `tests/tui/Chat.stream.test.tsx` | streaming tokens append; tool-call block collapse/expand |
| `tests/tui/AskUserModal.test.tsx` | render with/without preview; Enter resolves; Esc cancels; multiSelect toggles |
| `tests/tui/FirstRunWizard.test.tsx` | full keystroke flow end-to-end; saves config |
| `tests/tui/KnowledgeView.test.tsx` | all 4 knowledge states (fresh / embedding / stale / ref-only) |
| `tests/tui/CommandPalette.test.tsx` | fuzzy match; Enter dispatches correct slash |
| `tests/tui/Help.test.tsx` | F1 overlay renders all keybindings |

Visual regression: snapshot files checked into `tests/tui/__snapshots__/`. Breaking snapshots require explicit `bun test --update-snapshots` + human approval in PR.

---

## 5. Scratch-org e2e (4 scenarios)

Runs against a real Salesforce scratch org. GitHub Actions job `e2e-scratch` gated on `secrets.SF_DEVHUB_AUTH` + weekly cron + any `v*` tag.

| # | Scenario | Personas exercised | Assertions |
|---|----------|--------------------|-----------|
| E1 | **Apex trigger** | designer → developer → reviewer → qa → deploy | `OpportunityTrigger` deployed; test class passes ≥ 85% coverage; ask_user gate fired before deploy |
| E2 | **LWC component** | designer → developer → qa → deploy | `oppForecast` LWC bundle deploys; component renders in deployed org via Tooling API probe |
| E3 | **Settings deploy** | org-admin → deploy | `SecuritySettings.passwordMinLength` changed via umbrella pattern; diff preview shown; post-deploy value matches |
| E4 | **SOQL + settings browser** | no persona, slash-command flow | `/soql SELECT Id FROM Account LIMIT 5` returns rows; `/settings SecuritySettings get` returns current values |

Harness: `tests/e2e/scratch-org.ts`
- creates a scratch org via Dev Hub
- runs scripted sfwiz session (piped keystrokes via `--plain` + scripted input)
- asserts expected artifacts + org state
- deletes scratch org

Timeout: 15 min per scenario.

---

## 6. Manual QA checklist

Maps 1:1 to phase-3 §5 states. Run before every release.

- [ ] First-run without any env keys → provider-pick modal appears
- [ ] First-run with missing qmd → auto-install prompt via `ask_user`; decline → ref-only mode surfaced in status bar
- [ ] `/orgs` with 0 orgs → login kick
- [ ] `/orgs` with 3 orgs → pick switches default-org
- [ ] `/provider` mid-session → next turn uses new model
- [ ] Network drop mid-turn → provider-unreachable state, TUI remains usable
- [ ] Rate limit → backoff countdown visible, auto-retry
- [ ] Deploy failure → deploy-report view, tree turns red
- [ ] Test failure → router re-dispatches to developer automatically
- [ ] Reviewer reject → developer re-run; reviewer re-run passes
- [ ] `Ctrl+C` mid-stream → partial discarded, prompt restored
- [ ] Config corrupt → recovery modal, defaults applied on consent
- [ ] Knowledge stale > 7d → amber badge + `/learn refresh` suggestion
- [ ] `ask_user` modal: Enter / Esc / `n` for note / multiSelect
- [ ] Destructive op without `ask_user` → gate blocks + message surfaces in chat
- [ ] Persona switch banner reads cleanly after 50+ turns
- [ ] Tree refresh keystroke (`r`) vs chokidar event both update within 200 ms
- [ ] `--plain` flag strips ANSI; pipe to `less` still readable
- [ ] SIGINT (`Ctrl+C` 2×) saves session cleanly
- [ ] `/resume <id>` restores conversation + persona + tokens

---

## 7. Coverage gate

`scripts/check-coverage.ts` parses `coverage/lcov.info`, fails CI if:
- lines < 80%
- branches < 70%
- any new file < 60% (prevents stealth regressions on new code)

Waivers documented in `tests/coverage-waivers.md` (path + reason + expiry date).

---

## 8. CI — GitHub Actions pipeline

`.github/workflows/ci.yml`:

```yaml
name: ci
on: [push, pull_request]
jobs:
  lint-test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        bun: ['1.1.30', 'latest']
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: ${{ matrix.bun }} }
      - run: bun install --frozen-lockfile
      - run: bunx biome ci
      - run: bun test --coverage
      - run: bun scripts/check-coverage.ts

  build:
    needs: lint-test
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include:
          - { os: macos-latest,  target: bun-darwin-arm64, artifact: sfwiz-darwin-arm64 }
          - { os: macos-14,      target: bun-darwin-x64,   artifact: sfwiz-darwin-x64 }
          - { os: ubuntu-latest, target: bun-linux-x64,    artifact: sfwiz-linux-x64 }
          - { os: ubuntu-latest, target: bun-linux-arm64,  artifact: sfwiz-linux-arm64 }
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun build --compile --target=${{ matrix.target }} ./src/cli.ts --outfile ${{ matrix.artifact }}
      - uses: actions/upload-artifact@v4
        with: { name: ${{ matrix.artifact }}, path: ./${{ matrix.artifact }} }

  e2e-scratch:
    needs: build
    if: github.event_name == 'schedule' || startsWith(github.ref, 'refs/tags/v')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - uses: forcedotcom/salesforcedx-actions/setup@v1
      - run: echo "${{ secrets.SF_DEVHUB_AUTH }}" | sf org login sfdx-url --set-default-dev-hub --alias DevHub
      - run: bun install --frozen-lockfile
      - run: bun test tests/e2e/**
  schedule:
    - cron: '0 3 * * 1'   # Mondays 03:00 UTC
```

---

## 9. Demo rehearsal (pre-phase-6)

- Dry-run the full demo script twice on a clean machine before taping.
- Record keystroke timings; trim the script to fit video length (phase-6 chooses length).
- Check: knowledge fresh, scratch org empty, LLM key set, `sf` logged in.
- Have a backup script if provider rate-limits during take.

---

## 10. Open questions

- Should snapshot diffs fail the build or warn only? (Lean: fail on CI, warn locally.)
- Accept nondeterministic LLM output in integration tests by asserting structural shape (contains a tool call) rather than exact content.
- e2e scratch-org Dev Hub: user's own, or a dedicated hackathon Dev Hub?
- Post-hackathon: plug into Salesforce CLI Telemetry for deeper SF-side coverage?
