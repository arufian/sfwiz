import { useEffect, useState } from 'react';
import { learnBus } from '~/learn/bus';
import { ACCENT, DIM, OK } from '~/ui/theme';

interface PhaseEntry {
  name: string;
  state: 'active' | 'done';
  numTurns?: number;
  costUsd?: number;
}

export function PersonaView() {
  const [history, setHistory] = useState<PhaseEntry[]>([]);

  useEffect(() => {
    const onSpawn = (e: { name: string }) => {
      setHistory((h) => [...h, { name: e.name, state: 'active' }]);
    };
    const onDone = (e: { name: string; numTurns: number; totalCostUsd: number }) => {
      setHistory((h) => {
        const i = h.findLastIndex((p) => p.name === e.name && p.state === 'active');
        if (i < 0) return h;
        const next = h.slice();
        next[i] = {
          name: e.name,
          state: 'done',
          numTurns: e.numTurns,
          costUsd: e.totalCostUsd,
        };
        return next;
      });
    };
    learnBus.on('subagent:spawn', onSpawn);
    learnBus.on('subagent:done', onDone);
    return () => {
      learnBus.off('subagent:spawn', onSpawn);
      learnBus.off('subagent:done', onDone);
    };
  }, []);

  const current = history.findLast((p) => p.state === 'active') ?? null;

  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Persona pipeline" />
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content="current: " style={{ fg: DIM }} />
        <text content={current ? current.name : '(idle)'} style={{ fg: ACCENT }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {history.length === 0 ? (
          <text content="no handoffs yet" style={{ fg: DIM }} />
        ) : (
          history.map((p, idx) => {
            const sym = p.state === 'done' ? '✓' : '▸';
            const color = p.state === 'done' ? OK : ACCENT;
            const meta =
              p.state === 'done' && p.numTurns != null
                ? ` ${p.numTurns}t · $${(p.costUsd ?? 0).toFixed(3)}`
                : ' running…';
            return (
              <box key={`${p.name}-${idx}`} style={{ flexDirection: 'row' }}>
                <text content={`${sym} `} style={{ fg: color }} />
                <text content={p.name} />
                <text content={meta} style={{ fg: DIM }} />
              </box>
            );
          })
        )}
      </box>
    </box>
  );
}
