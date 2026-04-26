#!/usr/bin/env bash
# Launch sfwiz. Builds the binary on first run, then re-uses dist/sfwiz.
#
# Usage:
#   ./run_sfwiz.sh                   launch (build if missing)
#   ./run_sfwiz.sh --rebuild         force rebuild before launch
#   ./run_sfwiz.sh --first-run       force first-run wizard
#   ./run_sfwiz.sh --trust-this-workspace
#                                    bypass trust prompt
#
# Set the API key from inside the TUI: open the command palette with Ctrl+P
# and run /provider (alias /api-key). No .env file is required.

set -euo pipefail

cd "$(dirname "$0")"

REBUILD=0
PASS_ARGS=()
for arg in "$@"; do
  case "$arg" in
    --rebuild) REBUILD=1 ;;
    *) PASS_ARGS+=("$arg") ;;
  esac
done

if ! command -v bun >/dev/null 2>&1; then
  echo "error: bun is required (https://bun.sh)" >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "→ installing deps (bun install)…"
  bun install
fi

if [ "$REBUILD" -eq 1 ] || [ ! -x dist/sfwiz ]; then
  echo "→ building dist/sfwiz…"
  bun scripts/build.ts
fi

exec ./dist/sfwiz "${PASS_ARGS[@]}"
