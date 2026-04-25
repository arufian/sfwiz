import { TextAttributes } from '@opentui/core';
import { FIXTURE } from '~/fixtures/chat';
import type { PermissionMode } from '~/types/ui';
import { ACCENT, DIM, ERR, INFLIGHT, OK, WARN } from '~/ui/theme';

function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function clockHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function StatusBar({ mode }: { mode: PermissionMode }) {
  const f = FIXTURE;
  const orgColor = f.org.status === 'connected' ? OK : ERR;
  const buildMark = f.build === 'ok' ? '✓' : f.build === 'fail' ? '✗' : '⋯';
  const buildColor = f.build === 'ok' ? OK : f.build === 'fail' ? ERR : INFLIGHT;
  const kb =
    f.knowledge === 'fresh'
      ? { t: '📚 ✓', c: OK }
      : f.knowledge === 'embedding'
        ? { t: '📚 ⋯', c: INFLIGHT }
        : f.knowledge === 'stale'
          ? { t: '📚 !', c: WARN }
          : f.knowledge === 'ref-only'
            ? { t: '📚 ref-only', c: WARN }
            : { t: '📚 ✗', c: ERR };
  const modeBadge =
    mode === 'yolo'
      ? { t: 'YOLO', c: WARN }
      : mode === 'auto-edit'
        ? { t: 'AUTO', c: INFLIGHT }
        : { t: 'ASK', c: DIM };
  const sep = <text content=" · " style={{ fg: DIM }} />;

  return (
    <box
      style={{
        border: true,
        borderColor: '#30363d',
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 3,
        flexShrink: 0,
      }}
    >
      <text content={f.org.alias} style={{ fg: orgColor }} />
      {sep}
      <text content={f.model.provider} style={{ fg: DIM }} />
      <text content={` ${f.model.name}`} />
      {sep}
      <text content={f.session} style={{ fg: DIM }} />
      {sep}
      <text content={`${fmtTokens(f.tokens.used)} / $${f.tokens.cost.toFixed(2)}`} />
      {sep}
      <text content={`${buildMark} build`} style={{ fg: buildColor }} />
      {sep}
      <text
        content={f.tests.failing === 0 ? `${f.tests.coverage}%` : `✗ ${f.tests.failing} failing`}
        style={{ fg: f.tests.failing === 0 ? OK : ERR }}
      />
      {sep}
      <text content={kb.t} style={{ fg: kb.c }} />
      {sep}
      <text content={modeBadge.t} style={{ fg: modeBadge.c, attributes: TextAttributes.BOLD }} />
      {sep}
      <text content={clockHHMM()} style={{ fg: DIM }} />
    </box>
  );
}
