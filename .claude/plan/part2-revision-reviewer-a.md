# Part 2 Revision — Reviewer A (Impact + Demo lens)

> Full beat-by-beat rewrite of Part 2 ("The Struggle"). 1800 frames @ 30 fps, 1920×1080.
> Lens: **emotional impact + thumbnail-legible visuals**. Every beat lands a memorable frame. Every motion is driven by `useCurrentFrame()` + `interpolate()` / `spring()` with explicit `Easing.bezier`.

---

## 0. Design thesis

Part 1 ends on `System.LimitException: Too many SOQL queries: 101` against a fading Salesforce ecosystem map. Part 2 must answer: **"so what have you been doing about it, and why isn't *that* enough?"**

The current Part 2 — and even the prior Reviewer A revision — has three structural weaknesses we fix here:

1. **Generic abstraction, no Salesforce signal.** Pipeline pills, comic thought bubbles, wireframe doc cards. Could belong to any AI tool. The viewer never sees real `force-app/`, real `sf` CLI output, real `cls` source.
2. **Pain doesn't accumulate.** Each beat resets. B5 shows one error in isolation — no link back to B3's blindspot, no link back to B1's ambition.
3. **Remotion patterns broken.** Absolute frames inside Sequences, no `premountFor`, manual opacity fades instead of `<TransitionSeries>`, `useTypewriter` (a hook) called inside `.map()`, freeform CSS easing.

Fix: every beat carries one **load-bearing real-Salesforce artifact** (real Apex, real SFDX tree, real `sf` error, real Trailhead-styled doc card). The Part 1 governor-limit error reappears as a single line buried in B5's stacked failures — viewer subconsciously connects "that same class is *still* hitting him." All animations driven by frame math + `Easing.bezier` curves, all sequences wrapped in `<TransitionSeries>` with `premountFor`.

**Continuity hook from Part 1:** ghost ecosystem map at 0.08 opacity persists into B1 only (top-right quadrant), fades out by local frame 180. The error string `LimitException: 101` from Part 1's tail line surfaces verbatim in B5 line 4 of 5.

**Opus 4.7 surfacing:** the Claude Code dock badge in B1, B2, and B5 reads `claude-opus-4-7` (model id). B3 split-screen labels its left pane "Generic LLM advice" and its right pane explicitly "**Opus 4.7 + Salesforce ground truth**" so the demo signals where Opus shines.

---

## 1. VO scripts (TTS-ready, plain text)

Two clips already mastered at `demo/remotion/public/vo/part-2-current-efforts.wav` and `part-2-pain-points.wav`. We re-cut them to match this revised structure.

### Clip 1 — `part-2-current-efforts.wav` (B1 + B2, ≈ 22 s spoken)

**Target**: 22 s, ~52 words, 142 wpm. Personal first-person, casual but precise.

```
So lately, almost all my client work has been one specific build —
wiring Claude Code into the full Salesforce dev cycle.
Planning. Design. The Apex and L W C work itself.
Code review. Q A. The post-release docs.
Six personas, one pipeline, all driven by Claude.
```

- **Char count**: 285 (incl. spaces) — comfortable for XTTS at 30 fps.
- TTS notes: `L W C`, `Q A` as space-separated letters (XTTS pronounces cleaner). Em-dash `—` = ~250 ms pause. Final line is the emotional anchor — let it land.

### Clip 2 — `part-2-pain-points.wav` (B3 + B4 + B5, ≈ 30 s spoken)

**Target**: 30 s, ~78 words, 156 wpm. Builds tension across three discrete failure modes.

```
But the cracks show up fast.
Most models — even strong ones — don't actually know Salesforce.
They write a S O Q L query that explodes past the governor limit on the second record.
So I started hand-feeding them the docs. Apex reference. L W C guide. Release notes.
Every session, all over again.
And the S F tooling lives in a world Claude can't reach.
Deploys fail. Permissions get rejected. Tests die in the org.
Every fix is ten more minutes of babysitting the model.
```

- **Char count**: 487 (incl. spaces).
- TTS notes: `S O Q L`, `S F` space-letter form. Three rapid short sentences at end ("Deploys fail. Permissions get rejected. Tests die in the org.") set the rhythm B5 mirrors visually.

### VO timing

| Clip | Sequence start (global frame) | Spoken duration | Beats covered |
|------|------------------------------|-----------------|----------------|
| Clip 1 | 30 (0.5 s into B1) | ≈22 s | B1 + B2 |
| Clip 2 | 900 (B3 in-point) | ≈30 s | B3 + B4 + B5 |

Both end before frame 1740 so B6 tail plays under clean BGM only.

---

## 2. Beat structure (frame math reconciled with `<TransitionSeries>`)

### Critical Remotion math: transitions overlap, sequence durations include their out-transition

`<TransitionSeries.Transition>` of duration `T` overlaps the **last `T` frames of the prior `Sequence` with the first `T` frames of the next `Sequence`**. Total composition duration = sum of `Sequence.durationInFrames` − sum of `Transition.durationInFrames`.

We hold the **`timing.ts` `part2Beats` keys constant** (BC requirement), and pick transition durations such that final composition length still equals 1800 frames.

### Target durations (raw, before transitions subtract)

| Beat | Key | Raw duration (frames) | Real screen time (s) |
|------|-----|----------------------|----------------------|
| B1 Workspace reveal | `part2Beats.intro` | 270 | 9.0 |
| B2 Persona pipeline (SF-flavored) | `part2Beats.pipeline` | 630 | 21.0 |
| B3 LLM blindspot split-screen | `part2Beats.llmGap` | 360 | 12.0 |
| B4 Doc shelf | `part2Beats.resources` | 270 | 9.0 |
| B5 Terminal pile-up | `part2Beats.tooling` | 240 | 8.0 |
| B6 Tail cross-fade | `part2Beats.tail` | 90 | 3.0 |
| **Sum (raw)** | | **1860** | 62.0 |
| **Subtract 4× 15-frame transitions** | | **−60** | −2.0 |
| **Final** | | **1800** | **60.0** |

Adjusted vs current `timing.ts`: B5 shrinks 210→240 (still grows since we use `<TransitionSeries>` overlap), B6 grows 60→90 to give a real cross-fade tail. **Update `timing.ts` `part2Beats.tooling = sec(8)` and `part2Beats.tail = sec(3)`.** Keys unchanged.

### Transitions chosen (each 15 frames = 0.5 s)

| Between | Type | Direction / config | Why |
|---------|------|---------------------|-----|
| B1 → B2 | `slide({ direction: "from-bottom" })` | `linearTiming({ durationInFrames: 15 })` | Pipeline rises *out of* the workspace — feels like zoom-in to the orchestration he built |
| B2 → B3 | `wipe({ direction: "from-left" })` | `springTiming({ config: { damping: 200, stiffness: 200, mass: 1 }, durationInFrames: 15 })` | Hard cut on a beat — pain narrative starts |
| B3 → B4 | `fade()` | `linearTiming({ durationInFrames: 15 })` | Dissolve from blindspot into the workaround |
| B4 → B5 | `slide({ direction: "from-right" })` | `linearTiming({ durationInFrames: 15 })` | Sliding INTO the terminal feels like things accelerating downward |
| B5 → B6 | (none — B6 handles its own cross-fade internally) | — | B6 IS the cross-fade |

---

## 3. Beat 1 — Workspace reveal (local frames 0–270, 9 s)

### 3.1 Visual concept

We're *inside* the developer's editor at the moment Part 2 starts. Real VS Code chrome. Real SFDX file tree. Claude Code dock pinned to the right. Ghost Part-1 ecosystem map fades out top-right. The viewer instantly recognizes "this is real Salesforce work, not a slide deck."

**Emotional intent**: pride + ambition. He's *built something*. The shot is the most polished frame in the whole video — clean code, organized tree, Opus-powered dock idle and ready. This frame must be **memorable at thumbnail size**: dark background, glowing accent border on the active editor pane, white headline text bottom-third.

**Memorable thumbnail moment**: frame 180 — fully assembled workspace, headline text "Six personas. One pipeline." just typed in.

### 3.2 VO sync

VO Clip 1 starts at global frame 30 (B1 local frame 30). Workspace assembles ahead of VO — silent build for 30 frames, then VO begins as cursor lands in editor.

### 3.3 Frame timeline (LOCAL — frame 0 = B1 in-point)

| Local frames | Event | Easing |
|--------------|-------|--------|
| 0–24 | Editor chrome fades up (opacity 0→1), bg lift overlay drives in | `Easing.bezier(0.16, 1, 0.3, 1)` (out-expo) |
| 18–60 | macOS traffic lights pop in left-to-right (3× spring, staggered 4 frames) | spring `{ mass: 0.4, damping: 12, stiffness: 220 }` |
| 30–90 | Left activity rail icons fade in (4 icons, staggered 6 frames each) | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 60–150 | File tree types in line-by-line (string slice — 12 lines × ~6 frames each) | linear, char-by-char string slice |
| 90–180 | Editor pane reveals `AccountTriggerHandler.cls` source (typewriter, 240 chars) | linear, string slice (NOT inside `.map()`) |
| 120–180 | Claude Code dock slides in from right (transform translateX 80→0, opacity 0→1) | spring `{ mass: 0.6, damping: 14, stiffness: 160 }` |
| 150–180 | Dock model badge `claude-opus-4-7` fades in beneath dock title | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 180–225 | Headline overlay "Six personas. One pipeline." types in over editor (lower-third) | linear string slice |
| 0–180 | Ghost ecosystem map (top-right, 460×460) opacity 0.08→0 | `Easing.bezier(0.65, 0, 0.35, 1)` |
| 240–270 | Whole frame holds steady (transition out handled by `<TransitionSeries.Transition>`) | n/a |

### 3.4 Files to create

- `demo/remotion/src/scenes/part2/CurrentEffortsIntro.tsx` — **REPLACE entirely** (current is plain typed text).
- `demo/remotion/src/scenes/part2/_shared/EditorChrome.tsx` — NEW. Reusable VS-Code-style window frame (traffic lights, title bar, activity rail).
- `demo/remotion/src/scenes/part2/_shared/SfdxFileTree.tsx` — NEW. Static-data-driven file tree with type-in animation.
- `demo/remotion/src/scenes/part2/_shared/ApexEditorPane.tsx` — NEW. Code editor with line numbers + syntax-tinted Apex.
- `demo/remotion/src/scenes/part2/_shared/ClaudeCodeDock.tsx` — NEW. Right-side dock with `claude-opus-4-7` badge.
- `demo/remotion/src/scenes/part2/_shared/GhostEcosystem.tsx` — NEW. Reads same logo SVGs as Part 1 ecosystem map; renders at low opacity.

### 3.5 JSX skeleton — `CurrentEffortsIntro.tsx`

```tsx
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { EditorChrome } from "./_shared/EditorChrome";
import { SfdxFileTree } from "./_shared/SfdxFileTree";
import { ApexEditorPane } from "./_shared/ApexEditorPane";
import { ClaudeCodeDock } from "./_shared/ClaudeCodeDock";
import { GhostEcosystem } from "./_shared/GhostEcosystem";

const easeOutExpo  = Easing.bezier(0.16, 1.00, 0.30, 1.00);
const easeInOutCubic = Easing.bezier(0.65, 0.00, 0.35, 1.00);
const easeStandard  = Easing.bezier(0.40, 0.00, 0.20, 1.00);

const HEADLINE = "Six personas. One pipeline.";

export const CurrentEffortsIntro: React.FC = () => {
  const frame = useCurrentFrame();      // LOCAL frame inside this <Sequence>
  const { fps } = useVideoConfig();

  // Editor chrome fade-up (0–24)
  const chromeOpacity = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });

  // Bg lift (0–24)
  const bgLift = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutExpo,
  });

  // Dock slide-in (120–180): one normalized progress, derive transform + opacity
  const dockSpring = spring({
    frame: frame - 120,
    fps,
    config: { mass: 0.6, damping: 14, stiffness: 160 },
  });
  const dockTx = interpolate(dockSpring, [0, 1], [80, 0]);
  const dockOp = interpolate(dockSpring, [0, 1], [0, 1]);

  // Dock badge fade-in (150–180)
  const badgeOp = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStandard,
  });

  // Headline typewriter (180–225) — STRING SLICE, no per-char hooks
  const headlineCharsPerFrame = HEADLINE.length / 45;
  const headlineLen = Math.min(
    HEADLINE.length,
    Math.max(0, Math.floor((frame - 180) * headlineCharsPerFrame)),
  );
  const headlineTyped = HEADLINE.slice(0, headlineLen);
  const headlineCaret = headlineLen < HEADLINE.length && Math.floor(frame / (fps / 2)) % 2 === 0;

  // Ghost ecosystem fade-out (0–180)
  const ghostOp = interpolate(frame, [0, 180], [0.08, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutCubic,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      <AbsoluteFill style={{ background: "#1a2240", opacity: bgLift * 0.4 }} />
      <GhostEcosystem opacity={ghostOp} />

      <AbsoluteFill style={{ opacity: chromeOpacity, padding: 80 }}>
        <EditorChrome title="force-app — sfwiz-demo" frame={frame} fps={fps}>
          <div style={{ display: "flex", height: "100%" }}>
            <SfdxFileTree startFrame={60} typedFrame={frame} />
            <ApexEditorPane startFrame={90} typedFrame={frame} />
            <div style={{ transform: `translateX(${dockTx}px)`, opacity: dockOp, width: 360 }}>
              <ClaudeCodeDock badgeOpacity={badgeOp} model="claude-opus-4-7" />
            </div>
          </div>
        </EditorChrome>
      </AbsoluteFill>

      {/* lower-third headline */}
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: theme.sans,
          fontWeight: 700,
          fontSize: 56,
          letterSpacing: -1,
          color: theme.fg,
          textShadow: "0 2px 18px rgba(0,0,0,0.6)",
        }}
      >
        {headlineTyped}
        {headlineCaret && <span style={{ color: theme.accent }}>▍</span>}
      </div>
    </AbsoluteFill>
  );
};
```

### 3.6 Hook-safety notes for sub-components

- `SfdxFileTree` receives `typedFrame: number` as a prop. Inside, it computes per-line slice ranges as **pure functions of `typedFrame`** — no `useCurrentFrame()` inside the `.map()` over lines. Pattern:

```tsx
{LINES.map((line, i) => {
  const lineStart = startFrame + i * 6;
  const charsTyped = Math.max(0, Math.floor((typedFrame - lineStart) * 1.6));
  return <div key={i}>{line.slice(0, charsTyped)}</div>;
})}
```

This is **safe** because `slice()` is pure and `typedFrame` is already realized as a number — no hook is called per iteration.

- `ApexEditorPane` follows the same pattern for syntax-tinted Apex (a 12-line `AccountTriggerHandler.cls` snippet). Hook is called once at the component root.

### 3.7 Transition out

```tsx
<TransitionSeries.Transition
  presentation={slide({ direction: "from-bottom" })}
  timing={linearTiming({ durationInFrames: 15 })}
/>
```

### 3.8 Render checkpoints

```bash
# B1 frame 24 — editor chrome assembled, no content yet
bunx remotion still src/index.ts Part2Struggle out/p2-b1-f024.png --frame=24

# B1 frame 180 — fully composed, dock + tree + apex visible, ghost map gone
bunx remotion still src/index.ts Part2Struggle out/p2-b1-f180.png --frame=180

# B1 frame 230 — headline typed in fully (thumbnail moment)
bunx remotion still src/index.ts Part2Struggle out/p2-b1-f230.png --frame=230
```

---

## 4. Beat 2 — Six-persona pipeline (SF-flavored) (local frames 0–630, 21 s)

### 4.1 Visual concept

The "one pipeline" promised in B1's headline now appears, but **with real Salesforce artifacts hovering above each node**. Not generic "Plan / Design / Dev / Review / QA / Docs" pills — each node carries a distinctive SF object:

| # | Persona | Floating artifact (above node) |
|---|---------|-------------------------------|
| 1 | Org Admin | sfdx scratch-org JSON `{ "edition": "Developer" }` (3 lines) |
| 2 | Designer | mini ERD: `Account → Opportunity` rectangles + relationship line |
| 3 | Developer | 4-line Apex snippet `public with sharing class …` |
| 4 | Reviewer | diff hunk: green `+` line + red `-` line (Apex) |
| 5 | QA | test-results pill `48 passed · 2 failed · 86% coverage` |
| 6 | Deploy Manager | deploy progress `████░░ 67%` + target-org chip |

A **glowing data packet** travels along the connectors left-to-right — visible "the work flows through Claude." Behind everything, a faint vertical bar on the right shows token usage rising as work progresses (`tokens: 12.3K → 87.4K`).

**Emotional intent**: this is the *system he built*. Concrete, ambitious, real. Demo prize signal: each artifact is unmistakably Salesforce.

**Memorable thumbnail moment**: frame 360 — all six nodes lit, data packet at node 4, each artifact card hovering with a subtle drop shadow. A judge stopping at this frame instantly understands "Claude Code → 6 SF roles → real platform deliverables."

### 4.2 VO sync

VO Clip 1 still playing into this beat (started global frame 30, ends ≈ global frame 690 = B2 local frame 420). The line "Six personas, one pipeline, all driven by Claude" lands at ~B2 local frame 360, perfectly aligned with the data-packet at the middle node and all artifacts visible.

### 4.3 Frame timeline (LOCAL, 0 = B2 in-point)

| Local frames | Event | Easing / config |
|--------------|-------|-----------------|
| 0–30 | Pipeline row spawns from below — translateY(80→0), opacity 0→1, all 6 nodes simultaneously slide-in handled by `<TransitionSeries>` slide-from-bottom (15 f overlap) + native motion (15 f) | `Easing.bezier(0.16, 1, 0.3, 1)` |
| 12–96 | Connector arrows draw left-to-right, staggered 14 frames per arrow (5 arrows total) | linear (line growth) |
| 30–390 | Each artifact card spawns above its node, staggered 60 frames apart (one per ~2 s) | spring `{ mass: 0.5, damping: 13, stiffness: 180 }` |
| 60–600 | Data packet (glowing dot, radius 14, accent color) travels through pipeline. 6 segments × 90 frames each. Each segment uses `Easing.bezier(0.45, 0, 0.55, 1)` (in-out-quad) for natural acceleration | `Easing.bezier(0.45, 0, 0.55, 1)` |
| 0–630 | Token-usage bar on right edge fills 12.3K → 87.4K, label updates discretely every 30 frames | linear |
| 540–600 | Whole pipeline subtly dims (opacity 1→0.85) signaling "but this isn't enough" | `Easing.bezier(0.4, 0, 0.6, 1)` |
| 600–630 | Hold for transition out | n/a |

### 4.4 Files to modify / create

- `demo/remotion/src/scenes/part2/WorkflowPipeline.tsx` — **MODIFY** (reuses existing layout math, adds artifact cards above nodes + data packet + token bar).
- `demo/remotion/src/scenes/part2/_shared/PipelineNode.tsx` — **MODIFY** (relabel to use SF persona names from `pipelineNodes` prop, remove "STEP N" sub-text, replace with persona role like "ORG ADMIN").
- `demo/remotion/src/scenes/part2/_shared/PersonaArtifact.tsx` — NEW. Discriminated-union component rendering the 6 distinct artifacts (scratch-config / ERD / Apex / diff / test-pill / deploy-bar).
- `demo/remotion/src/scenes/part2/_shared/DataPacket.tsx` — NEW. Single glowing dot with 6-stop position interpolation along pipeline.
- `demo/remotion/src/scenes/part2/_shared/TokenUsageBar.tsx` — NEW. Vertical accent gauge anchored to right edge.

### 4.5 Schema additions to `part2-schema.ts`

```ts
const personaArtifactSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("scratchConfig"), edition: z.string() }),
  z.object({ kind: z.literal("erd"),           objects: z.array(z.string()).length(2) }),
  z.object({ kind: z.literal("apexSnippet"),   lines: z.array(z.string()).max(4) }),
  z.object({ kind: z.literal("diffHunk"),      added: z.string(), removed: z.string() }),
  z.object({ kind: z.literal("testPill"),      passed: z.number(), failed: z.number(), coverage: z.number() }),
  z.object({ kind: z.literal("deployBar"),     percent: z.number(), targetOrg: z.string() }),
]);

export const part2Schema = z.object({
  // ... existing ...
  personaArtifacts: z.array(personaArtifactSchema).length(6),
  pipelineNodes:    z.array(z.string()).length(6), // already exists; default → ["Org Admin","Designer","Developer","Reviewer","QA","Deploy Mgr"]
});
```

`part2Defaults.personaArtifacts` populated with the 6 artifact definitions above.

### 4.6 JSX skeleton — `WorkflowPipeline.tsx` (key additions)

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { PipelineNode } from "./_shared/PipelineNode";
import { PersonaArtifact, type ArtifactSpec } from "./_shared/PersonaArtifact";
import { DataPacket } from "./_shared/DataPacket";
import { TokenUsageBar } from "./_shared/TokenUsageBar";

const easeStandard = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOutQuad = Easing.bezier(0.45, 0, 0.55, 1);
const easeOutQuad   = Easing.bezier(0.4, 0, 0.6, 1);

const NODE_W = 220;
const NODE_H = 120;
const GAP = 60;
const ARTIFACT_OFFSET_Y = -180; // artifact card sits above node

// Pure helper — staggered spawn for artifacts
const artifactSpawn = (i: number) => 30 + i * 60;

type Props = {
  nodes: string[];
  artifacts: ArtifactSpec[];
};

export const WorkflowPipeline: React.FC<Props> = ({ nodes, artifacts }) => {
  const frame = useCurrentFrame();           // LOCAL inside Sequence
  const { fps } = useVideoConfig();

  const clamped = nodes.slice(0, 6);
  const totalW = clamped.length * NODE_W + (clamped.length - 1) * GAP;
  const startX = (1920 - totalW) / 2;
  const cy = 1080 / 2;

  // Pipeline dim near end
  const dimOpacity = interpolate(frame, [540, 600], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOutQuad,
  });

  // Data packet position: 6 nodes → 5 segments + entry/exit
  // packetProgress goes 0→1 over frames 60–600
  const packetProgress = interpolate(frame, [60, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutQuad,
  });
  const packetX = startX + packetProgress * totalW;

  return (
    <AbsoluteFill style={{ opacity: dimOpacity }}>
      {/* nodes row */}
      <div style={{ position: "absolute", top: cy - NODE_H / 2, left: startX, display: "flex", gap: GAP }}>
        {clamped.map((label, i) => {
          const s = spring({
            frame: frame - i * 8,
            fps,
            config: { mass: 0.5, damping: 13, stiffness: 200 },
          });
          return <PipelineNode key={label} label={label} index={i} springProgress={s} />;
        })}
      </div>

      {/* artifacts row (above nodes) */}
      {clamped.map((_, i) => {
        const nodeCenterX = startX + i * (NODE_W + GAP) + NODE_W / 2;
        const artifactY = cy + ARTIFACT_OFFSET_Y;
        const s = spring({
          frame: frame - artifactSpawn(i),
          fps,
          config: { mass: 0.5, damping: 13, stiffness: 180 },
        });
        const opacity = interpolate(s, [0, 1], [0, 1]);
        const ty = interpolate(s, [0, 1], [20, 0]);
        return (
          <div
            key={`art-${i}`}
            style={{
              position: "absolute",
              left: nodeCenterX - 130,
              top: artifactY,
              width: 260,
              opacity,
              transform: `translateY(${ty}px)`,
            }}
          >
            <PersonaArtifact spec={artifacts[i]} />
          </div>
        );
      })}

      <DataPacket
        x={packetX}
        y={cy}
        opacity={interpolate(frame, [60, 90, 580, 600], [0, 1, 1, 0], { easing: easeStandard })}
      />

      <TokenUsageBar frame={frame} startTokens={12300} endTokens={87400} totalFrames={630} />

      {/* connector arrows — draw progress = local time */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080 }}>
        {clamped.slice(0, -1).map((_, i) => {
          const cx = startX + (i + 1) * (NODE_W + GAP) - GAP;
          const drawStart = 12 + i * 14;
          const drawProgress = interpolate(frame, [drawStart, drawStart + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // ... arrow body identical to existing impl, gated by drawProgress ...
          return <g key={i}>{/* arrow */}</g>;
        })}
      </svg>
    </AbsoluteFill>
  );
};
```

### 4.7 Transition out

```tsx
<TransitionSeries.Transition
  presentation={wipe({ direction: "from-left" })}
  timing={springTiming({ config: { damping: 200, stiffness: 200, mass: 1 }, durationInFrames: 15 })}
/>
```

### 4.8 Render checkpoints

```bash
# B2 frame 90 (global 360) — connectors drawing, first artifacts appearing
bunx remotion still src/index.ts Part2Struggle out/p2-b2-f360.png --frame=360

# B2 frame 360 (global 630) — all 6 nodes lit, data packet near node 4, all artifacts visible (THUMBNAIL CANDIDATE)
bunx remotion still src/index.ts Part2Struggle out/p2-b2-f630.png --frame=630

# B2 frame 600 (global 870) — pipeline starting to dim, packet exiting
bunx remotion still src/index.ts Part2Struggle out/p2-b2-f870.png --frame=870
```

---

## 5. Beat 3 — LLM blindspot split-screen (local frames 0–360, 12 s)

### 5.1 Visual concept

A vertical split. **Left pane**: a generic LLM (no model badge — just "AI" label) confidently advising "Add a database index — that should fix it." **Right pane**: real Salesforce reality — `User_Permission` requires a `Permission Set`, not an index; SOQL governor limit `101 queries` (the Part 1 callback) appears in red. A pulsing red `BLINDSPOT` chip sits between the panes at 50/50.

Then at frame 240, the right pane's title bar swaps from "Salesforce reality" to "**Opus 4.7 + Salesforce ground truth**" with a green check, and a corrected response appears: "Bulkify the trigger — single SOQL outside the loop." The blindspot chip flips from red → green.

**Emotional intent**: the contrast lands — generic models are *confidently wrong*. Opus 4.7 with the right grounding is *correct*. This is the demo prize signal: Opus is positioned as the model that, with proper context, gets the niche right.

**Memorable thumbnail moment**: frame 180 — left pane wrong advice in red glow, right pane raw error visible, BLINDSPOT chip pulsing at center. Most legible "pain" frame in the whole video.

### 5.2 VO sync

VO Clip 2 starts at global frame 900 = B3 local frame 0. Lines:
- "But the cracks show up fast." — frames 0–60
- "Most models — even strong ones — don't actually know Salesforce." — frames 60–180
- "They write a S O Q L query that explodes past the governor limit on the second record." — frames 180–360

The third line lands precisely as the right pane shows the error.

### 5.3 Frame timeline (LOCAL)

| Local frames | Event | Easing / config |
|--------------|-------|-----------------|
| 0–18 | Two panes slide in (left from left edge, right from right edge), translateX(±200→0) | spring `{ mass: 0.6, damping: 16, stiffness: 200 }` |
| 30–90 | Left pane "AI" prompt + answer types in (string slice, 110 chars) | linear |
| 90–150 | Right pane raw `sf` query + first error line types in | linear |
| 120–180 | BLINDSPOT chip fades in at center, pulse begins | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 150–360 | BLINDSPOT chip pulses (red glow oscillation: `0.5 + 0.5 * Math.sin(frame / 8)`) | sin wave (frame-derived, deterministic) |
| 180–240 | Right pane second error line: `LimitException: 101` (Part 1 callback) — red flash 240–252 | linear flash |
| 240–270 | Right pane title bar morphs from "Salesforce reality" → "Opus 4.7 + Salesforce ground truth" (cross-fade) | `Easing.bezier(0.65, 0, 0.35, 1)` |
| 270–330 | Corrected Opus response types in below the error: "Bulkify the trigger — single SOQL outside the loop." | linear |
| 300–330 | BLINDSPOT chip color animates red→green | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 330–360 | Hold | n/a |

### 5.4 Files to modify / create

- `demo/remotion/src/scenes/part2/LLMKnowledgeGap.tsx` — **REPLACE entirely** (current file uses thought-bubble metaphor; we replace with split-screen).
- `demo/remotion/src/scenes/part2/_shared/SplitPane.tsx` — NEW. Two-column layout with title bar + body slot.
- `demo/remotion/src/scenes/part2/_shared/BlindspotChip.tsx` — NEW. Center-anchored badge with red/green state + pulse.

### 5.5 JSX skeleton — `LLMKnowledgeGap.tsx`

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { SplitPane } from "./_shared/SplitPane";
import { BlindspotChip } from "./_shared/BlindspotChip";

const easeStandard = Easing.bezier(0.4, 0, 0.2, 1);
const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);

const LEFT_PROMPT  = "User: Why is my Apex hitting governor limits?";
const LEFT_ANSWER  = "AI: Add a database index — that should fix it.";
const RIGHT_QUERY  = "[SELECT Id, Name FROM Account WHERE …] inside FOR loop";
const RIGHT_ERR_1  = "System.LimitException: Too many SOQL queries: 101";
const RIGHT_ERR_2  = "Caused by: query inside loop @ AccountTriggerHandler.cls:24";
const OPUS_FIX     = "Opus: Bulkify the trigger — single SOQL outside the loop.";

const typedSlice = (text: string, startFrame: number, frame: number, cps: number) => {
  const len = Math.max(0, Math.floor((frame - startFrame) * cps));
  return text.slice(0, Math.min(len, text.length));
};

export const LLMKnowledgeGap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pane slide-in
  const leftSpring = spring({
    frame,
    fps,
    config: { mass: 0.6, damping: 16, stiffness: 200 },
  });
  const rightSpring = spring({
    frame: frame - 4,
    fps,
    config: { mass: 0.6, damping: 16, stiffness: 200 },
  });
  const leftTx  = interpolate(leftSpring,  [0, 1], [-200, 0]);
  const rightTx = interpolate(rightSpring, [0, 1], [200, 0]);
  const paneOp  = interpolate(leftSpring,  [0, 1], [0, 1]);

  // Title swap right pane (240→270)
  const titleSwapProgress = interpolate(frame, [240, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutCubic,
  });
  const rightTitleOldOp = 1 - titleSwapProgress;
  const rightTitleNewOp = titleSwapProgress;

  // Blindspot chip color (red 0–300, green 300–360 cross)
  const chipGreen = interpolate(frame, [300, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStandard,
  });
  const chipPulse = 0.5 + 0.5 * Math.sin(frame / 8);

  // LimitException flash (240–252)
  const errFlash = interpolate(frame, [240, 246, 252], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typewriters (pure string slices)
  const leftPromptTyped = typedSlice(LEFT_PROMPT, 30, frame, 1.6);
  const leftAnswerTyped = typedSlice(LEFT_ANSWER, 60, frame, 1.4);
  const rightQueryTyped = typedSlice(RIGHT_QUERY, 90, frame, 1.4);
  const rightErr1Typed  = typedSlice(RIGHT_ERR_1, 130, frame, 1.6);
  const rightErr2Typed  = typedSlice(RIGHT_ERR_2, 180, frame, 1.6);
  const opusFixTyped    = typedSlice(OPUS_FIX,    270, frame, 1.4);

  return (
    <AbsoluteFill>
      {/* Left pane */}
      <div style={{ position: "absolute", top: 80, left: 80, width: 820, height: 920, transform: `translateX(${leftTx}px)`, opacity: paneOp }}>
        <SplitPane title="Generic LLM advice" tone="warn">
          <div style={{ fontFamily: theme.mono, fontSize: 26, color: theme.dim }}>{leftPromptTyped}</div>
          <div style={{ marginTop: 24, fontFamily: theme.mono, fontSize: 30, color: theme.err, textShadow: `0 0 18px ${theme.err}80` }}>
            {leftAnswerTyped}
          </div>
        </SplitPane>
      </div>

      {/* Right pane */}
      <div style={{ position: "absolute", top: 80, right: 80, width: 820, height: 920, transform: `translateX(${rightTx}px)`, opacity: paneOp }}>
        <SplitPane
          titleNode={
            <div style={{ position: "relative", height: 32 }}>
              <span style={{ position: "absolute", inset: 0, opacity: rightTitleOldOp, color: theme.fg }}>Salesforce reality</span>
              <span style={{ position: "absolute", inset: 0, opacity: rightTitleNewOp, color: theme.ok, fontWeight: 700 }}>
                Opus 4.7 + Salesforce ground truth
              </span>
            </div>
          }
          tone="ok"
        >
          <div style={{ fontFamily: theme.mono, fontSize: 22, color: theme.dim }}>{rightQueryTyped}</div>
          <div style={{ marginTop: 18, fontFamily: theme.mono, fontSize: 24, color: theme.err, opacity: 0.7 + 0.3 * errFlash, textShadow: `0 0 ${20 + errFlash * 30}px ${theme.err}aa` }}>
            {rightErr1Typed}
          </div>
          <div style={{ marginTop: 8, fontFamily: theme.mono, fontSize: 20, color: theme.err, opacity: 0.7 }}>
            {rightErr2Typed}
          </div>
          {frame >= 270 && (
            <div style={{ marginTop: 36, fontFamily: theme.mono, fontSize: 26, color: theme.ok, textShadow: `0 0 18px ${theme.ok}80` }}>
              {opusFixTyped}
            </div>
          )}
        </SplitPane>
      </div>

      {/* Center blindspot chip */}
      <div style={{ position: "absolute", top: 540 - 40, left: 960 - 90, width: 180 }}>
        <BlindspotChip
          opacity={interpolate(frame, [120, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeStandard })}
          greenProgress={chipGreen}
          pulse={chipPulse}
        />
      </div>
    </AbsoluteFill>
  );
};
```

### 5.6 Transition out

```tsx
<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 15 })}
/>
```

### 5.7 Render checkpoints

```bash
# B3 frame 60 (global 960) — both panes settled, left typing
bunx remotion still src/index.ts Part2Struggle out/p2-b3-f960.png --frame=960

# B3 frame 180 (global 1080) — BLINDSPOT chip pulsing red, both panes show errors (THUMBNAIL CANDIDATE)
bunx remotion still src/index.ts Part2Struggle out/p2-b3-f1080.png --frame=1080

# B3 frame 330 (global 1230) — title swapped to "Opus 4.7", chip green, corrected fix visible
bunx remotion still src/index.ts Part2Struggle out/p2-b3-f1230.png --frame=1230
```

---

## 6. Beat 4 — Doc shelf lived-in (local frames 0–270, 9 s)

### 6.1 Visual concept

A flat-perspective bookshelf — 4 reference docs styled as physical Salesforce manuals (Trailhead-blue covers with embossed wordmarks). They DON'T fan out neatly; they look **lived-in**: tilted at random angles, sticky-note flags poking out of pages, dog-eared corners. The viewer feels "this is hand-fed every session — these docs are *worked*."

Doc covers:
1. **APEX REFERENCE** — navy cover, white wordmark, dog-eared top corner, 3 yellow sticky tabs
2. **LWC GUIDE** — teal cover, 1 pink sticky tab
3. **METADATA API** — dark blue, 2 yellow tabs, coffee-cup ring stain on cover
4. **RELEASE NOTES (Spring '26)** — fresh white-on-blue, 1 sticky tab, slight crease

Above the shelf, a small annotation card pops in at frame 150: `+ 47 KB context per turn` with a counter-up animation. Implies real cost: every conversation re-injects this.

**Emotional intent**: weary persistence. He's *making it work* but it's exhausting. The physicality of paper-styled covers (rather than wireframe rectangles) sells the "manual labor" feeling.

**Memorable thumbnail moment**: frame 200 — all four covers settled with sticky tabs visible, +47KB counter showing.

### 6.2 VO sync

VO Clip 2 line: "So I started hand-feeding them the docs. Apex reference. L W C guide. Release notes. Every session, all over again." — runs ≈ B4 local frames 0–240.

### 6.3 Frame timeline (LOCAL)

| Local frames | Event | Easing / config |
|--------------|-------|-----------------|
| 0–60 | Doc covers fly in from below, staggered 12 frames, with random rotation lock-in | spring `{ mass: 0.6, damping: 12, stiffness: 160 }` |
| 60–120 | Sticky tabs spring out of each cover (separate spring per tab, staggered) | spring `{ mass: 0.3, damping: 14, stiffness: 240 }` |
| 90–120 | Coffee ring on cover #3 fades in at 0.4 max opacity | `Easing.bezier(0.4, 0, 0.6, 1)` |
| 150–180 | "+ 47 KB context per turn" annotation card slides down from top | spring `{ mass: 0.5, damping: 14, stiffness: 200 }` |
| 150–210 | KB counter animates 0 → 47 (integer step every 2 frames) | linear |
| 210–270 | Hold + slight per-cover sway (sine wave amp 1.5°, period 90 frames) | sin wave (frame-derived) |

### 6.4 Files to modify / create

- `demo/remotion/src/scenes/part2/ResourceGathering.tsx` — **REPLACE entirely** (current is wireframe doc rectangles).
- `demo/remotion/src/scenes/part2/_shared/DocCover.tsx` — NEW. Cover renderer with `kind` discriminator (apex / lwc / metadata / release-notes).
- `demo/remotion/src/scenes/part2/_shared/StickyTab.tsx` — NEW. Color-tinted tab with spring entry.
- `demo/remotion/src/scenes/part2/_shared/ContextCostCard.tsx` — NEW. "+ 47 KB context per turn" badge with integer counter.

### 6.5 Schema additions

```ts
const docCoverSchema = z.object({
  kind:     z.enum(["apex", "lwc", "metadata", "release-notes"]),
  title:    z.string(),
  tabs:     z.array(z.enum(["yellow", "pink", "blue"])).min(0).max(4),
  dogEared: z.boolean(),
  stained:  z.boolean(),
  rotation: z.number(),  // degrees, fixed seed
});

export const part2Schema = z.object({
  // ... existing ...
  docCovers:   z.array(docCoverSchema).length(4),
  contextKb:   z.number(),
});
```

### 6.6 JSX skeleton — `ResourceGathering.tsx`

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { DocCover } from "./_shared/DocCover";
import { ContextCostCard } from "./_shared/ContextCostCard";

const easeStandard = Easing.bezier(0.4, 0, 0.2, 1);
const easeInOutQuad = Easing.bezier(0.45, 0, 0.55, 1);

type DocSpec = {
  kind: "apex" | "lwc" | "metadata" | "release-notes";
  title: string;
  tabs: ("yellow" | "pink" | "blue")[];
  dogEared: boolean;
  stained: boolean;
  rotation: number;
};

type Props = { docCovers: DocSpec[]; contextKb: number };

export const ResourceGathering: React.FC<Props> = ({ docCovers, contextKb }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // KB counter (150–210, linear)
  const kbProgress = interpolate(frame, [150, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kbValue = Math.floor(kbProgress * contextKb);

  // Cost card slide-in (150–180)
  const cardSpring = spring({
    frame: frame - 150,
    fps,
    config: { mass: 0.5, damping: 14, stiffness: 200 },
  });
  const cardTy = interpolate(cardSpring, [0, 1], [-40, 0]);
  const cardOp = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 1600, height: 720 }}>
        {docCovers.map((doc, i) => {
          const total = docCovers.length;
          const t = i - (total - 1) / 2;
          const restX = t * 360;
          const restY = Math.abs(t) * 14;
          const restRotate = doc.rotation;

          const s = spring({
            frame: frame - i * 12,
            fps,
            config: { mass: 0.6, damping: 12, stiffness: 160 },
          });
          const tx = interpolate(s, [0, 1], [0, restX]);
          const ty = interpolate(s, [0, 1], [120, restY]);
          const rot = interpolate(s, [0, 1], [restRotate * 1.5, restRotate]);
          const op = interpolate(s, [0, 1], [0, 1]);

          // Idle sway (210+)
          const sway = frame > 210 ? 1.5 * Math.sin((frame - 210 + i * 30) / 90 * Math.PI * 2) : 0;

          return (
            <div
              key={doc.kind}
              style={{
                position: "absolute",
                left: 800 - 180,
                top: 360 - 240,
                width: 360,
                height: 480,
                transform: `translate(${tx}px, ${ty}px) rotate(${rot + sway}deg)`,
                opacity: op,
                zIndex: i,
              }}
            >
              <DocCover spec={doc} frame={frame} startFrame={i * 12} />
            </div>
          );
        })}
      </div>

      {/* cost card */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 120,
          transform: `translateY(${cardTy}px)`,
          opacity: cardOp,
        }}
      >
        <ContextCostCard kb={kbValue} />
      </div>
    </AbsoluteFill>
  );
};
```

### 6.7 Transition out

```tsx
<TransitionSeries.Transition
  presentation={slide({ direction: "from-right" })}
  timing={linearTiming({ durationInFrames: 15 })}
/>
```

### 6.8 Render checkpoints

```bash
# B4 frame 60 (global 1320) — covers landing, sticky tabs not yet
bunx remotion still src/index.ts Part2Struggle out/p2-b4-f1320.png --frame=1320

# B4 frame 200 (global 1460) — full lived-in shelf, +47KB visible (THUMBNAIL CANDIDATE)
bunx remotion still src/index.ts Part2Struggle out/p2-b4-f1460.png --frame=1460

# B4 frame 260 (global 1520) — gentle sway in idle
bunx remotion still src/index.ts Part2Struggle out/p2-b4-f1520.png --frame=1520
```

---

## 7. Beat 5 — Terminal pile-up (local frames 0–240, 8 s)

### 7.1 Visual concept

A single terminal window grows downward. Five `sf` commands run sequentially — each one fails. **The buffer never clears.** Failures stack visibly. By the end, the terminal is half-full of accumulated red error lines. A timer in the top-right of the terminal increments wall-clock minutes (`+02:34` → `+11:50`) — viewer feels real time evaporating.

**The five failures (exact strings)**:
```
$ sf project deploy start --target-org prod
ERROR · ApexClass metadata access denied (REQUIRED_FIELD_MISSING)

$ sf org assign permset --name SfwizDeployer
ERROR · Permission set assignment rejected: insufficient profile rights

$ sf apex run test --test-level RunLocalTests
ERROR · 4 of 26 tests failed in target org · 0 of 26 failed locally

$ sf apex run --apex-file scripts/cleanup.apex
System.LimitException: Too many SOQL queries: 101    ← Part 1 callback line

$ sf project deploy start --target-org prod --dry-run
ERROR · Component conflict: AccountTriggerHandler.cls modified in org
```

The 4th line **echoes Part 1's tail error verbatim** — judge subconsciously notes "still happening." The 5th line lands as VO says "Tests die in the org" and bleeds into "Every fix is ten more minutes of babysitting the model."

**Emotional intent**: exhaustion that compounds. Each error makes the next feel inevitable. By frame 200, the screen is *visually heavy* with red.

**Memorable thumbnail moment**: frame 200 — terminal full of stacked errors, timer at `+11:50`, last `LimitException` line glowing brightest. This is the **"so what"** money shot for the entire Part 2.

### 7.2 VO sync

VO Clip 2 lines:
- "And the S F tooling lives in a world Claude can't reach." — frames 0–60
- "Deploys fail. Permissions get rejected. Tests die in the org." — frames 60–150
- "Every fix is ten more minutes of babysitting the model." — frames 150–240

Each `sf` failure visually lands within ~6 frames of its corresponding VO phrase.

### 7.3 Frame timeline (LOCAL)

| Local frames | Event | Easing / config |
|--------------|-------|-----------------|
| 0–18 | Terminal frame slides in from right (from `<TransitionSeries>` slide) + native settle | (transition handles it) |
| 0–24 | Wall-clock timer materializes top-right, starts at `+02:34` | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 18–48 | Cmd 1 types in (50 chars, ~1.6 cps) | linear string slice |
| 48–60 | Err 1 fades in red, tiny shake (translateX `Math.sin(frame * 1.2) * 2` for 6 frames) | sin shake |
| 54–84 | Cmd 2 types in | linear |
| 84–96 | Err 2 fades in | linear |
| 90–126 | Cmd 3 types in | linear |
| 126–138 | Err 3 fades in | linear |
| 132–168 | Cmd 4 types in | linear |
| 168–180 | Err 4 (LimitException 101) fades in **with extra red glow** (`textShadow: 0 0 24px err`) | linear |
| 168–186 | Timer jumps from `+04:12` to `+08:30` (skip-frame) — implies elapsed time between attempts | step function |
| 174–204 | Cmd 5 types in | linear |
| 204–216 | Err 5 fades in | linear |
| 200–240 | Whole terminal subtly tints (background hue shifts toward red, `bg: rgba(80, 18, 24, 0.4)` overlay 0→0.5) | `Easing.bezier(0.4, 0, 0.2, 1)` |
| 216–240 | Caption fades in below terminal: `5 failures · 11 min 50 sec · still no green deploy` | `Easing.bezier(0.4, 0, 0.2, 1)` |

### 7.4 Files to modify / create

- `demo/remotion/src/scenes/part2/ToolingPain.tsx` — **REPLACE entirely** (current shows one error; we stack five).
- `demo/remotion/src/scenes/part2/_shared/TerminalLine.tsx` — NEW. Single command+error pair with own typewriter.
- `demo/remotion/src/scenes/part2/_shared/WallClockTimer.tsx` — NEW. Top-right timer with step jumps.

### 7.5 Schema additions

```ts
const sfFailureSchema = z.object({
  cmd:   z.string(),
  err:   z.string(),
  isLimitCallback: z.boolean().default(false),  // ✓ for line 4 — gets extra glow
});

export const part2Schema = z.object({
  // ... existing ...
  sfFailures:    z.array(sfFailureSchema).length(5),
  toolingTimer:  z.tuple([z.string(), z.string()]),  // ["+02:34", "+11:50"]
  toolingFooter: z.string(),
});
```

### 7.6 JSX skeleton — `ToolingPain.tsx`

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { TerminalBox } from "./_shared/TerminalBox";
import { TerminalLine } from "./_shared/TerminalLine";
import { WallClockTimer } from "./_shared/WallClockTimer";

const easeStandard = Easing.bezier(0.4, 0, 0.2, 1);

type Failure = { cmd: string; err: string; isLimitCallback?: boolean };

const LINE_TIMINGS: { cmdStart: number; errStart: number }[] = [
  { cmdStart: 18,  errStart: 48 },
  { cmdStart: 54,  errStart: 84 },
  { cmdStart: 90,  errStart: 126 },
  { cmdStart: 132, errStart: 168 },
  { cmdStart: 174, errStart: 204 },
];

type Props = {
  sfFailures: Failure[];
  toolingTimer: [string, string];
  toolingFooter: string;
};

export const ToolingPain: React.FC<Props> = ({ sfFailures, toolingTimer, toolingFooter }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red-tint overlay (200–240)
  const redTint = interpolate(frame, [200, 240], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStandard,
  });

  // Footer caption (216–240)
  const footerOp = interpolate(frame, [216, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStandard,
  });

  // Terminal entry handled by <TransitionSeries> slide. Local settle:
  const settleSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const settleY = interpolate(settleSpring, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 36 }}>
      <div style={{ transform: `translateY(${settleY}px)`, position: "relative" }}>
        <TerminalBox style={{ width: 1280 }}>
          <WallClockTimer
            frame={frame}
            startStr={toolingTimer[0]}
            endStr={toolingTimer[1]}
            jumpFrame={168}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sfFailures.map((f, i) => (
              <TerminalLine
                key={i}
                cmd={f.cmd}
                err={f.err}
                cmdStartFrame={LINE_TIMINGS[i].cmdStart}
                errStartFrame={LINE_TIMINGS[i].errStart}
                frame={frame}
                isLimitCallback={f.isLimitCallback ?? false}
              />
            ))}
          </div>
          {/* red tint overlay */}
          <AbsoluteFill style={{ background: "rgba(80, 18, 24, 1)", opacity: redTint, pointerEvents: "none", borderRadius: 14 }} />
        </TerminalBox>
      </div>

      <div style={{ fontFamily: theme.mono, fontSize: 24, color: theme.dim, letterSpacing: 2, opacity: footerOp }}>
        {toolingFooter}
      </div>
    </AbsoluteFill>
  );
};
```

### 7.7 `TerminalLine.tsx` — pure-function typewriter (hook-safe)

```tsx
import { interpolate, Easing } from "remotion";
import { theme } from "../../../theme";

const sliceTo = (text: string, startFrame: number, frame: number, cps: number) => {
  const len = Math.max(0, Math.floor((frame - startFrame) * cps));
  return text.slice(0, Math.min(len, text.length));
};

type Props = {
  cmd: string;
  err: string;
  cmdStartFrame: number;
  errStartFrame: number;
  frame: number;
  isLimitCallback: boolean;
};

export const TerminalLine: React.FC<Props> = ({ cmd, err, cmdStartFrame, errStartFrame, frame, isLimitCallback }) => {
  const cmdTyped = sliceTo(cmd, cmdStartFrame, frame, 1.6);
  const errTyped = sliceTo(err, errStartFrame, frame, 2.2);

  const errOp = interpolate(frame, [errStartFrame, errStartFrame + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const shake = frame >= errStartFrame && frame < errStartFrame + 6 ? Math.sin((frame - errStartFrame) * 1.2) * 2 : 0;

  const glowSize = isLimitCallback ? 24 : 8;

  return (
    <div>
      <div style={{ fontFamily: theme.mono, fontSize: 22, color: theme.fg }}>
        <span style={{ color: theme.ok }}>$ </span>
        {cmdTyped}
      </div>
      {errTyped.length > 0 && (
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 20,
            color: theme.err,
            opacity: errOp,
            transform: `translateX(${shake}px)`,
            textShadow: `0 0 ${glowSize}px ${theme.err}cc`,
            paddingLeft: 16,
            marginBottom: 4,
          }}
        >
          {errTyped}
        </div>
      )}
    </div>
  );
};
```

`TerminalLine` is **a pure function of `frame`**. It contains no `useCurrentFrame()` — that hook is called once in `ToolingPain` and the resolved number is passed down. Therefore looping over `sfFailures` in `.map()` is safe.

### 7.8 Transition out

B5 → B6 has **no `<TransitionSeries.Transition>`**. B6 itself implements the cross-fade. Sequence boundary is hard-cut.

### 7.9 Render checkpoints

```bash
# B5 frame 60 (global 1590) — first failure visible, second typing
bunx remotion still src/index.ts Part2Struggle out/p2-b5-f1590.png --frame=1590

# B5 frame 180 (global 1710) — LimitException 101 line glowing, timer just jumped to +08:30
bunx remotion still src/index.ts Part2Struggle out/p2-b5-f1710.png --frame=1710

# B5 frame 220 (global 1750) — full pile-up, red tint, 5 failures stacked (THUMBNAIL · MONEY SHOT)
bunx remotion still src/index.ts Part2Struggle out/p2-b5-f1750.png --frame=1750
```

---

## 8. Beat 6 — Cross-fade tail (local frames 0–90, 3 s)

### 8.1 Visual concept

The terminal pile-up from B5 holds visually for the first 30 frames (it's still emotionally present), then cross-fades to a **clean dark expanse** with one centered text fragment: `Part 3 →` in dim accent color, opacity 0.0 → 0.6. This is the bridge into Part 3 (the solution arc).

The cross-fade is *slow* — 60 frames of interpolation — to let the heaviness of B5 dissipate. Last 30 frames are flat dark ready for Part 3 to take over.

**Emotional intent**: exhaustion settles, then a sliver of forward motion. The `Part 3 →` glyph is small, restrained — promising not selling.

### 8.2 VO sync

No VO. BGM ducks slightly (handled at composition level via volume keyframe — not a beat concern).

### 8.3 Frame timeline (LOCAL)

| Local frames | Event | Easing / config |
|--------------|-------|-----------------|
| 0–30 | B5 ghost (snapshot of last B5 visual via `<Img>` of `out/p2-b5-f1750.png` *or* `useDelayRender` reference) holds at opacity 1.0 | n/a |
| 0–60 | Black-fill overlay opacity 0 → 1 | `Easing.bezier(0.65, 0, 0.35, 1)` (in-out-cubic) |
| 30–60 | Ghost opacity 1 → 0 simultaneously with overlay rise | `Easing.bezier(0.65, 0, 0.35, 1)` |
| 60–90 | "Part 3 →" caption fades in 0 → 0.6 | `Easing.bezier(0.4, 0, 0.2, 1)` |

### 8.4 Implementation note

We don't actually need a snapshot — `<TransitionSeries>` boundary already isolates B6 from B5's visuals. So B6 is just a black `<AbsoluteFill>` with the caption fading in. The "cross-fade" effect is achieved by holding the previous beat's visuals via the absence of a transition — but since B5 ends at hard cut into B6, we just show black + caption.

Simpler: B6 fades up its own black background from the prior beat's pixels (which Remotion will hold for one frame at the seam) and the caption appears.

### 8.5 JSX skeleton — `Tail.tsx`

```tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../../theme";

const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);
const easeStandard = Easing.bezier(0.4, 0, 0.2, 1);

export const Tail: React.FC = () => {
  const frame = useCurrentFrame();   // LOCAL, B6 has 90 frames

  const blackOp = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOutCubic,
  });

  const captionOp = interpolate(frame, [60, 90], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeStandard,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AbsoluteFill style={{ backgroundColor: "#06080f", opacity: blackOp }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 36,
            color: theme.accent,
            letterSpacing: 6,
            opacity: captionOp,
          }}
        >
          Part 3 →
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

### 8.6 Render checkpoints

```bash
# B6 frame 30 (global 1770) — mid cross-fade
bunx remotion still src/index.ts Part2Struggle out/p2-b6-f1770.png --frame=1770

# B6 frame 75 (global 1815) — clean black, "Part 3 →" emerging
bunx remotion still src/index.ts Part2Struggle out/p2-b6-f1815.png --frame=1815

# Final frame
bunx remotion still src/index.ts Part2Struggle out/p2-b6-f1799.png --frame=1799
```

---

## 9. Top-level composition wiring (`Part2Struggle.tsx` — REWRITE)

Replace manual `<Sequence>` siblings with `<TransitionSeries>`. **Every sequence gets `premountFor={1 * fps}` (= 30 frames)**.

```tsx
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { part2Beats, part2 } from "../timing";
import { CurrentEffortsIntro } from "../scenes/part2/CurrentEffortsIntro";
import { WorkflowPipeline } from "../scenes/part2/WorkflowPipeline";
import { LLMKnowledgeGap } from "../scenes/part2/LLMKnowledgeGap";
import { ResourceGathering } from "../scenes/part2/ResourceGathering";
import { ToolingPain } from "../scenes/part2/ToolingPain";
import { Tail } from "../scenes/part2/Tail";
import type { Part2Props } from "./part2-schema";

const TRANS = 15;

export const Part2Struggle: React.FC<Part2Props> = (props) => {
  const { fps } = useVideoConfig();
  const PRE = 1 * fps;  // 30 — premountFor

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {props.showVo && (
        <>
          <Sequence from={part2.voCurrentEffortsStart}>
            <Audio src={staticFile("vo/part-2-current-efforts.wav")} />
          </Sequence>
          <Sequence from={part2.voPainPointsStart}>
            <Audio src={staticFile("vo/part-2-pain-points.wav")} />
          </Sequence>
        </>
      )}
      {props.showBgm && (
        <Audio src={staticFile("bgm/part-2-pop.mp3")} volume={0.18} loop />
      )}

      <TransitionSeries>
        {/* B1 — 270 raw, no in-transition */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.intro} premountFor={PRE} name="P2·B1">
          <CurrentEffortsIntro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* B2 — 630 raw */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.pipeline} premountFor={PRE} name="P2·B2">
          <WorkflowPipeline nodes={props.pipelineNodes} artifacts={props.personaArtifacts} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200, stiffness: 200, mass: 1 }, durationInFrames: TRANS })}
        />

        {/* B3 — 360 raw */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.llmGap} premountFor={PRE} name="P2·B3">
          <LLMKnowledgeGap />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* B4 — 270 raw */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.resources} premountFor={PRE} name="P2·B4">
          <ResourceGathering docCovers={props.docCovers} contextKb={props.contextKb} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {/* B5 — 240 raw */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.tooling} premountFor={PRE} name="P2·B5">
          <ToolingPain
            sfFailures={props.sfFailures}
            toolingTimer={props.toolingTimer}
            toolingFooter={props.toolingFooter}
          />
        </TransitionSeries.Sequence>

        {/* B6 — 90 raw, no transition (B6 self-fades) */}
        <TransitionSeries.Sequence durationInFrames={part2Beats.tail} premountFor={PRE} name="P2·B6">
          <Tail />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
```

**Total frame math**:
- Sequences: 270 + 630 + 360 + 270 + 240 + 90 = 1860
- Transitions: 4 × 15 = 60 (B5→B6 has none)
- Final: 1860 − 60 = **1800** ✓

---

## 10. Schema rewrite — `part2-schema.ts`

```ts
import { z } from "zod";

const personaArtifactSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("scratchConfig"), edition: z.string() }),
  z.object({ kind: z.literal("erd"),           objects: z.tuple([z.string(), z.string()]) }),
  z.object({ kind: z.literal("apexSnippet"),   lines: z.array(z.string()).min(1).max(4) }),
  z.object({ kind: z.literal("diffHunk"),      added: z.string(), removed: z.string() }),
  z.object({ kind: z.literal("testPill"),      passed: z.number(), failed: z.number(), coverage: z.number() }),
  z.object({ kind: z.literal("deployBar"),     percent: z.number(), targetOrg: z.string() }),
]);

const docCoverSchema = z.object({
  kind:     z.enum(["apex", "lwc", "metadata", "release-notes"]),
  title:    z.string(),
  tabs:     z.array(z.enum(["yellow", "pink", "blue"])).max(4),
  dogEared: z.boolean(),
  stained:  z.boolean(),
  rotation: z.number(),
});

const sfFailureSchema = z.object({
  cmd:             z.string(),
  err:             z.string(),
  isLimitCallback: z.boolean().default(false),
});

export const part2Schema = z.object({
  pipelineNodes:    z.array(z.string()).length(6),
  personaArtifacts: z.array(personaArtifactSchema).length(6),
  docCovers:        z.array(docCoverSchema).length(4),
  contextKb:        z.number(),
  sfFailures:       z.array(sfFailureSchema).length(5),
  toolingTimer:     z.tuple([z.string(), z.string()]),
  toolingFooter:    z.string(),
  showVo:           z.boolean(),
  showBgm:          z.boolean(),
});

export type Part2Props = z.infer<typeof part2Schema>;

export const part2Defaults: Part2Props = {
  pipelineNodes: ["Org Admin", "Designer", "Developer", "Reviewer", "QA", "Deploy Mgr"],
  personaArtifacts: [
    { kind: "scratchConfig", edition: "Developer" },
    { kind: "erd", objects: ["Account", "Opportunity"] },
    { kind: "apexSnippet", lines: [
      "public with sharing class",
      "OpportunityService {",
      "  public static void closeWon(",
      "    List<Opportunity> opps) {",
    ]},
    { kind: "diffHunk", added: "+ for (Account a : [SELECT Id FROM Account])", removed: "- Account a = [SELECT Id FROM Account LIMIT 1];" },
    { kind: "testPill", passed: 48, failed: 2, coverage: 86 },
    { kind: "deployBar", percent: 67, targetOrg: "alfian.scratch" },
  ],
  docCovers: [
    { kind: "apex",          title: "APEX REFERENCE",        tabs: ["yellow","yellow","yellow"], dogEared: true,  stained: false, rotation: -8 },
    { kind: "lwc",           title: "LWC GUIDE",             tabs: ["pink"],                     dogEared: false, stained: false, rotation:  4 },
    { kind: "metadata",      title: "METADATA API",          tabs: ["yellow","yellow"],          dogEared: false, stained: true,  rotation: -3 },
    { kind: "release-notes", title: "RELEASE NOTES · Spring '26", tabs: ["blue"],                 dogEared: false, stained: false, rotation:  6 },
  ],
  contextKb: 47,
  sfFailures: [
    { cmd: "$ sf project deploy start --target-org prod",                err: "ERROR · ApexClass metadata access denied (REQUIRED_FIELD_MISSING)" },
    { cmd: "$ sf org assign permset --name SfwizDeployer",               err: "ERROR · Permission set assignment rejected: insufficient profile rights" },
    { cmd: "$ sf apex run test --test-level RunLocalTests",              err: "ERROR · 4 of 26 tests failed in target org · 0 of 26 failed locally" },
    { cmd: "$ sf apex run --apex-file scripts/cleanup.apex",             err: "System.LimitException: Too many SOQL queries: 101", isLimitCallback: true },
    { cmd: "$ sf project deploy start --target-org prod --dry-run",      err: "ERROR · Component conflict: AccountTriggerHandler.cls modified in org" },
  ],
  toolingTimer: ["+02:34", "+11:50"],
  toolingFooter: "5 failures · 11 min 50 sec · still no green deploy",
  showVo: false,
  showBgm: false,
};
```

---

## 11. `timing.ts` patch (B5/B6 durations only — keys unchanged)

```ts
export const part2Beats = {
  intro:     sec(9),   // unchanged · 270
  pipeline:  sec(21),  // unchanged · 630
  llmGap:    sec(12),  // unchanged · 360
  resources: sec(9),   // unchanged · 270
  tooling:   sec(8),   // CHANGED 7→8 · 240
  tail:      sec(3),   // CHANGED 2→3 · 90
};
```

`part2.beat5Tooling.start` and `part2.beat6Tail.start` recalc themselves from cumulative sum — leave that block as-is (it derives from `part2Beats`).

**Note**: with `<TransitionSeries>`, the global frame numbers reported by `Sequence` for B6 are NOT 1740 anymore. The composition still totals 1800, but Beat boundaries are now overlapping bands. If anything reads `part2.beat6Tail.start`, audit those callers — most likely only the existing manual `<Sequence>` block, which we're replacing.

---

## 12. Files summary

### Created (new)
- `demo/remotion/src/scenes/part2/_shared/EditorChrome.tsx`
- `demo/remotion/src/scenes/part2/_shared/SfdxFileTree.tsx`
- `demo/remotion/src/scenes/part2/_shared/ApexEditorPane.tsx`
- `demo/remotion/src/scenes/part2/_shared/ClaudeCodeDock.tsx`
- `demo/remotion/src/scenes/part2/_shared/GhostEcosystem.tsx`
- `demo/remotion/src/scenes/part2/_shared/PersonaArtifact.tsx`
- `demo/remotion/src/scenes/part2/_shared/DataPacket.tsx`
- `demo/remotion/src/scenes/part2/_shared/TokenUsageBar.tsx`
- `demo/remotion/src/scenes/part2/_shared/SplitPane.tsx`
- `demo/remotion/src/scenes/part2/_shared/BlindspotChip.tsx`
- `demo/remotion/src/scenes/part2/_shared/DocCover.tsx`
- `demo/remotion/src/scenes/part2/_shared/StickyTab.tsx`
- `demo/remotion/src/scenes/part2/_shared/ContextCostCard.tsx`
- `demo/remotion/src/scenes/part2/_shared/TerminalLine.tsx`
- `demo/remotion/src/scenes/part2/_shared/WallClockTimer.tsx`

### Replaced (full rewrite)
- `demo/remotion/src/compositions/Part2Struggle.tsx`
- `demo/remotion/src/compositions/part2-schema.ts`
- `demo/remotion/src/scenes/part2/CurrentEffortsIntro.tsx`
- `demo/remotion/src/scenes/part2/WorkflowPipeline.tsx`
- `demo/remotion/src/scenes/part2/LLMKnowledgeGap.tsx`
- `demo/remotion/src/scenes/part2/ResourceGathering.tsx`
- `demo/remotion/src/scenes/part2/ToolingPain.tsx`
- `demo/remotion/src/scenes/part2/Tail.tsx`

### Modified (small patch)
- `demo/remotion/src/timing.ts` (B5 7→8, B6 2→3)

### Unchanged
- `demo/remotion/src/scenes/part2/_shared/PipelineNode.tsx` (label updates handled via prop, no code change required if `nodes` prop carries the new persona names)
- `demo/remotion/src/scenes/part2/_shared/TerminalBox.tsx`
- `demo/remotion/src/scenes/part2/_shared/Typewriter.tsx` (still useful for B1 headline if we want hook-based; we use string-slice inline for safety)

### Deleted
- None. All old code is replaced in-place; nothing is orphaned.

### Dependencies to add (`package.json`)
```json
"@remotion/transitions": "^4.0.270"
```

---

## 13. VO regeneration (TTS-ready files)

Two scripts saved alongside existing TTS infrastructure:

- `demo/remotion/tts/scripts/part-2-current-efforts.txt` (overwrite with §1.1 text)
- `demo/remotion/tts/scripts/part-2-pain-points.txt` (overwrite with §1.2 text)

Re-run XTTS via existing `bridge.py` with speaker reference `my-voices2.wav`:

```bash
python tts/bridge.py \
  --text-file tts/scripts/part-2-current-efforts.txt \
  --speaker-wav tts/my-voices2.wav \
  --out public/vo/part-2-current-efforts.wav

python tts/bridge.py \
  --text-file tts/scripts/part-2-pain-points.txt \
  --speaker-wav tts/my-voices2.wav \
  --out public/vo/part-2-pain-points.wav
```

After regeneration, measure each clip duration with `ffprobe`. If Clip 1 > 22 s, `voPainPointsStart` may need to slide from 900 to a slightly later frame so VO tail doesn't bleed into B3. Acceptable range: 900 ± 30.

---

## 14. Build / verify checklist

```bash
cd demo/remotion
bun install               # picks up @remotion/transitions
bun run start             # studio — manually scrub B1→B6
bunx remotion render src/index.ts Part2Struggle ../seg-part2.mp4 --codec=h264

# scrub these 18 frames — must look right:
for f in 24 180 230 360 630 870 960 1080 1230 1320 1460 1520 1590 1710 1750 1770 1815 1799; do
  bunx remotion still src/index.ts Part2Struggle out/p2-f${f}.png --frame=${f}
done
```

Acceptance criteria:
1. **No frame is "blank" or jarring** — every checkpoint frame is composed and intentional.
2. **Thumbnail check**: scaled to 360×203, frames f230 (B1 headline), f630 (B2 packet+artifacts), f1080 (B3 BLINDSPOT), f1460 (B4 docs+47KB), f1750 (B5 5-failure pile-up) all readable as standalone hero frames.
3. **VO sync drift** ≤ 4 frames at every named hand-off (line "Six personas" lands within ±4 of f630; "Tests die in the org" within ±4 of f1710).
4. **No console warnings** about `useCurrentFrame` outside Sequence, no React key warnings, no z-index collisions.
5. **Total composition** = 1800 frames exact. Renderer reports `1800/1800` complete.

---

## 15. Why this rewrite wins each judging axis

| Axis | Weight | How this plan delivers |
|------|--------|------------------------|
| **Impact (30%)** | 30 | B5 terminal pile-up uses real `sf` CLI failures + Part-1 LimitException callback. Pain compounds visibly. B1 establishes ambition first so B5's collapse hurts. |
| **Demo (25%)** | 25 | Five thumbnail-grade hero frames (f230, f630, f1080, f1460, f1750) — each instantly readable. Real SFDX tree, real Apex source, real `sf` errors, real Trailhead-styled doc covers. Zero generic clip-art. |
| **Opus 4.7 Use (25%)** | 25 | `claude-opus-4-7` model badge in B1 dock + B2 dock chip. B3's right pane title morphs to literal `Opus 4.7 + Salesforce ground truth` and shows Opus solving where generic LLM fails. Surfaces Opus exactly where it shines. |
| **Depth & Execution (20%)** | 20 | All animations frame-driven via `useCurrentFrame()` + `interpolate()` + `Easing.bezier`. All sequences in `<TransitionSeries>` with `premountFor`. All typewriters string-slice. All schemas `z.object({…})`. Frame math closes exactly to 1800. Hook-safety documented. |
