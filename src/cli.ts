#!/usr/bin/env bun
/**
 * sfwiz CLI entry point.
 * Parses argv then boots TUI (or --plain text mode).
 */
export {};

const args = process.argv.slice(2);

if (args.includes('--version') || args.includes('-v')) {
  const pkg = await import('../package.json', { with: { type: 'json' } });
  console.log(`sfwiz ${pkg.default.version}`);
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`\
sfwiz — Salesforce TUI harness powered by Claude

Usage:
  sfwiz [options]

Options:
  --version, -v          Print version and exit
  --help, -h             Show this help
  --plain                No-ANSI mode for CI / SSH
  --trust-this-workspace Bypass trust prompt for cwd (writes trust record)
  --first-run            Force re-run setup wizard
`);
  process.exit(0);
}

const plain = args.includes('--plain');
const trustBypass = args.includes('--trust-this-workspace');
const forceFirstRun = args.includes('--first-run');

if (plain) {
  // Plain mode: minimal text REPL (no opentui). Stubbed until M17.
  console.log('sfwiz plain mode — not yet implemented');
  process.exit(0);
}

// Boot full TUI — delegate to launch() which owns JSX.
const { launch } = await import('~/tui/launch');
await launch({ trustBypass, forceFirstRun });
