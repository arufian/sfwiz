import { createHash } from 'crypto';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import type { ChatBlock } from '~/types/ui';

export interface SessionMeta {
  id: string;
  cwd: string;
  createdAt: number;
  updatedAt: number;
  preview: string;
  messageCount: number;
}

export interface SessionFile {
  meta: SessionMeta;
  blocks: ChatBlock[];
}

export function getSessionDir(): string {
  return join(homedir(), '.sfwiz', 'session');
}

function ensureDir() {
  const dir = getSessionDir();
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

function metaPath(id: string): string {
  return join(getSessionDir(), `${id}.meta.json`);
}

function blocksPath(id: string): string {
  return join(getSessionDir(), `${id}.jsonl`);
}

export function cwdHash(cwd: string): string {
  return createHash('sha1').update(cwd).digest('hex').slice(0, 10);
}

export function newSessionId(cwd: string): string {
  return `${cwdHash(cwd)}-${Date.now().toString(36)}`;
}

export function writeMeta(meta: SessionMeta) {
  ensureDir();
  writeFileSync(metaPath(meta.id), JSON.stringify(meta, null, 2), 'utf8');
}

export function readMeta(id: string): SessionMeta | null {
  try {
    return JSON.parse(readFileSync(metaPath(id), 'utf8')) as SessionMeta;
  } catch {
    return null;
  }
}

export function appendBlock(sessionId: string, block: ChatBlock) {
  ensureDir();
  appendFileSync(blocksPath(sessionId), `${JSON.stringify(block)}\n`, 'utf8');
}

export function readBlocks(sessionId: string): ChatBlock[] {
  try {
    const raw = readFileSync(blocksPath(sessionId), 'utf8');
    const out: ChatBlock[] = [];
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        out.push(JSON.parse(trimmed) as ChatBlock);
      } catch {}
    }
    return out;
  } catch {
    return [];
  }
}

export function listAllSessions(): SessionMeta[] {
  ensureDir();
  let entries: string[];
  try {
    entries = readdirSync(getSessionDir());
  } catch {
    return [];
  }
  const out: SessionMeta[] = [];
  for (const name of entries) {
    if (!name.endsWith('.meta.json')) continue;
    const id = name.replace(/\.meta\.json$/, '');
    const meta = readMeta(id);
    if (!meta) continue;
    out.push(meta);
  }
  out.sort((a, b) => b.updatedAt - a.updatedAt);
  return out;
}

export function listSessionsForCwd(cwd: string): SessionMeta[] {
  return listAllSessions().filter((m) => m.cwd === cwd);
}

export function touchSession(
  id: string,
  cwd: string,
  blocks: ChatBlock[],
) {
  const existing = readMeta(id);
  const firstUserBlock = blocks.find((b) => b.kind === 'user') as
    | Extract<ChatBlock, { kind: 'user' }>
    | undefined;
  const preview = (firstUserBlock?.text ?? '').slice(0, 80);
  const meta: SessionMeta = {
    id,
    cwd,
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
    preview: preview || existing?.preview || '(empty session)',
    messageCount: blocks.length,
  };
  writeMeta(meta);
}

export function getSessionFileSize(id: string): number {
  try {
    return statSync(blocksPath(id)).size;
  } catch {
    return 0;
  }
}

export function formatSessionsMessage(): string {
  const sessions = listAllSessions();
  if (sessions.length === 0) {
    return `No saved sessions in ${getSessionDir()}.`;
  }
  const lines = sessions.slice(0, 20).map((s) => {
    const when = new Date(s.updatedAt).toLocaleString();
    return `  ${s.id} — ${when} · ${s.messageCount} msg · ${s.cwd}`;
  });
  return `All sessions (${sessions.length}):\n${lines.join('\n')}\n\nUse /history for cwd-scoped resume.`;
}

export function formatHistoryMessage(cwd: string): string {
  const sessions = listSessionsForCwd(cwd);
  if (sessions.length === 0) {
    return `No prior sessions for ${cwd}.\nStart chatting — sessions are saved automatically.`;
  }
  const lines = sessions.slice(0, 20).map((s, i) => {
    const when = new Date(s.updatedAt).toLocaleString();
    return `  ${i + 1}. ${when} · ${s.messageCount} msg · ${s.preview}`;
  });
  return `Sessions for ${cwd} (${sessions.length}):\n${lines.join('\n')}\n\nUse /history again and pick one to resume.`;
}
