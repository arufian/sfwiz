// ─── Color constants ──────────────────────────────────────────────────────────

export const ACCENT = '#00D1E6';
export const DIM = '#7d8590';
export const BORDER = '#30363d';
export const OK = '#3fb950';
export const WARN = '#d29922';
export const ERR = '#f85149';
export const INFLIGHT = '#58a6ff';
export const CONFLICT = '#bc8cff';

const BG_VARIANTS = [
  '#0d1117', // GitHub dark (default)
  '#0a0e14', // deeper black
  '#161b22', // dark grey
  '#0d1711', // dark green tint
  '#0d1117', // dark blue tint (same base, intent differs via contrast)
  '#1a1020', // dark purple tint
] as const;

export function getBgColor(idx: number): string {
  const i = ((idx % BG_VARIANTS.length) + BG_VARIANTS.length) % BG_VARIANTS.length;
  return BG_VARIANTS[i] ?? BG_VARIANTS[0];
}
