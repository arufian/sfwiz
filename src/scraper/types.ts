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
  baseUrl: string;
  rateLimit: number;
  shouldSkip(url: string): boolean;
  /** Extract content from HTML, returning title + markdown, or null to skip. */
  extract(html: string, url: string): Promise<{ title: string; markdown: string; url: string } | null>;
}
