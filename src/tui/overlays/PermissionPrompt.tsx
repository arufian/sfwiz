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

export type PermissionDecision =
  | 'allow_project'
  | 'allow_once'
  | 'auto_mode'
  | 'deny';

export const PERMISSION_DECISIONS: PermissionDecision[] = [
  'allow_project',
  'allow_once',
  'auto_mode',
  'deny',
];

const OPTION_LABELS: Record<PermissionDecision, string> = {
  allow_project: 'Allow for this project',
  allow_once: 'Allow once',
  auto_mode: 'Auto-mode (always allowed)',
  deny: 'Deny',
};

function summarizeArgs(toolName: string, args: Record<string, unknown>): string {
  if (toolName === 'run_command' && typeof args.command === 'string') {
    const cmd = args.command;
    const rawArgs = args.args;
    const argList = Array.isArray(rawArgs)
      ? rawArgs.filter((a): a is string => typeof a === 'string')
      : typeof rawArgs === 'string'
        ? (() => {
            try {
              const p = JSON.parse(rawArgs);
              if (Array.isArray(p)) return p.filter((a): a is string => typeof a === 'string');
            } catch {}
            return rawArgs.split(/\s+/).filter(Boolean);
          })()
        : [];
    return [cmd, ...argList].join(' ').slice(0, 80);
  }
  if (typeof args.path === 'string') return args.path;
  if (typeof args.dir === 'string') return args.dir;
  if (typeof args.cwd === 'string') return args.cwd;
  return '';
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
      {PERMISSION_DECISIONS.map((d, i) => (
        <text key={d} fg={selected === i ? ACCENT : '#aaa'}>{`${selected === i ? '● ' : '○ '}${OPTION_LABELS[d]}`}</text>
      ))}
      <text> </text>
      <text fg={DIM}>{'↑/↓ select · Enter confirm · Esc deny'}</text>
    </box>
  );
}
