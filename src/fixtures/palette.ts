import type { PaletteEntry } from '~/types/ui';

export function fuzzyMatch(
  entry: { label: string; desc: string },
  q: string,
): boolean {
  if (q.length === 0) return true;
  const hay = `${entry.label} ${entry.desc}`.toLowerCase();
  const needle = q.toLowerCase();
  let i = 0;
  for (const ch of hay) {
    if (ch === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return false;
}

export const PALETTE_ENTRIES: PaletteEntry[] = [
  { id: 'new-session', label: 'New Session', desc: 'start fresh session', accel: 'Ctrl+N' },
  { id: 'sessions', label: 'Sessions', desc: 'list past sessions', accel: 'Ctrl+S' },
  { id: 'switch-model', label: 'Switch Model', desc: 'pick provider / model', accel: 'Ctrl+L' },
  { id: 'thinking', label: 'Enable Thinking Mode', desc: 'extended thinking (Opus)' },
  { id: 'yolo', label: 'Toggle Yolo Mode', desc: 'auto-approve non-destructive ops' },
  { id: 'permissions', label: '/permissions', desc: 'ask / auto-edit / yolo' },
  { id: 'orgs', label: '/orgs', desc: 'list + switch Salesforce orgs' },
  { id: 'tests', label: '/tests', desc: 'run Apex tests' },
  { id: 'deploy', label: '/deploy', desc: 'deploy to target org' },
  { id: 'settings', label: '/settings', desc: '42-type settings registry' },
  { id: 'users', label: '/users', desc: 'list + manage users' },
  { id: 'knowledge', label: '/knowledge', desc: 'qmd collections' },
  { id: 'learn', label: '/learn refresh', desc: 'refresh knowledge' },
  { id: 'provider', label: '/provider', desc: 'switch LLM provider' },
  { id: 'help', label: 'Toggle Help', desc: 'keybindings overlay', accel: 'Ctrl+H' },
  { id: 'init', label: 'Initialize Project', desc: 'seed sfwiz.config' },
  { id: 'quit', label: 'Quit', desc: 'exit sfwiz', accel: 'Ctrl+Q' },
];
