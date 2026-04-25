// ─── Types & Enums ────────────────────────────────────────────────────────────

export type SyncState = 'synced' | 'dirty' | 'delete' | 'loose' | 'conflict' | 'inflight';

export interface TreeItem {
  name: string;
  state: SyncState;
}

export interface TreeGroup {
  label: string;
  items: TreeItem[];
}

// Task 2: stable id added to every ChatBlock variant
export type ChatBlock =
  | { id: string; kind: 'user'; text: string }
  | { id: string; kind: 'assistant'; text: string }
  | { id: string; kind: 'divider'; persona: string }
  | { id: string; kind: 'thinking'; elapsedS: number }
  | {
      id: string;
      kind: 'tool';
      name: string;
      status: 'running' | 'done' | 'error' | 'warn';
      elapsedMs?: number;
      summary: string;
      detail?: string;
      expanded?: boolean;
    };

export type PermissionMode = 'ask' | 'auto-edit' | 'yolo';
export const PERMISSION_MODES: PermissionMode[] = ['ask', 'auto-edit', 'yolo'];

export type SideView = 'persona' | 'tests' | 'soql' | 'knowledge' | 'deploy' | 'tokens';

export interface PaletteEntry {
  id: string;
  label: string;
  desc: string;
  accel?: string;
}

export interface PersonaStep {
  name: string;
  state: 'done' | 'active' | 'pending' | 'failed';
}
