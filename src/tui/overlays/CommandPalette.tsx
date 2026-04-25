/** @jsxImportSource @opentui/react */
import { useState, useCallback } from 'react';
import { fuzzyFilter } from '~/util/fuzzy';
import { getAllPaletteLabels, COMMAND_REGISTRY, PALETTE_STATIC_TOGGLES } from '~/dispatcher/registry';

export interface CommandPaletteProps {
  visible: boolean;
  reducedMotion?: boolean;
  onSelect: (label: string) => void;
  onClose: () => void;
}

export function CommandPalette({ visible, reducedMotion: _rm, onSelect, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allLabels = getAllPaletteLabels();
  const results = fuzzyFilter(allLabels, query);
  const maxSel = Math.max(0, results.length - 1);

  const handleKey = useCallback((key: string) => {
    if (key === 'Escape') { onClose(); return; }
    if (key === 'ArrowDown') { setSelectedIndex((s) => Math.min(s + 1, maxSel)); return; }
    if (key === 'ArrowUp') { setSelectedIndex((s) => Math.max(s - 1, 0)); return; }
    if (key === 'Enter' && results[selectedIndex]) {
      onSelect(results[selectedIndex]!.item);
      onClose();
      return;
    }
    if (key === 'Backspace') { setQuery((q) => q.slice(0, -1)); return; }
    if (key.length === 1) { setQuery((q) => q + key); setSelectedIndex(0); }
  }, [maxSel, results, selectedIndex, onSelect, onClose]);

  void handleKey;

  if (!visible) return null;

  return (
    <box
      width={60}
      height={Math.min(results.length + 4, 20)}
      border={true}
      borderStyle="single"
    >
      <text>{`> ${query}_`}</text>
      <text fg="#555">{'─'.repeat(56)}</text>
      {results.slice(0, 15).map((r, i) => (
        <text
          key={r.item}
          fg={i === selectedIndex ? '#ffffff' : '#aaaaaa'}
        >
          {i === selectedIndex ? '▶ ' : '  '}{r.item}
        </text>
      ))}
    </box>
  );
}
