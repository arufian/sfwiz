/** @jsxImportSource @opentui/react */

const WARN = '#f8c200';
const ACCENT = '#4fc3f7';
const DIM = '#888';

const TOOL_DESCRIPTIONS: Record<string, string> = {
  edit_file: 'Edit a file',
  write_file: 'Write a new file',
  read_file: 'Read a file (outside cwd)',
  list_files: 'List a directory (outside cwd)',
  grep: 'Search files (outside cwd)',
  run_command: 'Run a shell command',
};

function summarizeArgs(toolName: string, args: Record<string, unknown>): string {
  if (toolName === 'run_command' && typeof args.command === 'string') {
    return args.command.slice(0, 80);
  }
  if (typeof args.path === 'string') return args.path;
  if (typeof args.dir === 'string') return args.dir;
  if (typeof args.cwd === 'string') return args.cwd;
  try {
    return JSON.stringify(args).slice(0, 80);
  } catch {
    return '';
  }
}

export function PermissionPrompt({
  toolName,
  args,
  selected,
}: {
  toolName: string;
  args: Record<string, unknown>;
  selected: number;
}) {
  const desc = TOOL_DESCRIPTIONS[toolName] ?? toolName;
  const arg = summarizeArgs(toolName, args);

  return (
    <box border={true} borderStyle="rounded" borderColor={WARN} width={68}>
      <text fg={DIM}>{'── permission required ─────────────────────────────────'}</text>
      <text>{'The agent wants to:'}</text>
      <text> </text>
      <text fg={ACCENT}>{`  ${desc}`}</text>
      {arg ? <text fg={DIM}>{`  ${arg}`}</text> : null}
      <text> </text>
      <text
        fg={selected === 0 ? ACCENT : '#aaa'}
      >{`${selected === 0 ? '● ' : '○ '}Allow once`}</text>
      <text fg={selected === 1 ? ACCENT : '#aaa'}>{`${selected === 1 ? '● ' : '○ '}Deny`}</text>
      <text> </text>
      <text fg={DIM}>{'↑/↓ select · Enter confirm · Esc deny · /permissions to change mode'}</text>
    </box>
  );
}
