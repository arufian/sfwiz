#!/usr/bin/env bun
/**
 * Install script — copies the compiled sfwiz binary into a system PATH directory.
 *
 * Usage:
 *   bun scripts/install.ts              → copy to /usr/local/bin/sfwiz
 *   bun scripts/install.ts --dry-run    → show what would happen, don't copy
 *   bun scripts/install.ts --target=/usr/bin  → override destination
 */

import { existsSync, copyFileSync, chmodSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { $ } from 'bun';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const targetArg = args.find((a) => a.startsWith('--target='));

const DEST_DIR = targetArg ? targetArg.split('=')[1]! : '/usr/local/bin';
const DEST_FILE = join(DEST_DIR, 'sfwiz');

const platform = process.platform === 'darwin' ? 'darwin' : 'linux';
const arch = process.arch === 'arm64' ? 'arm64' : 'x64';
const platformSuffix = `sfwiz-${platform}-${arch}`;

const candidates = [
  'dist/sfwiz',                     // default single build
  `dist/${platformSuffix}`,         // --all build output
];

function canWrite(path: string): boolean {
  try {
    const s = statSync(path);
    // Check if directory is writable by attempting a temp file
    const testFile = join(path, `.sfwiz-install-test-${Date.now()}`);
    Bun.write(testFile, '');
    Bun.file(testFile).delete();
    return true;
  } catch {
    return false;
  }
}

let src: string | undefined;
for (const c of candidates) {
  if (existsSync(c)) {
    src = c;
    break;
  }
}

if (!src) {
  console.error(`No binary found. Tried: ${candidates.join(', ')}`);
  console.error('Run "bun scripts/build.ts" first.');
  process.exit(1);
}

console.log(`Source : ${src}`);
console.log(`Dest   : ${DEST_FILE}`);

if (dryRun) {
  console.log('(dry-run — no changes made)');
  process.exit(0);
}

const needsSudo = !canWrite(DEST_DIR);

try {
  if (needsSudo) {
    console.log('Destination requires elevated permissions, using sudo...');
    await $`sudo cp ${src} ${DEST_FILE}`;
    await $`sudo chmod +x ${DEST_FILE}`;
  } else {
    copyFileSync(src, DEST_FILE);
    chmodSync(DEST_FILE, 0o755);
  }
  console.log(`Installed → ${DEST_FILE}`);
} catch (err) {
  console.error(`Install failed: ${err}`);
  process.exit(1);
}
