import { TextAttributes } from '@opentui/core';
import type { PaletteEntry } from '~/types/ui';
import { ACCENT, DIM } from '~/ui/theme';

export function CommandPalette({
  filter,
  selected,
  entries,
}: {
  filter: string;
  selected: number;
  entries: PaletteEntry[];
}) {
  const visible = entries.slice(0, 9);
  const BG = '#061a1f';
  const ACTIVE_BG = '#0d3a44';
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
        width: 68,
        flexDirection: 'column',
        backgroundColor: BG,
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text
          content="Commands "
          style={{ bg: BG, fg: ACCENT, attributes: TextAttributes.BOLD }}
        />
        <text content={'/'.repeat(50)} style={{ bg: BG, fg: ACCENT }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content="❯ " style={{ bg: BG, fg: ACCENT }} />
        <text
          content={filter.length === 0 ? 'type to filter' : filter}
          style={{ bg: BG, fg: filter.length === 0 ? DIM : undefined }}
        />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {visible.length === 0 ? (
          <text content="no matches" style={{ bg: BG, fg: DIM }} />
        ) : (
          visible.map((e, i) => {
            const active = i === selected;
            const bg = active ? ACTIVE_BG : BG;
            return (
              <box key={e.id} style={{ flexDirection: 'row', backgroundColor: bg }}>
                <text
                  content={active ? '▍ ' : '  '}
                  style={{ bg, fg: active ? ACCENT : DIM }}
                />
                <text
                  content={e.label.padEnd(26)}
                  style={{
                    bg,
                    fg: active ? ACCENT : undefined,
                    attributes: active ? TextAttributes.BOLD : TextAttributes.NONE,
                  }}
                />
                <text
                  content={e.desc.slice(0, 28).padEnd(28)}
                  style={{ bg, fg: DIM }}
                />
                <text content={e.accel ?? ''} style={{ bg, fg: DIM }} />
              </box>
            );
          })
        )}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="tab switch · ↑/↓ choose · enter confirm · esc cancel"
          style={{ bg: BG, fg: DIM }}
        />
      </box>
    </box>
  );
}
