import { TextAttributes } from '@opentui/core';
import { useEffect, useState } from 'react';
import { CAPABILITY_HINTS, SPLASH_TIPS } from '~/fixtures/misc';
import type { ChatBlock } from '~/types/ui';
import { ACCENT, BORDER, DIM, ERR, INFLIGHT, OK, WARN } from '~/ui/theme';
import { MarkdownLine } from '~/ui/util/markdown';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pickTip(): string {
  return SPLASH_TIPS[Math.floor(Math.random() * SPLASH_TIPS.length)] ?? SPLASH_TIPS[0]!;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Wand sweeps left→right arc, ✦ burst at peak (│), stars trail and fade as wand returns
const WAND_FRAMES = [
  '╲─         ',
  ' ╲─  ˙     ',
  '  ─╲ ·     ',
  '   ─╱ ✦    ',
  '    ╱  ✦✦  ',
  '     │ ✦✦✦ ',
  '     ╱✦✦   ',
  '    ╱  ✦·˙ ',
  '   ─   ·˙  ',
  '  ─╲    ˙  ',
  ' ╲─        ',
  '╲─         ',
] as const;

function WandAnimation() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % WAND_FRAMES.length), 80);
    return () => clearInterval(id);
  }, []);
  return <text content={WAND_FRAMES[frame]!} style={{ fg: ACCENT }} />;
}

export function Equalizer({
  color = INFLIGHT,
  label,
  bars = 9,
}: {
  color?: string;
  label?: string;
  bars?: number;
}) {
  const HEIGHTS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  const [heights, setHeights] = useState<number[]>(() =>
    Array.from({ length: bars }, () => Math.floor(Math.random() * HEIGHTS.length)),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setHeights((hs) =>
        hs.map((h) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(0, Math.min(HEIGHTS.length - 1, h + delta));
        }),
      );
    }, 130);
    return () => clearInterval(id);
  }, []);

  const line = heights.map((h) => HEIGHTS[h]).join('');
  return (
    <box style={{ flexDirection: 'row' }}>
      {label ? <text content={`${label}  `} style={{ fg: DIM }} /> : null}
      <text
        content={line}
        style={{ fg: color, attributes: TextAttributes.BOLD }}
      />
    </box>
  );
}

function ToolBlock({
  b,
  onToggle,
}: {
  b: Extract<ChatBlock, { kind: 'tool' }>;
  onToggle?: () => void;
}) {
  const color =
    b.status === 'done'
      ? OK
      : b.status === 'warn'
        ? WARN
        : b.status === 'error'
          ? ERR
          : INFLIGHT;
  const meta = b.elapsedMs != null ? `done · ${b.elapsedMs}ms` : b.status;
  const isRunning = b.status === 'running';
  const hasDetail = !!b.detail;
  const caret = b.expanded ? '▾' : hasDetail ? '▸' : '·';
  return (
    <box
      style={{ flexDirection: 'column' }}
      onMouseDown={(e) => {
        if (hasDetail && e.modifiers.ctrl) {
          onToggle?.();
        }
      }}
    >
      <box style={{ flexDirection: 'row' }}>
        <text content={`${caret} `} style={{ fg: color }} />
        <text content={b.name} />
        <text content={` (${meta}) `} style={{ fg: DIM }} />
        <text content={b.summary} />
        {hasDetail ? (
          <text
            content={b.expanded ? '  · ⌃click to collapse' : '  · ⌃click to expand'}
            style={{ fg: DIM }}
          />
        ) : null}
      </box>
      {isRunning ? (
        <box style={{ marginLeft: 2 }}>
          <Equalizer color={INFLIGHT} />
        </box>
      ) : null}
      {b.expanded && b.detail
        ? b.detail.split('\n').map((line, i) => (
            <box key={`${b.name}-d-${i}`} style={{ flexDirection: 'row' }}>
              <text content="  " />
              <text content={line} style={{ fg: DIM }} />
            </box>
          ))
        : null}
    </box>
  );
}

function ChatBlocks({
  blocks,
  onToggleTool,
}: {
  blocks: ChatBlock[];
  onToggleTool?: (id: string) => void;
}) {
  return (
    <>
      {blocks.map((b) => {
        const key = `b-${b.id}`;
        if (b.kind === 'user') {
          return (
            <box
              key={key}
              style={{
                flexDirection: 'row',
                backgroundColor: '#0d2a33',
                paddingLeft: 1,
                paddingRight: 1,
              }}
            >
              <text content="❯ " style={{ bg: '#0d2a33', fg: ACCENT }} />
              <text content={b.text} style={{ bg: '#0d2a33' }} />
            </box>
          );
        }
        if (b.kind === 'assistant') {
          return (
            <box key={key} style={{ flexDirection: 'column', marginBottom: 1 }}>
              {b.text.split('\n').map((line, j) => (
                <MarkdownLine key={`${key}-${j}`} line={line} />
              ))}
            </box>
          );
        }
        if (b.kind === 'divider') {
          return (
            <text
              key={key}
              content={`── persona → ${b.persona} ──────────────────────────`}
              style={{ fg: DIM }}
            />
          );
        }
        if (b.kind === 'thinking') {
          return (
            <box key={key} style={{ flexDirection: 'row', marginBottom: 1 }}>
              <text content="▍ " style={{ fg: INFLIGHT }} />
              <text content={`thinking… ${b.elapsedS}s `} style={{ fg: DIM }} />
              <WandAnimation />
            </box>
          );
        }
        if (b.kind === 'loading') {
          const dots = '.'.repeat((b.elapsedS % 3) + 1);
          return (
            <box key={key} style={{ flexDirection: 'row', marginBottom: 1 }}>
              <text content="▍ " style={{ fg: INFLIGHT }} />
              <text content={`${b.label}${dots} ${b.elapsedS}s `} style={{ fg: DIM }} />
              <WandAnimation />
            </box>
          );
        }
        return (
          <ToolBlock key={key} b={b} onToggle={() => onToggleTool?.(b.id)} />
        );
      })}
    </>
  );
}

function CapabilityCard() {
  return (
    <box
      style={{
        border: true,
        borderColor: ACCENT,
        borderStyle: 'rounded',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: 1,
        flexDirection: 'column',
        alignSelf: 'flex-start',
      }}
    >
      <text content="what can sfwiz do today" />
      <box style={{ marginTop: 1, flexDirection: 'column' }}>
        {CAPABILITY_HINTS.map((h) => (
          <box key={h.text} style={{ flexDirection: 'row' }}>
            <text content={`${h.icon} `} />
            <text content={h.text} style={{ fg: DIM }} />
          </box>
        ))}
      </box>
      <box style={{ marginTop: 1 }}>
        <text
          content="Ctrl+B tree · Ctrl+D demo · Ctrl+H help"
          style={{ fg: DIM }}
        />
      </box>
    </box>
  );
}

// ─── SplashView ───────────────────────────────────────────────────────────────

export function SplashView({ tip }: { tip: string }) {
  return (
    <box
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ascii-font text="sfwiz" font="block" style={{ color: ACCENT }} />
      <box style={{ marginTop: 2, flexDirection: 'row' }}>
        <text content="tab " style={{ fg: ACCENT }} />
        <text content="personas   " style={{ fg: DIM }} />
        <text content="ctrl+k " style={{ fg: ACCENT }} />
        <text content="deploy   " style={{ fg: DIM }} />
        <text content="ctrl+h " style={{ fg: ACCENT }} />
        <text content="help" style={{ fg: DIM }} />
      </box>
      <box style={{ marginTop: 1, flexDirection: 'row' }}>
        <text content="● " style={{ fg: WARN }} />
        <text content="Tip " style={{ fg: WARN, attributes: TextAttributes.BOLD }} />
        <text content={tip} style={{ fg: DIM }} />
      </box>
    </box>
  );
}

export function pickSplashTip(): string {
  return pickTip();
}

// ─── ChatPanel ────────────────────────────────────────────────────────────────

export function ChatPanel({
  blocks,
  onToggleTool,
}: {
  blocks: ChatBlock[];
  onToggleTool?: (id: string) => void;
}) {
  return (
    <scrollbox
      style={{
        rootOptions: { backgroundColor: 'transparent' },
        viewportOptions: { backgroundColor: 'transparent' },
        wrapperOptions: { backgroundColor: 'transparent' },
        contentOptions: { backgroundColor: 'transparent' },
        scrollbarOptions: {
          showArrows: true,
          trackOptions: { foregroundColor: ACCENT, backgroundColor: BORDER },
        },
        border: true,
        borderColor: BORDER,
        paddingLeft: 1,
        paddingRight: 1,
        flexGrow: 1,
      }}
      contentOptions={{ flexDirection: 'column' }}
    >
      {blocks.length === 0 ? (
        <CapabilityCard />
      ) : (
        <ChatBlocks blocks={blocks} onToggleTool={onToggleTool} />
      )}
    </scrollbox>
  );
}
