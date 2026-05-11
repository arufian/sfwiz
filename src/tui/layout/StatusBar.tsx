/** @jsxImportSource @opentui/react */
import { useEffect, useState } from 'react';
import { learnBus } from '~/learn/bus';
import type { EmbedProgressEvent } from '~/learn/bus';

const DIM = '#7d8590';
const OK = '#3fb950';
const WARN = '#d29922';
const ERR = '#f85149';
const INFLIGHT = '#58a6ff';
const BORDER = '#30363d';

type PermissionMode = 'ask' | 'auto-edit' | 'yolo';

export interface StatusBarProps {
  org: { alias: string; status: 'connected' | 'disconnected' } | null;
  orgConnecting?: boolean;
  modelName: string | null;
  tokens: { used: number; estimatedCostUsd: number } | null;
  mode: PermissionMode;
  qmdInstalled: boolean;
  embedsDone: boolean;
}

function fmtTokens(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function renderBar(pct: number, width = 9): string {
  const filled = Math.round((pct / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

export function formatPercent(done: number, total: number): string {
  if (total === 0) return '  0%';
  return `${Math.round((done / total) * 100)}%`.padStart(4);
}

function clockHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function StatusBar({ org, orgConnecting, modelName, tokens, mode, qmdInstalled, embedsDone }: StatusBarProps) {
  const [embedPct, setEmbedPct] = useState<number | null>(null);
  const [clock, setClock] = useState(clockHHMM());

  useEffect(() => {
    const onProgress = (ev: EmbedProgressEvent) => {
      const pct = ev.total > 0 ? Math.round((ev.done / ev.total) * 100) : 0;
      setEmbedPct(pct);
    };
    const onDone = () => setEmbedPct(null);
    learnBus.on('embed:progress', onProgress);
    learnBus.on('embed:done', onDone);
    return () => {
      learnBus.off('embed:progress', onProgress);
      learnBus.off('embed:done', onDone);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setClock(clockHHMM()), 30_000);
    return () => clearInterval(id);
  }, []);

  const kbadge = (() => {
    if (!qmdInstalled) return { text: '📚 ref-only', color: WARN };
    if (embedPct !== null) return { text: `📚 ⋯ ${embedPct}%`, color: INFLIGHT };
    if (embedsDone) return { text: '📚 ✓', color: OK };
    return { text: '📚 !', color: WARN };
  })();

  const modeBadge = (() => {
    if (mode === 'yolo') return { text: 'AUTO', color: WARN };
    if (mode === 'auto-edit') return { text: 'EDIT', color: INFLIGHT };
    return { text: 'ASK', color: DIM };
  })();

  const sep = <text content=" · " style={{ fg: DIM }} />;

  return (
    <box
      style={{
        border: true,
        borderColor: BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexDirection: 'row',
        height: 3,
        flexShrink: 0,
      }}
    >
      {org ? (
        <text content={org.alias} style={{ fg: org.status === 'connected' ? OK : ERR }} />
      ) : orgConnecting ? (
        <text content="connecting…" style={{ fg: INFLIGHT }} />
      ) : (
        <text content="no org" style={{ fg: DIM }} />
      )}
      {sep}
      <text content={modelName ?? 'no model'} style={modelName ? {} : { fg: DIM }} />
      {tokens && tokens.used > 0 ? (
        <>
          {sep}
          <text content={fmtTokens(tokens.used)} style={{ fg: DIM }} />
          <text content={` $${tokens.estimatedCostUsd.toFixed(2)}`} />
        </>
      ) : null}
      {sep}
      <text content={kbadge.text} style={{ fg: kbadge.color }} />
      {sep}
      <text content={modeBadge.text} style={{ fg: modeBadge.color }} />
      {sep}
      <text content={clock} style={{ fg: DIM }} />
    </box>
  );
}
