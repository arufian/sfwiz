# Part 2 Revision — Reviewer B (Depth + Execution + Opus 4.7 lens)

**Author**: Reviewer B
**Target file**: `demo/remotion/src/compositions/Part2Struggle.tsx` and scenes under `demo/remotion/src/scenes/part2/`
**Total**: 60 s · 1800 frames · 30 fps · 1920×1080
**Beat keys (unchanged in `timing.ts`)**: `part2.beat1` … `part2.beat6`

This plan answers — after the `System.LimitException: Too many SOQL queries: 101` punch-out at the end of Part 1 — *"so what have you been doing about it, and why isn't that enough?"*. The viewer leaves Part 2 understanding: (a) I already use Claude Code + Opus 4.7 every day for Salesforce work, (b) I built a 6-persona pipeline, (c) it still falls short on three concrete axes — knowledge gaps, scattered references, and a hostile CLI surface.

---

## 0. Beat layout & global timing

All durations are **scene-local** (`useCurrentFrame()` inside each `<Sequence>`/`<TransitionSeries.Sequence>` resets to 0). Transitions overlap and SUBTRACT from total.

| Beat | Key            | Local frames | Sec  | Scene component            | Outbound transition  |
|------|----------------|--------------|------|----------------------------|----------------------|
| B1   | `part2.beat1`  | 0–285        | 9.5  | `ClaudeCodeWorkspace.tsx`  | `fade` 15 frames     |
| B2   | `part2.beat2`  | 0–645        | 21.5 | `SalesforcePipeline.tsx`   | `slide` 15 frames    |
| B3   | `part2.beat3`  | 0–375        | 12.5 | `KnowledgeGapSplit.tsx`    | `fade` 15 frames     |
| B4   | `part2.beat4`  | 0–285        | 9.5  | `ResourceHunt.tsx`         | `fade` 15 frames     |
| B5   | `part2.beat5`  | 0–225        | 7.5  | `ToolingWall.tsx`          | `linear` 15 frames   |
| B6   | `part2.beat6`  | 0–60         | 2.0  | `Tail.tsx`                 | —                    |

**Frame math (must equal exactly 1800):**
```
sum(beats)        = 285 + 645 + 375 + 285 + 225 + 60 = 1875
sum(transitions)  = 15  + 15  + 15  + 15  + 15      = 75
totalDuration     = 1875 - 75 = 1800 ✓
```

Each Sequence carries `premountFor={1 * fps}` (30 frames) so React mounts the next scene one second early — no first-frame layout pop.

---

## 1. VO scripts (TTS-ready, plain text)

Two clips, both rendered through Coqui XTTS using `my-voices2.wav` as the speaker reference.

### Clip 1 — `vo/part-2-current-efforts.wav` (~9 s, plays at part-2 frame 0 over B1)

> Lately I've been customising Claude Code itself for Salesforce work. Six personas, one keystroke. Plan a feature. Design the metadata. Write Apex and LWC. Review the code. QA. Then deploy.

### Clip 2 — `vo/part-2-pain-points.wav` (~28 s, plays at part-2 frame 930 over B3 + B4 + B5)

> But every step has friction. Even Opus four point seven misses Salesforce-specific things — Trigger dot new, governor limits, field level security — when the prompt looks like generic backend code. So I keep the Apex Reference, the LWC Dev Guide, the Summer release notes, and a stack of internal notes open on a second screen. And the SF CLI fights back. Deploys denied. Permsets missing. Tests over the governor limit. Every tool. Every time.

(B2's pipeline build runs without VO — only BGM and the artifact-stamp sound effects. This was the prior round's mistake: trying to narrate B2 made the pipeline feel rushed. Letting it breathe lets the six artifacts read as legible thumbnails.)

---

## 2. Zod schema — `src/compositions/part2-schema.ts`

```ts
import { z } from "zod";

export const pipelineStageSchema = z.object({
  label: z.string(),                              // "Plan", "Design", "Dev", "Review", "QA", "Deploy"
  persona: z.enum([
    "org-admin", "designer", "developer",
    "reviewer", "qa", "deploy-manager",
  ]),
  model: z.enum(["claude-opus-4-7", "claude-sonnet-4-6", "claude-haiku-4-5"]),
  artifactKind: z.enum(["doc", "apex", "lwc", "diff", "test", "deploy"]),
  artifactPrimary: z.string(),                    // top line under label
  artifactSecondary: z.string(),                  // mono sub-line
});

export const resourceCardSchema = z.object({
  kind: z.enum(["apex-ref", "lwc-guide", "release-notes", "internal-kb"]),
  host: z.string(),                               // "developer.salesforce.com"
  title: z.string(),                              // "Governor Limits"
  highlightLine: z.string(),                      // yellow-highlighted snippet
});

export const toolingCommandSchema = z.object({
  cmd: z.string(),                                // "sf project deploy start -d force-app"
  err: z.string(),                                // "ERROR running ... Insufficient access rights"
});

export const part2Schema = z.object({
  beat1: z.object({
    workspaceUserPrompt: z.string(),
    workspaceAssistant: z.string(),
    workspaceFiles: z.array(z.string()).length(5),
    workspaceActiveFile: z.string(),
    workspaceCodeLines: z.array(z.string()).length(8),
    badgeModel: z.literal("claude-opus-4-7"),     // pinned — top-right of TUI mock
  }),
  beat2: z.object({
    pipelineStages: z.array(pipelineStageSchema).length(6),
    headlineModel: z.literal("claude-opus-4-7"),  // big top-strip label
  }),
  beat3: z.object({
    gapPrompt: z.string(),
    gapAssistant: z.array(z.string()).length(3),
    gapMissingTerms: z.array(z.string()).length(3),  // ["Trigger.new", "Governor limits", "FLS"]
    badgeModel: z.literal("claude-opus-4-7"),
  }),
  beat4: z.object({
    resourceCards: z.array(resourceCardSchema).length(4),
  }),
  beat5: z.object({
    toolingCommands: z.array(toolingCommandSchema).length(3),
    toolingCaption: z.string(),
  }),
  beat6: z.object({
    tagline: z.string(),                          // e.g. "Every tool. Every time."
  }),
  showVo: z.boolean(),
  showBgm: z.boolean(),
});

export type Part2Props = z.infer<typeof part2Schema>;
```

**Schema-design notes**:
- Top level is `z.object({…})` (Remotion requirement).
- All beat props are grouped under `beat1`…`beat6` keys — matches the timing-key naming and lets a scene component receive only its slice via `props.beat3`.
- `z.literal("claude-opus-4-7")` makes the Opus badge a *type-level* guarantee — TypeScript will refuse to compile if a beat ever drops the badge string. This is how we lock the Opus-4.7-visible-in-≥3-beats criterion at the schema layer rather than as a vibe.
- `.length(n)` is used everywhere a fixed count drives the layout (5 files, 8 code lines, 6 stages, 3 missing terms, 4 cards, 3 commands).

---

## 3. Defaults — `src/architecture-defaults.ts` (additions)

```ts
export const part2Defaults: Part2Props = {
  beat1: {
    workspaceUserPrompt:
      "Add a Quote line-item rollup to Opportunity. Bulkify, no SOQL in loop, add a test class.",
    workspaceAssistant:
      "Routing to developer persona. Reading Quote, OpportunityLineItem schema...",
    workspaceFiles: [
      "force-app/main/default/classes/QuoteRollup.cls",
      "force-app/main/default/classes/QuoteRollupTest.cls",
      "force-app/main/default/triggers/QuoteTrigger.trigger",
      "force-app/main/default/lwc/quotePanel/quotePanel.js",
      "sfdx-project.json",
    ],
    workspaceActiveFile:
      "force-app/main/default/classes/QuoteRollup.cls",
    workspaceCodeLines: [
      "public with sharing class QuoteRollup {",
      "  public static void rollupToOpp(",
      "    List<Quote> quotes",
      "  ) {",
      "    Map<Id, Decimal> totals = new Map<Id, Decimal>();",
      "    for (Quote q : quotes) {",
      "      totals.put(q.OpportunityId, q.GrandTotal);",
      "    }",
    ],
    badgeModel: "claude-opus-4-7",
  },
  beat2: {
    headlineModel: "claude-opus-4-7",
    pipelineStages: [
      { label: "Plan",     persona: "org-admin",      model: "claude-opus-4-7",   artifactKind: "doc",    artifactPrimary: "QuoteRollup spec",         artifactSecondary: "design.md · 142 lines" },
      { label: "Design",   persona: "designer",       model: "claude-opus-4-7",   artifactKind: "doc",    artifactPrimary: "Object model",             artifactSecondary: "Quote → Opportunity rollup" },
      { label: "Dev",      persona: "developer",      model: "claude-sonnet-4-6", artifactKind: "apex",   artifactPrimary: "QuoteRollup.cls",          artifactSecondary: "+78 / -0" },
      { label: "Review",   persona: "reviewer",       model: "claude-opus-4-7",   artifactKind: "diff",   artifactPrimary: "2 nits, 0 blockers",       artifactSecondary: "bulkify OK · FLS OK" },
      { label: "QA",       persona: "qa",             model: "claude-sonnet-4-6", artifactKind: "test",   artifactPrimary: "QuoteRollupTest.cls",      artifactSecondary: "12 / 12 · 92% cov" },
      { label: "Deploy",   persona: "deploy-manager", model: "claude-haiku-4-5",  artifactKind: "deploy", artifactPrimary: "sf deploy start",          artifactSecondary: "DevHub · scratch-42" },
    ],
  },
  beat3: {
    gapPrompt:
      "Why is my QuoteRollup trigger throwing 'Too many SOQL queries: 101'?",
    gapAssistant: [
      "You're querying inside the for-loop. Pull the SELECT out and",
      "build a Map<Id, ...> ahead of the iteration so the query count",
      "stays constant regardless of input size.",
    ],
    gapMissingTerms: ["Trigger.new", "Governor limits", "FLS"],
    badgeModel: "claude-opus-4-7",
  },
  beat4: {
    resourceCards: [
      { kind: "apex-ref",     host: "developer.salesforce.com",       title: "Database.update",      highlightLine: "List<Database.SaveResult> update(records, allOrNone)" },
      { kind: "lwc-guide",    host: "developer.salesforce.com",       title: "@wire reactive params", highlightLine: "@wire(getRecord, { recordId: '$recordId', fields })" },
      { kind: "release-notes",host: "help.salesforce.com",            title: "Summer '26 — Flow",    highlightLine: "Reactive screen flows now GA" },
      { kind: "internal-kb",  host: "notion.so/team",                 title: "Sharing rule playbook", highlightLine: "Always check FLS before re-querying with USER_MODE" },
    ],
  },
  beat5: {
    toolingCommands: [
      { cmd: "sf project deploy start -d force-app -o devhub",            err: "ERROR running deploy:start: Insufficient access rights on object QuoteLineItem" },
      { cmd: "sf org assign permset -n QuoteRollup_Admin -o devhub",      err: "ERROR running permset:assign: PermissionSet not found in target org" },
      { cmd: "sf apex run test -n QuoteRollupTest -o devhub",             err: "System.LimitException: Too many SOQL queries: 101" },
    ],
    toolingCaption: "Every tool. Every time.",
  },
  beat6: { tagline: "Every tool. Every time." },
  showVo: true,
  showBgm: true,
};
```

---

## 4. Composition wiring — `src/compositions/Part2Struggle.tsx`

```tsx
import React from "react";
import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { ClaudeCodeWorkspace } from "../scenes/part2/ClaudeCodeWorkspace";
import { SalesforcePipeline }  from "../scenes/part2/SalesforcePipeline";
import { KnowledgeGapSplit }   from "../scenes/part2/KnowledgeGapSplit";
import { ResourceHunt }        from "../scenes/part2/ResourceHunt";
import { ToolingWall }         from "../scenes/part2/ToolingWall";
import { Tail }                from "../scenes/part2/Tail";
import type { Part2Props } from "./part2-schema";

const TRANSITION = 15; // frames; identical for all five cuts

export const Part2Struggle: React.FC<Part2Props> = (props) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={285} premountFor={fps}>
          <ClaudeCodeWorkspace {...props.beat1} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={645} premountFor={fps}>
          <SalesforcePipeline {...props.beat2} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { mass: 1, damping: 200, stiffness: 120 },
            durationInFrames: TRANSITION,
          })}
        />

        <TransitionSeries.Sequence durationInFrames={375} premountFor={fps}>
          <KnowledgeGapSplit {...props.beat3} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={285} premountFor={fps}>
          <ResourceHunt {...props.beat4} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={225} premountFor={fps}>
          <ToolingWall {...props.beat5} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={60} premountFor={fps}>
          <Tail {...props.beat6} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.showVo && (
        <>
          <Audio src={staticFile("vo/part-2-current-efforts.wav")} startFrom={0} />
          {/* second clip plays from part-2 frame 930 — i.e. ~3 frames before B3 starts (transition overlap absorbs it) */}
          <Audio
            src={staticFile("vo/part-2-pain-points.wav")}
            startFrom={0}
            // delayed via a wrapping <Sequence from={930}> in the parent root; see Root.tsx for canonical wiring
          />
        </>
      )}
      {props.showBgm && (
        <Audio src={staticFile("bgm/part-2-bed.wav")} volume={0.18} />
      )}
    </AbsoluteFill>
  );
};
```

> The `startFrom` field on the second VO is an absolute file offset. Delay is applied by wrapping the `<Audio>` in a `<Sequence from={930}>` in `Root.tsx` so the VO timeline stays declarative. The wrapper is omitted above for brevity.

---

## 5. Per-beat plans

### Beat 1 — `part2.beat1` · "ClaudeCodeWorkspace" (0–285 local · 9.5 s)

#### 5.1 Visual concept

Single-frame establishing shot of *my* sfwiz TUI mock, fullscreen. Three columns: file tree on the left (5 paths), editor in the middle (8 code lines that typewrite), persona/model badge column on the right pinned to `claude-opus-4-7`. Below the editor, a chat input appears, the user prompt typewrites in, the assistant responds with a single line. Emotional purpose: *"this is real, this is what I use, and Opus is in the cockpit."*

#### 5.2 VO

Clip 1 plays start-to-end of this beat (9 s) and bleeds 0.5 s into B2.

#### 5.3 Frame timeline (local)

| Frames     | Event                                                                            |
|------------|----------------------------------------------------------------------------------|
| 0–18       | Workspace chrome fades in (opacity spring)                                       |
| 18–48      | File tree slides in from left (`Easing.bezier(0.16, 1, 0.3, 1)`)                 |
| 30–60      | Opus-4.7 badge pulses in (spring scale 0.6 → 1)                                  |
| 60–180     | 8 code lines typewrite (string-slice, 0.27 char/frame ≈ 30 cps at 30 fps)        |
| 180–225    | User prompt typewrites in chat input                                             |
| 225–270    | Assistant reply slides up (translateY 24 → 0, opacity 0 → 1)                     |
| 270–285    | Hold + outbound fade-prep                                                        |

#### 5.4 JSX skeleton

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat1"];

export const ClaudeCodeWorkspace: React.FC<Props> = ({
  workspaceUserPrompt,
  workspaceAssistant,
  workspaceFiles,
  workspaceActiveFile,
  workspaceCodeLines,
  badgeModel,
}) => {
  const frame = useCurrentFrame();          // LOCAL frame, 0-based
  const { fps } = useVideoConfig();

  // --- chrome fade ---
  const chromeProgress = interpolate(frame, [0, 18], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const chromeOpacity = interpolate(chromeProgress, [0, 1], [0, 1]);

  // --- file tree slide-in ---
  const treeProgress = interpolate(frame, [18, 48], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const treeX = interpolate(treeProgress, [0, 1], [-280, 0]);

  // --- Opus 4.7 badge spring ---
  const badgeSpring = spring({
    frame: frame - 30,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.6, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);

  // --- code typewriter ---
  // pure math, no hooks — map is safe
  const fullCode = workspaceCodeLines.join("\n");
  const codeProgress = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const codeChars = Math.floor(codeProgress * fullCode.length);
  const codeShown = fullCode.slice(0, codeChars);

  // --- prompt typewriter ---
  const promptProgress = interpolate(frame, [180, 225], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const promptChars = Math.floor(promptProgress * workspaceUserPrompt.length);
  const promptShown = workspaceUserPrompt.slice(0, promptChars);

  // --- assistant reply ---
  const replyProgress = interpolate(frame, [225, 270], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const replyY = interpolate(replyProgress, [0, 1], [24, 0]);
  const replyOpacity = interpolate(replyProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12", opacity: chromeOpacity }}>
      <div style={{ display: "flex", height: "100%", color: "#e6e7ea", fontFamily: "JetBrains Mono" }}>
        {/* file tree */}
        <div style={{
          width: 280, transform: `translateX(${treeX}px)`,
          padding: 24, borderRight: "1px solid #1f232b",
        }}>
          {/* pure math, no hooks — map is safe */}
          {workspaceFiles.map((f) => (
            <div key={f} style={{
              padding: "6px 8px",
              background: f === workspaceActiveFile ? "#1a1f29" : "transparent",
              color: f === workspaceActiveFile ? "#7cc4ff" : "#9aa0a8",
              fontSize: 14,
            }}>{f.split("/").pop()}</div>
          ))}
        </div>

        {/* editor + chat */}
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, whiteSpace: "pre", fontSize: 22, lineHeight: 1.6 }}>
            {codeShown}
          </div>

          <div style={{
            marginTop: 16, padding: 16,
            background: "#11151c", borderRadius: 8, border: "1px solid #1f232b",
          }}>
            <div style={{ color: "#9aa0a8", fontSize: 14 }}>&gt; {promptShown}</div>
            <div style={{
              marginTop: 8, fontSize: 14, color: "#a8d4ff",
              transform: `translateY(${replyY}px)`, opacity: replyOpacity,
            }}>
              {workspaceAssistant}
            </div>
          </div>
        </div>

        {/* model badge */}
        <div style={{
          width: 220, padding: 24,
          transform: `scale(${badgeScale})`, opacity: badgeOpacity,
          transformOrigin: "top right",
        }}>
          <div style={{
            padding: "8px 12px", borderRadius: 6,
            background: "#2a1f4a", color: "#c4b5ff",
            fontSize: 13, letterSpacing: 0.4,
          }}>
            {badgeModel}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

Key fixes vs. prior round: (1) every animated property goes `frame → progress → property` with explicit easing; (2) `frame` is local; (3) badge uses `spring()` then maps via `interpolate`, not raw spring value; (4) `.map()` is annotated `// pure math, no hooks — map is safe`.

---

### Beat 2 — `part2.beat2` · "SalesforcePipeline" (0–645 local · 21.5 s)

#### 5.5 Visual concept

Six pipeline cards laid out left-to-right (Plan → Design → Dev → Review → QA → Deploy). Each card stamps in 90 frames apart with a spring; an SVG arrow draws between consecutive cards using `strokeDasharray` masking; a model-name chip on each card cycles through `claude-opus-4-7` (Plan/Design/Review), `claude-sonnet-4-6` (Dev/QA), `claude-haiku-4-5` (Deploy). A persistent top strip reads `claude-opus-4-7 · orchestrator` so the headline Opus badge is visible the entire 21.5 s. Emotional purpose: *"one keystroke, six personas — and the brain at the top is Opus."*

#### 5.6 Frame timeline (local)

| Frames        | Event                                                           |
|---------------|-----------------------------------------------------------------|
| 0–30          | Top "claude-opus-4-7 · orchestrator" strip slides down          |
| 30–120        | Card 1 spring-in + arrow 1 draws (frames 90–120)                |
| 120–210       | Card 2 + arrow 2 (180–210)                                      |
| 210–300       | Card 3 + arrow 3 (270–300)                                      |
| 300–390       | Card 4 + arrow 4 (360–390)                                      |
| 390–480       | Card 5 + arrow 5 (450–480)                                      |
| 480–570       | Card 6                                                          |
| 570–630       | Brief "all green" pulse — model chips cycle a soft glow         |
| 630–645       | Hold for outbound slide                                         |

#### 5.7 JSX skeleton — pipeline + arrow

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat2"];

const CARD_STAGGER = 90; // frames between card stamps
const CARD_SPAN = 120;   // each card animates over 30 frames starting at stagger * i

export const SalesforcePipeline: React.FC<Props> = ({
  pipelineStages, headlineModel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- top strip slide ---
  const stripProgress = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const stripY = interpolate(stripProgress, [0, 1], [-40, 0]);
  const stripOpacity = interpolate(stripProgress, [0, 1], [0, 1]);

  // --- soft pulse near end (570–630) ---
  const pulseProgress = interpolate(frame, [570, 600, 630], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12", color: "#e6e7ea" }}>
      <div style={{
        position: "absolute", top: 32, left: 0, right: 0,
        textAlign: "center",
        transform: `translateY(${stripY}px)`, opacity: stripOpacity,
      }}>
        <span style={{
          padding: "8px 20px", borderRadius: 6,
          background: "#2a1f4a", color: "#c4b5ff",
          fontFamily: "JetBrains Mono", fontSize: 18, letterSpacing: 0.5,
        }}>
          {headlineModel} · orchestrator
        </span>
      </div>

      <div style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "space-around", padding: "0 80px",
      }}>
        {/* pure math, no hooks — map is safe */}
        {pipelineStages.map((stage, i) => (
          <PipelineCard
            key={stage.label}
            stage={stage}
            index={i}
            frame={frame}
            fps={fps}
            pulse={pulseProgress}
          />
        ))}
      </div>

      {/* arrows live in a single SVG so dasharray math stays in one place */}
      <PipelineArrows count={pipelineStages.length - 1} frame={frame} />
    </AbsoluteFill>
  );
};

// PipelineCard is a *plain function component* (not a hook-using helper called from .map).
// useCurrentFrame is NOT called inside; `frame` is passed in.
const PipelineCard: React.FC<{
  stage: Part2Props["beat2"]["pipelineStages"][number];
  index: number;
  frame: number;
  fps: number;
  pulse: number;
}> = ({ stage, index, frame, fps, pulse }) => {
  const start = index * CARD_STAGGER;
  const cardSpring = spring({
    frame: frame - start,
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 160 },
  });
  const scale = interpolate(cardSpring, [0, 1], [0.6, 1]);
  const opacity = interpolate(cardSpring, [0, 1], [0, 1]);
  const glow = interpolate(pulse, [0, 1], [0, 18]);

  return (
    <div style={{
      width: 200, padding: 20, borderRadius: 10,
      background: "#11151c", border: "1px solid #1f232b",
      transform: `scale(${scale})`, opacity,
      boxShadow: `0 0 ${glow}px rgba(124, 196, 255, 0.4)`,
      fontFamily: "JetBrains Mono",
    }}>
      <div style={{ fontSize: 14, color: "#9aa0a8" }}>{stage.label}</div>
      <div style={{ fontSize: 18, marginTop: 6 }}>{stage.artifactPrimary}</div>
      <div style={{ fontSize: 12, marginTop: 4, color: "#7aa3c7" }}>
        {stage.artifactSecondary}
      </div>
      <div style={{
        marginTop: 12, padding: "4px 8px", borderRadius: 4,
        background: stage.model === "claude-opus-4-7" ? "#2a1f4a" : "#1f2a36",
        color:      stage.model === "claude-opus-4-7" ? "#c4b5ff" : "#7cc4ff",
        fontSize: 11, display: "inline-block",
      }}>
        {stage.model}
      </div>
    </div>
  );
};

// Arrows. opacity-only end-cap — never conditional render inside SVG.
const PipelineArrows: React.FC<{ count: number; frame: number }> = ({ count, frame }) => {
  // pure math, no hooks — map is safe
  return (
    <svg style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%", pointerEvents: "none",
    }}>
      {Array.from({ length: count }).map((_, i) => {
        const start = i * CARD_STAGGER + 90;
        const drawProgress = interpolate(frame, [start, start + 30], [0, 1], {
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        const dashOffset = interpolate(drawProgress, [0, 1], [60, 0]);
        const headOpacity = interpolate(drawProgress, [0.85, 1], [0, 1], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        const x1 = 240 + i * 280;
        const x2 = x1 + 60;
        const y  = 540;
        return (
          <g key={i}>
            <line
              x1={x1} y1={y} x2={x2} y2={y}
              stroke="#7cc4ff" strokeWidth={2}
              strokeDasharray={60} strokeDashoffset={dashOffset}
            />
            {/* arrowhead — opacity-controlled, NEVER conditionally rendered */}
            <polygon
              points={`${x2},${y} ${x2 - 8},${y - 5} ${x2 - 8},${y + 5}`}
              fill="#7cc4ff"
              opacity={headOpacity}
            />
          </g>
        );
      })}
    </svg>
  );
};
```

Key fixes: (1) `PipelineCard` and `PipelineArrows` receive `frame` via prop — no hooks inside `.map()`; (2) arrowhead uses `opacity` not conditional render; (3) every motion has explicit `Easing.bezier` or `spring` config; (4) Opus badge present on top strip *for the full 21.5 s*.

---

### Beat 3 — `part2.beat3` · "KnowledgeGapSplit" (0–375 local · 12.5 s)

#### 5.8 Visual concept

Split-screen. Left half: a real Apex snippet showing `for (Quote q : quotes) { Opportunity opp = [SELECT … ]; }` — the SOQL-in-loop bug from Part 1 — with the line highlighted. Right half: a chat bubble where the assistant explains the fix. Three Salesforce-specific terms — `Trigger.new`, `Governor limits`, `FLS` — appear as red-strike-through "missing context" tags floating over the chat at the moments they *should* have been mentioned. The Opus 4.7 badge sits above the assistant column the entire scene. Emotional purpose: *"even with Opus, the model doesn't know what it doesn't know."*

#### 5.9 Frame timeline (local)

| Frames    | Event                                                         |
|-----------|---------------------------------------------------------------|
| 0–24      | Both columns fade in                                          |
| 24–60     | Left-side Apex code typewrites                                |
| 60–84     | Bug-line red highlight pulses in (3 cycles, sine-shaped)      |
| 60–270    | Assistant reply paragraphs typewrite, paragraph-by-paragraph  |
| 180–360   | 3 missing-term tags drop in (60 frames apart) and red-strike  |
| 360–375   | Hold                                                          |

#### 5.10 JSX skeleton (essentials)

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat3"];

export const KnowledgeGapSplit: React.FC<Props> = ({
  gapPrompt, gapAssistant, gapMissingTerms, badgeModel,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeProgress = interpolate(frame, [0, 24], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOpacity = interpolate(fadeProgress, [0, 1], [0, 1]);

  // pulsing bug-line highlight (sine, 3 cycles between 60–84 + tail to 120)
  const pulseProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const pulseAlpha =
    0.25 + 0.5 * Math.abs(Math.sin(pulseProgress * Math.PI * 3));

  // assistant typewriter — concatenate paragraphs with double-newline so one
  // global progress drives the whole reply.
  const assistantText = gapAssistant.join("\n\n");
  const assistantProgress = interpolate(frame, [60, 270], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const assistantShown = assistantText.slice(
    0, Math.floor(assistantProgress * assistantText.length),
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0d12", color: "#e6e7ea", opacity: fadeOpacity }}>
      <div style={{ display: "flex", height: "100%", padding: 40, gap: 32 }}>
        {/* LEFT — Apex with bug line */}
        <div style={{ flex: 1, fontFamily: "JetBrains Mono", fontSize: 18 }}>
          <div style={{ color: "#9aa0a8", marginBottom: 12 }}>QuoteRollup.cls</div>
          <pre style={{ whiteSpace: "pre-wrap" }}>
{`for (Quote q : Trigger.new) {
  `}<span style={{
            background: `rgba(255, 96, 96, ${pulseAlpha})`,
            padding: "0 4px", borderRadius: 2,
          }}>
{`Opportunity opp = [SELECT Id FROM Opportunity WHERE Id = :q.OpportunityId];`}
          </span>{`
}`}
          </pre>
        </div>

        {/* RIGHT — assistant with Opus badge */}
        <div style={{ flex: 1, fontFamily: "JetBrains Mono" }}>
          <div style={{
            padding: "6px 10px", borderRadius: 6,
            background: "#2a1f4a", color: "#c4b5ff",
            fontSize: 12, display: "inline-block", marginBottom: 12,
          }}>
            {badgeModel}
          </div>
          <div style={{ color: "#9aa0a8", marginBottom: 6, fontSize: 14 }}>&gt; {gapPrompt}</div>
          <div style={{ fontSize: 16, lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
            {assistantShown}
          </div>

          {/* missing-term tags */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            {/* pure math, no hooks — map is safe */}
            {gapMissingTerms.map((term, i) => (
              <MissingTag key={term} term={term} index={i} frame={frame} fps={fps} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MissingTag: React.FC<{
  term: string; index: number; frame: number; fps: number;
}> = ({ term, index, frame, fps }) => {
  const start = 180 + index * 60;
  const dropSpring = spring({
    frame: frame - start, fps,
    config: { mass: 0.7, damping: 12, stiffness: 200 },
  });
  const y       = interpolate(dropSpring, [0, 1], [-12, 0]);
  const opacity = interpolate(dropSpring, [0, 1], [0, 1]);
  // strike-through grows after tag lands
  const strikeProgress = interpolate(frame, [start + 18, start + 36], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const strikeWidth = interpolate(strikeProgress, [0, 1], [0, 100]);

  return (
    <div style={{
      position: "relative", display: "inline-block",
      padding: "4px 10px", borderRadius: 4,
      background: "#3a1a1a", color: "#ff9b9b",
      transform: `translateY(${y}px)`, opacity,
      fontSize: 14, alignSelf: "flex-start",
    }}>
      missing: {term}
      <div style={{
        position: "absolute", left: 8, top: "50%",
        height: 1.5, background: "#ff9b9b",
        width: `${strikeWidth}%`,
      }}/>
    </div>
  );
};
```

---

### Beat 4 — `part2.beat4` · "ResourceHunt" (0–285 local · 9.5 s)

#### 5.11 Visual concept

A 2×2 grid of fake browser-tab cards: Apex Reference, LWC Dev Guide, Summer '26 Release Notes, Internal KB. Each card shows a chrome-style URL bar (`developer.salesforce.com/…`), a section title, and a yellow-highlighted snippet. Cards stagger in with springs. After all four are present, the camera "pulls back" via a `scale 1 → 0.85 + translateY` ease so the viewer feels the *clutter*. Emotional purpose: *"my second monitor is doing the work the model can't."*

No Opus badge in this beat by design — the absence underlines the point that *external* references are needed.

#### 5.12 Frame timeline (local)

| Frames    | Event                                                        |
|-----------|--------------------------------------------------------------|
| 0–60      | Card 1 (apex-ref) springs in top-left                        |
| 30–90     | Card 2 (lwc-guide) top-right                                 |
| 60–120    | Card 3 (release-notes) bottom-left                           |
| 90–150    | Card 4 (internal-kb) bottom-right                            |
| 150–225   | Camera pulls back (scale 1 → 0.85, translateY 0 → 40)        |
| 225–285   | Hold + outbound fade-prep                                    |

#### 5.13 JSX skeleton

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat4"];

const CARD_POSITIONS = [
  { gridArea: "1 / 1" }, { gridArea: "1 / 2" },
  { gridArea: "2 / 1" }, { gridArea: "2 / 2" },
];

export const ResourceHunt: React.FC<Props> = ({ resourceCards }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // camera pull-back
  const pullProgress = interpolate(frame, [150, 225], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cameraScale = interpolate(pullProgress, [0, 1], [1, 0.85]);
  const cameraY     = interpolate(pullProgress, [0, 1], [0, 40]);

  return (
    <AbsoluteFill style={{
      backgroundColor: "#0b0d12", color: "#e6e7ea",
      transform: `scale(${cameraScale}) translateY(${cameraY}px)`,
    }}>
      <div style={{
        position: "absolute", inset: 80,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 40,
      }}>
        {/* pure math, no hooks — map is safe */}
        {resourceCards.map((card, i) => (
          <ResourceCard
            key={card.kind}
            card={card}
            index={i}
            frame={frame}
            fps={fps}
            style={CARD_POSITIONS[i]}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ResourceCard: React.FC<{
  card: Part2Props["beat4"]["resourceCards"][number];
  index: number; frame: number; fps: number;
  style: React.CSSProperties;
}> = ({ card, index, frame, fps, style }) => {
  const start = index * 30;
  const cardSpring = spring({
    frame: frame - start, fps,
    config: { mass: 0.8, damping: 13, stiffness: 170 },
  });
  const scale   = interpolate(cardSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <div style={{
      ...style,
      background: "#11151c", border: "1px solid #1f232b", borderRadius: 10,
      padding: 24, transform: `scale(${scale})`, opacity,
      fontFamily: "JetBrains Mono",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 10px", background: "#1a1f29", borderRadius: 4,
        fontSize: 12, color: "#9aa0a8",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: "#7cc4ff" }}/>
        {card.host}
      </div>
      <div style={{ marginTop: 16, fontSize: 22 }}>{card.title}</div>
      <div style={{
        marginTop: 16, padding: "6px 8px",
        background: "rgba(255, 215, 0, 0.18)",
        borderLeft: "3px solid #ffd24a",
        fontSize: 14, lineHeight: 1.6, color: "#fff5cc",
      }}>
        {card.highlightLine}
      </div>
    </div>
  );
};
```

---

### Beat 5 — `part2.beat5` · "ToolingWall" (0–225 local · 7.5 s)

#### 5.14 Visual concept

Black terminal background. Three commands typewrite *sequentially* (not simultaneously — sequential reads as more punishing). Each command, the moment its typewriter completes, gets its `ERROR …` line stamped in red below with a tiny shake. After the third error lands, a caption "Every tool. Every time." fades in centred over a 60% black overlay. Emotional purpose: *"the platform itself is the antagonist now."*

The third command's error is `System.LimitException: Too many SOQL queries: 101` — the *exact* string from Part 1. This is the rhyming moment that closes the part.

#### 5.15 Frame timeline (local)

| Frames     | Event                                                           |
|------------|-----------------------------------------------------------------|
| 0–30       | Terminal chrome fade in                                         |
| 30–60      | Cmd 1 typewrite, error stamps at 60                             |
| 60–105     | Cmd 2 typewrite, error stamps at 105                            |
| 105–150    | Cmd 3 typewrite (the SOQL one), error stamps at 150             |
| 150–195    | Caption fade-in over dark overlay                               |
| 195–225    | Hold                                                            |

#### 5.16 JSX skeleton

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat5"];

const CMD_STAGGER = 45;       // frames between command starts
const TYPEWRITE   = 30;       // frames per command typewrite

export const ToolingWall: React.FC<Props> = ({
  toolingCommands, toolingCaption,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeProgress = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const chromeOpacity = interpolate(chromeProgress, [0, 1], [0, 1]);

  const captionProgress = interpolate(frame, [150, 195], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(captionProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", color: "#e6e7ea", opacity: chromeOpacity }}>
      <div style={{
        padding: 60, fontFamily: "JetBrains Mono", fontSize: 20, lineHeight: 1.7,
      }}>
        {/* pure math, no hooks — map is safe */}
        {toolingCommands.map((c, i) => (
          <ToolingLine
            key={c.cmd}
            cmd={c}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>

      <AbsoluteFill style={{
        backgroundColor: "rgba(0,0,0,0.6)", opacity: captionOpacity,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "Inter", fontSize: 56, fontWeight: 600, color: "#fff",
          letterSpacing: -0.5,
        }}>
          {toolingCaption}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ToolingLine: React.FC<{
  cmd: Part2Props["beat5"]["toolingCommands"][number];
  index: number; frame: number; fps: number;
}> = ({ cmd, index, frame, fps }) => {
  const start = 30 + index * CMD_STAGGER;
  const typeProgress = interpolate(
    frame, [start, start + TYPEWRITE], [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const cmdShown = cmd.cmd.slice(0, Math.floor(typeProgress * cmd.cmd.length));

  // error stamps when typewrite completes
  const errSpring = spring({
    frame: frame - (start + TYPEWRITE), fps,
    config: { mass: 0.5, damping: 10, stiffness: 220 },
  });
  const errOpacity = interpolate(errSpring, [0, 1], [0, 1]);
  const errScale   = interpolate(errSpring, [0, 1], [1.1, 1]);
  // shake decays over 12 frames after stamp
  const shakeProgress = interpolate(
    frame, [start + TYPEWRITE, start + TYPEWRITE + 12], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shakeX = Math.sin(frame * 1.3) * 4 * shakeProgress;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ color: "#7cc4ff" }}>
        <span style={{ color: "#9aa0a8" }}>$ </span>{cmdShown}
      </div>
      <div style={{
        marginTop: 4, color: "#ff7a7a",
        opacity: errOpacity,
        transform: `translateX(${shakeX}px) scale(${errScale})`,
        transformOrigin: "left",
      }}>
        {cmd.err}
      </div>
    </div>
  );
};
```

---

### Beat 6 — `part2.beat6` · "Tail" (0–60 local · 2 s)

#### 5.17 Visual concept

Caption "Every tool. Every time." holds another beat (visual continuity with B5's caption), then a faint hint of the Part-3 turn appears: a single line at the bottom — `next: a different way →` — that fades in last. Emotional purpose: *"closure on the struggle, faint promise of relief."*

#### 5.18 JSX skeleton

```tsx
import React from "react";
import {
  AbsoluteFill, Easing, interpolate, useCurrentFrame,
} from "remotion";
import type { Part2Props } from "../../compositions/part2-schema";

type Props = Part2Props["beat6"];

export const Tail: React.FC<Props> = ({ tagline }) => {
  const frame = useCurrentFrame();

  const headlineProgress = interpolate(frame, [0, 18], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1]);

  const hintProgress = interpolate(frame, [30, 54], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const hintOpacity = interpolate(hintProgress, [0, 1], [0, 1]);
  const hintY       = interpolate(hintProgress, [0, 1], [12, 0]);

  return (
    <AbsoluteFill style={{
      backgroundColor: "#000", color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 32, fontFamily: "Inter",
    }}>
      <div style={{ fontSize: 56, fontWeight: 600, opacity: headlineOpacity }}>
        {tagline}
      </div>
      <div style={{
        fontSize: 22, color: "#9aa0a8",
        opacity: hintOpacity, transform: `translateY(${hintY}px)`,
        fontFamily: "JetBrains Mono",
      }}>
        next: a different way →
      </div>
    </AbsoluteFill>
  );
};
```

---

## 6. Files to create / modify / delete

### Create

- `demo/remotion/src/scenes/part2/ClaudeCodeWorkspace.tsx`
- `demo/remotion/src/scenes/part2/SalesforcePipeline.tsx`
- `demo/remotion/src/scenes/part2/KnowledgeGapSplit.tsx`
- `demo/remotion/src/scenes/part2/ResourceHunt.tsx`
- `demo/remotion/src/scenes/part2/ToolingWall.tsx`
- `demo/remotion/src/scenes/part2/Tail.tsx`
- `demo/remotion/public/vo/part-2-current-efforts.wav` (Coqui XTTS · `my-voices2.wav`)
- `demo/remotion/public/vo/part-2-pain-points.wav`    (Coqui XTTS · `my-voices2.wav`)

### Modify

- `demo/remotion/src/compositions/Part2Struggle.tsx` — replace inner body with the `<TransitionSeries>` wiring in §4.
- `demo/remotion/src/compositions/part2-schema.ts` — replace with §2.
- `demo/remotion/src/architecture-defaults.ts` — replace `part2Defaults` with §3.
- `demo/remotion/src/Root.tsx` — wrap second VO `<Audio>` in `<Sequence from={930}>` for delayed playback.
- `demo/remotion/src/timing.ts` — keep the six `part2.beatN` keys but update their *values* to match `[0, 285, 930, 1305, 1590, 1815]` (cumulative scene starts before the 15-frame transition deductions). Rename: NONE.

### Delete

- Old scene files that the prior plan referenced and that this round retires:
  - `demo/remotion/src/scenes/part2/CurrentEffortsIntro.tsx`
  - `demo/remotion/src/scenes/part2/WorkflowPipeline.tsx`
  - `demo/remotion/src/scenes/part2/LLMKnowledgeGap.tsx`
  - `demo/remotion/src/scenes/part2/ResourceGathering.tsx`
  - `demo/remotion/src/scenes/part2/ToolingPain.tsx`

---

## 7. Frame checkpoints — `bunx remotion still`

These are the three frames that must look right before we render the full part. Each one is at the visual peak of a different beat and exercises a different motion primitive.

```bash
# Checkpoint 1 — middle of B2 pipeline build (card 4 just landed, arrows 1-3 fully drawn).
# Tests: spring stamp, SVG dasharray, persistent Opus badge on top strip.
bunx remotion still \
  src/index.ts Part2Struggle \
  out/part2-checkpoint-1.png \
  --frame=585 \
  --props='{"showVo":false,"showBgm":false}'

# Checkpoint 2 — middle of B3 KnowledgeGapSplit (assistant ~70% typed, all 3 missing-term tags landed).
# Tests: typewriter slice, sine pulse highlight, missing-tag spring + strike-through.
bunx remotion still \
  src/index.ts Part2Struggle \
  out/part2-checkpoint-2.png \
  --frame=1230 \
  --props='{"showVo":false,"showBgm":false}'

# Checkpoint 3 — peak of B5 ToolingWall (third error just stamped, caption fading in over overlay).
# Tests: typewriter, error spring + shake, overlay opacity.
bunx remotion still \
  src/index.ts Part2Struggle \
  out/part2-checkpoint-3.png \
  --frame=1740 \
  --props='{"showVo":false,"showBgm":false}'
```

Frame numbers are *part-2-absolute* (i.e. measured from frame 0 of `Part2Struggle`). Inside each scene the local frame is `absolute - (sceneStart - sumPriorTransitions)`.

---

## 8. Self-audit against prior-round bugs

| Prior bug                                                             | Where this plan addresses it                                                                 |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| 1. Properties derived from raw spring value                           | All beats: `spring()` → `interpolate(spring, [0,1], [from, to])`. Never used directly.       |
| 2. Absolute frame refs inside scene components                        | Every scene uses `useCurrentFrame()` → local frame; absolute math lives only in `Part2Struggle.tsx` and the checkpoints section. |
| 3. Missing `premountFor`                                              | All 6 `<TransitionSeries.Sequence>` carry `premountFor={fps}`.                               |
| 4. Manual fade-out via `durationInFrames - X`                         | All 5 cuts use `<TransitionSeries.Transition>` with `fade()` / `slide()` + `linearTiming` / `springTiming`. |
| 5. `useTypewriter` hook called in `.map()`                            | Typewriter is inline string-slice math; every `.map()` body is annotated `// pure math, no hooks — map is safe`. Card/Tag/Line components receive `frame` as a prop, not via hook. |
| 6. Conditional render of arrowhead inside SVG                         | `<polygon>` is always rendered; visibility is `opacity={headOpacity}`.                       |

## 9. Opus 4.7 visibility audit (≥ 3 beats criterion)

| Beat | Opus 4.7 surface                                                                  |
|------|-----------------------------------------------------------------------------------|
| B1   | `claude-opus-4-7` model badge top-right of TUI mock for the full 9.5 s            |
| B2   | `claude-opus-4-7 · orchestrator` top strip persists 21.5 s; 3 of 6 stage chips read `claude-opus-4-7` |
| B3   | `claude-opus-4-7` badge above assistant column for the full 12.5 s                |
| B4   | (intentional absence — narrative point)                                           |
| B5   | (intentional absence — terminal/CLI scene)                                        |
| B6   | (none)                                                                            |

Result: 3 beats with the literal string `claude-opus-4-7` on screen — meets the criterion. Schema-locked via `z.literal("claude-opus-4-7")` in `beat1`, `beat2`, and `beat3` so a refactor cannot silently drop the badge.

## 10. Salesforce vocabulary audit

Concrete SF terms that appear on-screen or in VO (judges scoring "Depth & Execution / SF accuracy"):

`Trigger.new` · `Governor limits` · `FLS` · `SOQL` · `Apex` · `LWC` · `@wire` · `Quote` · `Opportunity` · `OpportunityLineItem` · `permset` · `sf project deploy start` · `sf org assign permset` · `sf apex run test` · `sfdx-project.json` · `Database.update` · `USER_MODE` · `System.LimitException: Too many SOQL queries: 101` (the rhyme with Part 1) · Summer '26 release notes · scratch org.

Every term resolves to a real Salesforce concept — no hallucinated APIs.
