import { TextAttributes } from '@opentui/core';
import { ACCENT, DIM } from '~/ui/theme';

export function HelpOverlay() {
  const rows: [string, string][] = [
    ['mouse wheel', 'fluid scroll in chat'],
    ['PgUp / PgDn', 'scroll chat by page'],
    ['Enter', 'submit input'],
    ['Shift/Alt+Enter', 'newline in input'],
    ['Ctrl+B', 'toggle file tree'],
    ['Alt+[ / Alt+]', 'cycle side panel view'],
    ['Shift+Tab', 'cycle perm mode (ask/auto/yolo)'],
    ['Ctrl+D', 'load/clear demo conversation'],
    ['Ctrl+T', 'toggle toast bar'],
    ['Ctrl+K', 'demo: ask_user modal'],
    ['/ (at empty input)', 'open command palette'],
    ['Ctrl+P', 'command palette (Crush-style)'],
    ['Ctrl+G', 'demo: embed progress bar'],
    ['Ctrl+Y', 'demo: thinking line + cloud'],
    ['Ctrl+R', 'demo: running deploy (toggle)'],
    ['Ctrl+W', 'demo: trust-workspace prompt'],
    ['Ctrl+Click tool', 'expand/collapse tool block'],
    ['Ctrl+H', 'this help'],
    ['Ctrl+C / Ctrl+Q', 'quit'],
  ];
  const BG = '#0d1117';
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: ACCENT,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 64,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <text
        content="Keybindings"
        style={{ bg: BG, attributes: TextAttributes.BOLD }}
      />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {rows.map(([k, v]) => (
          <box key={k} style={{ flexDirection: 'row', backgroundColor: BG }}>
            <text content={k.padEnd(20)} style={{ bg: BG, fg: ACCENT }} />
            <text content={v} style={{ bg: BG }} />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1, backgroundColor: BG }}>
        <text content="Esc / Ctrl+H to close" style={{ bg: BG, fg: DIM }} />
      </box>
    </box>
  );
}
