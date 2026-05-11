/** @jsxImportSource @opentui/react */
import { TextAttributes } from '@opentui/core';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  touchedFiles?: Map<string, { status: 'new' | 'changed' | 'deleted'; type: string }>;
}

// ── Sync-state symbols (match PoC spec) ──────────────────────────────────────
const SYNC: Record<string, { symbol: string; color: string; strike?: boolean }> = {
  changed:   { symbol: '◆', color: '#f85149' },
  new:       { symbol: '◆', color: '#f85149' },
  deleted:   { symbol: '✗', color: '#f85149', strike: true },
  unchanged: { symbol: '●', color: '#3fb950' },
  ignored:   { symbol: '·', color: '#7d8590' },
  conflict:  { symbol: '!', color: '#bc8cff' },
  unknown:   { symbol: '·', color: '#7d8590' },
};

// ── Group SF metadata types into PoC categories ───────────────────────────────
const TYPE_GROUP: Record<string, string> = {
  ApexClass: 'apex', ApexTrigger: 'apex',
  LightningComponentBundle: 'lwc', AuraDefinitionBundle: 'lwc',
  Flow: 'flows', FlowDefinition: 'flows',
  CustomObject: 'objects', CustomField: 'objects', CustomMetadata: 'objects',
  PermissionSet: 'permsets', PermissionSetGroup: 'permsets',
};

function getGroup(type: string): string {
  return TYPE_GROUP[type] ?? 'other';
}

const GROUP_ORDER = ['apex', 'lwc', 'flows', 'objects', 'permsets', 'other'];

function groupFiles(files: TrackedFile[]): Map<string, TrackedFile[]> {
  const map = new Map<string, TrackedFile[]>();
  for (const g of GROUP_ORDER) map.set(g, []);
  for (const f of files) {
    const g = getGroup(f.type);
    map.get(g)!.push(f);
  }
  // Drop empty groups
  for (const [k, v] of map) if (v.length === 0) map.delete(k);
  return map;
}

const BORDER = '#30363d';
const DIM = '#7d8590';

function mergeTouchedWithTracked(
  tracked: TrackedFile[],
  touched: Map<string, { status: 'new' | 'changed' | 'deleted'; type: string }>,
): TrackedFile[] {
  const map = new Map<string, TrackedFile>();
  for (const f of tracked) map.set(f.path, f);
  for (const [path, meta] of touched) {
    map.set(path, { path, status: meta.status, type: meta.type });
  }
  return [...map.values()];
}

export function DirTree({ projectRoot, org, onEvent, touchedFiles }: DirTreeProps) {
  const [files, setFiles] = useState<TrackedFile[]>([]);
  const [selected, setSelected] = useState(0);
  const [watcher, setWatcher] = useState<FSWatcher | null>(null);
  const throttledRefreshRef = useRef<ReturnType<typeof throttle> | null>(null);

  const refresh = useCallback(() => {
    if (!org) {
      setFiles([]);
      return;
    }
    const tracked = getSourceTrackingStatus(projectRoot, org.username);
    setFiles(tracked);
  }, [projectRoot, org]);

  useEffect(() => {
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

  void watcher;

  // Merge source-tracking with session-touched files.
  const allFiles = mergeTouchedWithTracked(files, touchedFiles ?? new Map());

  const handleKey = useCallback((key: string) => {
    if (key === 'r') refresh();
    if (key === 'd' && allFiles[selected]) onEvent?.({ kind: 'deploy', path: allFiles[selected]!.path });
    if (key === ' ' && allFiles[selected]) onEvent?.({ kind: 'select', path: allFiles[selected]!.path });
    if (key === 'ArrowDown') setSelected((s) => Math.min(s + 1, allFiles.length - 1));
    if (key === 'ArrowUp') setSelected((s) => Math.max(s - 1, 0));
  }, [allFiles, selected, refresh, onEvent]);

  void handleKey;

  const groups = groupFiles(allFiles);
  const dirtyCount = allFiles.filter(
    (f) => f.status === 'changed' || f.status === 'new' || f.status === 'deleted' || f.status === 'conflict',
  ).length;

  let flatIdx = 0; // track absolute index for selection highlight

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
        {dirtyCount > 0 ? (
          <text content={` · ${dirtyCount} changed`} style={{ fg: DIM }} />
        ) : (
          <text content=" · clean" style={{ fg: '#3fb950' }} />
        )}
      </box>
      {allFiles.length === 0 ? (
        <text content=" no tracked changes" style={{ fg: DIM }} />
      ) : null}
      {[...groups.entries()].map(([group, items]) => (
        <box key={group} style={{ flexDirection: 'column', marginTop: 1 }}>
          <text content={group} style={{ fg: DIM }} />
          {items.map((f) => {
            const s = SYNC[f.status] ?? SYNC.unknown!;
            const isSelected = flatIdx++ === selected;
            const name = f.path.split('/').pop() ?? f.path;
            return (
              <box key={f.path} style={{ flexDirection: 'row' }}>
                <text content="  " />
                <text content={s.symbol} style={{ fg: s.color }} />
                <text content=" " />
                <text
                  content={name}
                  style={{
                    fg: isSelected ? '#4fc3f7' : s.strike ? '#f85149' : undefined,
                    attributes: s.strike ? TextAttributes.STRIKETHROUGH : TextAttributes.NONE,
                  }}
                />
              </box>
            );
          })}
        </box>
      ))}
      <box style={{ marginTop: 1 }}>
        <text content="r refresh · d deploy" style={{ fg: DIM }} />
      </box>
    </box>
  );
}
