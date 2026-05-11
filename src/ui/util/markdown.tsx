/** @jsxImportSource @opentui/react */
import { TextAttributes } from '@opentui/core';
import { Fragment } from 'react';
import { ACCENT, DIM } from '~/ui/theme';

export interface MdSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
}

/**
 * Tokenize one line of markdown into spans. Supports:
 *   **bold**   __bold__
 *   *italic*   _italic_
 *   `code`
 * Anything else is plain. We bias toward conservative parsing — if a delimiter
 * is unbalanced we just emit the rest as plain text rather than dropping the
 * source character.
 */
export function tokenizeInline(line: string): MdSpan[] {
  const out: MdSpan[] = [];
  let i = 0;
  let buf = '';
  const flush = () => {
    if (buf.length > 0) {
      out.push({ text: buf });
      buf = '';
    }
  };

  while (i < line.length) {
    const two = line.slice(i, i + 2);
    if (two === '**' || two === '__') {
      const end = line.indexOf(two, i + 2);
      if (end === -1) {
        buf += two;
        i += 2;
        continue;
      }
      flush();
      out.push({ text: line.slice(i + 2, end), bold: true });
      i = end + 2;
      continue;
    }
    const ch = line[i];
    if (ch === '`') {
      const end = line.indexOf('`', i + 1);
      if (end === -1) {
        buf += ch;
        i += 1;
        continue;
      }
      flush();
      out.push({ text: line.slice(i + 1, end), code: true });
      i = end + 1;
      continue;
    }
    if (ch === '*' || ch === '_') {
      // Italic — only if followed by a non-space and a matching delimiter.
      const end = line.indexOf(ch, i + 1);
      if (end !== -1 && line[i + 1] !== ' ') {
        flush();
        out.push({ text: line.slice(i + 1, end), italic: true });
        i = end + 1;
        continue;
      }
    }
    buf += ch ?? '';
    i += 1;
  }
  flush();
  return out;
}

export interface MdLine {
  /** Original text after any block-prefix consumption. */
  content: string;
  /** Bullet prefix to render in dim color (e.g. "• "). Empty string = no bullet. */
  bullet: string;
  /** Heading level (1-6) or 0 for body. */
  heading: number;
}

const HEADING = /^(#{1,6})\s+(.*)$/;
const BULLET = /^(\s*)([-*+])\s+(.*)$/;
const NUM_LIST = /^(\s*)(\d+)\.\s+(.*)$/;

export function parseLine(raw: string): MdLine {
  const h = raw.match(HEADING);
  if (h) {
    return { content: h[2] ?? '', bullet: '', heading: (h[1] ?? '').length };
  }
  const b = raw.match(BULLET);
  if (b) {
    return { content: b[3] ?? '', bullet: `${b[1] ?? ''}• `, heading: 0 };
  }
  const n = raw.match(NUM_LIST);
  if (n) {
    return { content: n[3] ?? '', bullet: `${n[1] ?? ''}${n[2]}. `, heading: 0 };
  }
  return { content: raw, bullet: '', heading: 0 };
}

export function isTableRow(line: string): boolean {
  const t = line.trim();
  return t.startsWith('|') && t.endsWith('|') && t.length > 1;
}

export function isSeparatorRow(line: string): boolean {
  return isTableRow(line) && /^\|[\s:|-]+\|$/.test(line.trim());
}

export function parseTableRow(line: string): string[] {
  const t = line.trim();
  return t
    .slice(1, -1)
    .split('|')
    .map((c) => c.trim());
}

export function TableBlock({ rows }: { rows: string[][] }) {
  const data = rows.filter((r) => !r.every((c) => /^:?-+:?$/.test(c)));
  if (data.length === 0) return <></>;

  const numCols = Math.max(...data.map((r) => r.length));
  const widths = Array.from({ length: numCols }, (_, ci) =>
    Math.max(...data.map((r) => (r[ci] ?? '').length)),
  );

  const sep = '┼' + widths.map((w) => '─'.repeat(w + 2)).join('┼') + '┼';

  return (
    <box style={{ flexDirection: 'column' }}>
      {data.map((row, ri) => {
        const isHeader = ri === 0;
        const cells = Array.from({ length: numCols }, (_, ci) => {
          const cell = row[ci] ?? '';
          return ` ${cell.padEnd(widths[ci] ?? 0)} `;
        });
        const rowLine = '│' + cells.join('│') + '│';
        return (
          <Fragment key={ri}>
            <text
              content={rowLine}
              style={{
                fg: isHeader ? ACCENT : undefined,
                attributes: isHeader ? TextAttributes.BOLD : undefined,
              }}
            />
            {isHeader ? <text content={sep} style={{ fg: DIM }} /> : null}
          </Fragment>
        );
      })}
      <text content={'└' + widths.map((w) => '─'.repeat(w + 2)).join('┴') + '┘'} style={{ fg: DIM }} />
    </box>
  );
}

/**
 * Render one markdown line as a row of styled `<text>` spans. opentui renders
 * adjacent <text> elements inline within a flex-row, so we get inline bold +
 * code coloring per span.
 */
export function MarkdownLine({ line }: { line: string }) {
  const parsed = parseLine(line);
  const spans = tokenizeInline(parsed.content);
  const headingFg = parsed.heading > 0 ? ACCENT : undefined;
  const headingBold = parsed.heading > 0 ? TextAttributes.BOLD : undefined;

  return (
    <box style={{ flexDirection: 'row' }}>
      {parsed.bullet ? <text content={parsed.bullet} style={{ fg: DIM }} /> : null}
      {spans.map((s, i) => (
        <Fragment key={i}>
          <text
            content={s.text}
            style={{
              fg: s.code ? ACCENT : headingFg,
              attributes:
                (s.bold ? TextAttributes.BOLD : 0) |
                (s.italic ? TextAttributes.ITALIC : 0) |
                (headingBold ?? 0),
              selectionBg: '#2a4a7f',
              selectionFg: '#ffffff',
            }}
          />
        </Fragment>
      ))}
    </box>
  );
}
