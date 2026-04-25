# sfwiz

**sfwiz** is a Claude-Code-style interactive TUI harness for the Salesforce ecosystem — built for Apex developers, LWC engineers, and Salesforce admins who want AI-assisted workflows without leaving the terminal.

> Hackathon project — powered by Anthropic Claude (Managed Agents).

## Demo

[Demo video — coming soon (submission day)]

## Architecture

sfwiz uses a **hybrid Managed Agents** design:

- **Main loop** (`@anthropic-ai/sdk` `messages.stream()`): designer → developer → deploy-manager personas
- **Isolated subagents** (`@anthropic-ai/claude-agent-sdk` `query()`): reviewer (Opus 4.7, read-only) + qa (Sonnet 4.6) run as sandboxed agents with strict tool-scope
- **Continuous-learn worker** (Bun Worker): daily scraper → qmd embed of Apex reference, LWC guide, and Salesforce release notes
- **Prompt caching**: 4-breakpoint strategy — system block, last tool-def, stable history prefix, last assistant turn

See [`docs/submission/managed-agents.md`](docs/submission/managed-agents.md) for the full Managed Agents write-up.

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
bun run poc        # PoC TUI demo (no SF org required)
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
| Orgs | `/orgs` — list + switch SF orgs; auto-kicks `sf login web` if empty |
| Deploy | `/deploy` — source-tracking diff → confirm → `sf project deploy start` |
| Scratch orgs | `/scratch` — create, push, assign permset, open |
| SOQL | `/query` — run SOQL with jsforce (standard + Tooling API) |
| Apex | `/apex` — anonymous Apex execution |
| Knowledge | `Ctrl+G` — embed Apex reference, LWC guide, SF release notes |
| Command palette | `Ctrl+P` — fuzzy-search all commands + toggles |
| Personas | designer → developer → reviewer → qa → deploy-manager |

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Ctrl+P` | Command palette |
| `Ctrl+W` | Trust workspace |
| `Shift+Tab` | Cycle permission mode (ask → auto → yolo) |
| `Ctrl+G` | Knowledge embed progress |
| `Ctrl+Y` | Thinking loader demo |
| `Ctrl+R` | Deploy progress demo |
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
  cli.ts           Entry point (argv → TUI or --plain)
  agent/           AgentLoop + cache hints + subagent orchestration
  config/          Config schema + first-run wizard + trust
  dispatcher/      Command registry + slash-command handlers
  knowledge/       qmd integration + collection bootstrap
  learn/           Background worker + scheduler + event bus
  personas/        5 personas + gate enforcement
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
