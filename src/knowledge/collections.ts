import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const KNOWLEDGE_DIR = join(homedir(), '.sfwiz', 'knowledge');

export type CollectionName = 'apex-ref' | 'lwc-guide' | 'sf-releases' | 'sf-cli-ref' | 'jsforce';

export interface CollectionSpec {
  name: CollectionName;
  dir: string;
  pattern: string;
  description: string;
}

export const COLLECTIONS: CollectionSpec[] = [
  {
    name: 'apex-ref',
    dir: join(KNOWLEDGE_DIR, 'apex-ref'),
    pattern: '**/*.md',
    description: 'Salesforce Apex Developer Reference (ConnectApi omitted)',
  },
  {
    name: 'lwc-guide',
    dir: join(KNOWLEDGE_DIR, 'lwc-guide'),
    pattern: '**/*.md',
    description: 'Lightning Web Components Developer Guide',
  },
  {
    name: 'sf-releases',
    dir: join(KNOWLEDGE_DIR, 'sf-releases'),
    pattern: '**/*.md',
    description: 'Salesforce Release Notes (current + previous 2 seasons)',
  },
  {
    name: 'sf-cli-ref',
    dir: join(KNOWLEDGE_DIR, 'sf-cli-ref'),
    pattern: '**/*.md',
    description: 'Salesforce CLI (sf) unified command reference',
  },
  {
    name: 'jsforce',
    dir: join(KNOWLEDGE_DIR, 'jsforce'),
    pattern: '**/*.md',
    description:
      'JSforce v3 reference (Connection, Query, CRUD, Bulk2, Metadata, Tooling, Apex REST, SOSL)',
  },
];

/** List qmd collections registered on this machine. */
export function listRegisteredCollections(): string[] {
  const r = spawnSync('qmd', ['collection', 'list', '--json'], {
    encoding: 'utf8',
    timeout: 10_000,
  });
  if (r.error || r.status !== 0) return [];
  try {
    const parsed = JSON.parse(r.stdout) as { name: string }[] | { collections: { name: string }[] };
    if (Array.isArray(parsed)) return parsed.map((c) => c.name);
    return (parsed.collections ?? []).map((c) => c.name);
  } catch {
    // Fallback: parse text output for collection names
    return (r.stdout ?? '')
      .split('\n')
      .filter((l) => l.startsWith('apex-') || l.startsWith('lwc-') || l.startsWith('sf-'));
  }
}

/** Ensure knowledge directories exist and collections are registered with qmd. */
export function bootstrapCollections(qmdBin: string): void {
  mkdirSync(KNOWLEDGE_DIR, { recursive: true });

  for (const col of COLLECTIONS) {
    mkdirSync(col.dir, { recursive: true });

    const existing = spawnSync(qmdBin, ['collection', 'show', col.name], {
      encoding: 'utf8',
      timeout: 10_000,
    });
    if (existing.status !== 0) {
      spawnSync(qmdBin, ['collection', 'add', col.name, col.dir, '--pattern', col.pattern], {
        encoding: 'utf8',
        timeout: 10_000,
      });
    }
  }
}

/** Check if a collection directory has any content. */
export function collectionHasContent(name: CollectionName): boolean {
  const spec = COLLECTIONS.find((c) => c.name === name);
  if (!spec || !existsSync(spec.dir)) return false;
  const r = spawnSync('find', [spec.dir, '-name', '*.md', '-maxdepth', '3'], { encoding: 'utf8' });
  return (r.stdout ?? '').trim().length > 0;
}
