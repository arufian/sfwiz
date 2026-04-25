```
 ███████╗███████╗██╗    ██╗██╗███████╗
 ██╔════╝██╔════╝██║    ██║██║╚══███╔╝
 ███████╗█████╗  ██║ █╗ ██║██║  ███╔╝
 ╚════██║██╔══╝  ██║███╗██║██║ ███╔╝
 ███████║██║     ╚███╔███╔╝██║███████╗
 ╚══════╝╚═╝      ╚══╝╚══╝ ╚═╝╚══════╝
 Salesforce × Claude — terminal-native AI harness
```

**sfwiz** is a Claude-Code-style interactive TUI harness for the Salesforce ecosystem — built for Apex developers, LWC engineers, and Salesforce admins who want AI-assisted workflows without leaving the terminal.

> Hackathon project — powered by Anthropic Claude.

## Demo

[Demo video — coming soon (submission day)]

## Architecture

- **Orchestrator** (`@anthropic-ai/sdk` `messages.stream()`): streaming tool-use with manual dispatch.
- **6 persona subagents** (`@anthropic-ai/claude-agent-sdk` `query()`): org-admin · designer · developer · deploy-manager · reviewer · qa. Each runs as an isolated subagent with its own tool-scope and model (Opus 4.7 for reviewer + designer; Sonnet 4.6 for the rest). Structured JSON returned via the final `result` message is injected back into the orchestrator as a tool-result.
- **Tools**: filesystem (read/edit/write/grep), shell, jsforce (SOQL/describe), `sf` CLI (deploy/scratch/permset/retrieve/tests/apex), and `ask_user` for confirmations.
- **Continuous-learn worker** (Bun Worker, opt-in): daily scraper → qmd embed of Apex reference, LWC guide, and Salesforce release notes.
- **Prompt caching**: 4-breakpoint strategy — system block, last tool-def, stable history prefix, last assistant turn.
- **Safety**: destructive Salesforce ops (`sf_deploy_start` / `sf_scratch_create` / `sf_assign_permset`) are runtime-gated behind a mandatory `ask_user` confirmation regardless of permission mode.

## Quickstart

### Prerequisites

- [Bun](https://bun.sh) 1.1+
- [Salesforce CLI (`sf`)](https://developer.salesforce.com/tools/salesforcecli) logged in (`sf login web`)
- `ANTHROPIC_API_KEY` set in your environment

### Run from source

```bash
git clone https://github.com/arufian/sfwiz.git
cd sfwiz
bun install
export ANTHROPIC_API_KEY=sk-ant-...
bun scripts/dev.ts   # full TUI with live reload
# or: ./dist/sfwiz   # pre-built binary
```

### Download pre-built binary

Download for your platform from [Releases](https://github.com/arufian/sfwiz/releases/tag/v0.1.0):

| Platform | Binary |
|---|---|
| macOS (Apple Silicon) | `sfwiz-darwin-arm64` |
| macOS (Intel) | `sfwiz-darwin-x64` |
| Linux (x64) | `sfwiz-linux-x64` |
| Linux (ARM64) | `sfwiz-linux-arm64` |

```bash
# macOS example
curl -Lo sfwiz https://github.com/arufian/sfwiz/releases/download/v0.1.0/sfwiz-darwin-arm64
chmod +x sfwiz
./sfwiz
```

### Environment

```bash
cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY
```

## Features

| Area | Commands / UI |
|---|---|
| Orgs | `/orgs` — list authenticated Salesforce orgs |
| Login | `/login` — authenticate a new Salesforce org |
| Knowledge | `/knowledge` (alias `/kb`) — manage knowledge base (qmd) |
| Learn | `/learn` — control continuous learning worker |
| Permissions | `/permissions` — view or change permission mode (ask / auto-edit / yolo) |
| Sessions | `/sessions` — browse and resume prior sessions |
| Model | `/model` — switch active Claude model |
| Help | `/help` — show keybindings and commands |
| Quit | `/quit` (alias `/exit`) — exit sfwiz |
| Command palette | `Ctrl+P` — fuzzy-search commands + toggles |
| Tool surface (LLM-driven) | Apex anonymous, SOQL/describe, deploy/retrieve, scratch create, permset assign, run tests |

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Ctrl+P` | Command palette |
| `Ctrl+W` | Trust workspace |
| `Shift+Tab` | Cycle permission mode (ask → auto-edit → yolo) |
| `Ctrl+B` | Toggle directory tree |
| `Ctrl+Q` | Quit |

## Build from source

```bash
# Current platform binary → dist/sfwiz
bun scripts/build.ts

# All platforms
bun scripts/build.ts --all

# JS bundle (for debugging)
bun scripts/build.ts --bundle
```

## Project structure

```
src/
  cli.ts           Entry point (argv → TUI)
  agent/           Orchestrator loop + subagent dispatcher + cache hints
  config/          Config schema + first-run wizard + trust
  dispatcher/      Command registry + slash-command handlers
  knowledge/       qmd integration + collection bootstrap
  learn/           Background worker + scheduler + event bus
  personas/        Persona registry + gate
  scraper/         HTML→Markdown adapters + season detection
  sf/              @salesforce/core auth + jsforce connection
  tools/           All tool definitions (SF CLI + jsforce + system)
  tui/             OpenTUI/React views, overlays, layout
  util/            Fuzzy search + async utilities
resources/
  personas/        Persona prompt files (Markdown)
  references/      10 Salesforce reference guides
scripts/
  build.ts         bun build --compile wrapper
  dev.ts           Watch + restart for development
```

## License

Apache-2.0 — see [LICENSE](LICENSE).
