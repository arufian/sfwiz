# internal-references.md

Pointers the agent needs across sessions but that don't belong at the top of `CLAUDE.md`. Kept under `.claude/plan/` per the planning-dir rule.

Paths are generalized so this file is safe for a public repo. Resolve machine-specific locations at runtime (env vars, workspace config, or ask the user).

## Memory (auto-memory directory)

Session memory lives at `~/.claude-personal/projects/<project-hash>/memory/` (the `<project-hash>` is the dash-escaped absolute path of this repo). Index file is `MEMORY.md` inside that directory.

Key entries currently in the index:

- `feedback_always_askuserquestion.md` — use `AskUserQuestion` tool for every confirmation
- `feedback_per_phase_confirm.md` — confirm each file outline before writing multi-file deliverables
- `feedback_gateguard.md` — Fact-Forcing Gate disabled; re-apply patches if plugin update restores it
- `feedback_claudemd_sync.md` — keep `CLAUDE.md` + `.claude/plan/` in sync with project progress
- `project_auto_mode.md` — `~/.claude/settings.json` has `permissions.defaultMode: "acceptEdits"`
- `project_sf_harness.md` — active project overview (reload on fresh sessions)

When any of the above rules change in a way that affects this repo, update both the memory file and `CLAUDE.md`.

## Prior-art working directories (do not modify)

These are the four earlier experiments the plan ports from. Locations are user-local and **not** checked into this repo. If you need to inspect them, ask the user for the path on this machine.

- `salesforce-dev-subagents/` — 6 personas + knowledge base + references (port everything)
- `salesforce-settings-cli/` — 42-type Settings registry + metadata-umbrella ZIP pattern
- `sfcode-rust/` — agent-loop shape; 5 catalogued bugs to avoid
- `browser-extensions/tmp/1/` — SOAP metadata templates + multi-provider hooks

Hard rule from `CLAUDE.md`: reuse via copy/port only — no mutation of these source dirs.

## Phase-6 voice synthesis

Local Coqui XTTS tool for voice-over. Location is user-local; generalize in the plan to "any Coqui XTTS setup". Do not hard-code the path into committed code.

## Runtime user state (resolved at runtime, not in this repo)

- Knowledge corpora: `~/.sfwiz/knowledge/{apex-ref,lwc-guide,sf-releases}/`
- Session store: `~/.sfwiz/session/<session-id>.json`
- Config: `~/.sfwiz/config.json`

These live outside the repo under the user's home. Create on first run; never commit.
