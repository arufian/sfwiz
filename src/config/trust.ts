import { z } from 'zod';
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { resolve } from 'path';

const TrustEntry = z.object({
  path: z.string(),
  firstTrustedAt: z.string(),
  lastSeenAt: z.string(),
});

const TrustFile = z.array(TrustEntry);
type TrustEntry = z.infer<typeof TrustEntry>;

export class TrustStore {
  private entries: TrustEntry[] = [];
  private dirty = false;

  constructor(private readonly filePath: string) {
    this.load();
  }

  private load(): void {
    if (!existsSync(this.filePath)) return;
    try {
      const raw = readFileSync(this.filePath, 'utf8');
      this.entries = TrustFile.parse(JSON.parse(raw));
    } catch {
      // Back up corrupted file.
      const backup = this.filePath.replace('.json', `.corrupted-${Date.now()}.json`);
      try { copyFileSync(this.filePath, backup); } catch {}
      this.entries = [];
    }
  }

  private save(): void {
    writeFileSync(this.filePath, JSON.stringify(this.entries, null, 2), 'utf8');
    this.dirty = false;
  }

  isTrusted(cwd: string): boolean {
    const abs = resolve(cwd);
    return this.entries.some((e) => e.path === abs);
  }

  trust(cwd: string): void {
    const abs = resolve(cwd);
    const now = new Date().toISOString();
    const existing = this.entries.find((e) => e.path === abs);
    if (existing) {
      existing.lastSeenAt = now;
    } else {
      this.entries.push({ path: abs, firstTrustedAt: now, lastSeenAt: now });
    }
    this.save();
  }

  untrust(cwd: string): void {
    const abs = resolve(cwd);
    this.entries = this.entries.filter((e) => e.path !== abs);
    this.save();
  }
}
