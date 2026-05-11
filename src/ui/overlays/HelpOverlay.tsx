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
    ['Shift+Tab', 'cycle perm mode (ask/edit/auto)'],
    ['Ctrl+T', 'toggle toast bar'],
    ['/ (at empty input)', 'open command palette'],
    ['Ctrl+P', 'command palette'],
    ['Ctrl+Click tool', 'expand/collapse tool block'],
    ['drag to select', 'auto-copy selection to clipboard'],
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
        width: 54,
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
