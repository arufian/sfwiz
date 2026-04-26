# Part 3 Revision — Reviewer A (Impact + Demo lens)

> Full beat-by-beat visual design plan for Part 3 ("The Reveal"). 1800 frames @ 30 fps, 1920×1080.
> Lens: **product-launch impact + judge-legible tech surfacing**. Every beat lands a memorable frame; every motion is driven by `useCurrentFrame()` + `interpolate()` / `spring()` with explicit `Easing.bezier` curves.
> No external image assets — every visual is SVG/DOM rendered through Remotion primitives.

---

## 0. Design thesis

Part 1 named the platform problem. Part 2 named the agent gap. Part 3 is the **reveal + the soul shot**: this is what we built, this is the stack judges should remember, and this is the single keynote moment ("And one more thing.") that wins the **Keep Thinking** prize.

The visuals must do three jobs in 60 seconds — and every frame must serve at least one of them:

1. **Sell the product as a launch, not a feature tour.** B1 has to feel like an Apple keynote — a hard reveal, a wordmark that lands like a bass drop, then three taglines that each get their own beat.
2. **Surface the actual stack on screen.** Judges scan the architecture diagram for ~5 seconds of attention. `Opus 4.7`, `claude-agent-sdk`, `Anthropic SDK`, `qmd RAG`, `jsforce`, `sf CLI` must all be **directly readable mono-text** — not implied.
3. **Make the `ask_user` gate visceral.** B5 + B6 + B7 form the emotional payload. The hard cut to black ("And one more thing."), the trembling deploy modal, and the closing line are the three frames a judge will remember tomorrow. They are designed for thumbnail recall.

If a visual element does not advance one of those three jobs, cut it.

**Opus 4.7 surfacing rule (locked):**
- B3 architecture diagram has a dedicated `claude-opus-4-7` chip on the orchestrator node, color `theme.accent2` for emphasis.
- B4 persona ribbon shows model badge per persona — Reviewer + Designer = `opus-4-7`, Developer + QA = `sonnet-4-6`. This visually justifies the VO line "Opus 4.7 for judgment. Sonnet 4.6 for code."
- B6 modal footer reads `model: claude-opus-4-7 · awaiting your input` — Opus is the model that *chose to stop and ask*. That framing is what wins "Keep Thinking."

**Continuity hook from Part 2:**
- Part 2 ended on accumulated failures (red error stack). Part 3 frame 0 is **pure black**, ~10 frames of silence to clear that residue, then the wordmark hits. The contrast is the point.
- The `force-app/` mono-fragment from Part 2 reappears as one of the three "personas at work" panels in B4 (sub-beat 4.2) so the viewer feels we are operating on the same artifact, not a fresh demo.

---

## 1. Frame budget (locked)

| Beat | Scene-local frames | Absolute | Duration | Dominant visual |
|---|---|---|---|---|
| B1 — Wordmark reveal | 0–180 | 0–180 | 6.0 s | "SFWiz" wordmark spring + bass-drop |
| B2 — Three taglines | 180–450 | 180–450 | 9.0 s | Three lines, accent flashes per line |
| B3 — Architecture diagram | 450–1020 | 450–1020 | 19.0 s | Multi-tier graph, label-rich |
| B4 — Persona workflow | 1020–1380 | 1020–1380 | 12.0 s | 4 persona panels, baton hand-off |
| B5 — "And one more thing." | 1380–1530 | 1380–1530 | 5.0 s | Pure black, single mono line |
| B6 — `ask_user` gate | 1530–1740 | 1530–1740 | 7.0 s | Modal mock, deploy-to-prod prompt |
| B7 — Closing punch | 1740–1800 | 1740–1800 | 2.0 s | "Your call. Always." centered |

All frame numbers below are **scene-local** unless prefixed `abs:`.

---

## 2. BEAT 1 — Wordmark reveal (0–180 · 6.0 s)

### 2.1 Visual metaphor

A **product launch reveal**. We borrow the language of bass-drop hero shots: black void → wordmark slams in with overshoot spring → glyph holds for one beat → soft halo dissolves. No skeuomorphism, no terminal chrome — this beat is *brand identity*, not product UI. Every other beat earns its detail by contrast with this minimal opener.

The wordmark is rendered as **DOM text**, not SVG — `theme.sans` 240px weight 700, letter-spacing -2px. `S` and `W` are styled with a 4-stop linear gradient (`theme.accent` → `theme.accent2`), the `Wiz` glyphs stay solid `theme.fg`. This is the visual signature for the rest of the video; B6 reuses the same gradient on the modal accent rule.

### 2.2 Sub-beats

**Sub-beat 1.1 — Pre-roll black (0–10 · 0–0.33 s)**
- Pure `theme.bg` (#0b1020). No text, no shapes. This 10-frame silence is the load-bearing pause that lets the prior beat's residue clear and primes the bass-drop.
- Implementation: just an `AbsoluteFill` with `theme.bg`. Don't dim to zero — this *is* the bg; B5's hard cut to black uses the same color so the eye reads them as a matched pair.

**Sub-beat 1.2 — Vignette wash (10–25 · 0.33–0.83 s)**
- Radial gradient overlay fades up: center (`theme.accent` at 12% alpha) → edges (transparent). Implemented as a CSS radial-gradient div, opacity `interpolate(frame, [10, 25], [0, 1], { easing: Easing.bezier(0.16, 0.84, 0.44, 1) })`.
- This wash is the only thing on screen for 0.5 s. It tells the eye "something is about to happen here, in the middle."

**Sub-beat 1.3 — Wordmark slam (25–80 · 0.83–2.67 s)**
- The full wordmark "SFWiz" springs in with overshoot. `scale = spring({ frame: frame - 25, fps, config: { damping: 9, stiffness: 110, mass: 0.9 } })` — clamps near 1.0 around frame 70, but the underdamped curve gives ~1.08 overshoot at frame ~50 which sells the impact.
- `opacity = interpolate(frame, [25, 35], [0, 1])` — flash-on, no fade.
- A subtle **chromatic-aberration kick**: the same wordmark is rendered three times stacked, channels `#ff7ab6` (red ghost, translateX +6 → 0), `#5eead4` (cyan ghost, translateX -6 → 0), and the foreground gradient layer on top. The two ghosts converge to centered between frames 25–55. By frame 60 they overlap perfectly — the wordmark is "sharp" again. This is the only chromatic-aberration moment in the whole video; that scarcity is what makes it read as deliberate.
- `Easing.bezier(0.2, 0.9, 0.3, 1.05)` for the ghost-translate (the >1 final value is intentional for the slam).

**Sub-beat 1.4 — Tagline kicker (80–130 · 2.67–4.33 s)**
- 36px mono kicker fades in below the wordmark, vertical-centered offset +180px from wordmark baseline:
  ```
  ─── A TERMINAL AI HARNESS · BUILT FOR SALESFORCE ───
  ```
- Color `theme.dim`, letter-spacing 8px. `opacity` interpolated [80, 110] → [0, 1]. Em-dashes flank to echo the keynote-card aesthetic.
- A 1px horizontal rule in `theme.accent` at 40% alpha animates from `width: 0` to `width: 60%` (centered) between frames 90–130 — the "kicker pin" that locks the layout.

**Sub-beat 1.5 — Halo settle (130–180 · 4.33–6.0 s)**
- Outer glow on the wordmark (`box-shadow: 0 0 60px ${theme.accent}55`) breathes once: `interpolate(frame, [130, 155, 180], [1, 0.4, 0.7])` on opacity. This is the "exhale" — visual heart-rate dropping after the impact.
- The vignette wash from 1.2 holds through here at 80% intensity.
- VO "Meet SFWiz." lands in the 25–80 window. VO continues "A terminal AI harness. Built for Salesforce. From the ground up." spanning 80–180 — kicker text and VO are in lock-step.

### 2.3 Remotion primitives used
- `useCurrentFrame()`, `useVideoConfig()` for fps
- `interpolate()` with `Easing.bezier` curves (no linear easing anywhere in this beat)
- `spring()` with explicit `{ damping, stiffness, mass }` — never default config
- `AbsoluteFill` for the layered radial wash + wordmark stack

### 2.4 Why this serves the criteria
- **Impact (30%)**: bass-drop wordmark is the most thumbnail-recognizable frame in the entire video. If the judge only remembers one frame from Part 3, it should be this one.
- **Demo (25%)**: kicker text "A terminal AI harness · Built for Salesforce" pre-stages the demo claim before any UI is shown.
- **Depth (20%)**: chromatic aberration + spring overshoot + vignette wash demonstrate craft; ghosting is implemented frame-accurately, not as a CSS filter — which signals real Remotion fluency to a technical judge.

---

## 3. BEAT 2 — Three taglines (180–450 · 9.0 s)

### 3.1 Visual metaphor

A **lyric card sequence**. Each tagline gets its own dedicated beat (3 s × 3) with a percussive accent flash. Think of how a song lyric video drops one line at a time, each centered, each timed to a hit. The wordmark from B1 stays anchored top-center (scaled to 45%) so the viewer never loses the brand frame.

The three lines:
1. `One prompt.`
2. `Six AI personas.`
3. `Full pipeline.`

Each line is rendered in 120px `theme.sans` weight 600, with the period drawn in `theme.accent2` for emphasis. The viewer subconsciously reads the period as a "drop" — a punchline punctuation.

### 3.2 Sub-beats

**Sub-beat 2.1 — Wordmark dock (180–215 · 6.0–7.17 s)**
- The B1 wordmark scales `1.0 → 0.45` and translates `Y: 0 → -380` between frames 180–215 — it docks to top-center, leaving the canvas mid-third available for the taglines.
- `Easing.bezier(0.4, 0, 0.2, 1)` (Material standard). The kicker rule from B1 fades out [180, 200] → [1, 0].

**Sub-beat 2.2 — Line 1 "One prompt." (215–305 · 7.17–10.17 s)**
- **Background accent flash (215–225)**: a horizontal sliver — `height: 4px`, full canvas width, `theme.accent` color — sweeps left→right with `interpolate` on a `clip-path: inset(0 N% 0 0)`. 10 frames hit, then the bar fades to 0 over 5 frames. This is the visual *down-beat*.
- **Text reveal (220–250)**: "One prompt." appears with a per-character stagger — each character `opacity 0→1, translateY +12 → 0` over 6 frames, staggered 1 frame apart. Total reveal in 30 frames.
- **Underline pin (250–280)**: a 2px `theme.accent` rule grows under the text from center outward: `width: 0 → text-width`, anchored center. Easing `Easing.bezier(0.2, 0.8, 0.4, 1)`.
- **Hold (280–305)**: the full composition holds. Period in `theme.accent2` pulses once: `scale: 1 → 1.15 → 1` over 25 frames.

**Sub-beat 2.3 — Line 2 "Six AI personas." (305–395 · 10.17–13.17 s)**
- Line 1 exits with `opacity 1 → 0` and `translateY 0 → -8` over frames 305–315.
- Same down-beat rhythm as 2.2 but **accent color rotates to `theme.accent2`** (pink). The underline rule, the flash sliver, and the period color all switch. This 1-color shift between lines breaks visual monotony and signals progression.
- **Crucial detail**: at frame 340 (mid-hold of "Six AI personas."), six tiny circular dots animate in below the line, evenly spaced — `width: 8px`, `height: 8px`, alternating `theme.accent` / `theme.accent2`. These are the **persona seeds** that B3 will grow into full nodes. Plant them here so B3 feels seamless.
- Spring on each dot: `scale: spring({ frame: frame - (340 + i*3), fps, config: { damping: 8 } })`.

**Sub-beat 2.4 — Line 3 "Full pipeline." (395–450 · 13.17–15.0 s)**
- Line 2 exits frames 395–405.
- Down-beat rhythm — accent shifts to **`theme.ok`** (mint cyan). Three accent colors, three lines: visual triplet.
- **The six dots from 2.3 stretch into a horizontal line**: each dot's `width` interpolates `8 → 60` between frames 415–445 (`Easing.bezier(0.4, 0, 0.2, 1)`), and the gaps between them shrink to 0. The result is one continuous horizontal bar — the "pipeline" — that lives in the center of the screen.
- This bar will be the *aorta* of B3's architecture diagram.

### 3.3 Remotion primitives used
- Per-character `interpolate` stagger (driven by index in `.map()`, frames computed per-character — no hooks inside the map)
- `spring()` for dot pop-ins (frames 340–355)
- `interpolate()` with offset windows for the merge animation (per-dot start frame = 415 + i × 0)
- `Easing.bezier` curves on every motion — no linear

### 3.4 Why this serves the criteria
- **Impact (30%)**: the percussive flash + per-character stagger + period-as-color-accent make each line feel *paced*. This is the difference between "subtitle on screen" and "lyric on screen."
- **Demo (25%)**: the seeded dots → pipeline bar transition is a visual setup for B3 — the viewer is prepared for what they're about to see.
- **Depth (20%)**: 3-color rotation on the accent, plus the dot→bar morph, both demonstrate that animation is composed, not random.

---

## 4. BEAT 3 — Architecture diagram (450–1020 · 19.0 s)

### 4.1 Visual metaphor

A **living, labeled flow diagram** built around the horizontal "pipeline bar" carried over from B2. Three tiers stack vertically; the orchestrator sits dead-center with the most visual weight; six persona pills branch off in a fan; three external systems (Anthropic API, qmd RAG, Salesforce) anchor the right edge. Every node is a **labeled pill** with mono-font model/version IDs visible.

This is the beat where judges read the stack. Every label below must be **legible at 1080p thumbnail resolution** — minimum 24px, mono `theme.mono`, color `theme.fg` on dark pill backgrounds.

The viewer should be able to pause at any frame between 700 and 1020 and identify: TUI surface → orchestrator (Anthropic SDK) → 6 persona subagents (Claude Agent SDK) → external integrations (Anthropic API + qmd RAG + Salesforce sf CLI/jsforce).

### 4.2 Layout (1920×1080)

```
                          ┌─────────────────────────────┐
   TIER 1 (TUI surface)   │   sfwiz · TerminalBox       │  ← top, y=120, w=720
                          └─────────────┬───────────────┘
                                        │
                                        ▼
                       ╔════════════════════════════════╗
   TIER 2 (Orch.)      ║  Orchestrator · Anthropic SDK  ║  ← center, y=360, w=560
                       ║  model: claude-opus-4-7        ║
                       ╚═══════════════╤════════════════╝
                                       │
                ┌───────┬──────────────┼──────────────┬───────┐
                ▼       ▼              ▼              ▼       ▼  ← persona fan, y=620
            ┌──────┐┌──────┐       ┌──────┐       ┌──────┐┌──────┐
   TIER 3   │ Org  ││Design││ Developer ││Reviewer││  QA  ││Deploy│
            │admin ││  er  ││ sonnet-46 ││opus-47 ││sonnet││  Mgr │
            │opus47││opus47││           ││ R/O    ││  46  ││opus47│
            └──────┘└──────┘└──────────┘└────────┘└──────┘└──────┘
                                       │
   TIER 4 (Externals, right edge, y=860):
            [Anthropic API · streaming] [qmd RAG · 3 collections] [Salesforce · sf CLI + jsforce]
```

Detailed coordinates:
- **TIER 1 (TUI surface)**: x=600, y=120, width=720, height=140. Uses the existing `TerminalBox` component with a 3-line content: `$ sfwiz`, `> describe what you want`, blinking caret.
- **TIER 2 (Orchestrator)**: x=680, y=340, width=560, height=170. Heavy emphasis — 3px border in `theme.accent`, slight glow. Contains 3 lines of text: title (24px sans), `model: claude-opus-4-7` chip in `theme.accent2`, `Anthropic SDK · messages.stream()` in mono `theme.dim`.
- **TIER 3 (6 persona pills)**: y=620, x positions = [200, 480, 760, 1040, 1320, 1600] (centers), each 220×140. Use the existing `PipelineNode` component, customized.
- **TIER 4 (3 externals)**: y=860, three pills horizontally spaced. Each shows label + sub-label.

### 4.3 Sub-beats

**Sub-beat 3.1 — Bar morphs to pipe spine (450–490 · 15.0–16.33 s)**
- The horizontal bar from B2.4 (centered, y=540) anchors and **rotates 90° to vertical** while shrinking to a 4px-wide spine at x=960. `transform: rotate(0 → 90deg)` and `width: 60% → 4px` interpolated frames 450–490 with `Easing.bezier(0.4, 0, 0.2, 1)`.
- The 3 accent colors from B2 flow into the spine as a 3-stop vertical gradient: top `theme.accent` (TUI), middle `theme.accent2` (orchestrator), bottom `theme.ok` (externals).

**Sub-beat 3.2 — TIER 1 (TUI box) pops (490–540 · 16.33–18.0 s)**
- The TerminalBox materializes with `spring({ damping: 12, stiffness: 100 })` on scale, frames 490–520. `opacity` clamps in [490, 510] → [0, 1].
- 3-line content reveals via the shared `Typewriter` component, startFrame=510, charsPerFrame=1.5. Final caret blinks via `frame % 30 < 15`.
- A connector line draws from the TerminalBox bottom to spine: 1px in `theme.accent`, animated stroke-dashoffset from full-length to 0 over frames 525–540.

**Sub-beat 3.3 — TIER 2 (Orchestrator) materializes (540–620 · 18.0–20.67 s)**
- The orchestrator pill is the **hero of this beat**. Spring from `scale 0.7 → 1.0` with overshoot to 1.04, frames 540–600. Border pulses once (border-color goes `theme.accent → theme.accent2 → theme.accent`) over frames 580–620 to draw attention.
- Title "Orchestrator" types in [550, 575].
- The `claude-opus-4-7` chip slides in from the right at frame 580: `translateX +40 → 0`, opacity [580, 600] → [0, 1]. Background `theme.accent2` 22% alpha, border 1px `theme.accent2`. **This is the explicit Opus surfacing.**
- Mono detail line `Anthropic SDK · messages.stream()` types in [590, 620] using the same `Typewriter`.

**Sub-beat 3.4 — Persona fan deploys (620–800 · 20.67–26.67 s)**
- Six persona pills fan out from the orchestrator's bottom edge. Each pill starts at the orchestrator's bottom-center coordinate (x=960, y=510) and translates to its final fan position.
- **Stagger schedule**: pill `i` starts at frame `620 + i*12`, so pill 0 starts at 620, pill 5 at 680. Each pill has a 40-frame motion: `translateX/Y` from origin to target with `spring({ damping: 14, stiffness: 90 })`.
- Connector lines from orchestrator bottom to each pill top draw simultaneously: SVG path with `stroke-dashoffset` animation, 30 frames each, starting 5 frames after the pill begins moving.
- Each pill's text reveals once it lands: persona name (24px sans `theme.fg`) at frame `pill_start + 25`, model badge (16px mono, color-coded — `opus-4-7` in `theme.accent2`, `sonnet-4-6` in `theme.accent`) at frame `pill_start + 35`. Reviewer pill gets a small `read-only` lock-icon SVG in `theme.warn` at frame `pill_start + 40`.
- The 6 persona names match the registry: `Org Admin`, `Designer`, `Developer`, `Reviewer`, `QA`, `Deploy Mgr`.

**Sub-beat 3.5 — Claude Agent SDK halo (760–820 · 25.33–27.33 s)**
- An overlay banner appears across the persona fan: a 1px horizontal rule with a centered chip reading `via @anthropic-ai/claude-agent-sdk · query()`. Position y=580 (just above persona pills, below orchestrator).
- The chip slides in from off-canvas right: `translateX +200 → 0` over frames 760–790, then holds. Background `theme.bg` with 1px `theme.accent` border, padding 8px 16px, 18px mono.
- Why: judges *must* see "claude-agent-sdk" rendered as text. This banner is the second mandatory tech-stack surfacing after Opus 4.7.

**Sub-beat 3.6 — TIER 4 externals (820–950 · 27.33–31.67 s)**
- Three external pills slide in from the bottom edge (`translateY +60 → 0`), staggered 12 frames apart starting at frame 820:
  - **Pill A (x=320, y=860)**: `Anthropic API · streaming`, mono detail `betas: prompt-caching-2024-07-31` in 14px `theme.dim`.
  - **Pill B (x=960, y=860)**: `qmd RAG`, mono detail `apex-ref · lwc-guide · sf-releases` (the 3 collections).
  - **Pill C (x=1600, y=860)**: `Salesforce`, mono detail `sf CLI · jsforce 3`.
- Connector lines from each persona pill to the relevant external pills draw between frames 870–920. Routing logic:
  - Org Admin + Deploy Mgr → Salesforce (Pill C)
  - Designer + Developer + Reviewer + QA → Anthropic API (Pill A) AND qmd RAG (Pill B)
  - All 6 personas → Anthropic API (one bundled line through the orchestrator)
- These are the lines that show "personas use external systems." Color: `theme.dim` at 50% alpha so they don't clutter.

**Sub-beat 3.7 — Knowledge tail (920–990 · 30.67–33.0 s)**
- A small `Typewriter` line below qmd RAG types in: `scraped nightly · ETag-cached`. This is the "the agent learns the platform every single day" VO punchline made visible.
- A subtle pulse animation on the qmd RAG pill border every 30 frames (`borderColor` interpolating between `theme.ok` and `theme.dim`) — visual heartbeat representing the learn-worker.

**Sub-beat 3.8 — Hold (990–1020 · 33.0–34.0 s)**
- Full diagram holds for 30 frames. No new motion. This is the **diagram screenshot moment** — judges who pause here get the entire stack in one frame: TUI, Orchestrator (Opus 4.7), 6 personas with model badges, claude-agent-sdk banner, 3 externals.

### 4.4 Remotion primitives used
- `spring()` per-pill with offset start frames
- `interpolate()` with `Easing.bezier` for translates and color transitions
- SVG `<path>` with animated `strokeDashoffset` for connector lines (avoid Bezier curves — straight lines render crisp at 1080p)
- Reused shared components: `TerminalBox`, `PipelineNode`, `Typewriter` (always called at component scope, never inside `.map()`)
- `AbsoluteFill` layering for the banner chip overlay

### 4.5 Why this serves the criteria
- **Demo (25%)**: this beat is the "what is sfwiz" answer rendered in a single static frame. A judge skipping VO can still follow the stack.
- **Opus 4.7 Use (25%)**: the explicit `claude-opus-4-7` chip on the orchestrator + per-persona model badges (Reviewer + Org Admin + Designer + Deploy Mgr show `opus-4-7`) directly surface Opus across multiple roles. Reviewer + Designer using Opus reinforces "judgment / creative" framing.
- **Depth (20%)**: the diagram is composed of 11 nodes with explicit routing logic (which persona connects to which external). That's not decorative animation — it's information architecture.
- **Impact (30%)**: the persona fan at frame ~700 (peak motion) is the second-most-thumbnail-able frame after B1's wordmark.

---

## 5. BEAT 4 — Persona workflow (1020–1380 · 12.0 s)

### 5.1 Visual metaphor

A **relay race in panels**. Four horizontal panels stack left-to-right, each containing a real-looking artifact: Designer drafts a spec card, Developer types Apex, Reviewer scans for bugs (read-only badge prominent), QA shows test results. A **glowing baton** (a small accent2-colored token) passes from panel 1 → 2 → 3 → 4 in sync with the VO.

This beat is the **product-in-action** beat. Where B3 was the static stack diagram, B4 shows the stack *running*. Reuses Part 2's `force-app/` SFDX fragment so we feel "this is the same project we've been with the whole video."

### 5.2 Layout

Four panels horizontally, each 460×580, gap 8px, top y=240. Each panel has:
- Header strip (40px, `theme.bg` darker shade, 1px `theme.accent` border-bottom)
- Body (artifact content)
- Status pill bottom-right (8x16px text)

Persona-to-panel mapping:
- **Panel 1 — Designer**: spec card with bullets ("Custom object: Engagement__c", "Field: Score__c (Number 18,2)", "Trigger: before insert").
- **Panel 2 — Developer**: Apex code typing in real-time. Reuse the `force-app/main/default/classes/EngagementHandler.cls` motif from Part 2.
- **Panel 3 — Reviewer**: same code but with annotation callouts pointing at lines, plus a prominent read-only badge.
- **Panel 4 — QA**: terminal output: `sf apex run-tests` with green checkmarks streaming in.

### 5.3 Sub-beats

**Sub-beat 4.1 — Panels swing in (1020–1080 · 34.0–36.0 s)**
- Four panels enter from below, staggered 10 frames apart, with `spring({ damping: 14, stiffness: 100 })`. By frame 1080 all four are seated.
- Headers fade in with their persona name + small icon (Designer = pencil SVG, Developer = `</>`, Reviewer = magnifying-glass, QA = checkmark). Icons are inline SVG, 20×20, `theme.accent`.
- All four panels start at 35% opacity with empty bodies — they "wait their turn."

**Sub-beat 4.2 — Designer turn (1080–1170 · 36.0–39.0 s)**
- Panel 1 lights up: opacity goes `0.35 → 1.0` over 10 frames, border-color flashes to `theme.accent2`.
- Spec card content reveals via `Typewriter`, 3 lines, startFrame=1090, charsPerFrame=1.2.
- A small **baton dot** (12×12 circle, `theme.accent2`, glow shadow `0 0 20px theme.accent2`) appears in the panel center at frame 1120 and pulses.
- Panel 1 dims to 0.55 opacity at frame 1170 as the baton begins to migrate.

**Sub-beat 4.3 — Developer turn (1170–1260 · 39.0–42.0 s)**
- Baton dot translates from Panel 1 center → Panel 2 center over frames 1165–1185. `Easing.bezier(0.4, 0, 0.2, 1)`. Trail effect: 5 ghost dots fading behind.
- Panel 2 lights up at frame 1185 (opacity 0.35→1.0, border flash).
- Apex code types into the body — load 6 lines of `EngagementHandler.cls`. `Typewriter` startFrame=1195, charsPerFrame=2.0 (faster for code-feel). Cursor blinks at the end.
- Status pill bottom-right at frame 1245: `model: sonnet-4-6` in mono `theme.accent`. **This visually justifies the VO "Sonnet 4.6 for code."**

**Sub-beat 4.4 — Reviewer turn (1260–1340 · 42.0–44.67 s)**
- Baton migrates 1255–1275.
- Panel 3 lights up. Body shows the *same* Apex code from Panel 2, but with three SVG arrow-callouts pointing at specific lines:
  - Line 2: "missing null check"
  - Line 4: "potential bulkification issue"
  - Line 5: "governor limit risk"
- Each callout is `theme.warn` (yellow) — Reviewer's job is to flag, not fix.
- **A prominent `READ-ONLY` badge** in the top-right corner of the panel — 14px mono, `theme.warn` background, `theme.bg` text, padding 4×8. This badge **enters with a slight shake animation** (translateX oscillation ±2px for 6 frames) at frame 1295. The shake makes "read-only by design" tactile, not decorative.
- Status pill bottom-right at frame 1320: `model: opus-4-7` in `theme.accent2`. **Reviewer = Opus = judgment.**

**Sub-beat 4.5 — QA turn (1340–1380 · 44.67–46.0 s)**
- Baton migrates 1335–1355.
- Panel 4 lights up. Body is a terminal-style output:
  ```
  $ sf apex run-tests
  ✓ EngagementHandlerTest.testInsert (124ms)
  ✓ EngagementHandlerTest.testBulk (89ms)
  ✓ EngagementHandlerTest.testGovernor (203ms)
  3 passed · 0 failed
  ```
- Lines stream in one at a time, each with the green `✓` (`theme.ok`) appearing 3 frames before the test name.
- Final summary line "3 passed · 0 failed" appears at frame 1375, with a 1-frame flash to `theme.ok` background then settle.

### 5.4 Remotion primitives used
- `spring()` for panel swing-in
- `interpolate()` for baton translate (chained: 4 panels = 3 transitions, each with its own start/end window)
- Per-panel opacity state machine driven by frame thresholds
- SVG arrow callouts with spring entry
- Reused `Typewriter` for spec, Apex, terminal output

### 5.5 Why this serves the criteria
- **Demo (25%)**: this is "the product working" frame. A judge sees the actual personas producing actual artifacts. The baton makes the workflow legible — they don't need to interpret arrows.
- **Opus 4.7 Use (25%)**: the model badges appearing per-panel make the "Opus for judgment, Sonnet for code" claim *visible*. Reviewer's `opus-4-7` badge pairs with the read-only shake — Opus is *thinking, not doing*, which is the prize-winning frame.
- **Impact (30%)**: the read-only badge shake is the emotional micro-beat. Judges remember the shake.

---

## 6. BEAT 5 — "And one more thing." (1380–1530 · 5.0 s)

### 6.1 Visual metaphor

The **Apple keynote moment**. Hard cut to pure black. Single line of text appears, dead-center, mono font, low-key. No animation flourishes — the *absence* of motion is the impact.

This is the highest-leverage 5 seconds of the entire video. Everything before it has been building product confidence; everything after delivers the soul shot. The transition into this beat must be felt as a *gear change*.

### 6.2 Sub-beats

**Sub-beat 5.1 — Hard cut (1380 · 46.0 s)**
- Frame 1380: `AbsoluteFill` background `theme.bg` (#0b1020), nothing else. The B4 panels are *gone*, no transition, no fade. This is a single-frame jump cut.
- **Crucial**: do *not* fade B4 out. Implementation is two adjacent `Sequence` components — B4 ends at frame 1380, B5 begins at frame 1380, no overlap. Remotion renders them as a hard cut.
- The audio cue here is the VO line "And one more thing." starting around frame 1395 — there's a 15-frame silence between the cut and the VO that lets the black breathe.

**Sub-beat 5.2 — Text appears (1395–1440 · 46.5–48.0 s)**
- Text: `And one more thing.` (matching Apple's classic phrasing, lowercase except first word).
- Font: `theme.mono` (JetBrains Mono), 56px, color `theme.fg`, letter-spacing 1px. Centered both axes.
- Reveal: per-character `Typewriter` style, but **slow** — charsPerFrame = 0.45 (about 1 char per 2 frames). The slowness is the point. Total reveal across ~45 frames.
- No cursor, no underline, no decorations. The text is the only thing on screen.

**Sub-beat 5.3 — Hold (1440–1530 · 48.0–51.0 s)**
- Pure 90-frame hold. The text sits, unmoving. A single subtle effect: a 1px-tall rule fades in below the text (`theme.dim` at 30% alpha, width = text width, fade in [1470, 1500] → [0, 1]). This rule is the only motion in 3 seconds.
- The black around the text is the second-most-load-bearing element in the video (after the wordmark). Judges remember the *silence*.

### 6.3 Remotion primitives used
- `AbsoluteFill` with theme.bg
- `interpolate()` for the slow per-character reveal (computed from frame, not via setInterval — every frame deterministic)
- Hard cut via adjacent `Sequence` (no `<TransitionSeries>` here — that would defeat the cut)

### 6.4 Why this serves the criteria
- **Impact (30%)**: this is *the* Keep Thinking frame in pre-payload form. The phrase "And one more thing" is universally recognized as a "the real reveal is coming." That recognition does emotional work for free.
- **Depth (20%)**: the deliberate slowness of the typewriter — 0.45 chars per frame — is a craft signal. Most animators speed up text reveals; we slowed it down because the silence is the message.

---

## 7. BEAT 6 — `ask_user` gate (1530–1740 · 7.0 s)

### 7.1 Visual metaphor

A **deploy-to-production confirmation modal**, rendered as if mid-deploy. The modal is the visceral payload — it must feel *tactile*, like a real keystroke is required, like the pixels would respond to your finger if you reached for them. This is the prize-winning beat for "Keep Thinking" — the agent literally stops, asks, waits.

The visual claim: **other agents would just deploy. Ours stops. The product has judgment.**

### 7.2 Layout

Centered modal, 720×460, on top of a dimmed B4-style terminal background (the "context" — what was happening before the gate fired).

Modal anatomy (top-to-bottom):
1. **Title bar (60px)**: `theme.warn` accent left-rule (4px wide, full height), title text "Confirm deploy" in 28px sans `theme.fg`. Right-side: small `ask_user` chip in mono.
2. **Body (260px)**:
   - Mono pre-formatted block with the deploy summary:
     ```
     target org:    prod-org-arufian@example.com
     metadata:      EngagementHandler.cls
                    EngagementHandlerTest.cls
                    Engagement__c (object)
     test level:    RunLocalTests
     ```
   - Below the block, a single-line warning: `This will deploy to a production org. Continue?` in `theme.warn`.
3. **Action row (60px)**: two buttons, right-aligned. `[ N · cancel ]` in `theme.dim`, `[ y · proceed ]` in `theme.accent`. Bracket-style mono, 18px.
4. **Footer (40px)**: small mono line `model: claude-opus-4-7 · awaiting your input` in `theme.dim`. **This is the third explicit Opus surfacing.**

### 7.3 Sub-beats

**Sub-beat 6.1 — Background re-establishes (1530–1565 · 51.0–52.17 s)**
- The B5 black yields to a dimmed ghost of the B4 panel-4 (QA terminal) at 25% opacity. This says "we were mid-deploy when we stopped." The ghost is positioned full-canvas at z=0.
- Subtle scanline effect on the ghost: 2px horizontal lines, `theme.fg` at 4% alpha, `linear-gradient(transparent 50%, fg 50%)` background-size 4px, animated to scroll downward — 1 line per 4 frames. This is the only beat with scanlines; reserved for emphasis.

**Sub-beat 6.2 — Modal frame appears (1565–1605 · 52.17–53.5 s)**
- The modal box materializes with `spring({ damping: 11, stiffness: 95 })` on scale, frames 1565–1600. Starts from 0.85 → 1.0 with mild overshoot.
- Border draws in: 2px `theme.warn`, animated via stroke-dashoffset around the perimeter, completing at frame 1595.
- Background `rgba(11, 16, 32, 0.97)` with 12px backdrop-blur for tactile separation from the dimmed terminal behind.
- Title bar text "Confirm deploy" types in [1580, 1605].

**Sub-beat 6.3 — Body content reveals (1605–1670 · 53.5–55.67 s)**
- Mono deploy summary types line-by-line via `Typewriter`, startFrame=1605, charsPerFrame=2.5 (faster — this is read-as-data, not narration).
- Warning line `This will deploy to a production org. Continue?` appears at frame 1655. This line has **a single subtle pulse**: opacity oscillates `1 → 0.7 → 1` over 30 frames once, anchored at frame 1660. The pulse is the visual equivalent of a held breath.

**Sub-beat 6.4 — Action buttons + cursor wait (1670–1720 · 55.67–57.33 s)**
- The two buttons spring in from below (translateY +12 → 0), staggered 4 frames: cancel at frame 1670, proceed at frame 1674.
- At frame 1690, **a blinking cursor `_` appears next to the proceed button** — 2px wide, `theme.fg`, blinking via `frame % 30 < 15`. This is the visceral "waiting for you" element. The cursor blinks 3 times across the remaining 50 frames.
- VO "Before any deploy — it stops. It asks. It waits." spans roughly 1565–1730. Each VO emphasis ("stops" / "asks" / "waits") syncs to a visual: "stops" = modal lock-in (frame 1600), "asks" = body text complete (frame 1670), "waits" = cursor blink begins (frame 1690).

**Sub-beat 6.5 — Footer with model attribution (1700–1740 · 56.67–58.0 s)**
- Footer line `model: claude-opus-4-7 · awaiting your input` fades in at frame 1700, opacity [1700, 1720] → [0, 1]. Color `theme.dim`.
- The text "claude-opus-4-7" within the footer is rendered in `theme.accent2` (matching B3's chip color) so the eye picks it out.
- Why: this is the prize-claim frame. **The agent waiting is Opus. Opus is what stops to think.** That association — Opus = stop-and-ask — is the Keep Thinking thesis in a single line.

### 7.4 Remotion primitives used
- `spring()` for modal scale entry
- `interpolate()` with `Easing.bezier` for individual element opacity / position
- SVG perimeter stroke for border draw-in
- CSS `backdrop-filter: blur(12px)` for separation from background
- `Typewriter` for body content
- Frame modulus for cursor blink

### 7.5 Why this serves the criteria
- **Impact (30%)**: the modal pause + cursor blink + warning pulse is the most tactile sequence in the video. The viewer *feels* the wait. This is the unforgettable beat.
- **Demo (25%)**: it's a real `ask_user` modal — concrete, specific (real org address, real metadata names), not a wireframe. Judges who have used Claude Code recognize the pattern instantly.
- **Opus 4.7 Use (25%)**: the footer attribution `model: claude-opus-4-7 · awaiting your input` makes Opus the *subject* of the pause. This is the strongest single-frame claim for "Keep Thinking" in the entire submission.
- **Depth (20%)**: scanline ghost background, blur backdrop, perimeter stroke draw-in, button stagger, cursor blink — five distinct craft elements layered without crowding.

---

## 8. BEAT 7 — Closing punch (1740–1800 · 2.0 s)

### 8.1 Visual metaphor

The **product tagline frame**. Two short sentences, dead-center, large sans, slow fade. This is the credit-roll moment — clean, bold, calm. The viewer's emotional state should be: "yes, I want to try it."

### 8.2 Sub-beats

**Sub-beat 7.1 — Modal dissolve (1740–1755 · 58.0–58.5 s)**
- The B6 modal fades out: opacity `1 → 0` between frames 1740–1755 with `Easing.bezier(0.4, 0, 0.2, 1)`. The dimmed background ghost fades simultaneously.
- Background returns to pure `theme.bg`.

**Sub-beat 7.2 — Closing line (1745–1790 · 58.17–59.67 s)**
- Two lines, stacked, centered on the canvas:
  - **Line 1**: `Your call.` — 96px sans, weight 600, `theme.fg`. Period in `theme.accent2`.
  - **Line 2**: `Always.` — 96px sans, weight 600, `theme.accent`. Centered below Line 1 with 24px gap.
- Line 1 reveal: per-character stagger, frames 1745–1770. Same stagger pattern as B2 (1 frame per char, 6-frame fade per char).
- Line 2 reveal: starts after Line 1 holds for 8 frames. Frames 1772–1790. Same stagger, slightly faster.
- The accent2 period after "call" lights up at frame 1768 (just before "Always." begins) — visual hand-off.

**Sub-beat 7.3 — Wordmark return + fade-to-black (1790–1800 · 59.67–60.0 s)**
- The B1 wordmark "SFWiz" reappears at the very bottom of the canvas (y=940, scale 0.3, centered) at frame 1790, fades in `opacity 0 → 0.6` over 6 frames. This is the **logo signature** — the lyric ends, the brand mark returns.
- Whole canvas fades to black `opacity 1 → 0` over the final 8 frames (1792–1800). Last frame is pure `theme.bg`.

### 8.3 Remotion primitives used
- Per-character stagger (same pattern as B2)
- `interpolate()` for opacity fades
- No springs in this beat — the closer is *calm*, motion would betray that

### 8.4 Why this serves the criteria
- **Impact (30%)**: clean, bold, exactly 2 seconds. Period-as-color-accent ties back to B2 — the video closes with the same visual grammar it opened with, which is the definition of a polished short.
- **Demo (25%)**: "Your call. Always." is the product promise distilled — judges leave with one phrase to remember.

---

## 9. Cross-beat motifs (continuity rules)

These rules are the connective tissue between beats. Implementer should treat them as invariants.

### 9.1 Color rotation (3-color visual triplet)
- B2 establishes the `theme.accent` (blue) → `theme.accent2` (pink) → `theme.ok` (mint) triplet, one color per tagline.
- B3 reuses the triplet: blue = TUI tier, pink = orchestrator tier, mint = externals tier (the spine gradient stops match exactly).
- B4 model badges: blue = sonnet-4-6, pink = opus-4-7. (mint reserved for QA's pass icons.)
- B7 closer: pink period after "call", blue text on "Always" — closes the loop.

The accent rotation is the visual **fingerprint** of Part 3. Don't break it without justification.

### 9.2 Period as design element
- Every tagline that ends with a period treats the `.` as a *colored* accent (B2 lines, B7 lines).
- This pattern is established in B2 and reinforced in B7 — judges who notice it once recognize the closing as "a callback."

### 9.3 Model surfacing checkpoints
- B3 orchestrator chip → `claude-opus-4-7` (mandatory, frame 580–620)
- B3 persona pills → 4× `opus-4-7` chips (Org Admin, Designer, Reviewer, Deploy Mgr) + 2× `sonnet-4-6` (Developer, QA)
- B3 Claude Agent SDK banner → `via @anthropic-ai/claude-agent-sdk` (mandatory, frame 760–820)
- B4 panel status pills → per-persona model badge (mandatory, frames 1245 + 1320)
- B6 footer → `model: claude-opus-4-7 · awaiting your input` (mandatory, frame 1700+)

Five surfacing moments. The submission cannot be ambiguous about the stack.

### 9.4 No flat fade-ins
- Every entry uses `spring()` or `Easing.bezier`. There is **zero linear easing** in this part. Linear easing reads as "lazy implementation" to a technical judge — the fix is one extra parameter per `interpolate` call.

### 9.5 Hard cuts only at B5
- B1→B2, B2→B3, B3→B4 use `<TransitionSeries>` with 8-frame `springTiming` cross-fades.
- B4→B5 is a **hard cut** (adjacent `Sequence`, no overlap). This is the only hard cut in Part 3 and that scarcity is what makes it land.
- B5→B6 cross-fades via 15-frame opacity ramp (`AbsoluteFill` with `interpolate(frame, [1530, 1545], [0, 1])` driving B6 opacity). Background is allowed to bleed.
- B6→B7 cross-fades via 15-frame opacity ramp.

### 9.6 Premount budget
Architecture diagram (B3) and persona panels (B4) have heavy DOM. Use `premountFor={30}` on those Sequences to avoid first-frame layout pop. B1 and B5 do not need premounting (minimal DOM).

### 9.7 Audio sync anchors
The implementer should verify VO alignment at these specific frames:
- Frame 25: "Meet" first phoneme = wordmark slam
- Frame 220: "One" = first tagline accent flash
- Frame 540: "An orchestrator" = orchestrator pill spring start
- Frame 1090: "Designer drafts" = Panel 1 lights up
- Frame 1395: "And one more thing" = first character types in B5
- Frame 1605: "Before any deploy" = modal body begins typing
- Frame 1745: "Your call" = first character of closing

These anchors trump the frame ranges if there's a 5-frame slip in the VO recording — slide the visual, not the audio.

---

## 10. Files affected

- `demo/remotion/src/scenes/part3/Wordmark.tsx` (new — B1)
- `demo/remotion/src/scenes/part3/Taglines.tsx` (new — B2)
- `demo/remotion/src/scenes/part3/Architecture.tsx` (new — B3)
- `demo/remotion/src/scenes/part3/PersonaWorkflow.tsx` (new — B4)
- `demo/remotion/src/scenes/part3/OneMoreThing.tsx` (new — B5)
- `demo/remotion/src/scenes/part3/AskUserGate.tsx` (new — B6)
- `demo/remotion/src/scenes/part3/Closing.tsx` (new — B7)
- `demo/remotion/src/scenes/part3/Part3Reveal.tsx` (new — TransitionSeries wiring + Audio)
- `demo/remotion/src/scenes/part3/_shared/ModelChip.tsx` (new — model badge component reused across B3/B4/B6)
- `demo/remotion/src/scenes/part3/_shared/AccentRule.tsx` (new — animated 1px rule reused across B1/B2/B7)
- Reuse: `demo/remotion/src/scenes/part2/_shared/Typewriter.tsx`
- Reuse: `demo/remotion/src/scenes/part2/_shared/TerminalBox.tsx`
- Reuse: `demo/remotion/src/scenes/part2/_shared/PipelineNode.tsx`
- `demo/remotion/src/timing.ts` (extend with Part 3 frame constants — beat starts and audio anchors)
- VO clips:
  - `demo/remotion/public/vo/part-3-clip-1.wav` (B1+B2, ~15 s)
  - `demo/remotion/public/vo/part-3-clip-2.wav` (B3+B4, ~33 s)
  - `demo/remotion/public/vo/part-3-clip-3.wav` (B5+B6+B7, ~12 s)

No new image assets — every visual is SVG/DOM.

---

## 11. Implementation order (suggested)

1. **B1 + B7 first** (the bookends) — establish the color rotation and wordmark style. Quick to land, high payoff.
2. **B5** (one-more-thing) — trivially simple; nailing the timing here is mostly an audio/VO sync exercise.
3. **B6** (ask_user gate) — the prize-winning beat. Implement after B1/B5/B7 so the visual language is set; do not implement against an empty grammar.
4. **B2** (taglines) — establishes the dot-seed → bar → spine continuity.
5. **B3** (architecture) — the biggest beat. Build incrementally: spine first → orchestrator → personas → externals. Test each tier in isolation.
6. **B4** (persona workflow) — last; reuses everything from B3 plus shared components.

After all beats land, do a **single full-render pass** to verify the 5 model-surfacing checkpoints and the color-triplet continuity. Anything that breaks those rules is a bug, even if it "looks fine" in isolation.

---

## 12. Risks + mitigations

| Risk | Mitigation |
|---|---|
| B3 architecture beat feels crowded at 1080p | Test at thumbnail resolution (480×270) early; if labels become illegible, drop to 4 personas in fan + collapse Org Admin/Deploy Mgr into orchestrator footnote |
| Wordmark chromatic aberration looks like a render bug | Make the convergence explicit (frames 25→55) — by frame 60, ghosts are 100% overlapped. Verify at multiple playback speeds. |
| B6 modal is too "designed" and loses the visceral feel | Keep it ugly-but-real: monospace data block, no rounded corners on inner panels, no shadow gradients. Tactile = boring is OK. |
| VO drift across the 60s | Lock the 7 audio sync anchors (§9.7) and let visuals slide ±5 frames around them |
| Read-only badge shake reads as a bug | Limit to 6 frames with explicit easing; pair with status pill text "read-only · catches bugs" so context is anchored |

---

## 13. Definition of done (for implementer)

- [ ] Every Sequence wrapped in `<TransitionSeries>` except the B4→B5 hard cut
- [ ] All `interpolate` calls have explicit `Easing.bezier` (zero linear)
- [ ] All `spring` calls have explicit `{ damping, stiffness, mass }` (zero default config)
- [ ] No hooks called inside `.map()` — always at component scope, frame computed per-element via index math
- [ ] All 5 model-surfacing checkpoints render readable mono-text (verified at 1080p)
- [ ] Color triplet (`accent` / `accent2` / `ok`) appears in B2, B3, B4, B7 in the documented mapping
- [ ] B5 is a hard cut (no transition into or out of the line reveal beyond the slow typewriter)
- [ ] B6 modal footer line reads exactly `model: claude-opus-4-7 · awaiting your input`
- [ ] `tsc --noEmit` clean
- [ ] Render at 1080p completes without dropped frames; render at 480×270 thumb still legible for B3 + B6
