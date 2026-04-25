# Phase 4 Supplement — jsforce Expansion + Offline Knowledge Pre-bundle

Status: **active · core feature** · Created 2026-04-26 · Supplements Phase 4 (M1–M18 complete).

Both streams are **core features** of sfwiz, not deferred work. M1–M18 shipped UI + lifecycle but missed two core surfaces:

- **Stream A — jsforce expansion**: only 2 of ~9 planned jsforce-backed tools shipped (`sf_query`, `sf_sobject_describe`). Runtime DML, Bulk, Metadata read, Tooling DML, Limits, SOSL all missing.
- **Stream B — Offline knowledge pre-bundle**: knowledge collections currently scrape on first run (~10 min cold start). Must ship pre-bundled in repo.

Phase 7 was previously proposed for these — collapsed back into Phase 4 per user direction (2026-04-26): both are core, not deferred.

Phase 5 bug-fix continues in parallel; this supplement does not block it.

---

## Hard rule (locks scope)

> **Code creation → `sf` CLI. Runtime data ops → jsforce.**
>
> - "Code creation" = Apex class/trigger files, LWC bundles, metadata XML, deploy/retrieve/test/scratch/permset lifecycle.
> - "Runtime data ops" = SOQL, SOSL, DML (insert/update/upsert/delete), Bulk 2.0, describe (sobject + metadata), limits, Tooling DML for runtime objects, Analytics, Streaming.

This is hard rule #2 in `CLAUDE.md` made explicit.

---

## Stream A — jsforce expansion

### A.1 Read jsforce docs first (mandatory)

Before any tool implementation, fetch and read https://jsforce.github.io/document/ . Pages saved by Stream B M21 → `src/resources/knowledge/jsforce/`.

Pages to read in order:

| Order | Page | Why |
|-------|------|-----|
| 1 | Overview | scope of library |
| 2 | Connection | session, login, OAuth (we use `@salesforce/core` passthrough — confirm compat) |
| 3 | Query | SOQL, autoFetch, maxFetch (already used; verify cancel + streaming-cursor) |
| 4 | CRUD | `sobject(X).create/update/upsert/destroy` — single + array forms |
| 5 | Bulk API 2.0 | `conn.bulk2.load` (preferred over Bulk 1) |
| 6 | Metadata API | `conn.metadata.list/describe/read` |
| 7 | Tooling API | `conn.tooling.query/sobject` |
| 8 | Apex REST | `conn.apex.get/post/put/del` |
| 9 | SOSL | `conn.search('FIND {...}')` |
| 10 | Analytics / Chatter / Streaming | optional |

Reading required because training data may have stale jsforce v1/v2 syntax. v3 is current target.

### A.2 New tools (jsforce-backed)

| Tool name | jsforce surface | Persona scope | `ask_user` gate? |
|-----------|----------------|---------------|------------------|
| `sf_dml` | `conn.sobject(type).create/update/upsert/destroy` | developer, org-admin | yes (write) |
| `sf_bulk_load` | `conn.bulk2.load(operation, type, records, options)` | org-admin | yes (write) |
| `sf_metadata_list` | `conn.metadata.list({ type, folder })` | designer, deploy-manager, reviewer | no (read) |
| `sf_metadata_read` | `conn.metadata.read(type, fullNames[])` | designer, deploy-manager, reviewer | no (read) |
| `sf_tooling_query` | `conn.tooling.query(soql)` | developer, reviewer | no (read) |
| `sf_tooling_dml` | `conn.tooling.sobject(type).create/update/destroy` | developer | yes (runtime objects only — ApexExecutionOverlayAction etc., NOT ApexClass create) |
| `sf_limits` | `conn.limits()` | org-admin | no |
| `sf_apex_rest` | `conn.apex.get/post/put/del` | developer | yes (POST/PUT/DEL) |
| `sf_search` | `conn.search('FIND {...}')` (SOSL) | reviewer, qa | no (read) |

Existing tools stay:
- `sf_query` (jsforce) ✓
- `sf_sobject_describe` (jsforce) ✓

### A.3 Stay on `sf` CLI (do NOT port to jsforce)

- `sf_deploy_start`, `sf_deploy_validate` — sf CLI handles ZIP packaging, source-tracking, manifest gen
- `sf_retrieve` — same
- `sf_run_tests` — sf CLI polls AsyncApexJob + formats results
- `sf_scratch_create` — sf CLI orchestrates org shape + auth flow
- `sf_assign_permset` — sf CLI wraps PermissionSetAssignment with proper user resolution
- `sf_apex_run_anonymous` — sf CLI streams TraceFlag + DebugLog
- `sf_open_org` — sf CLI handles SSO redirect

Per hard rule: **`sf` CLI owns lifecycle**. Re-implementing via jsforce Metadata API ZIP build = weeks of work for parity.

### A.4 Persona scope updates

`src/personas/registry.ts` tool lists need:

- **org-admin**: + `sf_dml`, `sf_bulk_load`, `sf_limits`
- **developer**: + `sf_dml`, `sf_tooling_query`, `sf_tooling_dml`, `sf_apex_rest`
- **designer**: + `sf_metadata_list`, `sf_metadata_read`
- **deploy-manager**: + `sf_metadata_list`, `sf_metadata_read`
- **reviewer**: + `sf_metadata_list`, `sf_metadata_read`, `sf_tooling_query`, `sf_search` (still read-only — no DML)
- **qa**: + `sf_search`

---

## Stream B — Offline knowledge pre-bundle

### B.1 Problem

Current first-run flow:
1. User launches sfwiz
2. qmd auto-installs (~30 s)
3. Background `learn worker` scrapes 4 sources (apex-ref, lwc-guide, sf-releases, sf-cli-ref) → ~minutes to ~hour
4. User waits with embed progress bar

For hackathon judges: **cold start is the demo**. A 10-minute scrape kills the first impression.

### B.2 Solution

Pre-fetch all 4 collections + jsforce docs **at repo build time**, commit to `src/resources/knowledge/`. At first-run sfwiz **copies** from repo → `~/.sfwiz/knowledge/` instead of scraping. Background scraper still runs daily for freshness, but cold start = instant.

### B.3 Sources (final list)

| Collection | Source | Filter | Est. pages |
|------------|--------|--------|-----------|
| **jsforce** | https://jsforce.github.io/document/ | all pages | ~30 |
| **apex-ref** | **REUSE** local skill dir (path provided out-of-band) | n/a — already markdown | 828 (verified) |
| **lwc-guide** | https://developer.salesforce.com/docs/component-library/documentation/en/lwc | all | ~500 |
| **sf-releases** | https://help.salesforce.com/s/articleView | Spring '26 + Winter '26 + Summer '25 | ~1500 |
| **sf-cli-ref** | https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/ | all | ~200 |

### B.4 Storage

**Commit to repo** under `src/resources/knowledge/<collection>/*.md` (decided 2026-04-26).

- Fresh-clone works offline
- Judges can see knowledge corpus in repo
- Repo grows ~50–200 MB — acceptable for hackathon
- License: Salesforce docs © Salesforce — add `CONTRIBUTING.md` note acknowledging upstream sources

### B.5 Fetch / copy strategy

| Collection | Method |
|------------|--------|
| jsforce | `firecrawl-download` from base URL |
| apex-ref | `cp -R` from user's prior local skill dir (path NOT recorded in repo per privacy rule + hard rule #1) |
| lwc-guide | `firecrawl-download` |
| sf-releases | `firecrawl-download` with season filter |
| sf-cli-ref | `firecrawl-download` |

Post-process for scraped pages:
- strip nav/footer
- normalize headings
- match selector behavior in `src/scraper/adapters/<name>.ts`

### B.6 First-run wiring change

Edit `src/knowledge/embed.ts` (or add new bootstrap step in `src/knowledge/qmd-install.ts`):

1. If `~/.sfwiz/knowledge/<name>/` empty → copy from `<repo>/src/resources/knowledge/<name>/` (resolve via `import.meta.url` since binary).
2. After copy, register with qmd (existing `bootstrapCollections` in `src/knowledge/collections.ts`).
3. Background `learn worker` (`src/learn/worker.ts`) continues daily refresh — overwrites with fresher pages.

**Binary embedding**: `bun build --compile` needs to embed the `src/resources/knowledge/` tree. Verify before committing all 4 collections.

---

## Milestones (M19–M32)

### Stream B first (knowledge fetch unblocks A.1 jsforce doc reading)

| Milestone | Scope | Status |
|-----------|-------|--------|
| **M19** | `src/resources/knowledge/` skeleton + `README.md` + repo-level `CONTRIBUTING.md` w/ © Salesforce attribution | ✅ done 2026-04-26 |
| **M20** | Copy apex-ref (828 .md, 9.8 MB) from user's prior local skill into `src/resources/knowledge/apex-ref/` | ✅ done 2026-04-26 |
| **M21** | Fetch jsforce docs (3 pages, 2598 lines) → `src/resources/knowledge/jsforce/`. Script: `scripts/fetch-jsforce-docs.ts` | ✅ done 2026-04-26 |
| **M22** | Fetch lwc-guide → **DEFERRED** (Salesforce Akamai blocks anonymous bulk fetch). Stays runtime-fetched via `src/learn/docs-fetcher.ts`. | ⏸ deferred |
| **M23** | Fetch sf-releases → **DEFERRED** (same reason) | ⏸ deferred |
| **M24** | Fetch sf-cli-ref → **DEFERRED** (same reason) | ⏸ deferred |
| **M25** | Wire seed-from-bundle into `learn worker` + TUI App `runQmdBootstrapAndEmbed`; codegen `src/resources/knowledge-bundle.generated.ts` (Bun `--compile` doesn't embed static dirs); verify binary 77.5 MB contains apex-ref + jsforce strings | ✅ done 2026-04-26 |

Total Stream B: **2 of 5 collections shipped offline**, 3 deferred to runtime fetch (acceptable per user direction option `c` 2026-04-26). Binary went 69.3 → 77.5 MB (+8 MB matches generated bundle size). 4 seed tests added. Full suite: 202 pass / 1 skip / 0 fail.

### Stream A after M21

| Milestone | Scope | Estimate |
|-----------|-------|----------|
| **M26** | Read jsforce docs from M21 output | 0.5 d |
| **M27** | `sf_dml` + tests | 0.5 d |
| **M28** | `sf_bulk_load` + tests | 0.5 d |
| **M29** | `sf_metadata_list` + `sf_metadata_read` + tests | 0.5 d |
| **M30** | `sf_tooling_query` + `sf_tooling_dml` + tests | 0.5 d |
| **M31** | `sf_limits` + `sf_apex_rest` + `sf_search` + tests | 0.5 d |
| **M32** | Update persona scopes in `src/personas/registry.ts`; integration smoke | 0.5 d |

Total Stream A: **~3 d**.

---

## Order of execution

```
M19 (skeleton)
  ├─ M20 (apex-ref local copy)        ← parallel, no network
  ├─ M21 (jsforce fetch)              ← parallel, small  → unblocks M26
  │    └─ M26 (read jsforce docs)
  │         └─ M27–M32 (jsforce tools)
  ├─ M22 (lwc-guide fetch)            ← parallel
  ├─ M23 (sf-releases fetch)          ← longest, start early
  └─ M24 (sf-cli-ref fetch)           ← parallel
       └─ M25 (wire + verify)
```

Phase 5 bug-fix runs in parallel with all of this — fetches are I/O-bound, no conflict. jsforce coding (M27–M32) sequence after critical bug-fixes (BUG-2, BUG-3) so binary stable before adding tools.

---

## Decisions (resolved 2026-04-26)

1. ✅ Storage = **(a) commit to repo** under `src/resources/knowledge/`
2. ✅ sf-cli-ref source = https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/
3. ✅ License OK for offline agent use; add CONTRIBUTING note acknowledging © Salesforce
4. ✅ sf-releases scope = current + prev 2 seasons (Spring '26 + Winter '26 + Summer '25)
5. ✅ apex-ref reused from user's prior Claude Code skill (local path provided out-of-band; NOT recorded in repo per hard rule #1 + privacy rule). M20 = copy, not scrape.
6. ✅ Both streams = **Phase 4 core** (not Phase 7). Phase 5 bug-fix runs in parallel.

---

## Dependencies + risk

- **Bun `--compile` static asset embedding** unverified for ~200 MB tree. If fails → fallback: ship as separate tarball + first-run download once. Decide at M25.
- **Salesforce doc rate-limit**: firecrawl handles, but ~2200 scraped pages → expect 1–2 hours real fetch time.
- **License**: Salesforce docs © Salesforce — re-distributing in repo for local agent use is grey area but consistent with prior community knowledge bases. Add CONTRIBUTING note.

---

## Out of scope

- Porting deploy/retrieve/test/scratch to jsforce Metadata API — stays on `sf` CLI.
- Apex code generation via Tooling DML — `sf` CLI generates files locally; user deploys via `sf project deploy start`.
- Multi-language doc fetch — English only.
- LWC component-library reference (component props/methods) — already covered by lwc-guide; component-library page is JS-rendered SPA, skip.
- Auto-incremental fetch (delta vs full) — `learn worker` already handles via ETag/Last-Modified.
