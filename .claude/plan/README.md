# sfwiz — Plan Index

**sfwiz** = Salesforce wizardry. Claude-Code-style interactive TUI harness exclusively for the Salesforce ecosystem.

## Locked decisions (phase-1)

| Area | Decision |
|------|----------|
| Name | `sfwiz` |
| Runtime | **Bun 1.x** + TypeScript 5 |
| TUI | **`@opentui/react` + `@opentui/core`** 0.1.102+ (React 19 for terminals; native `<scrollbox>`, mouse wheel, kitty keyboard, alt-screen). **Swapped from Ink 5 during phase-3 PoC** — Ink mouse scroll was unworkable. |
| LLM SDK | **Vercel AI SDK** (`ai` + `@ai-sdk/*` providers) |
| Salesforce API | **jsforce 3** |
| Salesforce auth | **`@salesforce/core` 8** passthrough |
| Salesforce lifecycle | Shell out to **`sf` CLI** (scratch/deploy/test/retrieve) |
| Auth flow | sf-CLI passthrough primary. `/orgs` TUI command picks org. If `sf org list` empty → auto-run `sf login web`. |
| v1 scope | Core (Apex / LWC / SOQL / metadata / deploy / org-admin) + Experience Cloud + Service Cloud + `.agent` **viewer** only |
| v2 scope | Full Agentforce (authoring / safety review / STDM observability), Data Cloud, OmniStudio |
| LLM default | Multi-provider; first-run picker. Claude Sonnet 4.6 if `ANTHROPIC_API_KEY`. `/provider` switches at runtime |
| Personas | Port all 6 from `salesforce-dev-subagents` plugin verbatim (anglicize Japanese doc filenames) |
| Subagent model | **Hybrid** — shared agent loop for `designer → developer → deploy`; isolated sub-loops for `reviewer` + `qa` |
| Knowledge base | **qmd** (`@tobilu/qmd`, Node 22+). Auto-installed on first run. 3 collections under `~/.sfwiz/knowledge/`: `apex-ref` (omit ConnectApi), `lwc-guide`, `sf-releases` (current + previous 2 seasons). Exposed to LLM as MCP tool `qmd_query`. Fallback: bundled `resources/references/*.md`. |
| Continuous learning | Opt-in background Bun Worker inside TUI. Daily 03:00 local + on-boot drift check. Bun-native scraper (`fetch` + cheerio + turndown). HEAD-diff cache (ETag / Last-Modified) + polite 1 req/s per host. User commands: `/learn status`, `/learn refresh`, `/learn pause`, `/learn resume`. |
| `ask_user` tool | First-class always-allowed tool. Structured prompt (question + 2–6 options + multiSelect + optional preview). Inline modal over chat. Mandatory gate before destructive SF ops (scratch create, existing deploy, permset assign). Runtime rejects `sf_deploy_start` / `sf_scratch_create` / `sf_assign_permset` without a matching non-cancel `ask_user` in recent history. |

## Phase docs (each a separate session)

| # | File | Purpose |
|---|------|---------|
| 1 | [phase-1-research.md](./phase-1-research.md) | Prior-art analysis, external refs, locked decisions |
| 2 | [phase-2-planning.md](./phase-2-planning.md) | Architecture, module breakdown, data flow, config schema |
| 3 | [phase-3-poc.md](./phase-3-poc.md) | TUI mockup-only PoC (layout, keybindings, state machine, fake data) |
| 4 | [phase-4-implementation.md](./phase-4-implementation.md) | Milestone-by-milestone build plan |
| 5 | [phase-5-test.md](./phase-5-test.md) | Unit / integration / scratch-org e2e / manual QA |
| 6 | [phase-6-video.md](./phase-6-video.md) | Hackathon demo video script, tooling, shot list |

## Reading order

1. **Phase-1** first — absorb context and prior-art pitfalls.
2. **Phase-2** is the source of truth for architecture — re-open every session.
3. **Phase-3** before any real code — mockup locks UX.
4. **Phase-4** is the implementation contract. Steps numbered; follow in order.
5. **Phase-5** runs after each milestone, not at the end.
6. **Phase-6** optional but highly recommended for hackathon submission.

## Hard rules

- **No mutation** of prior experiments. All reuse happens via copy/port.
- **sf CLI owns lifecycle; jsforce owns runtime API.** Don't re-implement what `sf` already does well.
- **Tool-use must actually pass the real tool schema to the LLM.** A prior prototype silently dropped the `tools` array on the outgoing request — do not repeat.
- **Personas = prompt + tool-scope, not separate processes.** Hybrid model: shared loop for dev flow, isolated loops for reviewer + qa only.
- **Streaming mandatory** from day one. Non-streaming REPL feels broken in TUI.
- **Zero-config happy path**: if `sf` is logged in and `ANTHROPIC_API_KEY` set, `sfwiz` works.
