/**
 * First-run wizard orchestrator.
 * Called by TUI when config is absent (M6 wires this through FirstRunWizard.tsx).
 * For M6 we export the logic; the TUI overlay handles user interaction.
 */
import { mkdirSync } from 'fs';
import { SFWIZ_DIR } from '~/config/load';
import { saveConfig, } from '~/config/save';
import { defaultConfig } from '~/config/load';
import type { PermissionMode } from '~/config/schema';

export interface FirstRunAnswers {
  model: string;
  permissionMode: PermissionMode;
}

export function completeFirstRun(answers: FirstRunAnswers): void {
  mkdirSync(SFWIZ_DIR, { recursive: true });
  const config = defaultConfig(answers.model);
  config.permissionMode = answers.permissionMode;
  saveConfig(config);
}
