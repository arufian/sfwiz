# Reviewer A — TUI Mock Visual Plan (Part 3, B1 tail + B6)

**Lens**: Impact + Demo. Goal: a pixel-accurate sfwiz TUI that says "this is a real product" the moment it lands. The ask_user gate is the Keep Thinking money shot.

## Canvas + frame budget

- 1920x1080, JetBrains Mono 22px (cell 13x26).
- Window chrome: macOS title bar (28px, `#1a1a1a`, traffic lights) + body `#0d1117` (theme BG[0]).
- Inner grid: tree 30 cols (~390px) | chat flex | side 28 cols (~360px). Status 3 rows + input 2 rows pinned.
- Border `#30363d`, accent `#00D1E6`, dim `#7d8590`, OK `#3fb950`, warn `#d29922`, inflight `#58a6ff`, user-bg `#0d2a33`.

## Realistic content (Quote rollup trigger task)

**Status bar**: `acme-dev · claude-opus-4-7 · 8.4k $0.21 · 📚 ✓ · ASK · 14:32`
**Tree** (header `tree · 3 changed`):
- apex/ — `◆ QuoteRollupTrigger.cls` (red), `◆ QuoteRollupHandler.cls` (red), `● AccountService.cls` (green)
- lwc/ — `● quoteSummary` (green)
- objects/ — `◆ Quote.object-meta.xml` (red)
- permsets/ — `● Sales_User.permset-meta.xml`

**Chat blocks** (top-down):
1. `❯ Add a Quote rollup that sums LineItem.TotalPrice into Quote.GrandTotal__c` (user, accent caret, bg `#0d2a33`)
2. `── persona → developer ──────────────────────────` (dim divider)
3. `▾ read_file (done · 142ms) force-app/.../Quote.object-meta.xml` (OK caret)
4. `▸ qmd_query (done · 318ms) "trigger handler pattern"` (OK)
5. Assistant markdown: "I'll add a `before update` trigger plus a bulk-safe handler. Writing two files…" (3 typed lines)
6. `▾ write_file (done · 89ms) QuoteRollupTrigger.cls` (OK)
7. `▾ write_file (done · 112ms) QuoteRollupHandler.cls` (OK)
8. `▍ thinking… 2s` + INFLIGHT equalizer bars (only present in B1 tail; replaced in B6)

**Side panel** (B1): persona card — `developer` heading, scope chips `read_file write_file sf_query qmd_query ask_user run_command`, then `tokens 8.4k / cache 62%`.

## B1 tail — frames 100–180 (SFWizReveal)

The wordmark holds at f=100. Boot the TUI as a real terminal would.

| f | Event | Animation |
|---|---|---|
| 100–108 | Window chrome fades in (alpha 0→1, 8f cubic-out) | scale 0.97→1.0 |
| 108–120 | Outer frame draws — top edge sweeps L→R (12f), then sides drop (8f) | drawLine progress |
| 120–135 | Tree header + groups type in line-by-line (1 line / 2f), `◆` symbols flash WARN→ERR on land | char-by-char |
| 130–150 | Status bar segments populate L→R: org → model → tokens → 📚 → ASK → clock (each 3f stagger, 6f fade) | opacity per chip |
| 135–158 | Chat blocks stream in: user bubble slide-up (4f), divider (2f), tools 3→7 cascade with caret color flash INFLIGHT→OK on each landing (3f each) | translateY 6→0 |
| 158–172 | Assistant text types char-by-char, ~30 chars/s (cursor `▍` blinks 0.5Hz) | per-glyph reveal |
| 172–180 | `thinking…` block appears bottom-of-chat with live equalizer (already animated component); side-panel cache % counts up 0→62 | counter ease |

Crop: full 1920x1080, **no zoom** — judges need to see the whole product.

## B6 — AskUserModal inside TUI (270 frames)

Re-use the B1 TUI as the live backdrop. The modal is the centerpiece.

| f | Event | Animation |
|---|---|---|
| 0–18 | TUI dims: overlay `#000` α=0→0.55 (18f ease-in); chat blocks desaturate via grayscale 0→0.6 | alpha + filter |
| 18–24 | `thinking…` block at chat bottom morphs into `▾ ask_user (running)` with WARN caret pulse | color tween |
| 24–48 | Modal scales in from caret position: 0.85→1.0, α 0→1, 24f spring (overshoot 1.04 at f=40) | transform-origin = caret |
| 48–60 | Modal border draws with WARN `#f8c200` glow (drop-shadow 0 0 12px); BG `#1a1206` | border progress |
| 60–96 | Header `── deploy QuoteRollupTrigger? ──────────…` types in (dim); question types: `Push 2 Apex files + 1 object change to acme-dev?` | char reveal |
| 96–135 | Three options fade-in stagger (8f each, 4f gap), color `#aaa`: `○ Run validate-only (recommended)`, `○ Deploy now`, `○ Cancel` | opacity + Y |
| 135–155 | Selection cursor lands on option 0 (`●` ACCENT `#4fc3f7`); preview block fades in showing `2 classes · 1 object · 0 destructive` (DIM) | bullet swap |
| 155–195 | **Hold** — modal idle, footer `↑/↓ select · Enter confirm · Esc cancel` visible; subtle 2px caret breathe on `●` | sin breath |
| 195–215 | Cursor moves to option 1 (`Deploy now`); preview swaps to `will modify production-tracked metadata` (WARN tint) | tween |
| 215–235 | Cursor returns to option 0; ENTER pulse — option 0 flashes OK `#3fb950`, modal scales 1.0→1.02→1.0 (12f) | pulse |
| 235–260 | Modal fades out (α→0, 25f); behind it the `ask_user` tool block flips caret `▾` OK with `(answered · validate)` summary | crossfade |
| 260–270 | TUI un-dims; new `▸ sf_deploy_validate (running)` block appears with INFLIGHT equalizer — sets up B7 | desat→1 |

## Key design decisions (locked)

- **Boot vs. snap**: boot sequence (B1 tail) — 80 frames of "real terminal coming alive" sells authenticity better than a snap-cut.
- **Streaming**: per-glyph reveal at 30cps for assistant text + blinking `▍` cursor. Tools land instant (caret color flash), not typed — matches real sfwiz behavior.
- **Tool block selection**: `read_file ✓ → qmd_query ✓ → write_file ✓ → write_file ✓ → ask_user ?` — shows the full agent loop, ending on the gate.
- **No zoom**: full 1920x1080. The TUI density IS the demo. Cropping would hide the dirtree+side-panel context that makes the gate feel inevitable.
- **Modal entry**: scales out of the running tool's caret — the gate visually IS the tool, not a separate UI layer. This is the Keep-Thinking beat: "the agent stopped itself."
- **Color load-bearing**: WARN border + BG `#1a1206` (warm amber-black) on the modal = the only warm element on screen. Eye goes there in <100ms.

## Assets needed

- One static screenshot of real sfwiz at f=180 state for tone-matching reference.
- Existing `Equalizer` animation logic ported to Remotion (random-walk bars, 130ms tick → 8 frames at 60fps).
- JetBrains Mono webfont in `public/fonts/`.
