import { z } from 'zod';

export const CollectionMeta = z.object({
  url: z.string().url(),
  lastScrape: z.string(),
  etag: z.string().nullable(),
  lastModified: z.string().nullable(),
  chunkCount: z.number().int().min(0),
  bytes: z.number().int().min(0),
});
export type CollectionMeta = z.infer<typeof CollectionMeta>;

export interface Adapter {
  name: 'apex-ref' | 'lwc-guide' | 'sf-releases';
  detectEntrypoints(): Promise<string[]>;
  shouldInclude(url: string): boolean;
  toSlug(url: string): string;
  extractMarkdown(html: string, url: string): string;
  writeMeta(meta: CollectionMeta): Promise<void>;
}
