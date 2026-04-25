import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { CONFIG_PATH } from '~/config/load';
import type { Config } from '~/config/schema';

export function saveConfig(config: Config): void {
  mkdirSync(dirname(CONFIG_PATH), { recursive: true });
  // Atomic write: write to tmp then rename (Node/Bun don't have native rename-atomic,
  // but writeFileSync is synchronous which is good enough for single-user CLI).
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}
