#!/usr/bin/env bun
/**
 * BUG-2 repro probe. Exercises both org-listing paths so we can tell
 * whether either fails inside a compiled binary the way the E2E run
 * reported (`/orgs` returning 0 entries even though `sf org list` works
 * from a shell).
 *
 *   dev:    bun scripts/probe-orgs.ts
 *   binary: bun build --compile ./scripts/probe-orgs.ts --outfile dist/probe-orgs && ./dist/probe-orgs
 */
import { listOrgs } from '~/sf/auth';
import { spawn } from 'node:child_process';

function runJson(cmd: string, args: string[]): Promise<string | null> {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { env: process.env });
    let out = '';
    child.stdout?.on('data', (d) => { out += String(d); });
    child.on('error', () => resolve(null));
    child.on('close', (code) => resolve(code === 0 || out.trim() ? out : null));
  });
}

async function main() {
  console.log('== probe: listOrgs() via @salesforce/core ==');
  try {
    const t0 = Date.now();
    const orgs = await listOrgs();
    const ms = Date.now() - t0;
    console.log(`listOrgs returned ${orgs.length} entries in ${ms} ms`);
    for (const o of orgs.slice(0, 10)) {
      console.log(`  - ${o.alias ?? '<no-alias>'}  ${o.username}  ${o.connectedStatus}`);
    }
  } catch (err) {
    console.error('listOrgs threw:', err);
  }

  console.log('\n== probe: sf org list --json (async spawn) ==');
  const out = await runJson('sf', ['org', 'list', '--json']);
  if (!out) {
    console.log('sf org list returned null');
  } else {
    try {
      const parsed = JSON.parse(out) as { result?: { nonScratchOrgs?: unknown[]; scratchOrgs?: unknown[] } };
      const r = parsed.result ?? {};
      console.log(`nonScratchOrgs: ${(r.nonScratchOrgs ?? []).length}`);
      console.log(`scratchOrgs:    ${(r.scratchOrgs ?? []).length}`);
    } catch {
      console.log('sf org list returned non-JSON:', out.slice(0, 200));
    }
  }

  console.log('\n== env summary ==');
  console.log(`  HOME=${process.env.HOME}`);
  console.log(`  PATH includes /usr/local/bin: ${(process.env.PATH ?? '').includes('/usr/local/bin')}`);
  console.log(`  argv[0]=${process.argv[0]}`);
  console.log(`  isCompiled=${process.argv[0]?.includes('sfwiz') || process.argv[0]?.includes('probe-orgs')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
