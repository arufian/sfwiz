#!/usr/bin/env bun
/**
 * Build script:
 *   bun scripts/build.ts          → dist/sfwiz (compiled, current platform)
 *   bun scripts/build.ts --all    → dist/sfwiz-{platform} for all 4 targets
 *   bun scripts/build.ts --bundle → dist/cli.js (JS bundle, for debugging)
 */

import { $ } from 'bun';
import { existsSync, mkdirSync, statSync } from 'fs';

const args = process.argv.slice(2);
const bundle = args.includes('--bundle');
const all = args.includes('--all');
const outdir = 'dist';

if (!existsSync(outdir)) mkdirSync(outdir);

const TARGETS = [
  { target: 'bun-darwin-arm64', suffix: 'darwin-arm64' },
  { target: 'bun-darwin-x64', suffix: 'darwin-x64' },
  { target: 'bun-linux-x64', suffix: 'linux-x64' },
  { target: 'bun-linux-arm64', suffix: 'linux-arm64' },
] as const;

const SIZE_LIMIT_MB = 80; // Bun runtime itself ~50 MB; 80 MB is realistic with npm deps

function fileSizeMb(path: string): number {
  return statSync(path).size / (1024 * 1024);
}

function sizeLabel(mb: number): string {
  return `${mb.toFixed(1)} MB`;
}

if (bundle) {
  await $`bun build --target=bun ./src/cli.ts --outdir ${outdir} --outfile cli.js`;
  console.log('Built dist/cli.js');
} else if (all) {
  const results: Array<{ outfile: string; ok: boolean; size?: string; err?: string }> = [];
  for (const { target, suffix } of TARGETS) {
    const outfile = `${outdir}/sfwiz-${suffix}`;
    try {
      await $`bun build --compile --minify --target=${target} ./src/cli.ts --outfile ${outfile}`;
      const mb = fileSizeMb(outfile);
      const ok = mb <= SIZE_LIMIT_MB;
      results.push({ outfile, ok, size: sizeLabel(mb) });
      const icon = ok ? '✓' : '⚠ OVER LIMIT';
      console.log(`${icon}  ${outfile}  ${sizeLabel(mb)}`);
    } catch (err) {
      results.push({ outfile, ok: false, err: String(err) });
      console.error(`✗  ${outfile}  FAILED: ${err}`);
    }
  }
  const failures = results.filter((r) => !r.ok);
  if (failures.length > 0) {
    console.error(`\n${failures.length} build(s) failed or exceeded ${SIZE_LIMIT_MB} MB limit.`);
    process.exit(1);
  }
  console.log('\nAll targets built successfully.');
} else {
  const platform = `bun-${process.platform === 'darwin' ? 'darwin' : 'linux'}-${process.arch === 'arm64' ? 'arm64' : 'x64'}`;
  const outfile = `${outdir}/sfwiz`;
  await $`bun build --compile --minify --target=${platform} ./src/cli.ts --outfile ${outfile}`;
  const mb = fileSizeMb(outfile);
  const icon = mb <= SIZE_LIMIT_MB ? '✓' : '⚠ OVER LIMIT';
  console.log(`${icon}  ${outfile}  ${sizeLabel(mb)}  (${platform})`);
  if (mb > SIZE_LIMIT_MB) process.exit(1);
}
