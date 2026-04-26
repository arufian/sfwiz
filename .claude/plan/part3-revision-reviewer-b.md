# Part 3 — Reviewer B Plan (Technical Remotion Implementation · Depth + Opus 4.7 Lens)

> Reviewer angle: **Technical Remotion implementation — Depth + Opus 4.7 use lens.**
> Goal: implementation-grade plan an engineer can paste-and-extend.
> Tone: dense, concrete, no marketing prose.

---

## 0. Executive summary

Part 3 is the **solution-reveal section** (60 s · 1800 frames). After Part 2 ends with the "tooling wall" pain, Part 3 lands on a new product (sfwiz), shows the architecture, walks through the persona pipeline, and ends on the `ask_user` gate — the "Keep Thinking" judge moment.

This plan ships **5 scene files** (one per beat group), one composition wrapper (`Part3Solution`), and the timing + Root wiring.

**Critical model-name surface**:
- `claude-opus-4-7` — visible in B3 (architecture node + persona route map) and B4 (Reviewer + Designer chips).
- `claude-sonnet-4-6` — visible in B3 (architecture node) and B4 (Developer + QA chips).
- `claude-haiku-4-5` — optional in B3 (deploy node tag) for completeness; not load-bearing.

**Animation pattern (matches Part 2)**:
- All `interpolate` calls carry `extrapolateLeft: "clamp", extrapolateRight: "clamp"`.
- All `spring()` mounts use `frame: frame - startOffset` and damping/stiffness from the Part 2 conventions (`{ mass: 0.7, damping: 14, stiffness: 130 }` for slide-ins; `{ mass: 0.6, damping: 12, stiffness: 180 }` for badge pops).
- No hooks inside `.map()` callbacks — pass `frame` as a prop and compute all per-element math in the child component.
- No hardcoded raw frame numbers inside scenes. Every offset references `BEATS.<name>.<sub>` constants declared at the top of the file.

---

## 1. Beat budget — locked timing

VO transcript (~120 words at 2.0–2.2 wps natural pace ≈ 55–60 s of speech). Padding budget: 60 s − speech = 0–5 s for breath + transition tails. Each beat duration below = **VO speech + tail**.

```ts
// timing.ts addendum
export const part3Beats = {
  reveal:     180,  //  6.0s  B1 wordmark drop + bass
  taglines:   270,  //  9.0s  B2 three taglines (3.0s each)
  arch:       570,  // 19.0s  B3 architecture + RAG strip
  persona:    360,  // 12.0s  B4 four-persona walk
  oneMore:    150,  //  5.0s  B5 Apple-keynote silence + line
  askGate:    210,  //  7.0s  B6 ask_user TUI modal
  closing:     60,  //  2.0s  B7 "Your call. Always." centered fade
};
// sum = 180+270+570+360+150+210+60 = 1800 ✓
```

**Beat global starts** (consumed by `Part3Solution.tsx` for `<Sequence from=…>`):

```ts
export const part3 = {
  total: 1800,
  beat1Reveal:   { start:    0, duration: part3Beats.reveal   },
  beat2Taglines: { start:  180, duration: part3Beats.taglines },
  beat3Arch:     { start:  450, duration: part3Beats.arch     },
  beat4Persona:  { start: 1020, duration: part3Beats.persona  },
  beat5OneMore:  { start: 1380, duration: part3Beats.oneMore  },
  beat6AskGate:  { start: 1530, duration: part3Beats.askGate  },
  beat7Closing:  { start: 1740, duration: part3Beats.closing  },
};
```

Note: B1+B2 share one scene file (`SFWizReveal.tsx`) so the wordmark can persist underneath the taglines without a hard cut. Same for B6+B7 (`AskUserGate.tsx`) — the gate fades to black and the closing line fades in over the same canvas.

---

## 2. File layout

```
demo/remotion/src/
├── timing.ts                                  ← +part3Beats, +part3 export updated
├── Root.tsx                                   ← +Part3Solution composition
├── compositions/
│   ├── Part3Solution.tsx                      ← NEW — Sequence wiring + audio + subtitles
│   └── part3-schema.ts                        ← NEW — zod schema + defaults
└── scenes/part3/
    ├── SFWizReveal.tsx                        ← NEW — B1 + B2
    ├── ArchitectureDiagram.tsx                ← NEW — B3
    ├── PersonaWorkflow.tsx                    ← NEW — B4
    ├── OneMoreThing.tsx                       ← NEW — B5
    └── AskUserGate.tsx                        ← NEW — B6 + B7
```

Reuse from `scenes/part2/_shared/`:
- `Typewriter` — used in B6 for the modal prompt typing.
- `TerminalBox` — used as the chrome for the B6 modal.
- `PipelineNode` — used for the persona pills in B4.

---

## 3. `timing.ts` — full diff

```ts
import { fps } from "./theme";

export const sec = (s: number) => Math.round(s * fps);

export const beats = {
  intro:        sec(12),
  marketDemand: sec(21),
  aiEra:        sec(29),
};

export const part1 = {
  total: beats.intro + beats.marketDemand + beats.aiEra,
  beat1Intro:   { start: 0,                                    duration: beats.intro },
  beat2Demand:  { start: beats.intro,                          duration: beats.marketDemand },
  beat3AiEra:   { start: beats.intro + beats.marketDemand,     duration: beats.aiEra },
};

export const part2Beats = {
  intro:     270,
  pipeline:  510,
  llmGap:    360,
  resources: 270,
  tooling:   210,
};

export const part2 = {
  total: 1620,
  beat1Intro:     { start:    0, duration: part2Beats.intro },
  beat2Pipeline:  { start:  270, duration: part2Beats.pipeline },
  beat3LLMGap:    { start:  780, duration: part2Beats.llmGap },
  beat4Resources: { start: 1140, duration: part2Beats.resources },
  beat5Tooling:   { start: 1410, duration: part2Beats.tooling },
};

// ── Part 3 ──────────────────────────────────────────────────────────────────
// Sum: 180+270+570+360+150+210+60 = 1800 (60s @ 30fps)
export const part3Beats = {
  reveal:     180,  //  6.0s  B1 wordmark drop
  taglines:   270,  //  9.0s  B2 three taglines (≈3s each)
  arch:       570,  // 19.0s  B3 architecture diagram
  persona:    360,  // 12.0s  B4 persona pipeline walk
  oneMore:    150,  //  5.0s  B5 "And one more thing." beat
  askGate:    210,  //  7.0s  B6 ask_user TUI modal
  closing:     60,  //  2.0s  B7 closing punch
};

export const part3 = {
  total: 1800,
  beat1Reveal:   { start:    0, duration: part3Beats.reveal   },
  beat2Taglines: { start:  180, duration: part3Beats.taglines },
  beat3Arch:     { start:  450, duration: part3Beats.arch     },
  beat4Persona:  { start: 1020, duration: part3Beats.persona  },
  beat5OneMore:  { start: 1380, duration: part3Beats.oneMore  },
  beat6AskGate:  { start: 1530, duration: part3Beats.askGate  },
  beat7Closing:  { start: 1740, duration: part3Beats.closing  },
};

export const masterTotal = part1.total + part2.total + part3.total;
```

---

## 4. `compositions/part3-schema.ts` — schema + defaults

```ts
import { z } from "zod";

// ── per-beat sub-schemas ────────────────────────────────────────────────────

const beat1RevealSchema = z.object({
  wordmark:   z.string(),                  // "sfwiz"
  tagline:    z.string(),                  // "A terminal AI harness."
  subtagline: z.string(),                  // "Built for Salesforce. From the ground up."
});

const beat2TaglinesSchema = z.object({
  lines: z.array(z.string()).length(3),    // ["One prompt.", "Six AI personas.", "Full pipeline."]
});

const archNodeSchema = z.object({
  id:    z.string(),
  label: z.string(),
  model: z.enum(["claude-opus-4-7","claude-sonnet-4-6","claude-haiku-4-5"]).optional(),
  kind:  z.enum(["tui","orchestrator","persona","api","knowledge","sf"]),
});

const beat3ArchSchema = z.object({
  orchestratorModel: z.literal("claude-opus-4-7"),
  personaModelMap: z.object({
    designer:        z.literal("claude-opus-4-7"),
    developer:       z.literal("claude-sonnet-4-6"),
    reviewer:        z.literal("claude-opus-4-7"),
    qa:              z.literal("claude-sonnet-4-6"),
    deployManager:   z.literal("claude-haiku-4-5"),
    orgAdmin:        z.literal("claude-opus-4-7"),
  }),
  ragCollections: z.array(z.string()).length(3),  // ["Apex reference", "LWC guide", "Release notes"]
  ragNote:        z.string(),                     // "Scraped nightly. The agent learns the platform every day."
});

const personaStepSchema = z.object({
  persona: z.enum(["designer","developer","reviewer","qa"]),
  verb:    z.string(),                            // "drafts the spec"
  artifact:z.string(),                            // "design.md"
  model:   z.enum(["claude-opus-4-7","claude-sonnet-4-6"]),
  readOnly:z.boolean(),                           // true for reviewer
});

const beat4PersonaSchema = z.object({
  steps: z.array(personaStepSchema).length(4),
});

const beat5OneMoreSchema = z.object({
  line: z.string(),                               // "And one more thing."
});

const beat6AskGateSchema = z.object({
  promptHeader: z.string(),                       // "Deploy to prod-org? [y/N]"
  modalTitle:   z.string(),                       // "ask_user · permission required"
  modalBody:    z.array(z.string()).length(3),    // 3 detail lines
  callouts:     z.array(z.string()).length(3),    // ["It stops.", "It asks.", "It waits."]
});

const beat7ClosingSchema = z.object({
  closingLine: z.string(),                        // "Your call. Always."
});

// ── top-level schema ────────────────────────────────────────────────────────

export const part3Schema = z.object({
  beat1: beat1RevealSchema,
  beat2: beat2TaglinesSchema,
  beat3: beat3ArchSchema,
  beat4: beat4PersonaSchema,
  beat5: beat5OneMoreSchema,
  beat6: beat6AskGateSchema,
  beat7: beat7ClosingSchema,
  showVo:        z.boolean(),
  showBgm:       z.boolean(),
  bgmVolume:     z.number().min(0).max(100),
  showSubtitles: z.boolean(),
});

export type Part3Props = z.infer<typeof part3Schema>;

// ── defaults ────────────────────────────────────────────────────────────────

export const part3Defaults: Part3Props = {
  beat1: {
    wordmark:   "sfwiz",
    tagline:    "A terminal AI harness.",
    subtagline: "Built for Salesforce. From the ground up.",
  },
  beat2: {
    lines: ["One prompt.", "Six AI personas.", "Full pipeline."],
  },
  beat3: {
    orchestratorModel: "claude-opus-4-7",
    personaModelMap: {
      designer:      "claude-opus-4-7",
      developer:     "claude-sonnet-4-6",
      reviewer:      "claude-opus-4-7",
      qa:            "claude-sonnet-4-6",
      deployManager: "claude-haiku-4-5",
      orgAdmin:      "claude-opus-4-7",
    },
    ragCollections: ["Apex reference", "LWC guide", "Release notes"],
    ragNote:        "Scraped nightly. The agent learns the platform every day.",
  },
  beat4: {
    steps: [
      { persona: "designer",  verb: "drafts the spec",     artifact: "design.md",          model: "claude-opus-4-7",   readOnly: false },
      { persona: "developer", verb: "writes the Apex",     artifact: "QuoteRollup.cls",    model: "claude-sonnet-4-6", readOnly: false },
      { persona: "reviewer",  verb: "catches the bugs",    artifact: "review · read-only", model: "claude-opus-4-7",   readOnly: true  },
      { persona: "qa",        verb: "runs the tests",      artifact: "12/12 · 92% cov",    model: "claude-sonnet-4-6", readOnly: false },
    ],
  },
  beat5: {
    line: "And one more thing.",
  },
  beat6: {
    promptHeader: "Deploy to prod-org? [y/N]",
    modalTitle:   "ask_user · permission required",
    modalBody: [
      "Target org: prod-acme (00D5g000001ZxYZ)",
      "Components: 12 Apex classes, 3 triggers, 1 LWC",
      "This will run a full validation deploy. Cannot be undone.",
    ],
    callouts: ["It stops.", "It asks.", "It waits."],
  },
  beat7: {
    closingLine: "Your call. Always.",
  },
  showVo:        false,
  showBgm:       false,
  bgmVolume:     30,
  showSubtitles: true,
};
```

---

## 5. `compositions/Part3Solution.tsx` — wiring

```tsx
import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from "remotion";
import { part3 } from "../timing";
import { SFWizReveal }          from "../scenes/part3/SFWizReveal";
import { ArchitectureDiagram }  from "../scenes/part3/ArchitectureDiagram";
import { PersonaWorkflow }      from "../scenes/part3/PersonaWorkflow";
import { OneMoreThing }         from "../scenes/part3/OneMoreThing";
import { AskUserGate }          from "../scenes/part3/AskUserGate";
import { SubtitleBar } from "../components/SubtitleBar";
import type { Part3Props } from "./part3-schema";

// Subtitles — frames anchored to global Part 3 timeline (0 = start of Part 3).
// Tweak these once VO WAVs land via `ffmpeg silencedetect`.
const SUBTITLES = [
  // B1 reveal (0–180)
  { text: "Meet sfwiz.",                                                   startFrame:    0, endFrame:  180 },

  // B2 taglines (180–450)
  { text: "A terminal AI harness. Built for Salesforce.",                  startFrame:  180, endFrame:  270 },
  { text: "One prompt. Six AI personas. Full pipeline.",                   startFrame:  270, endFrame:  450 },

  // B3 architecture (450–1020)
  { text: "An orchestrator on the Anthropic SDK. Streaming every turn.",   startFrame:  450, endFrame:  600 },
  { text: "Routes to the right persona — through the Claude Agent SDK.",   startFrame:  600, endFrame:  750 },
  { text: "Opus 4.7 for judgment. Sonnet 4.6 for code.",                   startFrame:  750, endFrame:  870 },
  { text: "A local RAG store. Apex reference. LWC guide. Release notes.",  startFrame:  870, endFrame:  990 },

  // B4 persona pipeline (1020–1380)
  { text: "Pick an org. Describe what you want.",                          startFrame: 1020, endFrame: 1110 },
  { text: "Designer drafts. Developer writes. Reviewer reads.",            startFrame: 1110, endFrame: 1260 },
  { text: "QA runs the tests.",                                            startFrame: 1260, endFrame: 1380 },

  // B5 one-more-thing (1380–1530)
  { text: "And one more thing.",                                           startFrame: 1380, endFrame: 1530 },

  // B6 ask_user gate (1530–1740)
  { text: "Before any deploy — it stops. It asks. It waits.",              startFrame: 1530, endFrame: 1740 },

  // B7 closing (1740–1800)
  { text: "Your call. Always.",                                            startFrame: 1740, endFrame: 1800 },
];

export const Part3Solution: React.FC<Part3Props> = (props) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b1020" }}>
      {props.showBgm && (
        <Audio
          src={staticFile("bgm/part-3.mov")}
          volume={(f) =>
            interpolate(
              f,
              [0, 60, part3.total - 60, part3.total],
              [0, props.bgmVolume / 100, props.bgmVolume / 100, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )
          }
          loop
        />
      )}

      {/* B1 + B2 share a scene so the wordmark persists underneath the taglines. */}
      <Sequence
        from={part3.beat1Reveal.start}
        durationInFrames={part3.beat1Reveal.duration + part3.beat2Taglines.duration}
        name="P3·B1+B2 SFWizReveal"
      >
        {props.showVo && <Audio src={staticFile("vo/part-3-b1-reveal.wav")} />}
        <SFWizReveal beat1={props.beat1} beat2={props.beat2} />
      </Sequence>

      <Sequence
        from={part3.beat3Arch.start}
        durationInFrames={part3.beat3Arch.duration}
        name="P3·B3 Architecture"
      >
        {props.showVo && <Audio src={staticFile("vo/part-3-b3-arch.wav")} />}
        <ArchitectureDiagram {...props.beat3} />
      </Sequence>

      <Sequence
        from={part3.beat4Persona.start}
        durationInFrames={part3.beat4Persona.duration}
        name="P3·B4 Personas"
      >
        {props.showVo && <Audio src={staticFile("vo/part-3-b4-personas.wav")} />}
        <PersonaWorkflow {...props.beat4} />
      </Sequence>

      <Sequence
        from={part3.beat5OneMore.start}
        durationInFrames={part3.beat5OneMore.duration}
        name="P3·B5 OneMoreThing"
      >
        {props.showVo && <Audio src={staticFile("vo/part-3-b5-onemorething.wav")} />}
        <OneMoreThing {...props.beat5} />
      </Sequence>

      {/* B6 + B7 share a scene so the modal can fade through to the closing line on the same canvas. */}
      <Sequence
        from={part3.beat6AskGate.start}
        durationInFrames={part3.beat6AskGate.duration + part3.beat7Closing.duration}
        name="P3·B6+B7 AskUserGate"
      >
        {props.showVo && <Audio src={staticFile("vo/part-3-b6-askgate.wav")} />}
        <AskUserGate beat6={props.beat6} beat7={props.beat7} />
      </Sequence>

      {props.showSubtitles && <SubtitleBar segments={SUBTITLES} />}
    </AbsoluteFill>
  );
};
```

---

## 6. `Root.tsx` — registration diff

```tsx
import { Composition } from "remotion";
import { fps, width, height } from "./theme";
import { Part1Backstory } from "./compositions/Part1Backstory";
import { part1Schema } from "./compositions/part1-schema";
import { Part2Struggle } from "./compositions/Part2Struggle";
import { part2Schema } from "./compositions/part2-schema";
import { Part3Solution } from "./compositions/Part3Solution";
import { part3Schema, part3Defaults } from "./compositions/part3-schema";
import { part1, part2, part3 } from "./timing";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Part1Backstory"
        component={Part1Backstory}
        durationInFrames={part1.total}
        fps={fps}
        width={width}
        height={height}
        schema={part1Schema}
        defaultProps={/* unchanged */}
      />

      <Composition
        id="Part2Struggle"
        component={Part2Struggle}
        durationInFrames={part2.total}
        fps={fps}
        width={width}
        height={height}
        schema={part2Schema}
        defaultProps={/* unchanged */}
      />

      <Composition
        id="Part3Solution"
        component={Part3Solution}
        durationInFrames={part3.total}
        fps={fps}
        width={width}
        height={height}
        schema={part3Schema}
        defaultProps={part3Defaults}
      />
    </>
  );
};
```

---

## 7. Scene 1 — `SFWizReveal.tsx` (B1 + B2)

**Purpose**: Hard cut from black, wordmark scales in with bass-drop spring (B1 0–180), then three accent-flash taglines (B2 180–450).

**Animation breakdown**:
- 0–60: black hold (`bgOp` 1→0 from 0–6 frames? No — bg stays black, wordmark fades up).
- 0–30: subtle vignette ramp.
- 30–90: wordmark spring `{mass: 1.2, damping: 9, stiffness: 110}` (heavier mass → "drop" feel) from `scale: 0.4 → 1.0` + opacity 0→1.
- 60–120: tagline + subtagline fade up (staggered 30f apart).
- 180–270: line[0] slide-in from left + accent flash (3 frame full-opacity spike then 70%).
- 270–360: line[1] same pattern.
- 360–450: line[2] same pattern.
- 0–450: wordmark slowly drifts up + shrinks 5% to anchor the taglines below it.

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import type { Part3Props } from "../../compositions/part3-schema";

const EASE_OUT_EXPO = Easing.bezier(0.16, 1.0, 0.3, 1.0);
const EASE_STANDARD = Easing.bezier(0.4,  0.0, 0.2, 1.0);

// Local frame constants — all derived from part3Beats.reveal (180) + .taglines (270).
const BEATS = {
  wordmarkSpringStart: 30,
  wordmarkSpringEnd:   90,
  taglineFadeStart:    60,
  subtaglineFadeStart: 90,
  // B2 begins at frame 180 within this scene.
  line1Start:          180,
  line2Start:          270,
  line3Start:          360,
  lineFadeDuration:    24,    // each tagline animates in over 24 frames
  flashHoldDuration:   3,     // 3-frame full-opacity spike
};

type Props = {
  beat1: Part3Props["beat1"];
  beat2: Part3Props["beat2"];
};

export const SFWizReveal: React.FC<Props> = ({ beat1, beat2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── wordmark bass-drop spring (30–90) ─────────────────────────────────────
  const wordmarkSpring = spring({
    frame: frame - BEATS.wordmarkSpringStart,
    fps,
    config: { mass: 1.2, damping: 9, stiffness: 110 },
  });
  const wordmarkScale = interpolate(wordmarkSpring, [0, 1], [0.4, 1.0]);
  const wordmarkOp    = interpolate(wordmarkSpring, [0, 1], [0, 1]);

  // ── wordmark drift up + shrink (90–450) — anchors taglines below ──────────
  const driftProg = interpolate(frame, [90, 450], [0, 1], {
    easing: EASE_STANDARD,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const wordmarkY     = interpolate(driftProg, [0, 1], [0, -120]);
  const wordmarkShrnk = interpolate(driftProg, [0, 1], [1, 0.92]);

  // ── tagline + subtagline fade (60–120 / 90–150) ────────────────────────────
  const taglineOp = interpolate(frame, [BEATS.taglineFadeStart, BEATS.taglineFadeStart + 60], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const subtaglineOp = interpolate(frame, [BEATS.subtaglineFadeStart, BEATS.subtaglineFadeStart + 60], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── vignette ramp (0–30) ──────────────────────────────────────────────────
  const vignetteOp = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* radial vignette to give the wordmark gravity */}
      <AbsoluteFill
        style={{
          opacity: vignetteOp,
          background: `radial-gradient(ellipse at center, ${theme.bg} 0%, #000 80%)`,
        }}
      />

      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* wordmark */}
        <div
          style={{
            position: "absolute",
            transform: `translateY(${wordmarkY}px) scale(${wordmarkScale * wordmarkShrnk})`,
            opacity: wordmarkOp,
            fontFamily: theme.mono,
            fontSize: 220,
            fontWeight: 700,
            letterSpacing: -8,
            color: theme.fg,
            textShadow: `0 0 60px ${theme.accent}66`,
          }}
        >
          {beat1.wordmark}
        </div>

        {/* tagline + subtagline (anchored below, animate in once wordmark is set) */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              opacity: taglineOp,
              fontFamily: theme.sans,
              fontSize: 38,
              color: theme.fg,
              letterSpacing: -0.5,
            }}
          >
            {beat1.tagline}
          </div>
          <div
            style={{
              opacity: subtaglineOp,
              fontFamily: theme.sans,
              fontSize: 26,
              color: theme.dim,
            }}
          >
            {beat1.subtagline}
          </div>
        </div>

        {/* B2 — three taglines stacked below subtagline, fade in sequentially */}
        <div
          style={{
            position: "absolute",
            top: "78%",
            display: "flex",
            gap: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {beat2.lines.map((line, i) => (
            <TaglineWord
              key={line}
              text={line}
              index={i}
              frame={frame}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Per-tagline element — all interp math here, no hooks.
const TaglineWord: React.FC<{
  text: string;
  index: number;
  frame: number;
}> = ({ text, index, frame }) => {
  const start = BEATS.line1Start + index * (BEATS.line2Start - BEATS.line1Start); // 180, 270, 360
  const fadeEnd = start + BEATS.lineFadeDuration;
  const flashEnd = start + BEATS.flashHoldDuration;

  const op = interpolate(frame, [start, fadeEnd], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const tx = interpolate(frame, [start, fadeEnd], [-30, 0], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // Accent flash: bright spike then settle to fg
  const flashAmt = interpolate(frame, [start, flashEnd, fadeEnd], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const color = flashAmt > 0.5 ? theme.accent : theme.fg;

  return (
    <div
      style={{
        opacity: op,
        transform: `translateX(${tx}px)`,
        fontFamily: theme.sans,
        fontSize: 44,
        fontWeight: 600,
        color,
        letterSpacing: -1,
        textShadow: flashAmt > 0.3 ? `0 0 24px ${theme.accent}99` : undefined,
      }}
    >
      {text}
    </div>
  );
};
```

---

## 8. Scene 2 — `ArchitectureDiagram.tsx` (B3)

**Purpose**: Show the depth — TUI → Orchestrator (Opus 4.7) → 6 personas (Sonnet 4.6 / Opus 4.7) → Salesforce + RAG. Model names **must** be visible and legible.

**Layout** (1920×1080):
- Row 1 (y=120): **TUI** node (left) — labeled `terminal · sfwiz`.
- Row 2 (y=320): **Orchestrator** node (centered) — labeled `orchestrator · @anthropic-ai/sdk` with `claude-opus-4-7` chip.
- Connector: vertical glowing line from TUI down to orchestrator.
- Row 3 (y=580): **6 persona pills** (3×2 grid or 6×1 row) labeled with persona name + model chip.
- Row 4 (y=820): two side panels — left **Knowledge** (3 RAG collections + scrape note); right **Salesforce** (`sf CLI` + `jsforce`).
- Connectors: orchestrator → persona row (fan-out 6 lines), persona row → SF + RAG.

**Animation timeline (0–570 = 19s)**:
- 0–60: TUI node spring-in from top.
- 30–90: vertical connector draws (strokeDashoffset).
- 60–120: Orchestrator node scale-in + Opus chip pop.
- 120–240: 6 persona pills cascade in (stagger 20f each).
- 240–300: fan-out connectors draw.
- 300–390: Knowledge panel slide-in from left, Salesforce panel slide-in from right.
- 390–450: RAG collections list typewriter-cascade.
- 450–510: "Scraped nightly" note pulse.
- 510–570: hold — frame settles, ready for hard cut to B4.

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import type { Part3Props } from "../../compositions/part3-schema";

const EASE_OUT_EXPO = Easing.bezier(0.16, 1.0, 0.3, 1.0);
const EASE_STANDARD = Easing.bezier(0.4,  0.0, 0.2, 1.0);

const BEATS = {
  tuiStart:           0,
  tuiSpringDuration:  60,
  vertConnStart:     30,
  vertConnEnd:       90,
  orchStart:         60,
  orchSpringDuration:60,
  personaStart:     120,
  personaStagger:    20,
  fanOutStart:      240,
  fanOutEnd:        300,
  panelsStart:      300,
  panelsEnd:        390,
  ragListStart:     390,
  ragListEnd:       450,
  notePulseStart:   450,
  notePulseEnd:     510,
};

const MODEL_COLOR: Record<string, string> = {
  "claude-opus-4-7":   "#c4b5ff",
  "claude-sonnet-4-6": "#7cc4ff",
  "claude-haiku-4-5":  "#5eead4",
};
const MODEL_BG: Record<string, string> = {
  "claude-opus-4-7":   "#2a1f4a",
  "claude-sonnet-4-6": "#1f2a36",
  "claude-haiku-4-5":  "#1a2a2a",
};

type Props = Part3Props["beat3"];

// ── persona pill — frame as prop, no hooks inside ────────────────────────────
const PersonaPill: React.FC<{
  name: string;
  model: string;
  index: number;
  total: number;
  frame: number;
  fps: number;
}> = ({ name, model, index, total, frame, fps }) => {
  const start = BEATS.personaStart + index * BEATS.personaStagger;
  const s = spring({
    frame: frame - start,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });
  const scale   = interpolate(s, [0, 1], [0.6, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const pillW = 230;
  const pillH = 90;
  const gap = 22;
  const totalW = total * pillW + (total - 1) * gap;
  const startX = (1920 - totalW) / 2;
  const x = startX + index * (pillW + gap);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 580,
        width: pillW,
        height: pillH,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        opacity,
        borderRadius: 12,
        background: "#11151c",
        border: `1px solid ${theme.accent}55`,
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 6,
        fontFamily: theme.mono,
      }}
    >
      <div style={{ color: theme.fg, fontFamily: theme.sans, fontSize: 17, fontWeight: 600 }}>
        {name}
      </div>
      <div
        style={{
          padding: "3px 8px",
          borderRadius: 4,
          background: MODEL_BG[model],
          color: MODEL_COLOR[model],
          fontSize: 11,
          alignSelf: "flex-start",
          letterSpacing: 0.3,
        }}
      >
        {model}
      </div>
    </div>
  );
};

// ── fan-out connectors ───────────────────────────────────────────────────────
const FanOut: React.FC<{ frame: number; personaCount: number }> = ({ frame, personaCount }) => {
  const drawProg = interpolate(frame, [BEATS.fanOutStart, BEATS.fanOutEnd], [0, 1], {
    easing: EASE_STANDARD,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const orchX = 1920 / 2;
  const orchY = 380;
  const pillW = 230;
  const gap = 22;
  const totalW = personaCount * pillW + (personaCount - 1) * gap;
  const startX = (1920 - totalW) / 2;
  const pillTopY = 580;

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: 1920, height: 1080, pointerEvents: "none" }}
    >
      {Array.from({ length: personaCount }).map((_, i) => {
        const px = startX + i * (pillW + gap) + pillW / 2;
        const py = pillTopY;
        // approximate path length for dash animation
        const len = Math.hypot(px - orchX, py - orchY);
        const offset = (1 - drawProg) * len;
        return (
          <line
            key={i}
            x1={orchX}
            y1={orchY}
            x2={px}
            y2={py}
            stroke={theme.accent}
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeDasharray={len}
            strokeDashoffset={offset}
          />
        );
      })}
    </svg>
  );
};

export const ArchitectureDiagram: React.FC<Props> = ({
  orchestratorModel,
  personaModelMap,
  ragCollections,
  ragNote,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── TUI node (0–60) ──────────────────────────────────────────────────────
  const tuiSpring = spring({
    frame: frame - BEATS.tuiStart,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const tuiY  = interpolate(tuiSpring, [0, 1], [-40, 0]);
  const tuiOp = interpolate(tuiSpring, [0, 1], [0, 1]);

  // ── vertical connector TUI→Orchestrator (30–90) ──────────────────────────
  const vertConnProg = interpolate(frame, [BEATS.vertConnStart, BEATS.vertConnEnd], [0, 1], {
    easing: EASE_STANDARD,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── Orchestrator (60–120) ────────────────────────────────────────────────
  const orchSpring = spring({
    frame: frame - BEATS.orchStart,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 180 },
  });
  const orchScale = interpolate(orchSpring, [0, 1], [0.7, 1]);
  const orchOp    = interpolate(orchSpring, [0, 1], [0, 1]);

  // ── Knowledge + Salesforce panels (300–390) ──────────────────────────────
  const panelProg = interpolate(frame, [BEATS.panelsStart, BEATS.panelsEnd], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const knowX = interpolate(panelProg, [0, 1], [-100, 0]);
  const knowOp = interpolate(panelProg, [0, 1], [0, 1]);
  const sfX  = interpolate(panelProg, [0, 1], [100, 0]);
  const sfOp = interpolate(panelProg, [0, 1], [0, 1]);

  // ── RAG list cascade (390–450) ────────────────────────────────────────────
  const ragProg = interpolate(frame, [BEATS.ragListStart, BEATS.ragListEnd], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── note pulse (450–510) ─────────────────────────────────────────────────
  const notePulse = interpolate(frame, [BEATS.notePulseStart, BEATS.notePulseStart + 30, BEATS.notePulseEnd], [0, 1, 0.6], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const personaList = [
    { name: "org-admin",      model: personaModelMap.orgAdmin },
    { name: "designer",       model: personaModelMap.designer },
    { name: "developer",      model: personaModelMap.developer },
    { name: "reviewer",       model: personaModelMap.reviewer },
    { name: "qa",             model: personaModelMap.qa },
    { name: "deploy-manager", model: personaModelMap.deployManager },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* ── vertical connector (TUI top → orchestrator) ── */}
      <svg
        style={{ position: "absolute", inset: 0, width: 1920, height: 1080, pointerEvents: "none" }}
      >
        <line
          x1={1920 / 2}
          y1={210}
          x2={1920 / 2}
          y2={340}
          stroke={theme.accent}
          strokeOpacity={0.6}
          strokeWidth={2}
          strokeDasharray={130}
          strokeDashoffset={(1 - vertConnProg) * 130}
        />
      </svg>

      {/* ── TUI node (top) ── */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: `translateX(-50%) translateY(${tuiY}px)`,
          opacity: tuiOp,
          padding: "14px 24px",
          borderRadius: 10,
          background: "#0e1530",
          border: `1px solid ${theme.accent}55`,
          fontFamily: theme.mono,
          fontSize: 18,
          color: theme.fg,
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span style={{ color: theme.accent }}>$</span> terminal · sfwiz
      </div>

      {/* ── Orchestrator (centered, mid) ── */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: `translate(-50%, 0) scale(${orchScale})`,
          opacity: orchOp,
          padding: "16px 28px",
          borderRadius: 12,
          background: "#0e1530",
          border: `2px solid ${theme.accent}`,
          fontFamily: theme.mono,
          fontSize: 18,
          color: theme.fg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          boxShadow: `0 0 32px ${theme.accent}55`,
          minWidth: 460,
        }}
      >
        <div style={{ fontFamily: theme.sans, fontSize: 22, fontWeight: 600 }}>
          orchestrator
        </div>
        <div style={{ fontSize: 13, color: theme.dim }}>
          @anthropic-ai/sdk · messages.stream()
        </div>
        <div
          style={{
            padding: "4px 12px",
            borderRadius: 5,
            background: MODEL_BG[orchestratorModel],
            color: MODEL_COLOR[orchestratorModel],
            fontSize: 14,
            letterSpacing: 0.5,
          }}
        >
          {orchestratorModel}
        </div>
      </div>

      {/* ── persona pills (6×1 row) ── */}
      {personaList.map((p, i) => (
        <PersonaPill
          key={p.name}
          name={p.name}
          model={p.model}
          index={i}
          total={personaList.length}
          frame={frame}
          fps={fps}
        />
      ))}

      {/* ── fan-out connectors orchestrator → personas ── */}
      <FanOut frame={frame} personaCount={personaList.length} />

      {/* ── Knowledge panel (left, bottom) ── */}
      <div
        style={{
          position: "absolute",
          top: 800,
          left: 80,
          width: 720,
          padding: "16px 22px",
          borderRadius: 10,
          background: "#0e1530",
          border: `1px solid ${theme.ok}66`,
          fontFamily: theme.mono,
          fontSize: 14,
          color: theme.fg,
          transform: `translateX(${knowX}px)`,
          opacity: knowOp,
        }}
      >
        <div style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 600, color: theme.ok, marginBottom: 8 }}>
          local RAG store · ~/.sfwiz/knowledge/
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          {ragCollections.map((coll, i) => {
            const itemOp = interpolate(
              ragProg,
              [i / ragCollections.length, (i + 1) / ragCollections.length],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            );
            return (
              <div
                key={coll}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  background: `${theme.ok}22`,
                  color: theme.ok,
                  fontSize: 12,
                  opacity: itemOp,
                }}
              >
                {coll}
              </div>
            );
          })}
        </div>
        <div
          style={{
            color: theme.dim,
            fontSize: 13,
            opacity: notePulse,
            textShadow: notePulse > 0.7 ? `0 0 12px ${theme.ok}88` : undefined,
          }}
        >
          {ragNote}
        </div>
      </div>

      {/* ── Salesforce panel (right, bottom) ── */}
      <div
        style={{
          position: "absolute",
          top: 800,
          right: 80,
          width: 720,
          padding: "16px 22px",
          borderRadius: 10,
          background: "#0e1530",
          border: `1px solid ${theme.accent2}66`,
          fontFamily: theme.mono,
          fontSize: 14,
          color: theme.fg,
          transform: `translateX(${sfX}px)`,
          opacity: sfOp,
          textAlign: "right",
        }}
      >
        <div style={{ fontFamily: theme.sans, fontSize: 16, fontWeight: 600, color: theme.accent2, marginBottom: 8 }}>
          Salesforce · runtime + lifecycle
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginBottom: 8 }}>
          <div style={{ padding: "4px 10px", borderRadius: 4, background: `${theme.accent2}22`, color: theme.accent2, fontSize: 12 }}>
            sf CLI
          </div>
          <div style={{ padding: "4px 10px", borderRadius: 4, background: `${theme.accent2}22`, color: theme.accent2, fontSize: 12 }}>
            jsforce 3
          </div>
          <div style={{ padding: "4px 10px", borderRadius: 4, background: `${theme.accent2}22`, color: theme.accent2, fontSize: 12 }}>
            Tooling API
          </div>
        </div>
        <div style={{ color: theme.dim, fontSize: 13 }}>
          deploy · scratch · apex test · SOQL
        </div>
      </div>
    </AbsoluteFill>
  );
};
```

---

## 9. Scene 3 — `PersonaWorkflow.tsx` (B4)

**Purpose**: Show 4 personas (Designer → Developer → Reviewer → QA) ticking through a turn. Reviewer must visibly carry a `read-only` badge — this is a locked architecture decision and judges should see it.

**Layout**: full-width 4-step horizontal pipeline. Each step is a vertical stack:
- icon block (top)
- persona name
- verb + artifact (middle)
- model chip (bottom)

A glowing dot animates left-to-right along the connector to indicate active step. The currently-active step's card pulses + scales up 5%.

**Animation timeline (0–360 = 12s)**:
- 0–30: row of 4 cards drops in (cascade 8f stagger).
- 30–90: connector draws.
- 90–180: step 1 active (Designer).
- 180–240: step 2 active (Developer).
- 240–300: step 3 active (Reviewer · read-only badge highlights).
- 300–360: step 4 active (QA).
- The pulse dot moves continuously across the row.

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { PipelineNode } from "../part2/_shared/PipelineNode";
import type { Part3Props } from "../../compositions/part3-schema";

const EASE_OUT_EXPO = Easing.bezier(0.16, 1.0, 0.3, 1.0);
const EASE_STANDARD = Easing.bezier(0.4,  0.0, 0.2, 1.0);

const BEATS = {
  cascadeStart:    0,
  cascadeStagger:  8,
  cascadeDuration: 30,
  connStart:      30,
  connEnd:        90,
  step1Active:    90,
  step2Active:   180,
  step3Active:   240,
  step4Active:   300,
  endFrame:      360,
};

const MODEL_COLOR: Record<string, string> = {
  "claude-opus-4-7":   "#c4b5ff",
  "claude-sonnet-4-6": "#7cc4ff",
};
const MODEL_BG: Record<string, string> = {
  "claude-opus-4-7":   "#2a1f4a",
  "claude-sonnet-4-6": "#1f2a36",
};

type Step = Part3Props["beat4"]["steps"][number];
type Props = Part3Props["beat4"];

// ── per-step card (frame as prop, no hooks) ──────────────────────────────────
const StepCard: React.FC<{
  step: Step;
  index: number;
  total: number;
  frame: number;
  fps: number;
  activeIndex: number;
}> = ({ step, index, total, frame, fps, activeIndex }) => {
  const start = BEATS.cascadeStart + index * BEATS.cascadeStagger;
  const s = spring({
    frame: frame - start,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const dropY = interpolate(s, [0, 1], [-40, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const isActive = index === activeIndex;
  const activeScale = isActive ? 1.05 : 1.0;
  const activeBorder = isActive ? theme.accent : `${theme.accent}55`;
  const activeGlow = isActive ? `0 0 32px ${theme.accent}66` : "none";

  // Card layout
  const cardW = 380;
  const cardH = 320;
  const gap = 36;
  const totalW = total * cardW + (total - 1) * gap;
  const startX = (1920 - totalW) / 2;
  const x = startX + index * (cardW + gap);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 280,
        width: cardW,
        height: cardH,
        transform: `translateY(${dropY}px) scale(${activeScale})`,
        transformOrigin: "center center",
        opacity,
        borderRadius: 16,
        background: "#0e1530",
        border: `2px solid ${activeBorder}`,
        boxShadow: activeGlow,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: theme.mono,
        transition: "border-color 200ms, box-shadow 200ms",  // smoothes the active swap
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ color: theme.dim, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>
          STEP {index + 1}
        </div>
        {step.readOnly && (
          <div
            style={{
              marginLeft: "auto",
              padding: "3px 10px",
              borderRadius: 4,
              background: `${theme.warn}22`,
              color: theme.warn,
              fontSize: 11,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            read-only
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: theme.sans,
          fontSize: 32,
          fontWeight: 600,
          color: theme.fg,
          letterSpacing: -0.5,
        }}
      >
        {step.persona}
      </div>

      <div style={{ fontSize: 16, color: theme.fg }}>
        {step.verb}
      </div>

      <div style={{ fontSize: 14, color: theme.dim, fontStyle: "italic" }}>
        {step.artifact}
      </div>

      <div
        style={{
          marginTop: "auto",
          padding: "5px 10px",
          borderRadius: 5,
          background: MODEL_BG[step.model],
          color: MODEL_COLOR[step.model],
          fontSize: 13,
          letterSpacing: 0.3,
          alignSelf: "flex-start",
        }}
      >
        {step.model}
      </div>
    </div>
  );
};

// ── glowing dot that travels along the connector ─────────────────────────────
const TravelDot: React.FC<{ frame: number; total: number }> = ({ frame, total }) => {
  // Dot moves from card 1 → card N over frames 90..360 linearly.
  const cardW = 380;
  const gap = 36;
  const totalW = total * cardW + (total - 1) * gap;
  const startX = (1920 - totalW) / 2;
  const endX   = startX + totalW;

  const dotX = interpolate(frame, [BEATS.step1Active, BEATS.endFrame], [startX, endX], {
    easing: EASE_STANDARD,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const dotOp = interpolate(frame, [BEATS.connEnd, BEATS.step1Active, BEATS.endFrame], [0, 1, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 270 + 320 / 2,  // center of card row
        left: dotX,
        width: 14,
        height: 14,
        borderRadius: 7,
        background: theme.accent,
        boxShadow: `0 0 18px ${theme.accent}`,
        opacity: dotOp,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

// ── connector line under the cards ───────────────────────────────────────────
const Connector: React.FC<{ frame: number; total: number }> = ({ frame, total }) => {
  const cardW = 380;
  const gap = 36;
  const totalW = total * cardW + (total - 1) * gap;
  const startX = (1920 - totalW) / 2;

  const drawProg = interpolate(frame, [BEATS.connStart, BEATS.connEnd], [0, 1], {
    easing: EASE_STANDARD,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const len = totalW;
  const offset = (1 - drawProg) * len;
  const cy = 280 + 320 / 2;

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: 1920, height: 1080, pointerEvents: "none" }}
    >
      <line
        x1={startX}
        y1={cy}
        x2={startX + totalW}
        y2={cy}
        stroke={theme.accent}
        strokeOpacity={0.25}
        strokeWidth={3}
        strokeDasharray={len}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export const PersonaWorkflow: React.FC<Props> = ({ steps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which step is active (frame-based piecewise selection).
  let activeIndex = 0;
  if (frame >= BEATS.step4Active) activeIndex = 3;
  else if (frame >= BEATS.step3Active) activeIndex = 2;
  else if (frame >= BEATS.step2Active) activeIndex = 1;
  else if (frame >= BEATS.step1Active) activeIndex = 0;

  // Header fade-in
  const headerOp = interpolate(frame, [0, 30], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOp,
          fontFamily: theme.sans,
          fontSize: 36,
          fontWeight: 600,
          color: theme.fg,
          letterSpacing: -0.5,
        }}
      >
        Pick an org. Describe what you want.
      </div>

      <Connector frame={frame} total={steps.length} />

      {steps.map((step, i) => (
        <StepCard
          key={step.persona}
          step={step}
          index={i}
          total={steps.length}
          frame={frame}
          fps={fps}
          activeIndex={activeIndex}
        />
      ))}

      <TravelDot frame={frame} total={steps.length} />
    </AbsoluteFill>
  );
};
```

---

## 10. Scene 4 — `OneMoreThing.tsx` (B5)

**Purpose**: Apple-keynote silence beat. Hard cut to black, single mono line types out, dwell, hold to black for the next scene.

**Animation timeline (0–150 = 5s)**:
- 0–6: hard cut (background = black, contents at op 0).
- 6–60: line typewriters in (≈54 frames for 22 chars → ~2.4 chars/frame).
- 60–135: hold.
- 135–150: subtle dim-out into next scene.

```tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../../theme";
import { Typewriter } from "../part2/_shared/Typewriter";
import type { Part3Props } from "../../compositions/part3-schema";

const EASE_STANDARD = Easing.bezier(0.4, 0.0, 0.2, 1.0);

const BEATS = {
  hardCutEnd:      6,
  typeStart:       6,
  charsPerFrame:   0.45,    // "And one more thing." = 19 chars → ~42 frames
  dwellStart:     60,
  dwellEnd:      135,
  fadeOutStart:  135,
  fadeOutEnd:    150,
};

type Props = Part3Props["beat5"];

export const OneMoreThing: React.FC<Props> = ({ line }) => {
  const frame = useCurrentFrame();

  const fadeOut = interpolate(
    frame,
    [BEATS.fadeOutStart, BEATS.fadeOutEnd],
    [1, 0.4],
    { easing: EASE_STANDARD, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 64,
            fontWeight: 400,
            color: theme.fg,
            letterSpacing: -0.5,
          }}
        >
          <Typewriter
            text={line}
            startFrame={BEATS.typeStart}
            charsPerFrame={BEATS.charsPerFrame}
            caretColor={theme.accent}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

## 11. Scene 5 — `AskUserGate.tsx` (B6 + B7)

**Purpose**: This is the "Keep Thinking" prize moment. A realistic TUI ask_user modal appears, three callouts ("It stops. / It asks. / It waits.") flash in sequence, then the modal fades and the closing line "Your call. Always." centers and holds.

**Layout**:
- Centered `TerminalBox` (1100 wide) — contains the modal.
- Inside: ask_user header bar (warn-color) + 3 body lines + `[y/N]` prompt with cursor.
- Three callouts appear stacked on the right of the modal at frames 60 / 120 / 180.
- B7 begins at frame 210 (relative). Modal fades out, closing line fades in centered.

**Animation timeline (0–270 = 9s; B6 = 0–210, B7 = 210–270)**:
- 0–24: modal scales in from 0.85 with subtle backdrop blur.
- 24–48: header bar slides in (warn color).
- 48–96: body lines typewriter cascade.
- 96–120: prompt header `Deploy to prod-org? [y/N]` types in.
- 120–135: cursor starts blinking.
- 60–210: callouts flash in at 60 / 120 / 180 (each: 8-frame in, 12-frame hold, settle).
- 210–240: modal scales out + opacity 1→0; closing line fades in.
- 240–270: closing line holds, gentle scale 1.0→1.02.

```tsx
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../../theme";
import { TerminalBox } from "../part2/_shared/TerminalBox";
import { Typewriter } from "../part2/_shared/Typewriter";
import type { Part3Props } from "../../compositions/part3-schema";

const EASE_OUT_EXPO = Easing.bezier(0.16, 1.0, 0.3, 1.0);
const EASE_STANDARD = Easing.bezier(0.4,  0.0, 0.2, 1.0);

const BEATS = {
  modalSpringStart:    0,
  modalSpringDuration: 24,
  headerStart:        24,
  headerEnd:          48,
  bodyStart:          48,
  bodyCharsPerFrame:  1.2,
  promptStart:        96,
  promptEnd:         120,
  callout1Start:      60,
  callout2Start:     120,
  callout3Start:     180,
  calloutFadeIn:       8,
  // B7 transition (B6 scene-relative frame 210 = global B7 start)
  modalFadeOutStart:  210,
  modalFadeOutEnd:    240,
  closingFadeStart:   210,
  closingFadeEnd:     240,
  closingScaleEnd:    270,
};

type Props = {
  beat6: Part3Props["beat6"];
  beat7: Part3Props["beat7"];
};

// ── one callout — frame as prop, no hooks ─────────────────────────────────────
const Callout: React.FC<{
  text: string;
  index: number;
  frame: number;
  fps: number;
}> = ({ text, index, frame, fps }) => {
  const startMap = [BEATS.callout1Start, BEATS.callout2Start, BEATS.callout3Start];
  const start = startMap[index];

  const s = spring({
    frame: frame - start,
    fps,
    config: { mass: 0.6, damping: 12, stiffness: 200 },
  });
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  // Fade out with the modal at frame 210
  const exitOp = interpolate(
    frame,
    [BEATS.modalFadeOutStart, BEATS.modalFadeOutEnd],
    [1, 0],
    { easing: EASE_STANDARD, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity: opacity * exitOp,
        fontFamily: theme.sans,
        fontSize: 56,
        fontWeight: 700,
        color: theme.fg,
        letterSpacing: -1,
        textShadow: `0 0 24px ${theme.warn}66`,
      }}
    >
      {text}
    </div>
  );
};

export const AskUserGate: React.FC<Props> = ({ beat6, beat7 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── modal spring-in (0–24) ────────────────────────────────────────────────
  const modalSpring = spring({
    frame: frame - BEATS.modalSpringStart,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 130 },
  });
  const modalScale = interpolate(modalSpring, [0, 1], [0.85, 1.0]);
  const modalIn    = interpolate(modalSpring, [0, 1], [0, 1]);

  // ── modal fade-out (210–240) ─────────────────────────────────────────────
  const modalOut = interpolate(
    frame,
    [BEATS.modalFadeOutStart, BEATS.modalFadeOutEnd],
    [1, 0],
    { easing: EASE_STANDARD, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const modalOp = modalIn * modalOut;

  // ── header bar slide-in (24–48) ──────────────────────────────────────────
  const headerProg = interpolate(frame, [BEATS.headerStart, BEATS.headerEnd], [0, 1], {
    easing: EASE_OUT_EXPO,
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headerY  = interpolate(headerProg, [0, 1], [-12, 0]);
  const headerOp = interpolate(headerProg, [0, 1], [0, 1]);

  // ── prompt header typewriter (96–120) ────────────────────────────────────
  const promptShown = beat6.promptHeader.slice(
    0,
    Math.floor(
      interpolate(frame, [BEATS.promptStart, BEATS.promptEnd], [0, beat6.promptHeader.length], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
      }),
    ),
  );
  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  // ── closing line (210–270) ───────────────────────────────────────────────
  const closingOp = interpolate(
    frame,
    [BEATS.closingFadeStart, BEATS.closingFadeEnd],
    [0, 1],
    { easing: EASE_OUT_EXPO, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const closingScale = interpolate(
    frame,
    [BEATS.closingFadeEnd, BEATS.closingScaleEnd],
    [1.0, 1.02],
    { easing: EASE_STANDARD, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── backdrop dim (subtle) ────────────────────────────────────────────────
  const backdropOp = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* dimmed backdrop hint */}
      <AbsoluteFill
        style={{
          opacity: backdropOp * modalOut,
          background: `radial-gradient(ellipse at center, ${theme.bg} 0%, #000 80%)`,
        }}
      />

      {/* ── modal centered ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
          flexDirection: "row",
        }}
      >
        <div
          style={{
            transform: `scale(${modalScale})`,
            opacity: modalOp,
            transformOrigin: "center center",
          }}
        >
          <TerminalBox style={{ width: 880 }}>
            {/* ask_user header bar — warn color */}
            <div
              style={{
                transform: `translateY(${headerY}px)`,
                opacity: headerOp,
                margin: "-20px -28px 16px",
                padding: "10px 20px",
                background: `${theme.warn}22`,
                borderBottom: `1px solid ${theme.warn}66`,
                color: theme.warn,
                fontFamily: theme.mono,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              ⚠ {beat6.modalTitle}
            </div>

            {/* body lines — typewriter cascade */}
            <div style={{ fontFamily: theme.mono, fontSize: 18, lineHeight: 1.7, color: theme.fg }}>
              {beat6.modalBody.map((line, i) => {
                const lineStart = BEATS.bodyStart + i * 16;
                const lineLen = Math.floor(
                  interpolate(
                    frame,
                    [lineStart, lineStart + line.length / BEATS.bodyCharsPerFrame],
                    [0, line.length],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ),
                );
                const shown = line.slice(0, lineLen);
                const op = interpolate(frame, [lineStart, lineStart + 6], [0, 1], {
                  extrapolateLeft: "clamp", extrapolateRight: "clamp",
                });
                return (
                  <div key={i} style={{ opacity: op, marginBottom: 4 }}>
                    <span style={{ color: theme.dim }}>{i === 0 ? "→ " : "  "}</span>
                    <span>{shown}</span>
                  </div>
                );
              })}
            </div>

            {/* prompt line — y/N + blinking cursor */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 14,
                borderTop: `1px solid ${theme.accent}33`,
                fontFamily: theme.mono,
                fontSize: 22,
                color: theme.accent,
                letterSpacing: 0.5,
              }}
            >
              {promptShown}
              {frame >= BEATS.promptEnd && cursorBlink && (
                <span style={{ color: theme.warn }}>▍</span>
              )}
            </div>
          </TerminalBox>
        </div>

        {/* ── three callouts stacked to the right of the modal ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            alignItems: "flex-start",
          }}
        >
          {beat6.callouts.map((c, i) => (
            <Callout key={c} text={c} index={i} frame={frame} fps={fps} />
          ))}
        </div>
      </AbsoluteFill>

      {/* ── B7 closing line (centered, on top) ── */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: closingOp,
        }}
      >
        <div
          style={{
            transform: `scale(${closingScale})`,
            fontFamily: theme.sans,
            fontSize: 88,
            fontWeight: 700,
            color: theme.fg,
            letterSpacing: -2,
            textShadow: `0 0 36px ${theme.accent}66`,
          }}
        >
          {beat7.closingLine}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

## 12. Implementation order (suggested)

1. **timing.ts** — add `part3Beats` + `part3` export (no risk, decoupled).
2. **part3-schema.ts** — schema + defaults; lets `tsc --noEmit` validate before any scene is wired.
3. **OneMoreThing.tsx** — smallest scene, highest payoff; verify Typewriter + black-cut works.
4. **SFWizReveal.tsx** — wordmark + taglines.
5. **PersonaWorkflow.tsx** — 4-step pipeline; lots of layout but no novel mechanics.
6. **ArchitectureDiagram.tsx** — most complex; SVG fan-out + multiple panels.
7. **AskUserGate.tsx** — most consequential (prize moment); polish last with full attention.
8. **Part3Solution.tsx** — wires everything; subtitles tightened against actual VO WAVs once recorded.
9. **Root.tsx** — register composition; verify in Remotion Studio.

After each scene:
```bash
cd /Users/balfian/devs/hackathons/claude-code/demo/remotion
bunx tsc --noEmit
bun run dev   # opens Remotion Studio for visual QA
```

---

## 13. Verification checklist (Reviewer B lens)

Depth + Opus 4.7 lens — must hit all of these before declaring B-track done:

- [ ] **Both `claude-opus-4-7` and `claude-sonnet-4-6` strings appear on screen** in B3 (orchestrator + persona pills) and B4 (Designer/Reviewer = Opus, Developer/QA = Sonnet).
- [ ] **Reviewer card visibly carries `read-only` badge** in B4 — locked architecture decision surface.
- [ ] **`@anthropic-ai/sdk · messages.stream()`** label appears in B3 orchestrator card — judges see streaming claim is truthful.
- [ ] **3 RAG collection chips legible** in B3 Knowledge panel (`Apex reference`, `LWC guide`, `Release notes`).
- [ ] **`ask_user` modal title visible** with `permission required` subtext in B6.
- [ ] **No `interpolate` call** missing `extrapolateLeft`/`extrapolateRight: "clamp"` — grep audit before commit:
  ```bash
  rg -n "interpolate\(" demo/remotion/src/scenes/part3 | rg -v "extrapolateRight"
  # must return 0 hits
  ```
- [ ] **No hooks inside `.map()`** — every per-element scene component takes `frame` as a prop.
- [ ] **No raw frame numbers in JSX** outside the `BEATS` constant block — grep:
  ```bash
  rg -n "interpolate\(frame, \[\d" demo/remotion/src/scenes/part3
  # all matches must reference a BEATS.X constant
  ```
- [ ] **`bunx tsc --noEmit`** clean.
- [ ] **`bun test`** still passes (Part 3 adds zero unit tests; existing tests must not regress).
- [ ] **Remotion Studio** can scrub Part3Solution end-to-end without console errors.

---

## 14. Open questions for the user

These are not blockers — sensible defaults are baked into `part3Defaults` — but flagging for review:

1. **B5 line**: "And one more thing." vs. a localized variant (e.g. Japanese subtitle styling)? — Default: English-only, monoline, frame-60 typewriter.
2. **B6 callouts placement**: right-of-modal stacked (current plan) vs. below-modal centered. Right-stack reads better at 1920×1080; below-modal would crowd the prompt line.
3. **BGM**: Part 3 needs its own bed (`bgm/part-3.mov`). Asset is referenced but not yet committed — confirm path before render.
4. **VO file naming**: scheme `vo/part-3-bN-<slug>.wav` matches Part 2 — five files needed (`b1-reveal`, `b3-arch`, `b4-personas`, `b5-onemorething`, `b6-askgate`). B2 + B7 fold into the adjacent VO clips (no separate WAVs).

---

## 15. Risk register (Reviewer B specific)

| Risk | Probability | Mitigation |
|------|------|------|
| B3 connector fan-out math is off at non-1920 widths | low | hardcoded 1920 width matches Composition; tests at scrub-time |
| Subtitle frame ranges drift after VO regeneration | high | re-tighten `SUBTITLES` array via `ffmpeg silencedetect` after each VO regen — same workflow as Part 2 |
| `claude-haiku-4-5` chip distracts from the Opus message | medium | place haiku chip on `deploy-manager` (lowest-emphasis persona, far right); kept dim color contrast |
| B6 modal feels static during 7s VO | medium | callouts stagger keeps motion alive; cursor blink ensures the modal is never frozen |
| Read-only badge gets clipped on small displays | low | rendering target is 1920×1080; badge fits with 10px padding margin |

---

End of plan.
