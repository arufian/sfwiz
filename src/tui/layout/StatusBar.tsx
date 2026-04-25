/** @jsxImportSource @opentui/react */
import { useState, useEffect } from 'react';
import { learnBus } from '~/learn/bus';
import type { EmbedProgressEvent } from '~/learn/bus';

export interface EmbedProgress {
  collection: string;
  done: number;
  total: number;
  currentItem: string;
}

function renderBar(pct: number, width = 9): string {
  const filled = Math.round((pct / 100) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

function formatPercent(done: number, total: number): string {
  if (total === 0) return '  0%';
  return `${Math.round((done / total) * 100)}%`.padStart(4);
}

export function StatusBar() {
  const [embed, setEmbed] = useState<EmbedProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onProgress = (ev: EmbedProgressEvent) => {
      setError(null);
      setEmbed({ collection: ev.collection, done: ev.done, total: ev.total, currentItem: ev.currentItem });
    };
    const onDone = () => setEmbed(null);
    const onError = ({ message }: { kind: string; collection: string; message: string }) => setError(message);

    learnBus.on('embed:progress', onProgress);
    learnBus.on('embed:done', onDone);
    learnBus.on('embed:error', onError as Parameters<typeof learnBus.on>[1]);

    return () => {
      learnBus.off('embed:progress', onProgress);
      learnBus.off('embed:done', onDone);
      learnBus.off('embed:error', onError as Parameters<typeof learnBus.on>[1]);
    };
  }, []);

  if (error) {
    return (
      <box width="100%" height={1}>
        <text> ⚠ {error}</text>
      </box>
    );
  }

  if (embed) {
    const pct = embed.total > 0 ? Math.round((embed.done / embed.total) * 100) : 0;
    const bar = renderBar(pct);
    const label = embed.currentItem ? `${embed.collection} · ${embed.currentItem} (${embed.done}/${embed.total})` : embed.collection;
    return (
      <box width="100%" height={1}>
        <text> {bar} {formatPercent(embed.done, embed.total)}  {label}</text>
      </box>
    );
  }

  return (
    <box width="100%" height={1}>
      <text> sfwiz ready</text>
    </box>
  );
}

export { renderBar, formatPercent };
