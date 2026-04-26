import { z } from 'zod';
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, resolve } from 'path';

const ProjectEntry = z.object({
  path: z.string(),
  allowed: z.array(z.string()),
});

const PermissionFile = z.array(ProjectEntry);
type ProjectEntry = z.infer<typeof ProjectEntry>;

export class PermissionStore {
  private entries: ProjectEntry[] = [];

  constructor(private readonly filePath: string) {
    this.load();
  }

  private load(): void {
    if (!existsSync(this.filePath)) return;
    try {
      const raw = readFileSync(this.filePath, 'utf8');
      this.entries = PermissionFile.parse(JSON.parse(raw));
    } catch {
      const backup = this.filePath.replace('.json', `.corrupted-${Date.now()}.json`);
      try {
        copyFileSync(this.filePath, backup);
      } catch {}
      this.entries = [];
    }
  }

  private save(): void {
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, JSON.stringify(this.entries, null, 2), 'utf8');
  }

  isAllowed(cwd: string, key: string): boolean {
    const abs = resolve(cwd);
    const entry = this.entries.find((e) => e.path === abs);
    return !!entry?.allowed.includes(key);
  }

  allow(cwd: string, key: string): void {
    const abs = resolve(cwd);
    let entry = this.entries.find((e) => e.path === abs);
    if (!entry) {
      entry = { path: abs, allowed: [] };
      this.entries.push(entry);
    }
    if (!entry.allowed.includes(key)) entry.allowed.push(key);
    this.save();
  }
}
