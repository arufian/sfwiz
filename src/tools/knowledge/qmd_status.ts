import { z } from 'zod';
import { spawnSync } from 'child_process';
import type { Tool } from '~/tools/types';
import { detectQmd } from '~/knowledge/detect';
import { listRegisteredCollections } from '~/knowledge/collections';

const Params = z.object({});

export const qmdStatus: Tool<typeof Params> = {
  name: 'qmd_status',
  description: 'Report knowledge base status: qmd version, registered collections, index health.',
  parameters: Params,
  async execute() {
    const info = detectQmd();
    if (!info) return { installed: false, collections: [], raw: '' };

    const r = spawnSync(info.binPath, ['status'], { encoding: 'utf8', timeout: 10_000 });
    const collections = listRegisteredCollections();
    return { installed: true, version: info.version, collections, raw: r.stdout ?? '' };
  },
};
