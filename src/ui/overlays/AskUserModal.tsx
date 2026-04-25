import { TextAttributes } from '@opentui/core';
import { ACCENT, DIM, WARN } from '~/ui/theme';

export function AskUserModal({ selected }: { selected: number }) {
  const options = [
    'Scratch org (acme-scratch)',
    'Existing org (acme-uat) — prod-adjacent',
    "Local only (validate, don't deploy)",
    'Cancel',
  ];
  const BG = '#1a1206';
  return (
    <box
      style={{
        border: true,
        borderStyle: 'rounded',
        borderColor: WARN,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        width: 62,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <text
        content="── persona: deploy-manager ────────────────────"
        style={{ bg: BG, fg: DIM }}
      />
      <box style={{ marginTop: 1 }}>
        <text content="Deploy target?" style={{ bg: BG }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {options.map((o, i) => (
          <text
            key={o}
            content={`${i === selected ? '● ' : '○ '}${o}`}
            style={{ bg: BG, fg: i === selected ? ACCENT : undefined }}
          />
        ))}
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text content="preview ───────────────────────────────────" style={{ bg: BG, fg: DIM }} />
        <text content=" sf project deploy start \\" style={{ bg: BG, fg: DIM }} />
        <text content="   --target-org acme-scratch \\" style={{ bg: BG, fg: DIM }} />
        <text content="   --test-level RunLocalTests" style={{ bg: BG, fg: DIM }} />
      </box>
      <box style={{ marginTop: 1 }}>
        <text content="↑/↓ select · Enter confirm · Esc cancel · Ctrl+K close demo" style={{ bg: BG, fg: DIM }} />
      </box>
    </box>
  );
}
