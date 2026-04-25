/** @jsxImportSource @opentui/react */
import { TextAttributes } from '@opentui/core';
import { useEffect, useState } from 'react';
import { ACCENT, DIM } from '~/ui/theme';
import type { FuzzyMatch } from '~/util/fuzzy';

export interface CommandPaletteProps {
  visible: boolean;
  query: string;
  selectedIndex: number;
  matches: FuzzyMatch[];
}

const BG = '#061a1f';
const ACTIVE_BG = '#0d3a44';

export function CommandPalette({ visible, query, selectedIndex, matches }: CommandPaletteProps) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  const shown = matches.slice(0, 15);
  const cursor = blink ? '|' : ' ';

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
      <box style={{ flexDirection: 'row', backgroundColor: BG }}>
        <text
          content="Commands "
          style={{ bg: BG, fg: ACCENT, attributes: TextAttributes.BOLD }}
        />
        <text content={'/'.repeat(50)} style={{ bg: BG, fg: ACCENT }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'row', backgroundColor: BG }}>
        <text content="❯ " style={{ bg: BG, fg: ACCENT }} />
        <text
          content={query.length === 0 ? `${cursor} type to filter` : `${query}${cursor}`}
          style={{ bg: BG, fg: query.length === 0 ? DIM : undefined }}
        />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column', backgroundColor: BG }}>
        {shown.length === 0 ? (
          <text content="  no matches" style={{ bg: BG, fg: DIM }} />
        ) : (
          shown.map((r, i) => {
            const active = i === selectedIndex;
            const bg = active ? ACTIVE_BG : BG;
            return (
              <box key={r.item} style={{ flexDirection: 'row', backgroundColor: bg }}>
                <text
                  content={active ? '▍ ' : '  '}
                  style={{ bg, fg: active ? ACCENT : DIM }}
                />
                <text
                  content={r.item}
                  style={{
                    bg,
                    fg: active ? ACCENT : undefined,
                    attributes: active ? TextAttributes.BOLD : TextAttributes.NONE,
                  }}
                />
              </box>
            );
          })
        )}
      </box>
      <box style={{ marginTop: 1, backgroundColor: BG }}>
        <text
          content="tab autocomplete · ↑/↓ choose · enter confirm · esc cancel"
          style={{ bg: BG, fg: DIM }}
        />
      </box>
    </box>
  );
}
