/** @jsxImportSource @opentui/react */
import type { FuzzyMatch } from '~/util/fuzzy';

export interface CommandPaletteProps {
  visible: boolean;
  query: string;
  selectedIndex: number;
  matches: FuzzyMatch[];
}

export function CommandPalette({ visible, query, selectedIndex, matches }: CommandPaletteProps) {
  if (!visible) return null;

  return (
    <box width={60} height={Math.min(matches.length + 4, 20)} border={true} borderStyle="single">
      <text>{`> ${query}_`}</text>
      <text fg="#555">{'─'.repeat(56)}</text>
      {matches.length === 0 ? (
        <text fg="#888">{'  (no matches)'}</text>
      ) : (
        matches.slice(0, 15).map((r, i) => (
          <text key={r.item} fg={i === selectedIndex ? '#ffffff' : '#aaaaaa'}>
            {i === selectedIndex ? '▶ ' : '  '}
            {r.item}
          </text>
        ))
      )}
    </box>
  );
}
