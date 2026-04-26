# Part 1 Revision Plan — Reviewer B (FULL REWRITE)

**Scope:** `demo/remotion/src/scenes/part1/*` — replace Beat 2 entirely, append a new sub-beat to Beat 3, lightly enhance Beat 1.
**Status:** Plan only — no source edits in this turn. Production-ready JSX skeletons included.
**Author:** Reviewer B (revised)
**Date:** 2026-04-27

---

## 0. Why this is a full rewrite, not a tail patch

The previous Reviewer B plan added 2 text lines + 1 badge to the existing `AutonomousAIEra` tail. That fails the bar set by the user: **"if the visual doesn't change, the score stays bad."**

This revision:

1. **Deletes** `MarketDemand.tsx` (the bar chart + inbox cards). The "demand grew" angle is generic; it does nothing to establish Salesforce as a closed, technically rich domain.
2. **Replaces** it with `SalesforceEcosystem.tsx` — a radial complexity map of the platform with code inset, animated edges, and a governor-limit annotation. THIS is what makes a judge feel "this platform is its own world."
3. **Appends** a new sub-beat to `AutonomousAIEra.tsx` (frames 680–780): a fake terminal where generic AI is asked for a bulkified Apex trigger and produces code that **looks fine but blows up on a governor limit**. This visualizes the gap viscerally — the audience watches a plausible answer fail in real time.
4. **Lightly enhances** `Intro.tsx` with a faint floating Apex code fragment — establishes Salesforce context from frame 1 without competing with the title.

Total new/modified files: 4. Total deleted: 1.

---

## 1. New Beat 2 — `SalesforceEcosystem.tsx` (replaces `MarketDemand.tsx`)

### 1.1 Visual concept

A **radial complexity map** centered on a Salesforce cloud glyph. 12 platform components orbit the center on two concentric rings; each component is a labeled node with a tiny code/icon glyph. Curved edges connect related nodes (Apex ↔ Metadata, LWC ↔ Apex via `@AuraEnabled`, Profile ↔ PermissionSet ↔ Sharing Rule, etc.).

A **code inset card** docks bottom-left showing an Apex trigger fragment with a red governor-limit annotation that pulses. This grounds the abstract map in something concrete — the judge sees actual `Trigger.new` syntax and `Database.update` signatures.

The right edge keeps a slim version of the inbox card stream as ambient texture (Japanese-subject demand signal stays — but compressed, not center stage).

### 1.2 Layout (1920×1080)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ KICKER (top-left)                                INBOUND ↑   2025       │
│ THE SALESFORCE PLATFORM                          (right rail, slim)     │
│                                                                         │
│                        ╱─── outer ring (r=380) ──╲                      │
│                  Sharing Rules               Permission Sets            │
│              ╱                                              ╲           │
│        Profiles      ╱─ inner ring (r=220) ─╲          Flow             │
│                  Metadata API           sf CLI                          │
│      Governor                                              SOQL         │
│      Limits           [SF cloud center, r=80]              Tooling API  │
│                  Apex Triggers           LWC                            │
│        Bulkify       ╲────────────────╱            @AuraEnabled         │
│                                                                         │
│                  Test Coverage              Metadata                    │
│              ╲                                              ╱           │
│ ┌──────────────────────────┐                   (inbox cards            │
│ │ trigger OppWon on...     │                    drifting up,           │
│ │   for (Opp o : Trigger.. │                    600px tall slim col)   │
│ │     update accs;  // 101 │                                           │
│ │   ▲ Governor Limit       │                                           │
│ └──────────────────────────┘                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

Center: Salesforce cloud glyph (SVG) with soft pulsing glow.
Inner ring (r=220): 4 runtime nodes — Apex, LWC, SOQL, sf CLI.
Outer ring (r=380): 8 platform/governance nodes — Metadata API, Tooling API, Profiles, Permission Sets, Sharing Rules, Flow, Governor Limits, @AuraEnabled.
Edges: curved Bezier paths drawn as SVG inside one absolutely-positioned `<svg>` overlay.

### 1.3 Node list (locked)

| # | Label | Ring | Glyph | Edge connections |
|---|---|---|---|---|
| 1 | Apex | inner | `{}` | center, LWC, SOQL, Metadata API, Governor Limits, Test Coverage |
| 2 | LWC | inner | `</>` | center, Apex (@AuraEnabled), Profiles |
| 3 | SOQL | inner | `▸` | center, Apex, Tooling API |
| 4 | sf CLI | inner | `$_` | center, Metadata API, Test Coverage |
| 5 | Metadata API | outer | `⚙` | Apex, sf CLI, Profiles, Flow |
| 6 | Tooling API | outer | `⚙` | SOQL, sf CLI |
| 7 | Profiles | outer | `◉` | LWC, Permission Sets, Metadata API |
| 8 | Permission Sets | outer | `◉` | Profiles, Sharing Rules |
| 9 | Sharing Rules | outer | `◉` | Permission Sets |
| 10 | Flow | outer | `▶` | Metadata API, Apex |
| 11 | Governor Limits | outer | `!` | Apex, SOQL (highlighted in red) |
| 12 | @AuraEnabled | outer | `@` | Apex, LWC |

### 1.4 Frame breakdown (scene-local, total 450 frames @ 30fps = 15s)

| Phase | Frames | What animates |
|---|---|---|
| P0 — title in | 0–30 | kicker + title spring (`damping: 18, mass: 0.6`) |
| P1 — center cloud in | 20–50 | SF cloud SVG fades+scales (0.4 → 1) with spring; soft glow ramps to 0.8 |
| P2 — inner ring nodes | 50–110 | 4 nodes stagger in 12 frames apart, spring per node, edges to center draw via stroke-dashoffset 0→1 |
| P3 — outer ring nodes | 110–230 | 8 nodes stagger in 14 frames apart, edges to inner ring draw |
| P4 — code inset slides in | 230–280 | bottom-left card translateX(-100→0) with spring + opacity 0→1 |
| P5 — code typewriter | 250–360 | 6 lines of Apex type out at ~1 char/frame |
| P6 — governor warning pulse | 360–420 | red `! Governor Limit` annotation appears, pulses 1.0→1.08 every 30 frames |
| P7 — inbox column ambient | 30–420 | slim inbox cards drift up on right rail (4 visible at a time, mask gradient top/bottom) |
| P8 — fade out | 420–450 | full scene opacity 1→0 |

### 1.5 Full JSX skeleton

```tsx
// src/scenes/part1/SalesforceEcosystem.tsx
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { beats } from "../../timing";
import { Typewriter } from "../part2/_shared/Typewriter";

const SCENE_DURATION = beats.marketDemand; // 450 frames

type Node = {
  id: string;
  label: string;
  glyph: string;
  ring: "inner" | "outer";
  angleDeg: number; // 0 = right, 90 = bottom
  highlight?: boolean;
};

const NODES: Node[] = [
  // inner ring (r=220), 4 nodes at 0/90/180/270
  { id: "apex",  label: "Apex",  glyph: "{ }", ring: "inner", angleDeg: 180 },
  { id: "lwc",   label: "LWC",   glyph: "</>", ring: "inner", angleDeg: 270 },
  { id: "soql",  label: "SOQL",  glyph: "▸",  ring: "inner", angleDeg: 0 },
  { id: "sfcli", label: "sf CLI",glyph: "$_", ring: "inner", angleDeg: 90 },
  // outer ring (r=380), 8 nodes every 45deg
  { id: "metadata",  label: "Metadata API",   glyph: "⚙", ring: "outer", angleDeg: 202 },
  { id: "tooling",   label: "Tooling API",    glyph: "⚙", ring: "outer", angleDeg: 338 },
  { id: "profiles",  label: "Profiles",       glyph: "◉", ring: "outer", angleDeg: 247 },
  { id: "permsets",  label: "Permission Sets",glyph: "◉", ring: "outer", angleDeg: 292 },
  { id: "sharing",   label: "Sharing Rules",  glyph: "◉", ring: "outer", angleDeg: 315 },
  { id: "flow",      label: "Flow",           glyph: "▶", ring: "outer", angleDeg: 22 },
  { id: "limits",    label: "Governor Limits",glyph: "!", ring: "outer", angleDeg: 157, highlight: true },
  { id: "aura",      label: "@AuraEnabled",   glyph: "@", ring: "outer", angleDeg: 67 },
];

type Edge = [string, string];
const EDGES: Edge[] = [
  ["apex", "center"], ["lwc", "center"], ["soql", "center"], ["sfcli", "center"],
  ["apex", "soql"], ["apex", "lwc"], ["apex", "metadata"], ["apex", "limits"], ["apex", "flow"],
  ["lwc", "aura"], ["aura", "apex"],
  ["soql", "tooling"], ["sfcli", "metadata"], ["sfcli", "tooling"],
  ["metadata", "profiles"], ["metadata", "flow"],
  ["profiles", "permsets"], ["permsets", "sharing"],
  ["soql", "limits"],
];

const CENTER_X = 760;
const CENTER_Y = 540;
const INNER_R = 220;
const OUTER_R = 380;

const APEX_CODE = [
  "trigger OppWon on Opportunity (after update) {",
  "  for (Opportunity o : Trigger.new) {",
  "    if (o.IsWon) {",
  "      Account a = [SELECT Id FROM Account",
  "                   WHERE Id = :o.AccountId];",
  "      update a; // ← inside loop",
  "    }",
  "  }",
  "}",
];

const nodePos = (n: Node) => {
  const r = n.ring === "inner" ? INNER_R : OUTER_R;
  const rad = (n.angleDeg * Math.PI) / 180;
  return { x: CENTER_X + Math.cos(rad) * r, y: CENTER_Y + Math.sin(rad) * r };
};

const findNode = (id: string) =>
  id === "center" ? { x: CENTER_X, y: CENTER_Y } : nodePos(NODES.find((n) => n.id === id)!);

type Props = { kicker: string; title: string };

export const SalesforceEcosystem: React.FC<Props> = ({ kicker, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const D = SCENE_DURATION;

  // P0 — title
  const titleSp = spring({ frame, fps, config: { damping: 18, mass: 0.6 } });
  const titleY = interpolate(titleSp, [0, 1], [30, 0]);
  const titleOp = interpolate(titleSp, [0, 1], [0, 1]);

  // P1 — center cloud
  const cloudSp = spring({ frame: frame - 20, fps, config: { damping: 12, mass: 0.7 } });
  const cloudScale = interpolate(cloudSp, [0, 1], [0.4, 1]);
  const cloudGlow = interpolate(frame, [20, 50], [0, 0.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Per-node entry frame
  const nodeEntryFrame = (n: Node, idx: number) => {
    if (n.ring === "inner") return 50 + idx * 12;
    const outerIdx = NODES.filter((x) => x.ring === "outer").indexOf(n);
    return 110 + outerIdx * 14;
  };

  // P4 — code inset slide
  const insetSp = spring({ frame: frame - 230, fps, config: { damping: 14, mass: 0.7 } });
  const insetX = interpolate(insetSp, [0, 1], [-420, 0]);
  const insetOp = interpolate(frame, [230, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // P6 — governor warning pulse
  const warnIn = interpolate(frame, [360, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const warnPulse = interpolate(frame % 30, [0, 6, 30], [1, 1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Fade
  const fadeOut = interpolate(frame, [D - 30, D], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        background: `radial-gradient(ellipse at 50% 50%, ${theme.bgGradientEnd} 0%, ${theme.bgGradientStart} 70%)`,
        fontFamily: theme.sans,
        color: theme.fg,
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div style={{ position: "absolute", top: 60, left: 80, opacity: titleOp, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 22, color: theme.dim, letterSpacing: 6, fontFamily: theme.mono, textTransform: "uppercase" }}>
          {kicker}
        </div>
        <div style={{ fontSize: 56, fontWeight: 600, letterSpacing: -1.5, marginTop: 6 }}>{title}</div>
      </div>

      {/* Edges (SVG) */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
      >
        {EDGES.map(([a, b], i) => {
          const pa = findNode(a);
          const pb = findNode(b);
          // Edge appears once both endpoints have entered
          const startA =
            a === "center" ? 50 : nodeEntryFrame(NODES.find((n) => n.id === a)!, NODES.findIndex((n) => n.id === a));
          const startB =
            b === "center" ? 50 : nodeEntryFrame(NODES.find((n) => n.id === b)!, NODES.findIndex((n) => n.id === b));
          const startEdge = Math.max(startA, startB) + 4;
          const drawT = interpolate(frame, [startEdge, startEdge + 24], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isLimitEdge = a === "limits" || b === "limits";
          const stroke = isLimitEdge ? `${theme.err}aa` : `${theme.accent}66`;
          // Bezier control midpoint with slight curve
          const mx = (pa.x + pb.x) / 2 + (pb.y - pa.y) * 0.12;
          const my = (pa.y + pb.y) / 2 - (pb.x - pa.x) * 0.12;
          const path = `M ${pa.x} ${pa.y} Q ${mx} ${my} ${pb.x} ${pb.y}`;
          // Approximate length for dashoffset
          const len = Math.hypot(pb.x - pa.x, pb.y - pa.y) * 1.05;
          return (
            <path
              key={`e-${i}`}
              d={path}
              stroke={stroke}
              strokeWidth={isLimitEdge ? 2.5 : 1.5}
              fill="none"
              strokeDasharray={len}
              strokeDashoffset={len * (1 - drawT)}
              opacity={isLimitEdge ? 0.85 : 0.55}
            />
          );
        })}
      </svg>

      {/* Center SF cloud */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 80,
          top: CENTER_Y - 80,
          width: 160,
          height: 160,
          transform: `scale(${cloudScale})`,
          filter: `drop-shadow(0 0 ${24 + cloudGlow * 30}px ${theme.accent}cc)`,
        }}
      >
        <SfCloudGlyph />
      </div>

      {/* Nodes */}
      {NODES.map((n, i) => {
        const { x, y } = nodePos(n);
        const entry = nodeEntryFrame(n, i);
        const sp = spring({ frame: frame - entry, fps, config: { damping: 14, mass: 0.6 } });
        const scale = interpolate(sp, [0, 1], [0.4, 1]);
        const op = interpolate(frame, [entry, entry + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const ringColor = n.highlight ? theme.err : n.ring === "inner" ? theme.accent : `${theme.accent}88`;
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: x - 64,
              top: y - 32,
              width: 128,
              height: 64,
              opacity: op,
              transform: `scale(${scale})`,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(20,28,56,0.85)",
              border: `1px solid ${ringColor}`,
              boxShadow: `0 0 18px ${ringColor}55`,
              fontFamily: theme.mono,
              backdropFilter: "blur(6px)",
            }}
          >
            <span style={{ fontSize: 20, color: ringColor, width: 22, textAlign: "center" }}>{n.glyph}</span>
            <span style={{ fontSize: 15, color: theme.fg, whiteSpace: "nowrap" }}>{n.label}</span>
          </div>
        );
      })}

      {/* Code inset card (bottom-left) */}
      <div
        style={{
          position: "absolute",
          left: 60,
          bottom: 60,
          width: 560,
          opacity: insetOp,
          transform: `translateX(${insetX}px)`,
          background: "#0e1530",
          border: `1px solid ${theme.accent}40`,
          borderRadius: 12,
          padding: "16px 22px",
          fontFamily: theme.mono,
          fontSize: 16,
          lineHeight: 1.55,
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />
          ))}
          <div style={{ marginLeft: 10, color: theme.dim, fontSize: 12 }}>OppWon.trigger</div>
        </div>
        {APEX_CODE.map((line, i) => {
          const lineStart = 250 + i * 8;
          return (
            <div key={i} style={{ color: i === 5 ? theme.warn : theme.fg, whiteSpace: "pre" }}>
              <Typewriter text={line} startFrame={lineStart} charsPerFrame={2} />
            </div>
          );
        })}
        {/* Governor warning */}
        <div
          style={{
            marginTop: 14,
            opacity: warnIn,
            transform: `scale(${warnPulse})`,
            transformOrigin: "left center",
            color: theme.err,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ background: `${theme.err}22`, border: `1px solid ${theme.err}`, borderRadius: 4, padding: "2px 8px" }}>
            ! GOVERNOR LIMIT
          </span>
          <span style={{ color: theme.dim }}>SOQL inside loop · max 100/txn</span>
        </div>
      </div>

      {/* Slim inbox column (right rail, ambient) */}
      <SlimInboxColumn frame={frame} />
    </AbsoluteFill>
  );
};

// SF cloud glyph — simple stylized cloud SVG
const SfCloudGlyph: React.FC = () => (
  <svg viewBox="0 0 160 160" width="100%" height="100%">
    <defs>
      <linearGradient id="sf-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7aa2ff" />
        <stop offset="100%" stopColor="#ff7ab6" />
      </linearGradient>
    </defs>
    <path
      d="M40,100 a26,26 0 0,1 6,-50 a30,30 0 0,1 56,-6 a22,22 0 0,1 22,38 a18,18 0 0,1 -10,32 H46 a20,20 0 0,1 -6,-14 z"
      fill="url(#sf-grad)"
      opacity={0.92}
    />
    <circle cx="80" cy="80" r="62" fill="none" stroke="#ffffff22" strokeWidth={1} />
  </svg>
);

// Slim inbox column — keeps Japanese demand signal as ambient texture
const INBOX = [
  "Apex バッチの相談",
  "Flow 移行プロジェクト",
  "LWC コンポーネント設計",
  "Service Cloud 構築",
  "Trigger リファクタ",
  "CI/CD パイプライン",
  "Experience Cloud 立ち上げ",
  "Apex テストカバレッジ",
];

const SlimInboxColumn: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      position: "absolute",
      right: 60,
      top: 180,
      width: 320,
      height: 760,
      overflow: "hidden",
      maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
    }}
  >
    {INBOX.map((subj, i) => {
      const spawn = 30 + i * 38;
      const lifetime = 360;
      const drift = interpolate(frame, [spawn, spawn + lifetime], [0, -560]);
      const op = interpolate(frame, [spawn, spawn + 14, spawn + lifetime - 60, spawn + lifetime], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 640 + drift,
            left: 0,
            width: 300,
            opacity: op,
            background: "rgba(20,28,56,0.6)",
            border: `1px solid ${theme.accent}33`,
            borderLeft: `3px solid ${theme.accent}`,
            borderRadius: 8,
            padding: "10px 14px",
            fontFamily: theme.sans,
            fontSize: 15,
            color: theme.fg,
            marginBottom: 10,
          }}
        >
          {subj}
        </div>
      );
    })}
  </div>
);
```

### 1.6 Why this beats the bar chart

| Bar chart (old) | Ecosystem map (new) |
|---|---|
| 4 abstract bars + a year ticker | 12 named platform components, real terminology |
| "Demand grew" — generic | "This is its own world" — domain-specific |
| Zero technical content | Live Apex code with governor-limit annotation |
| Reads as marketing slide | Reads as systems diagram |
| Doesn't set up the gap | Sets up the gap (governor-limit warning is the seed Beat 3 will detonate) |

---

## 2. New Beat 3 tail — Terminal failure mock (Option A — chosen)

### 2.1 Why Option A over Option B

Option A (terminal failure) is dramatically stronger:
- **Concrete > abstract.** A failing governor-limit error is a real Salesforce moment. A chasm graphic is a metaphor — judges have seen 100 of those.
- **Echoes Beat 2.** The code inset in Beat 2 already hinted "SOQL inside loop = governor limit." Beat 3 detonates that seed — the AI confidently writes the same broken pattern, then the limit fires.
- **Reuses TerminalBox.** Already exists at `src/scenes/part2/_shared/TerminalBox.tsx`. Zero new infrastructure.
- **Visceral.** The audience watches plausible code fail in real time. That's the gap, made physical.

Option B (chasm/bridge) is rejected: it's a visual metaphor where Option A is a demonstrated truth.

### 2.2 Frame breakdown (scene-local frames within `AutonomousAIEra`)

| Frame | What happens |
|---|---|
| 660 | Lockup spring fully settled, white flash gone, shards faded |
| 670 | Lockup translates+scales down to top-third (scale 1 → 0.55, translateY 0 → -260) over 20 frames |
| 680 | Terminal box slides up from below (`translateY 200 → 0`, opacity 0 → 1) |
| 690 | User prompt typewriter starts: `> implement a bulkified Apex trigger for Opportunity IsWon` |
| 720 | Response code typewriter starts (8 lines, 2 chars/frame) |
| 760 | Response finishes typing — appears confident, syntax-highlighted |
| 765 | Brief pause (1 sec) — audience reads code |
| 770 | Red flash (3 frames) + screen shake (4px, 6 frames) |
| 773 | Error line appears in red below code: `ERROR — System.LimitException: Too many SOQL queries: 101` |
| 778 | Error pulse + caption fades in: `Looks fine. Breaks in production.` |
| 790 | Hold on freeze frame |
| 800 (= scene end) | Whole scene fades out |

Note: scene total is 780 frames in current code; this extends to 800 → bump `beats.aiEra` from `sec(26)=780` to `sec(26.7)≈800`. Net Part 1 grows by 20 frames (~0.7s). Acceptable.

### 2.3 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                     [Claude Code lockup, scaled 0.55, top]              │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ ● ● ●                                          ai-assistant     │   │
│  │ > implement a bulkified Apex trigger for Opportunity IsWon      │   │
│  │                                                                 │   │
│  │ trigger OppWon on Opportunity (after update) {                  │   │
│  │   for (Opportunity o : Trigger.new) {                           │   │
│  │     if (o.IsWon) {                                              │   │
│  │       Account a = [SELECT Id FROM Account WHERE Id=:o.AccountId];│  │
│  │       a.Status__c = 'Won';                                      │   │
│  │       update a;                                                 │   │
│  │     }                                                           │   │
│  │   }                                                             │   │
│  │ }                                                               │   │
│  │                                                                 │   │
│  │ ✕ ERROR — System.LimitException:                                │   │
│  │   Too many SOQL queries: 101                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│              Looks fine. Breaks in production.                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Full JSX skeleton (sub-component, drop into `AutonomousAIEra.tsx`)

Add a new constant block near the top:

```tsx
const PHASE_LOCKUP_SHRINK = 670;
const PHASE_TERMINAL_IN = 680;
const PHASE_PROMPT_TYPE = 690;
const PHASE_RESPONSE_TYPE = 720;
const PHASE_ERROR_FLASH = 770;
const PHASE_ERROR_TEXT = 773;
const PHASE_CAPTION = 778;
const SCENE_END = 800; // requires beats.aiEra bump

const AI_PROMPT = "implement a bulkified Apex trigger for Opportunity IsWon";

const AI_RESPONSE = [
  "trigger OppWon on Opportunity (after update) {",
  "  for (Opportunity o : Trigger.new) {",
  "    if (o.IsWon) {",
  "      Account a = [SELECT Id FROM Account",
  "                   WHERE Id = :o.AccountId];",
  "      a.Status__c = 'Won';",
  "      update a;",
  "    }",
  "  }",
  "}",
];
```

Add a new sub-component `TheGapTerminal`:

```tsx
const TheGapTerminal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Slide in
  const inOp = interpolate(frame, [PHASE_TERMINAL_IN, PHASE_TERMINAL_IN + 18], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const inSp = spring({ frame: frame - PHASE_TERMINAL_IN, fps, config: { damping: 16, mass: 0.7 } });
  const inY = interpolate(inSp, [0, 1], [200, 0]);

  // Error flash
  const flashOp = interpolate(
    frame,
    [PHASE_ERROR_FLASH, PHASE_ERROR_FLASH + 3, PHASE_ERROR_FLASH + 8],
    [0, 0.7, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Screen shake (3 frames after flash)
  const shakeAmt = interpolate(frame, [PHASE_ERROR_FLASH, PHASE_ERROR_FLASH + 6], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const shakeX = shakeAmt > 0 ? (random(`shx-${frame}`) - 0.5) * 8 * shakeAmt : 0;
  const shakeY = shakeAmt > 0 ? (random(`shy-${frame}`) - 0.5) * 8 * shakeAmt : 0;

  // Error text fade-in + pulse
  const errOp = interpolate(frame, [PHASE_ERROR_TEXT, PHASE_ERROR_TEXT + 8], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const errPulse = interpolate(
    Math.max(0, frame - PHASE_ERROR_TEXT) % 30,
    [0, 6, 30],
    [1, 1.06, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Caption fade-in
  const capOp = interpolate(frame, [PHASE_CAPTION, PHASE_CAPTION + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Scene-end fade
  const fadeOut = interpolate(frame, [SCENE_END - 20, SCENE_END], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: inOp * fadeOut, transform: `translate(${shakeX}px, ${shakeY}px)` }}>
      <div
        style={{
          position: "absolute",
          left: 410,
          top: 360,
          width: 1100,
          transform: `translateY(${inY}px)`,
          background: "#0e1530",
          borderRadius: 14,
          border: `1px solid ${theme.accent}40`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          fontFamily: theme.mono,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "16px 20px 12px",
            borderBottom: `1px solid ${theme.accent}20`,
          }}
        >
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
          ))}
          <div style={{ marginLeft: 12, color: theme.dim, fontSize: 14 }}>ai-assistant · prompt</div>
        </div>

        <div style={{ padding: "24px 32px 32px", fontSize: 18, lineHeight: 1.65 }}>
          {/* User prompt */}
          <div style={{ color: theme.accent }}>
            <span style={{ color: theme.dim, marginRight: 10 }}>{">"}</span>
            <Typewriter text={AI_PROMPT} startFrame={PHASE_PROMPT_TYPE} charsPerFrame={1.4} />
          </div>

          {/* Response code */}
          <div style={{ marginTop: 18 }}>
            {AI_RESPONSE.map((line, i) => {
              const start = PHASE_RESPONSE_TYPE + i * 4;
              // Syntax tint
              const isKeyword = line.trim().match(/^(trigger|for|if)\b/);
              const isQuery = line.includes("[SELECT");
              const color = isKeyword ? theme.accent2 : isQuery ? theme.warn : theme.fg;
              return (
                <div key={i} style={{ color, whiteSpace: "pre" }}>
                  <Typewriter text={line} startFrame={start} charsPerFrame={2} />
                </div>
              );
            })}
          </div>

          {/* Error block */}
          <div
            style={{
              marginTop: 22,
              opacity: errOp,
              transform: `scale(${errPulse})`,
              transformOrigin: "left center",
              padding: "12px 16px",
              background: `${theme.err}18`,
              border: `1px solid ${theme.err}`,
              borderRadius: 8,
              color: theme.err,
              fontSize: 17,
            }}
          >
            <div style={{ fontWeight: 700, letterSpacing: 1 }}>
              ✕ ERROR — System.LimitException
            </div>
            <div style={{ color: theme.fg, marginTop: 6 }}>
              Too many SOQL queries: 101
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 100,
          textAlign: "center",
          fontFamily: theme.mono,
          fontSize: 32,
          color: theme.dim,
          opacity: capOp,
          letterSpacing: 1,
        }}
      >
        Looks fine. Breaks in production.
      </div>

      {/* Red flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: theme.err,
          opacity: flashOp,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
```

### 2.5 Modify the existing reveal block

Inside `AutonomousAIEra.tsx`, replace the current `gapLine1FadeIn` / `gapLine2FadeIn` / `opusBadgeOpacity` text block and the lockup wrapper with:

```tsx
// Lockup shrink + reposition for terminal phase
const lockupShrink = interpolate(
  frame,
  [PHASE_LOCKUP_SHRINK, PHASE_LOCKUP_SHRINK + 20],
  [0, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);
const lockupScale = claudeScale * interpolate(lockupShrink, [0, 1], [1, 0.55]);
const lockupTranslateY = interpolate(lockupShrink, [0, 1], [0, -260]);

const opusBadgeOpacity = interpolate(
  frame,
  [PHASE_CLAUDE_REVEAL + 30, PHASE_CLAUDE_REVEAL + 50],
  [0, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);
```

And in the render:

```tsx
<AbsoluteFill
  style={{
    alignItems: "center",
    justifyContent: "center",
    opacity: claudeRevealOpacity,
    transform: `translateY(${lockupTranslateY}px) scale(${lockupScale})`,
  }}
>
  <div style={{ position: "relative" }}>
    <ClaudeCodeLockup wordmark={wordmark} />
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: -28,
        opacity: opusBadgeOpacity,
        fontFamily: theme.mono,
        fontSize: 18,
        color: theme.accent,
        background: `${theme.accent}15`,
        border: `1px solid ${theme.accent}40`,
        borderRadius: 999,
        padding: "4px 12px",
        letterSpacing: 0.5,
        whiteSpace: "nowrap",
      }}
    >
      claude-opus-4-7
    </div>
  </div>
</AbsoluteFill>

{/* NEW — terminal failure beat */}
{frame >= PHASE_TERMINAL_IN - 6 && <TheGapTerminal frame={frame} fps={fps} />}
```

The two old gap text lines (`But Salesforce isn't like other codebases.` / `Most AI tools don't know that yet.`) are **deleted**. The terminal failure replaces them — it shows the gap instead of saying it.

### 2.6 Required timing change

```ts
// src/timing.ts
export const beats = {
  intro: sec(12),
  marketDemand: sec(15),
  aiEra: sec(26.7), // was sec(26) — +20 frames for terminal beat freeze
};
```

This extends Part 1 from 1590 to 1610 frames. Update any composition `durationInFrames` reference accordingly.

---

## 3. Beat 1 enhancement — `Intro.tsx` (faint Apex code background)

### 3.1 Recommendation: ADD it.

Rationale:
- Beat 1 currently establishes "person + portfolio" but says nothing about Salesforce. Adding a faint Apex code fragment behind the title plants the domain from frame 1 — judges who only watch the first 10 seconds (high-traffic dropout zone) still get the signal.
- "Faint" matters: 8% opacity, blurred 2px, behind the existing dark gradient. It's atmospheric, not legible. It does NOT compete with the title.
- Visual continuity: same code style as Beat 2's inset and Beat 3's terminal — the audience subliminally builds "this video is about Apex" before any dialogue lands.

### 3.2 Implementation — small JSX addition

Add inside the existing `<AbsoluteFill>`, after the `<Video>` and before the gradient overlay:

```tsx
{/* Faint Apex code atmosphere */}
<AbsoluteFill style={{ opacity: 0.08, filter: "blur(1.5px)", pointerEvents: "none" }}>
  <pre
    style={{
      position: "absolute",
      top: 60,
      right: 80,
      fontFamily: theme.mono,
      fontSize: 18,
      color: theme.accent,
      lineHeight: 1.7,
      whiteSpace: "pre",
      textAlign: "right",
      transform: "rotate(-2deg)",
    }}
  >
{`public class OpportunityHandler {
  @AuraEnabled
  public static List<Opportunity> getWon(Id accId) {
    return [SELECT Id, Name, Amount
            FROM Opportunity
            WHERE AccountId = :accId
            AND IsWon = true
            LIMIT 50];
  }
}`}
  </pre>
</AbsoluteFill>
```

Frame-wise: visible whole scene, gated by the existing `fadeIn * fadeOut` since it's nested inside the same `<AbsoluteFill>`. No new interpolation needed.

---

## 4. Files to create / modify / delete

| Action | Path | Notes |
|---|---|---|
| **CREATE** | `demo/remotion/src/scenes/part1/SalesforceEcosystem.tsx` | Full new component (Section 1.5) |
| **DELETE** | `demo/remotion/src/scenes/part1/MarketDemand.tsx` | Replaced |
| **MODIFY** | `demo/remotion/src/scenes/part1/AutonomousAIEra.tsx` | Add `TheGapTerminal` sub-component, shrink lockup, delete old gap text, import `Typewriter`, add new phase constants (Section 2.4–2.5) |
| **MODIFY** | `demo/remotion/src/scenes/part1/Intro.tsx` | Add faint Apex code overlay (Section 3.2) |
| **MODIFY** | `demo/remotion/src/timing.ts` | `aiEra: sec(26.7)` (Section 2.6) |
| **MODIFY** | `demo/remotion/src/Root.tsx` (or wherever Part 1 composition is registered) | Swap `MarketDemand` import → `SalesforceEcosystem`; update `durationInFrames` if hardcoded |

Verify the composition entry point — if Part 1 lives in a `Part1.tsx` master scene, update its imports too. (Search `MarketDemand` across `demo/remotion/src/`.)

---

## 5. TypeScript verification

After implementation, run from `demo/remotion/`:

```bash
bunx tsc --noEmit
bun run build  # or remotion render --dry-run if available
```

Both must be clean. Type checks to watch:

- `Typewriter` props match (`text: string`, `startFrame: number`, `charsPerFrame?: number`).
- `Node[]` and `Edge[]` types are local — no export needed.
- `findNode(id)` may return `undefined` if a typo'd edge id is introduced — add a defensive check or accept the runtime hint (`!` non-null assertion is used in skeleton; harden if needed).
- `random(seed)` returns `number` — confirmed Remotion API.
- All `interpolate` calls have explicit `extrapolateLeft`/`extrapolateRight` clamps where the input frame can fall outside the input range — already specified in skeleton.

---

## 6. What this delivers vs the user's bar

| Concern from user | Old plan | This plan |
|---|---|---|
| "Hardly any visual changes" | 2 text lines + 1 badge | New 450-frame ecosystem map (12 nodes, 19 edges, animated code inset) + new 120-frame terminal failure beat with code error simulation |
| "Visual doesn't change → score stays bad" | Tail patch only | Full Beat 2 rewrite + new Beat 3 sub-beat + Beat 1 enhancement |
| "Show platform complexity, don't narrate it" | Narrated via 2 text lines | Demonstrated: 12 named SF nodes, real Apex syntax, governor-limit edge highlighted in red |
| "Show generic AI fails on this platform" | Implied via text | Demonstrated: terminal types out a plausible-looking trigger, then crashes with `System.LimitException: Too many SOQL queries: 101` |
| "End Part 1 with the gap felt viscerally" | Reads as subtitle | Audience watches confident-looking code fail in real time — the gap is shown breaking, not described |
| Opus 4.7 surfacing | Pill badge under lockup | Pill badge retained (lockup shrinks but stays on screen above terminal); judge sees `claude-opus-4-7` for ~3s before terminal phase |

This is a full visual redesign. Every beat now carries Salesforce-specific signal, and the gap is demonstrated, not narrated.
