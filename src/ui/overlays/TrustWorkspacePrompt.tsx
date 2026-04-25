import { TextAttributes } from '@opentui/core';
import { ACCENT, DIM, WARN } from '~/ui/theme';

export function TrustWorkspacePrompt({ cwd, selected }: { cwd: string; selected: number }) {
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
        width: 72,
        flexDirection: 'column',
        backgroundColor: '#1a1206',
      }}
    >
      <text
        content="Accessing workspace:"
        style={{ bg: '#1a1206', fg: WARN, attributes: TextAttributes.BOLD }}
      />
      <box style={{ marginTop: 1 }}>
        <text content={cwd} style={{ bg: '#1a1206' }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        <text
          content="Quick safety check: Is this a project you created or one you trust?"
          style={{ bg: '#1a1206', fg: DIM }}
        />
        <text
          content="(Your own code, a well-known OSS project, or work from your team.)"
          style={{ bg: '#1a1206', fg: DIM }}
        />
        <text
          content="If not, take a moment to review what's in this folder first."
          style={{ bg: '#1a1206', fg: DIM }}
        />
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="sfwiz will be able to read, edit, and execute files here."
          style={{ bg: '#1a1206' }}
        />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {['Yes, I trust this folder', 'No, exit'].map((label, i) => (
          <box key={label} style={{ flexDirection: 'row' }}>
            <text
              content={i === selected ? '❯ ' : '  '}
              style={{ bg: '#1a1206', fg: ACCENT }}
            />
            <text content={`${i + 1}. `} style={{ bg: '#1a1206', fg: DIM }} />
            <text
              content={label}
              style={{ bg: '#1a1206', fg: i === selected ? ACCENT : undefined }}
            />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="↑/↓ choose · Enter confirm · Esc cancel"
          style={{ bg: '#1a1206', fg: DIM }}
        />
      </box>
    </box>
  );
}
