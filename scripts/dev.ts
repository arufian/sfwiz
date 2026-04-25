#!/usr/bin/env bun
/**
 * Dev runner — watches src/ and restarts the TUI on changes.
 * Runs src/cli.ts directly via bun (no compile step).
 */
import { watch } from 'fs';
import { spawn, type Subprocess } from 'bun';

let proc: Subprocess | null = null;

function start() {
  proc?.kill();
  proc = spawn(['bun', 'run', 'src/cli.ts', ...process.argv.slice(2)], {
    stdout: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  });
}

start();

watch('src', { recursive: true }, (_event, filename) => {
  if (!filename?.endsWith('.ts') && !filename?.endsWith('.tsx')) return;
  console.log(`\n[dev] changed: ${filename} — restarting…\n`);
  start();
});
