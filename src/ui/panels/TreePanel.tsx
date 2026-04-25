import { TextAttributes } from '@opentui/core';
import { TREE_GROUPS } from '~/fixtures/tree';
import type { SyncState } from '~/types/ui';
import { BORDER, CONFLICT, DIM, ERR, INFLIGHT, OK } from '~/ui/theme';

const SYNC: Record<SyncState, { symbol: string; color: string }> = {
  synced: { symbol: '●', color: OK },
  dirty: { symbol: '◆', color: ERR },
  delete: { symbol: '✗', color: ERR },
  loose: { symbol: '·', color: DIM },
  conflict: { symbol: '!', color: CONFLICT },
  inflight: { symbol: '⋯', color: INFLIGHT },
};

export function TreePanel() {
  const totalDirty = TREE_GROUPS.reduce(
    (n, g) => n + g.items.filter((i) => i.state !== 'synced' && i.state !== 'loose').length,
    0,
  );
  return (
    <box
      style={{
        border: true,
        borderColor: BORDER,
        width: 30,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'column',
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text content="tree" />
        <text content={` · ${totalDirty} changed`} style={{ fg: DIM }} />
      </box>
      {TREE_GROUPS.map((g) => (
        <box key={g.label} style={{ flexDirection: 'column', marginTop: 1 }}>
          <text content={g.label} style={{ fg: DIM }} />
          {g.items.map((it) => {
            const s = SYNC[it.state];
            const strike = it.state === 'delete';
            return (
              <box key={it.name} style={{ flexDirection: 'row' }}>
                <text content="  " />
                <text content={s.symbol} style={{ fg: s.color }} />
                <text content=" " />
                <text
                  content={it.name}
                  style={{
                    fg: strike ? ERR : undefined,
                    attributes: strike ? TextAttributes.STRIKETHROUGH : TextAttributes.NONE,
                  }}
                />
              </box>
            );
          })}
        </box>
      ))}
      <box style={{ marginTop: 1 }}>
        <text content="Ctrl+B hide · Ctrl+D demo · r refresh" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
