import { ToolRegistry } from '~/tools/registry';
import { askUserTool } from '~/tools/interaction/ask_user';
import { readFileTool } from '~/tools/fs/read_file';
import { listFilesTool } from '~/tools/fs/list_files';
import { editFileTool } from '~/tools/fs/edit_file';
import { writeFileTool } from '~/tools/fs/write_file';
import { grepTool } from '~/tools/fs/grep';
import { runCommandTool } from '~/tools/shell/run_command';

export function buildDefaultRegistry(): ToolRegistry {
  const reg = new ToolRegistry();
  reg.registerTool(askUserTool);
  reg.registerTool(readFileTool);
  reg.registerTool(listFilesTool);
  reg.registerTool(editFileTool);
  reg.registerTool(writeFileTool);
  reg.registerTool(grepTool);
  reg.registerTool(runCommandTool);
  return reg;
}

export { ToolRegistry };
export * from '~/tools/registry';
export * from '~/tools/gate';
export * from '~/tools/permission-mode';
