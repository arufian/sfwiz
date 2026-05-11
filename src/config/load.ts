import { existsSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join, resolve } from 'path';
import { Config } from '~/config/schema';

export const SFWIZ_DIR = join(homedir(), '.sfwiz');
export const CONFIG_PATH = join(SFWIZ_DIR, 'config.json');
export const TRUST_PATH = join(SFWIZ_DIR, 'trusted-workspaces.json');

export function loadConfig(): Config | null {
  if (!existsSync(CONFIG_PATH)) return null;
  try {
    const raw = readFileSync(CONFIG_PATH, 'utf8');
    const cfg = Config.parse(JSON.parse(raw));
    // Migrate legacy apiKey → apiKeys['anthropic']
    if (cfg.llm.apiKey && !cfg.llm.apiKeys['anthropic']) {
      cfg.llm.apiKeys = { ...cfg.llm.apiKeys, anthropic: cfg.llm.apiKey };
    }
    return cfg;
  } catch {
    return null;
  }
}

/** Defaults for a fresh config (used by first-run wizard). */
export function defaultConfig(model: string): Config {
  return Config.parse({
    version: 1,
    llm: { provider: 'anthropic', model },
    salesforce: { defaultOrgAlias: null, preferredAuthMethod: 'sfcli' },
  });
}
