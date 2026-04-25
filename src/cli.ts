#!/usr/bin/env bun
/**
 * sfwiz CLI entry point.
 * Parses argv then boots the TUI.
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
  --trust-this-workspace Bypass trust prompt for cwd (writes trust record)
  --first-run            Force re-run setup wizard
`);
  process.exit(0);
}

const trustBypass = args.includes('--trust-this-workspace');
const forceFirstRun = args.includes('--first-run');

const { launch } = await import('~/tui/launch');
await launch({ trustBypass, forceFirstRun });
