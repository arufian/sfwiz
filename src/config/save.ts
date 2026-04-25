import { chmodSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { CONFIG_PATH } from '~/config/load';
import type { Config } from '~/config/schema';

export function saveConfig(config: Config): void {
  mkdirSync(dirname(CONFIG_PATH), { recursive: true, mode: 0o700 });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
  // Restrict to owner (config holds the API key in plaintext).
  try {
    chmodSync(CONFIG_PATH, 0o600);
  } catch {}
  try {
    chmodSync(dirname(CONFIG_PATH), 0o700);
  } catch {}
}
