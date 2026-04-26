# Part 1 Revision Plan — Reviewer A · FULL VISUAL REDESIGN

**Scope**: complete visual rewrite of all three Part 1 beats. Narration/subtitles already covered in prior revision and stay as-is unless noted. This document is **visual-only** and is implementation-grade.
**Files affected**:
- `demo/remotion/src/scenes/part1/Intro.tsx` (full rewrite)
- `demo/remotion/src/scenes/part1/MarketDemand.tsx` (full rewrite — renamed-in-spirit to `PlatformWorld`)
- `demo/remotion/src/scenes/part1/AutonomousAIEra.tsx` (keep ~60% — chaos/converge/shatter retained, ending fully replaced)
- `demo/remotion/public/` (new SVG assets listed in §6)
- No changes to `Part1Backstory.tsx` Sequence wiring or `timing.ts` budgets.

**Frame budgets (locked)**: Beat 1 = 0–360 (12s) · Beat 2 = 360–810 (15s) · Beat 3 = 810–1590 (26s). All frame numbers below are **scene-local** unless prefixed `abs:`.

**Canvas**: 1920×1080 @ 30fps. Theme tokens from `src/theme.ts` (`accent #7aa2ff`, `accent2 #ff7ab6`, `ok #5eead4`, `bg #0b1020`, `dim #7d86b3`, `fg #e8ecff`).

---

## The thesis the visuals must carry

Every frame of Part 1 must serve one of these three jobs:

1. **Beat 1**: establish that the narrator works inside a *specific, technical* Salesforce world — not generic "developer."
2. **Beat 2**: make the judge *feel* that Salesforce is a closed, complex, interconnected platform that requires expert knowledge. NOT "demand grew."
3. **Beat 3**: AI era arrived → Claude Code dominated → **but it does not speak this platform**. End on the gap, viscerally — not on triumph.

If a visual element does not advance one of those three jobs, cut it.

---

## BEAT 1 REDESIGN — "Inside the Salesforce Console" (0–360 · 12s)

### Visual metaphor

The narrator is **already inside the Salesforce platform** when we meet him. Instead of a generic name card over a video background (LinkedIn-style), we open on a stylized fragment of a **Salesforce IDE/Console workspace** — a developer's actual surface — with the name overlay treated as a side panel inside that workspace, not a billboard over a video.

A judge who has never opened Salesforce should still understand: "this person works in a specialized technical environment with code, metadata, and a specific UI."

### Layout (1920×1080)

Three vertical zones (left → right), all rendered as React DOM:

| Zone | Width | Content |
|---|---|---|
| **A — Metadata tree** | 0–460 | Faux file-tree pane mimicking VS Code / SFDX project: `force-app/main/default/` → folders `classes/`, `triggers/`, `lwc/`, `objects/`, `permissionsets/`, `flows/`. Each folder line shows count badge. |
| **B — Code editor** | 460–1340 | Faux Apex code panel with line numbers, syntax-highlighted Apex (see §B.code below). Cursor blink. Top tab strip with two tabs: `OpportunityTriggerHandler.cls` (active) and `AccountTrigger.trigger`. |
| **C — Identity card** | 1340–1920 | The name overlay. Positioned as if it were a Salesforce *side panel* — bordered card, mono header (`USER · SESSION`), accent rule. Contains kicker / name / subtitle plus a small "active org" line: `Org: production · API v62.0`. |

### Sub-beats / frame breakdown (scene-local 0–360)

**Sub-beat 1.1 — Workspace materializes (0–60 · 0–2s)**

- Frame 0–20: full black. From frame 10, scanline sweep top→bottom (CSS gradient mask animated via `interpolate(frame, [10,30], [0,1])` on a clip-path `inset(N% 0 0 0)`).
- Frame 20–60: zone A (tree) types in line-by-line — reuse a typed-text helper (`Math.floor(localFrame/2)` → `text.slice(0, n)` per line, staggered). 8 tree lines, ~6 frames each.

**Sub-beat 1.2 — Code editor types itself (40–180 · ~1.3s–6s)**

- Frame 40–50: editor panel container fades in (`interpolate(frame, [40,50], [0,1])`).
- Frame 50–180: the Apex sample is typed character-by-character. Use a single typed-text driver: `revealed = Math.min(code.length, Math.floor((frame-50) * CHARS_PER_FRAME))` with `CHARS_PER_FRAME = 0.85` so the block of ~110 chars finishes around frame 180. Render with `<pre>`; wrap each token in a `<span>` colored by syntax class.
- Cursor: a 2px-wide vertical bar at the current reveal position, blinking via `frame % 30 < 15`.

**Sub-beat 1.3 — Annotation callouts pop (180–260 · 6s–8.7s)**

- Three SVG arrows + small mono labels overlay the code, each spring-in:
  - At line `trigger OpportunityTrigger on Opportunity (before insert, before update)` → label `Apex trigger`.
  - At line `for (Opportunity opp : Trigger.new) {` → label `bulkified loop`.
  - At line `if (Limits.getQueries() > 90) return;` → label `governor limits`.
- Each callout: `spring({ frame: frame - (180 + i*25), fps, config:{damping:14, mass:0.6} })`. Opacity holds until frame 320.
- Why: these three labels are the entire reason a Salesforce specialist exists. The judge sees the *vocabulary of the platform* before any narration mentions it.

**Sub-beat 1.4 — Identity card slides in (90–250 · 3s–8.3s)**

- The right-zone identity card slides in from `translateX(40)` to `translateX(0)` and `opacity 0→1` between frames 90–130 (`spring`).
- Card content (top→bottom):
  - Mono kicker (16px, `theme.dim`, letterspacing 6, `props.kicker`)
  - Name (88px, `theme.fg`, weight 600, `props.name`)
  - Subtitle (28px, `theme.accent`, `props.subtitle`)
  - 12px gap
  - Mono detail line (15px, `theme.dim`): `Org: production · API v62.0`
  - Mono detail line (15px, `theme.dim`): `Stack: Apex · LWC · Flow · Metadata API`
- Card border: `1px solid ${theme.accent}33`, top accent rule 3px tall in `theme.accent`. Background `rgba(11,16,32,0.78)` with 10px backdrop blur.

**Sub-beat 1.5 — Hold + handoff (260–340 · 8.7s–11.3s)**

- Everything holds. Cursor keeps blinking. Tree pane shows a subtle highlight pulse on `triggers/` folder (use `interpolate((frame-260) % 60, [0,30,60], [0.4,1,0.4])` on a glow box-shadow) to draw the eye to the platform-specific concept.

**Sub-beat 1.6 — Fade to Beat 2 (340–360 · ~0.7s)**

- Whole composition `opacity` ramps `1→0` via `interpolate(frame, [340,360], [1,0], {extrapolateLeft:'clamp'})`. No camera move; cleanest possible cut into Beat 2 because Beat 2 starts on a different visual register.

### B.code — exact Apex sample to reveal

The eight visible lines (these are the literal characters typed):

```apex
trigger OpportunityTrigger on Opportunity (before insert, before update) {
  for (Opportunity opp : Trigger.new) {
    if (opp.StageName == 'Closed Won') {
      OpportunityHandler.applyDiscount(opp);
    }
    if (Limits.getQueries() > 90) return;
  }
}
```

7 lines, ~270 chars. At 0.85 chars/frame → 318 frames to fully type. We start typing at frame 50 → finishes around frame 50+318 = 368 — but we **early-cut** the typing driver at frame 180 and force `revealed = code.length` from frame 180 onward. (Visually: chars stream in fast for ~4.3s, then full code holds for the remaining ~6s. This is identical to how senior dev recordings look — no need to literally type at human speed.)

### Remotion primitives used (Beat 1)

- `useCurrentFrame`, `useVideoConfig` from `remotion`.
- `interpolate` for fades, scanline sweep, typing reveal, glow pulse.
- `spring({frame, fps, config:{damping, mass}})` for callout pops, identity-card slide-in.
- Plain React DOM for tree, code, identity card. Inline `<style>` not needed — all styles inline.
- One `<svg>` per arrow callout (path + circle terminator). 3 instances.
- No `<Img>` or `<Video>` — Beat 1 is fully procedural. We **delete** `intro-bg.mp4` from this scene (it stays in `public/` in case Beat 1 alt is needed later, but is unused by the new Intro).

### Why this serves the thesis

- **Specificity**: judges see `force-app/main/default/triggers/`, `Trigger.new`, `Limits.getQueries()`. None of that appears in a generic AI demo. The platform is named in pixels, not just narration.
- **Identity-as-context**: name lives *inside* a Salesforce workspace. The narrator is not a "developer who happens to do Salesforce" — he is rendered as a node inside the platform itself.
- **Sets up Beat 2**: the three callout labels (`Apex trigger`, `bulkified loop`, `governor limits`) are the seed vocabulary Beat 2 will explode into a full ecosystem map.

---

## BEAT 2 REDESIGN — "The Ecosystem Map" (360–810 · 15s · scene-local 0–450)

### Visual metaphor

A **living architecture diagram** of the Salesforce platform builds itself on screen as the narration speaks. Bar charts and inbox cards are **deleted**. The new beat is a node-and-edge graph that grows from one center node (`SALESFORCE ORG`) to ~24 connected concepts in 15 seconds. The viewer's eye watches complexity *accumulate*. By the end, the canvas is densely connected — a literal picture of "this is its own world."

The Japanese inbox card scroller is preserved in spirit only as a **secondary layer**: 4–5 cards drift faintly behind the diagram at low opacity (~0.2) as ambient texture proving "real demand", but the diagram is the protagonist. Bar chart is gone entirely.

### Layout

- Left column 0–540: title block (kicker + title) + a small 4-row "real inbound" ticker (replaces the bar chart's storytelling role using less canvas).
- Center+right 540–1920: the ecosystem diagram occupies most of the frame. Center node at (1280, 540). Outer ring radius ~440px. Second ring radius ~660px (for leaf children).

### The graph (24 nodes, 5 categories)

Center: `SALESFORCE ORG`

Five **category hubs** (inner ring, radius 440px, evenly spaced at 0°, 72°, 144°, 216°, 288°):

| Hub | Color | Children (outer ring) |
|---|---|---|
| `APEX` (top, 270°) | `theme.accent` | `Trigger`, `@IsTest`, `Governor Limits`, `SOQL` |
| `LWC` (top-right, 342°) | `theme.accent2` | `wire adapter`, `@AuraEnabled`, `Lightning Data Service` |
| `METADATA` (bottom-right, 54°) | `theme.ok` | `40+ XML types`, `sfdx-project.json`, `package.xml` |
| `ORG MODEL` (bottom-left, 126°) | `theme.warn` | `Profiles`, `Permission Sets`, `Sharing Rules`, `Roles` |
| `LIFECYCLE` (top-left, 198°) | `#c4b5fd` (purple) | `sf deploy`, `sf retrieve`, `Scratch Orgs`, `CI/CD` |

Total: 1 center + 5 hubs + 18 leaves = **24 nodes**.

### Sub-beats / frame breakdown (scene-local 0–450)

**Sub-beat 2.1 — Title + center node (0–60 · 0–2s)**

- Title block (kicker + `props.title`) springs in top-left, same pattern as the old MarketDemand, but `props.title` should be set to e.g. `"Salesforce is its own world."` via the schema default.
- Center `SALESFORCE ORG` node fades + scales in at frame 30: an SVG `<circle r=64>` with `theme.fg` stroke + dark fill, label inside at 18px mono.

**Sub-beat 2.2 — Hub ring grows (60–180 · 2s–6s)**

- Five hubs spawn one every 24 frames (frame 60, 84, 108, 132, 156). Each:
  - Edge from center to hub draws via SVG `<path>` with `stroke-dasharray` + `stroke-dashoffset` interpolation. `pathLen=440`, `dashoffset = pathLen * (1 - drawT)` where `drawT = interpolate(frame, [spawn, spawn+18], [0,1])`.
  - Node circle pops in via `spring` after edge completes (`frame: localFrame - 18`).
  - Label fades in below the node.

**Sub-beat 2.3 — Outer leaves grow (160–340 · ~5.3s–11.3s)**

- 18 leaves total. Each leaf parents off its hub. Spawn schedule: 18 leaves over 180 frames = 10 frames apart. Order: alternate between hubs so all hubs grow in parallel rather than one-at-a-time (avoids the "tree fills lopsidedly" feel).
- Each leaf same draw pattern: edge stroke-dashoffset draw → node spring → label fade.
- Leaf node smaller: `r=22`. Label 14px mono.
- Edge length ~220px. Slight curvature: use `<path d="M x1 y1 Q midx midy x2 y2">` with `midx/midy` offset 18px perpendicular for organic feel.

**Sub-beat 2.4 — Connection cross-links (300–390 · 10s–13s)**

- This is the **payoff beat.** Six extra dotted edges appear connecting non-sibling nodes, showing the platform is *not* a tree but a graph:
  - `Trigger` ↔ `Governor Limits`
  - `@IsTest` ↔ `SOQL`
  - `wire adapter` ↔ `@AuraEnabled`
  - `Permission Sets` ↔ `Profiles`
  - `package.xml` ↔ `sf deploy`
  - `Scratch Orgs` ↔ `Sharing Rules`
- Each: dashed stroke (`stroke-dasharray: 4 6`), `theme.dim` color, opacity 0.4, fades in 0→0.4 over 18 frames, staggered 12 frames apart from frame 300.
- These are the lines that make a judge mutter "oh."

**Sub-beat 2.5 — Counter overlay (340–430 · 11.3s–14.3s)**

- A small mono counter top-right (replaces the old `INBOUND ↑` block) increments live as nodes appear:
  - Top line: mono 14px, `theme.dim`, letterspacing 4: `PLATFORM SURFACE`
  - Big line: mono 72px, `theme.fg`: animated number going `0 → 247` between frames 340 and 420 via `Math.floor(interpolate(frame, [340,420], [0, 247], {extrapolateRight:'clamp'}))`.
  - Sub line: mono 16px, `theme.accent`: `concepts a specialist navigates`.
- 247 is a deliberately specific number (looks researched, not made up).

**Sub-beat 2.6 — Inbox echo (low opacity, 80–420)**

- 5 inbox cards (Japanese, reuse `messages[0..4]` from the deleted MarketDemand) drift up the **far left edge** (x: 20–280) at opacity 0.18, as background texture. Same drift logic as the old scene but compressed: `lifetime=300`, gap=40 frames between spawns starting at frame 80. They are barely visible; their job is *atmospheric proof of demand*, not foreground info. Bar chart is fully gone.

**Sub-beat 2.7 — Fade out (420–450 · 14s–15s)**

- Scene-wide opacity 1→0. Final frame: dense, web-like graph + `247 concepts a specialist navigates` line. That image is what the next beat cuts away from.

### Remotion primitives used (Beat 2)

- One `<svg width=1920 height=1080>` for the entire diagram (nodes + edges + cross-links). Children: `<path>` for edges (animate via `strokeDashoffset` on the element style), `<circle>` for nodes, `<text>` or HTML overlay for labels (HTML overlay is easier to style — render labels as positioned `<div>`s computed from the same node coords).
- Per-node spawn driven by `spring({frame: frame - spawnFrame, fps, config:{damping:14, mass:0.6}})`.
- `interpolate` for edge draw, opacity, counter number, fade-out.
- `useMemo` to precompute node coordinates once: `const nodes = useMemo(() => buildEcosystem(), [])`.
- Counter uses plain `Math.floor(interpolate(...))`.

### Data shape (drop into the new scene file)

```ts
type Node = { id: string; label: string; x: number; y: number; r: number; color: string; spawnFrame: number; parent?: string };
type Edge = { from: string; to: string; spawnFrame: number; dashed?: boolean };

// Center
// Hubs: 5 at angles [270,342,54,126,198] radius 440 from (1280,540)
// Leaves: parented per hub, evenly fanned across ±60° of hub angle, radius 220 from hub
// All built by a single buildEcosystem() helper.
```

### Why this serves the thesis

- The judge's eye watches the **platform inflate** in real time. By 6s they see 6 things connected. By 12s they see 24 things densely connected with cross-links. The phrase "Salesforce is its own world" lands on a literal picture of a world.
- Replaces "demand grew" (a market story) with "look how much surface there is" (a complexity story). That is the exact reframe the thesis requires.
- Sets up Beat 3 directly: when generic AI tools "arrive" in Beat 3, the audience already knows what they're trying to navigate.

---

## BEAT 3 REDESIGN — "Arrival, then the Gap" (810–1590 · 26s · scene-local 0–780)

### Visual metaphor (preserved from current)

The chaos → converge → shatter → Claude-Code-reveal sequence is the strongest piece of existing animation. Keep it. **Replace the ending entirely** — instead of two static text lines + Opus badge fading in over the lockup, the lockup gets *put on trial* against the Salesforce platform and visibly fails. The viewer leaves Part 1 having *seen* the gap, not just been told about it.

### Sub-beat structure (scene-local 0–780)

**Phases 0–530 (the kept material) — unchanged behavior, light retune**

| Phase | Frames | Behavior | Change |
|---|---|---|---|
| Ambient buzzwords | 0–60 | 15 buzzwords scatter/fade | KEEP |
| Chaos | 60–270 | 11 brand logos spawn at random positions, drift, jitter shake | KEEP — drop `chaosEnergy` peak from 1.0 to 0.85 to reduce motion-sick risk |
| Converge | 450–530 | Logos magnetize to center, opacity → 0 | KEEP |
| Shatter + flash | 530–600 | 27 polygon shards explode outward; white-screen flash | KEEP |
| Claude Code lockup | 600–680 | Spring-in lockup w/ wordmark + spark + Opus badge | KEEP — but the Opus badge now appears earlier (at 660 instead of 750) so it's visible during the gap-reveal beat |

**Phases 600–780 (the new ending) — REPLACES old gap-text tail**

The lockup, now established at center, **slides left** to make room for a Salesforce side. A vertical "chasm" appears between them. A code prompt and AI response play out in the chasm. A red error stamps the ending.

#### Sub-beat 3.A — Lockup repositions (640–700 · scene-local · ~21s–23s)

- Lockup translates from center `x=960` to `x=520` over 60 frames via `interpolate(frame, [640,700], [0,-440], {extrapolateLeft:'clamp'})`. Apply as `translateX` on the lockup wrapper (the existing `<AbsoluteFill alignItems:center>` structure changes — switch to absolute-positioned wrapper at `left:520, top:540` with `transform: translate(-50%,-50%)` plus the slide delta).
- Lockup scale shrinks slightly: 1.0 → 0.78.
- A vertical glowing line appears at `x=960` from `y=200` to `y=880`: SVG `<line>` with `stroke="${theme.accent2}"`, `strokeWidth=2`, `opacity` interpolating `[660,700] → [0,0.5]`. This is the "chasm spine."

#### Sub-beat 3.B — Salesforce side materializes (680–740 · ~22.7s–24.7s)

- On the right (centered at `x=1400, y=540`), a **Salesforce cloud icon + org card** fades in:
  - SVG cloud silhouette (custom path, ~280×180px, `fill="#00A1E0"` — official-feeling Salesforce blue, but we don't use the actual SF logo to avoid trademark issues — we use a stylized cloud).
  - Below it, a small mono card: `Apex · LWC · Metadata · 247 surface concepts` (callback to the Beat 2 number — the *same 247* the judge just watched accumulate).
  - Spring-in: `spring({frame: frame-680, fps, config:{damping:12, mass:0.6}})` driving scale `0.6→1` and opacity `0→1`.

#### Sub-beat 3.C — The prompt + response play out (700–770 · ~23.3s–25.7s)

A faux chat exchange plays *across* the chasm — visually demonstrating Claude Code (left side) trying and failing to reach the Salesforce side (right side).

Layout: a chat-bubble pair centered horizontally on the chasm at `y=420`:

- **User bubble** (left side, near lockup): mono 18px, `bg: rgba(122,162,255,0.12)`, border `1px solid ${theme.accent}66`, padding 16/20, rounded 12. Text typed character-by-character starting at frame 700, 1.4 chars/frame:
  > `> implement an Opportunity trigger that updates Account.Tier`

  ~58 chars → finishes by frame 700 + 41 = ~741.
- **Assistant bubble** (right side, lower y=520, near SF org): mono 16px, `bg: rgba(255,122,182,0.08)`, border `1px solid ${theme.accent2}55`. Text appears all at once at frame 745 with a 1-frame typewriter sweep so it feels like an AI response landing:
  > `trigger OppTrigger on Opportunity (after update) {`
  > `  for (Opportunity o : Trigger.new) {`
  > `    Account a = [SELECT Tier FROM Account WHERE Id = :o.AccountId];`
  > `    a.Tier = 'Gold'; update a;`
  > `  }`
  > `}`

  Critically the response **looks plausible** at first glance — clean Apex syntax. The error in the next sub-beat reveals what's wrong.

#### Sub-beat 3.D — RED ERROR STAMP (758–780 · ~25.3s–26s)

This is the *gut-punch frame.* The audience must remember this image.

- At frame 758: a horizontal red bar slams in across the assistant bubble. Implementation:
  - Bar: a rectangle (`<div>`) positioned absolutely over the assistant bubble (or a layer on top), height 64px, width matching bubble + 60px overhang, `background: linear-gradient(90deg, ${theme.err}, #ef4444 60%, ${theme.err})`, opacity 0.95, `border: 2px solid #fff`.
  - Slam-in: `transform: scaleX(0)→1` over 6 frames (frames 758–764), `transformOrigin: 'left'`, with a tiny shake in frames 764–772 (`translateX = (random(...)-0.5) * 6` per frame, gated on `frame ∈ [764,772]`).
  - Text on bar (mono 22px bold, white): `LIMITS.SOQL_QUERIES_EXCEEDED · governor limit hit at row 2`
- Simultaneously a red border pulse appears on the entire assistant bubble (`box-shadow: 0 0 0 3px ${theme.err}` interpolated `[758,766] → [0,1]`).
- A red caret + tiny annotation appears next to the offending line `Account a = [SELECT...]` saying `↑ SOQL inside FOR loop`. Mono 14px, `theme.err`. Fade in 760–770.

#### Sub-beat 3.E — Final tableau hold + fade (770–780 · ~25.7s–26s)

- Everything holds for ~10 frames. The final image of Part 1 is:
  - Left: Claude Code lockup (slightly dimmed, `opacity 0.85`).
  - Center: glowing chasm line.
  - Right: Salesforce cloud.
  - Across: red error stamp on the AI response.
- Scene fade-out from frame 770→780 via `interpolate(frame, [770,780], [1,0])`.

### Cuts from current Beat 3

| Removed | Why |
|---|---|
| Two-line gap text (`But Salesforce isn't like other codebases.` / `Most AI tools don't know that yet.`) | Replaced with a *visual* enactment of those exact sentences. The narration still says them; the screen shows them. |
| Static Opus badge at 750 | Moved earlier (660) so the Opus credential is on screen *before* the failure — reinforces "even with the best model, the platform isn't speakable yet." |
| Centered lockup hold for the whole tail | Lockup repositions left to make room for SF + chasm. |

### Remotion primitives used (Beat 3 ending)

- Reuse all existing primitives (chaos/converge/shatter/flash/lockup are unchanged).
- New: typed-text driver for chat bubbles (same pattern as Beat 1 code reveal).
- New: SVG cloud path for the SF org icon (single `<path>` in a custom `<SalesforceCloud />` component).
- New: error-stamp `<div>` with `transform: scaleX()` driven by `interpolate`.
- `spring` for SF org spring-in.
- `interpolate` for lockup slide, chasm-line opacity, error-bar slam, red-pulse box-shadow.
- `random` (already imported) for error-stamp shake.

### Why this serves the thesis

- The current ending says "AI tools don't know SF yet." The new ending **shows** an AI tool not knowing SF: it produces clean-looking code, then governor limits crash it. That is the *exact* failure mode of generic AI on Salesforce — straight from the user's task description (3, "Generic AI tools fail on this platform").
- The 247 callback ties Beat 2 and Beat 3 together: the surface area the judge watched accumulate is the same surface the AI just hit a wall against.
- The red `LIMITS.SOQL_QUERIES_EXCEEDED` stamp is the **single most memorable frame** of Part 1. It earns the Part 2 reveal: "you saw what generic AI does to Salesforce. Here's what specialized AI does."

---

## §4 · Implementation order (recommended)

A developer picking this up should ship in this order to maintain a working render at every step:

1. **Beat 3 ending refit first** (easiest — biggest payoff). Keep the existing chaos/converge/shatter intact; only modify the post-`PHASE_CLAUDE_REVEAL` tail. ~150 lines new code.
2. **Beat 1 rewrite second** (medium scope). Delete `intro-bg.mp4` references in `Intro.tsx`, rebuild as the workspace mock. ~250 lines new code.
3. **Beat 2 rewrite last** (biggest scope). Replace the entire `MarketDemand.tsx` with the ecosystem diagram. ~350 lines new code.

After each beat: `bun run dev` → spot-check that beat → continue. Do not re-render the whole video until all three are done; per-beat preview is enough.

---

## §5 · Phase-level frame map (final)

Combined absolute frames (for sanity-checking against subtitles in `Part1Backstory.tsx`):

| Abs frame | Beat | What's on screen |
|---|---|---|
| 0 | 1 | Black |
| 30 | 1 | Tree pane typing in |
| 100 | 1 | Code editor visible, typing |
| 230 | 1 | Three callouts pulsed in (Apex trigger / bulkified loop / governor limits) |
| 250 | 1 | Identity card fully in; full workspace held |
| 360 | 2 start | Title block + center node materializing |
| 540 | 2 | All 5 hubs visible, leaves growing |
| 720 | 2 | Cross-link dotted edges drawing in; counter ticking 0→247 |
| 800 | 2 | Final dense-graph image, fade starts |
| 810 | 3 start | Buzzwords ambient |
| 870 | 3 | Brand logos spawning |
| 1260 | 3 | Convergence happening |
| 1340 | 3 | Shatter + flash |
| 1410 | 3 | Claude Code lockup spring-in (claude-opus-4-7 badge appears at 1470) |
| 1450 | 3 | Lockup begins sliding left |
| 1490 | 3 | Salesforce cloud + 247 card materialize |
| 1510 | 3 | User prompt typing |
| 1555 | 3 | Assistant Apex response visible |
| 1568 | 3 | RED ERROR STAMP slams in |
| 1580 | 3 | Final tableau (lockup · chasm · SF · error) |
| 1590 | end | Black, hand off to Part 2 |

(Beat 3 internal phase constants in code: `PHASE_CHAOS_START=60`, `PHASE_CHAOS_PEAK=270`, `PHASE_CONVERGE_START=450`, `PHASE_LOGOS_GONE=530`, `PHASE_SHATTER=530`, `PHASE_CLAUDE_REVEAL=600`, **NEW** `PHASE_LOCKUP_SLIDE=640`, **NEW** `PHASE_SF_REVEAL=680`, **NEW** `PHASE_PROMPT_TYPE=700`, **NEW** `PHASE_RESPONSE=745`, **NEW** `PHASE_ERROR_STAMP=758`.)

---

## §6 · New asset list (none required, but optional)

All new visuals are procedural SVG/DOM. **No new asset files are strictly required.** The plan ships with zero new files in `public/`.

If the developer wants polish, optional adds:

- `public/icons/sf-cloud.svg` — stylized cloud silhouette for Beat 3 SF org. (Inline SVG path is fine; this is just for reuse.)
- `public/icons/folder.svg`, `public/icons/file-cls.svg` — tiny icons for Beat 1 tree pane. (Unicode glyphs `▸ ▾ ◆` work too — no asset needed.)

`intro-bg.mp4` is no longer referenced after Beat 1 rewrite. Leave the file in `public/` (don't delete) in case of rollback.

---

## §7 · Element-to-primitive index (for the implementer)

| Visual element | Remotion primitive(s) | Where |
|---|---|---|
| Scanline sweep (Beat 1) | `interpolate` on `clipPath: inset(N% 0 0 0)` | Intro.tsx new |
| Typed code reveal | `Math.floor((frame-start) * 0.85)` slice | Intro.tsx new + AutonomousAIEra.tsx tail |
| Cursor blink | `frame % 30 < 15` boolean | Intro.tsx new |
| Identity card slide-in | `spring({frame, fps, config:{damping:14, mass:0.6}})` | Intro.tsx new |
| Callout pop arrows | `spring` per callout + `<svg><path/></svg>` | Intro.tsx new |
| Tree highlight pulse | `interpolate((frame-260) % 60, [0,30,60], [0.4,1,0.4])` on box-shadow | Intro.tsx new |
| Edge draw (Beat 2) | `strokeDasharray={pathLen}` + interpolated `strokeDashoffset` | MarketDemand.tsx new |
| Node spring-in (Beat 2) | `spring` per node | MarketDemand.tsx new |
| Counter 0→247 | `Math.floor(interpolate(frame, [340,420], [0,247], {extrapolateRight:'clamp'}))` | MarketDemand.tsx new |
| Cross-link dashed edges | `<path stroke-dasharray="4 6">` + animated opacity | MarketDemand.tsx new |
| Inbox cards (background texture) | unchanged drift logic from current MarketDemand, opacity gated to 0.18 | MarketDemand.tsx new |
| Lockup slide-left | `interpolate(frame, [640,700], [0,-440])` on translateX | AutonomousAIEra.tsx tail |
| SF cloud spring-in | `spring({frame: frame-680, fps})` driving scale + opacity | AutonomousAIEra.tsx tail |
| Chat bubble typed user prompt | typed-text driver (1.4 chars/frame from frame 700) | AutonomousAIEra.tsx tail |
| Error stamp slam | `interpolate(frame, [758,764], [0,1])` on `transform: scaleX()` | AutonomousAIEra.tsx tail |
| Error stamp shake | `random("err-"+Math.floor(frame/2))-0.5)*6` gated `frame ∈ [764,772]` | AutonomousAIEra.tsx tail |
| Red bubble pulse | `interpolate(frame, [758,766], [0,1])` on `box-shadow` spread | AutonomousAIEra.tsx tail |

---

## §8 · Done criteria

A render is done when, watching Part 1 with audio off:

1. By frame 250 a non-Salesforce judge can name three platform-specific concepts visible on screen (`Apex trigger`, `bulkified loop`, `governor limits` — labeled directly).
2. By frame 800 the judge has watched a graph grow from 1 to 24 connected nodes and seen the counter `247 concepts a specialist navigates`.
3. By frame 1580 the judge has seen Claude Code produce Apex code that gets red-stamped with `LIMITS.SOQL_QUERIES_EXCEEDED`.

If all three checkpoints land *without narration*, the visuals carry the thesis. If any one fails, the redesign isn't done.

---

## §9 · What stays from prior plan

The narration script and `SUBTITLES` array from the previous version of this file are **still correct** and unchanged. The "speaks the platform" echo (Beat 2 ends with *"already speaks Salesforce"*; Beat 3 ends with *"doesn't speak the platform"*) now has a visual companion: Beat 2 ends on a 247-node graph, Beat 3 ends on Claude Code failing to navigate that same surface. Word-image alignment is now tight on both axes.
