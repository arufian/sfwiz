import { PERSONA_PIPELINE } from '~/fixtures/misc';
import { ACCENT, DIM, ERR, OK } from '~/ui/theme';

export function PersonaView() {
  return (
    <box style={{ flexDirection: 'column' }}>
      <text content="Pipeline" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {PERSONA_PIPELINE.map((p) => {
          const sym =
            p.state === 'done'
              ? '✓'
              : p.state === 'active'
                ? '▸'
                : p.state === 'failed'
                  ? '✗'
                  : '·';
          const color =
            p.state === 'done'
              ? OK
              : p.state === 'active'
                ? ACCENT
                : p.state === 'failed'
                  ? ERR
                  : DIM;
          return (
            <box key={p.name} style={{ flexDirection: 'row' }}>
              <text content={`${sym} `} style={{ fg: color }} />
              <text content={p.name} />
              <text content={` ${p.state}`} style={{ fg: DIM }} />
            </box>
          );
        })}
      </box>
    </box>
  );
}
