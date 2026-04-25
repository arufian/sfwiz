import type { TextareaRenderable } from '@opentui/core';
import { ACCENT, BORDER } from '~/ui/theme';

const INPUT_KEY_BINDINGS = [
  { name: 'return', action: 'submit' as const },
  { name: 'return', shift: true, action: 'newline' as const },
  { name: 'return', meta: true, action: 'newline' as const },
  { name: 'return', ctrl: true, action: 'newline' as const },
];

export function InputLine({
  inputRef,
  focused,
  onSubmit,
}: {
  inputRef: React.RefObject<TextareaRenderable | null>;
  focused: boolean;
  onSubmit: () => void;
}) {
  return (
    <box
      style={{
        border: true,
        borderColor: focused ? ACCENT : BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      <box style={{ flexDirection: 'row', flexShrink: 0 }}>
        <text content="❯ " style={{ fg: ACCENT }} />
        <textarea
          ref={inputRef}
          focused={focused}
          keyBindings={INPUT_KEY_BINDINGS}
          onSubmit={onSubmit}
          placeholder='ask anything... "Fix FLS on OppHandler"'
          placeholderColor={BORDER}
          style={{ flexGrow: 1, minHeight: 1, maxHeight: 8 }}
        />
      </box>
    </box>
  );
}
