#!/usr/bin/env bun
/**
 * Build script — two modes:
 *   bun scripts/build.ts          → dist/sfwiz (compiled binary, current platform)
 *   bun scripts/build.ts --bundle → dist/cli.js (JS bundle, for debugging)
 */

import { $ } from 'bun';
import { existsSync, mkdirSync } from 'fs';

const bundle = process.argv.includes('--bundle');
const outdir = 'dist';

if (!existsSync(outdir)) mkdirSync(outdir);

if (bundle) {
  await $`bun build --target=bun ./src/cli.ts --outdir ${outdir} --outfile cli.js`;
  console.log('Built dist/cli.js');
} else {
  const platform = `bun-${process.platform}-${process.arch}`;
  const outfile = `${outdir}/sfwiz`;
  await $`bun build --compile --target=${platform} ./src/cli.ts --outfile ${outfile}`;
  console.log(`Built ${outfile} (${platform})`);
}
