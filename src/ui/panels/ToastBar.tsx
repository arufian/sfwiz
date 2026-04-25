import { TextAttributes } from '@opentui/core';
import { OK } from '~/ui/theme';

export function ToastBar({ msg }: { msg: string }) {
  return (
    <box
      style={{
        backgroundColor: OK,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 1,
        flexShrink: 0,
      }}
    >
      <text content="OKAY! " style={{ bg: OK, fg: '#000000', attributes: TextAttributes.BOLD }} />
      <text content={msg} style={{ bg: OK, fg: '#000000' }} />
    </box>
  );
}
