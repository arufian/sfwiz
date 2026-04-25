/** @jsxImportSource @opentui/react */
import { useState, useEffect, useCallback, useRef } from 'react';
import { watch } from 'chokidar';
import type { FSWatcher } from 'chokidar';
import { getSourceTrackingStatus, type TrackedFile } from '~/sf/source-tracking';
import type { OrgHandle } from '~/tools/types';
import { throttle } from '~/util/async';

export type DirTreeEvent =
  | { kind: 'deploy'; path: string }
  | { kind: 'retrieve'; path: string }
  | { kind: 'select'; path: string };

export interface DirTreeProps {
  projectRoot: string;
  org: OrgHandle | null;
  onEvent?: (ev: DirTreeEvent) => void;
}

const STATUS_COLORS: Record<string, string> = {
  changed: '#f8c200',
  new: '#4caf50',
  deleted: '#ef5350',
  unchanged: '#aaa',
  ignored: '#555',
  conflict: '#ff6b6b',
  unknown: '#777',
};

export function DirTree({ projectRoot, org, onEvent }: DirTreeProps) {
  const [files, setFiles] = useState<TrackedFile[]>([]);
  const [selected, setSelected] = useState(0);
  const [watcher, setWatcher] = useState<FSWatcher | null>(null);
  const throttledRefreshRef = useRef<ReturnType<typeof throttle> | null>(null);

  const refresh = useCallback(() => {
    if (!org) return;
    const tracked = getSourceTrackingStatus(projectRoot, org.username);
    setFiles(tracked);
  }, [projectRoot, org]);

  useEffect(() => {
    // Throttle to at most once per 3s — getSourceTrackingStatus runs spawnSync
    throttledRefreshRef.current = throttle(refresh, 3_000);
    refresh();

    const w = watch(projectRoot, {
      ignored: /(node_modules|\.git|\.sf)/,
      ignoreInitial: true,
      depth: 5,
    });
    const onFsChange = () => throttledRefreshRef.current?.();
    w.on('change', onFsChange);
    w.on('add', onFsChange);
    w.on('unlink', onFsChange);
    setWatcher(w);
    return () => { w.close(); };
  }, [refresh, projectRoot]);

  void watcher; // referenced to suppress lint

  const handleKey = useCallback((key: string) => {
    if (key === 'r') refresh();
    if (key === 'd' && files[selected]) onEvent?.({ kind: 'deploy', path: files[selected]!.path });
    if (key === ' ' && files[selected]) onEvent?.({ kind: 'select', path: files[selected]!.path });
    if (key === 'ArrowDown') setSelected((s) => Math.min(s + 1, files.length - 1));
    if (key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
  }, [files, selected, refresh, onEvent]);

  void handleKey;

  if (!org) {
    return (
      <box width="100%" height="100%">
        <text fg="#777"> No org selected</text>
      </box>
    );
  }

  return (
    <box width="100%" height="100%">
      {files.length === 0 && <text fg="#777"> No tracked changes</text>}
      {files.map((f, i) => (
        <text key={f.path} fg={i === selected ? '#fff' : STATUS_COLORS[f.status] ?? '#777'}>
          {i === selected ? '▶ ' : '  '}{f.path}
        </text>
      ))}
    </box>
  );
}
