import { resolve } from 'path';
import type { PermissionMode } from '~/config/schema';

/** SF destructive ops: always prompt regardless of permission mode. */
const ALWAYS_PROMPT = new Set(['sf_deploy_start', 'sf_scratch_create', 'sf_assign_permset']);

/** Shell commands: prompt in ask + auto-edit, auto-allow in yolo. */
const SHELL_TOOLS = new Set(['run_command']);

/** File-write tools: prompt in ask, auto-allow in auto-edit+yolo (within cwd). */
const FILE_WRITE_TOOLS = new Set(['edit_file', 'write_file']);

/** File-read tools: auto-allow inside cwd in all modes; prompt outside in ask. */
const FILE_READ_TOOLS = new Set(['read_file', 'list_files', 'grep']);

export class PermissionModeGuard {
  constructor(
    private readonly mode: PermissionMode,
    private readonly cwd: string,
  ) {}

  /**
   * Returns true if the tool call should be auto-approved (no prompt needed).
   * Returns false if the TUI should show a PermissionPrompt.
   */
  shouldAutoAllow(toolName: string, args: Record<string, unknown>): boolean {
    // Destructive SF ops: always require explicit prompt.
    if (ALWAYS_PROMPT.has(toolName)) return false;

    switch (this.mode) {
      case 'ask':
        return this.askPolicy(toolName, args);
      case 'auto-edit':
        return this.autoEditPolicy(toolName, args);
      case 'yolo':
        return true; // auto-approve everything non-destructive
    }
  }

  private isInsideCwd(filePath: unknown): boolean {
    if (typeof filePath !== 'string') return false;
    const abs = resolve(filePath);
    return abs.startsWith(resolve(this.cwd));
  }

  private askPolicy(toolName: string, args: Record<string, unknown>): boolean {
    if (FILE_READ_TOOLS.has(toolName)) {
      return this.isInsideCwd(args.path ?? args.dir ?? args.cwd);
    }
    if (FILE_WRITE_TOOLS.has(toolName)) return false;
    if (SHELL_TOOLS.has(toolName)) return false;
    // Unknown tool kinds (ask_user, jsforce queries, qmd_query, ...): auto-allow.
    return true;
  }

  private autoEditPolicy(toolName: string, args: Record<string, unknown>): boolean {
    if (FILE_READ_TOOLS.has(toolName)) return true;
    if (FILE_WRITE_TOOLS.has(toolName)) return this.isInsideCwd(args.path);
    if (SHELL_TOOLS.has(toolName)) return false;
    return true;
  }
}
