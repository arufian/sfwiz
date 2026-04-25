/**
 * Seed `~/.sfwiz/knowledge/<collection>/` from the bundled corpus generated
 * by `scripts/gen-knowledge-bundle.ts` so first launch skips a slow scrape.
 *
 * The bundle is an inline module (`src/resources/knowledge-bundle.generated.ts`)
 * because `bun build --compile` does not embed arbitrary static directories.
 * Only collections present in the bundle are seeded; others fall back to
 * runtime fetch via `src/learn/docs-fetcher.ts`.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { COLLECTIONS, type CollectionName, KNOWLEDGE_DIR } from '~/knowledge/collections';
import { KNOWLEDGE_BUNDLE } from '~/resources/knowledge-bundle.generated';

function dirHasMarkdown(dir: string): boolean {
  if (!existsSync(dir)) return false;
  try {
    return readdirSync(dir).some((f) => f.endsWith('.md') && !f.startsWith('.'));
  } catch {
    return false;
  }
}

export interface SeedResult {
  seeded: { collection: CollectionName; files: number }[];
  skipped: { collection: CollectionName; reason: string }[];
}

export interface SeedOptions {
  /** Override target dir (defaults to KNOWLEDGE_DIR / each collection.dir). For tests. */
  targetDir?: string;
  /** Override bundle map (defaults to compiled bundle). For tests. */
  bundle?: Record<string, Record<string, string>>;
}

/** Copy bundled markdown into the user knowledge dir for any collection that
 *  is empty on disk and present in the bundle. Idempotent. */
export function seedKnowledgeFromBundle(opts: SeedOptions = {}): SeedResult {
  const bundle = opts.bundle ?? KNOWLEDGE_BUNDLE;
  const baseDir = opts.targetDir ?? KNOWLEDGE_DIR;
  mkdirSync(baseDir, { recursive: true });

  const seeded: SeedResult['seeded'] = [];
  const skipped: SeedResult['skipped'] = [];

  for (const col of COLLECTIONS) {
    const destDir = opts.targetDir ? join(baseDir, col.name) : col.dir;
    if (dirHasMarkdown(destDir)) {
      skipped.push({ collection: col.name, reason: 'already has content' });
      continue;
    }
    const colBundle = bundle[col.name];
    if (!colBundle || Object.keys(colBundle).length === 0) {
      skipped.push({ collection: col.name, reason: 'not in bundle' });
      continue;
    }

    let count = 0;
    for (const [relPath, content] of Object.entries(colBundle)) {
      const dest = join(destDir, relPath);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, content, 'utf8');
      count++;
    }
    if (count > 0) seeded.push({ collection: col.name, files: count });
    else skipped.push({ collection: col.name, reason: 'bundle empty' });
  }

  return { seeded, skipped };
}
