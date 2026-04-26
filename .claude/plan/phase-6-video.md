# Phase 6 — Demo video

Status: **in-progress (rewrite 2026-04-26)**.

> **2026-04-26 rewrite — drop VHS · drop Crossbeam-mirror script · drop CC0 sample voice.**
>
> New direction:
> - **All-Remotion** for visuals — no VHS, no terminal capture. Remotion is capable enough for the entire video including any terminal-style mock UI.
> - **3-part narrative**, not 7-beat. Personal-story arc → struggle → solution. Scripts already drafted at `demo/my-own/part-{1,2,3}-*.md`.
> - **Cloned-voice VO** via Coqui XTTS v2, using the user's own voice sample at `demo/my-own/my-voices.m4a` (English, third language — voice-clone is the deliberate quality lever; spoken English by user not used).
> - **Three background music tracks** — gloomy / bright-pop / energetic-clap-drum — supplied by user, dropped into `demo/remotion/public/bgm/`.
> - **Total length ~2:40** (Part 1 = 40 s, Part 2 = 60 s, Part 3 = 60 s). Hard cap 3 min.
>
> Companion plan (file-level changes, build order, audio wiring details): `~/.claude-personal/plans/splendid-chasing-spark.md`.

Hackathon deliverable. Voice-only narration. Zero terminal capture, zero post-edit timeline software, zero non-OSS tools.

---

## 1. Targets

| Metric | Value |
|--------|-------|
| Length | ≤ 3 min, target 2:40 (160 s = 4800 frames @ 30 fps) |
| Aspect | 16:9 @ 1920×1080 |
| Fps | 30 |
| Codec | H.264 (mp4) + AAC stereo |
| Size budget | ≤ 60 MB (hackathon upload limits) |
| Captions | optional — user's `ig` karaoke tool can burn `.srt` post-render |
| Language | English VO only (cloned from user's reference sample) |

## 2. Narrative arc — 3 parts (first-person, cloned-voice VO)

Source scripts (already finalized by user):

- `demo/my-own/part-1-backstory.md` — Intro · Market Demand · Autonomous AI Era (~80 words)
- `demo/my-own/part-2-current-struggle.md` — Current Efforts · Pain Points (~150 words)
- `demo/my-own/part-3-solution.md` — Introducing SFWiz · Architecture · How it works (~120 words)

Tone per part:

| Part | Length | BGM theme | Visual tone |
|------|--------|-----------|-------------|
| 1 Backstory | 40 s | gloomy / minor-key | muted, slow drift, building tension |
| 2 Struggle | 60 s | bright pop | brighter palette, faster motion, pipeline diagrams |
| 3 Solution | 60 s | energetic clap-drum (Apple-keynote-like) | high contrast, hard cuts, bass-drop reveal |

### Part 1 — Backstory (40 s · 1200 frames)

| Beat | Frames | Visual |
|------|--------|--------|
| "Hey, I'm Alfian" | 0–180 | Centered name typewriter, dim radial bg, Tokyo silhouette |
| Japan + freelancer | 180–390 | Map pin on Japan SVG, "Salesforce expert · Tokyo" |
| Market demand growth | 390–720 | Animated 3-bar chart (years), elastic ramp |
| Autonomous AI era pivot | 720–960 | Bg desaturates → accent pulse, "the autonomous AI era" |
| Claude Code arrives | 960–1200 | Logo + tagline types under, build tension into Part 2 |

### Part 2 — Struggle (60 s · 1800 frames)

| Beat | Frames | Visual |
|------|--------|--------|
| Current efforts intro | 0–270 | "Recently…" types out, lighter bg |
| Workflow pipeline diagram | 270–900 | 5-node horizontal: Plan → Design → Dev → Review → QA → Docs |
| Pain point 1 — LLM gap | 900–1260 | Pipeline dims; thought bubble over Dev with broken Apex/LWC/Flow/SOQL icons |
| Resource gathering | 1260–1530 | Doc cards fan out (Apex ref · LWC guide · Release notes · Internal) |
| Pain point 2 — Tooling | 1530–1740 | Terminal mock with failed `sf` CLI command |
| Tail | 1740–1800 | Cross-fade out |

### Part 3 — Solution (60 s · 1800 frames)

| Beat | Frames | Visual |
|------|--------|--------|
| "Meet SFWiz" reveal | 0–180 | Hard cut from black; wordmark scales in (bass-drop spring) |
| Three taglines stagger | 180–450 | "One prompt." / "Six AI personas." / "Full pipeline." accent flashes synced to claps |
| Architecture diagram | 450–1020 | TUI → Orchestrator (Anthropic SDK) → 6 personas → API + Knowledge + Salesforce |
| Persona workflow | 1020–1380 | Designer → Developer → Reviewer (shield, "read-only by design") → QA |
| "And one more thing." | 1380–1530 | Hard cut to black, single mono line — Apple keynote moment |
| ask_user gate | 1530–1740 | Modal mock: "Deploy to prod-org? [y/N]" + "It stops. / It asks. / It waits." |
| Closing punch | 1740–1800 | "Your call. Always." centered, fade |

## 3. Recording stack (100% open-source / local)

| Layer | Tool | License | Role |
|-------|------|---------|------|
| Visualization | [Remotion](https://www.remotion.dev) (TypeScript → video) | Remotion individual/OSS license — free for OSS repos | all 3 parts: cards, motion, terminal mocks, architecture diagram |
| Voice clone / TTS | [Coqui XTTS v2](https://github.com/coqui-ai/TTS) | MPL-2.0 | narration, cloned from user's own voice sample |
| Voice reference | `demo/my-own/my-voices.m4a` | user's own | 30 s+ English clip (already recorded by user) |
| Background music | user-supplied (3 tracks, royalty-free or own composition) | varies | one per part, dropped into `demo/remotion/public/bgm/` |
| Audio mixing | Remotion built-in `<Audio>` + ducking | MIT (Remotion runtime) | VO + BGM mix in-composition, no ffmpeg needed |
| Final render | `bunx remotion render Master` | (see Remotion license) | single mp4 output, audio + video baked in |
| Captions (optional) | user's `ig/index.js` (`mlx-whisper` + ffmpeg) | MIT + LGPL | post-render `.srt` / `.ass` burn |

**Dropped from previous plan:**
- ❌ VHS (`charmbracelet/vhs`) — Remotion handles terminal mocks via styled `<div>` / mono text. No deterministic-replay benefit needed since visuals are code.
- ❌ ffmpeg concat / build.sh — Remotion's `<Sequence>` + `<Audio>` chain everything in one render.
- ❌ CC0 LibriVox / Common Voice samples — user's own voice via XTTS clone instead.
- ❌ External Excalidraw / Inkscape / GIMP — pure SVG/CSS in compositions.

### Remotion license note (unchanged)

Free for: individuals, OSS projects (repo public, OSS license), companies with ≤ 3 employees, projects with revenue < $100k/yr. Hackathon = covered. Add credit line to project README:

> *"Video rendered with Remotion (https://remotion.dev)."*

## 4. Voiceover scripts

Stripped to plain text in `demo/remotion/tts/scripts/part-{1,2,3}.txt`. Source markdown files at `demo/my-own/part-{1,2,3}-*.md` are the editable canonical version. The plain-text copies remove markdown headings (`### Intro`, `---`) since XTTS reads them literally.

**Coqui pacing notes** (apply when editing scripts):
- Numbers spelled out ("four point seven", not "4.7") — XTTS reads cleaner.
- Em-dash ` — ` = short pause. Period = beat. Comma = breath. Two periods → longer pause.
- Acronyms: spell phonetically if mispronounced ("L-W-C", "S-O-Q-L", "S-F-Wiz").
- Replace any em-dash that XTTS swallows with `, ... ,` for forced pause.

## 5. Remotion project layout

```
demo/remotion/
├─ package.json
├─ remotion.config.ts            # unchanged (h264, 1920×1080, 30 fps)
├─ tsconfig.json
├─ public/                       # NEW — Remotion staticFile() root
│  ├─ vo/
│  │  ├─ part-1.wav              # XTTS output (gitignored)
│  │  ├─ part-2.wav
│  │  └─ part-3.wav
│  └─ bgm/
│     ├─ part-1-gloomy.mp3       # user-supplied (gitignored)
│     ├─ part-2-pop.mp3
│     └─ part-3-energetic.mp3
├─ src/
│  ├─ Root.tsx                   # MOD — registers Master + Part1/2/3 (4 comps total)
│  ├─ theme.ts                   # KEEP — colors / fonts / dims
│  ├─ timing.ts                  # NEW — frame helpers, part offsets
│  ├─ compositions/
│  │  ├─ Master.tsx              # NEW — chains 3 parts via <Sequence>
│  │  ├─ Part1Backstory.tsx      # NEW — 1200 frames
│  │  ├─ Part2Struggle.tsx       # NEW — 1800 frames
│  │  └─ Part3Solution.tsx       # NEW — 1800 frames
│  └─ audio/
│     └─ PartTrack.tsx           # NEW — <Audio> VO + ducked BGM
└─ tts/                          # NEW — Coqui XTTS pipeline
   ├─ generate.sh                # invokes XTTS with --speaker_wav my-voices.m4a
   └─ scripts/
      ├─ part-1.txt
      ├─ part-2.txt
      └─ part-3.txt
```

**Deleted from old plan:**
- `src/compositions/Title.tsx`, `Credibility.tsx`, `Stakes.tsx`, `Architecture.tsx`, `Outro.tsx`
- `src/architecture-defaults.ts`, `src/architecture-schema.ts`
- `demo/demo.tape`, `demo/script.beat-*.txt`, `demo/script.architecture.txt`, `demo/build.sh`, `demo/vo.sh`

### Composition spec (per part)

Each part composition wraps `<PartTrack n={1|2|3} theme="gloomy|pop|energetic" voEnd={frames} />` to mount VO + ducked BGM, then renders visuals on top via `useCurrentFrame()` + `interpolate` / `spring`.

```tsx
// src/compositions/Part1Backstory.tsx (sketch)
export const Part1Backstory: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: theme.bg }}>
    <PartTrack n={1} theme="gloomy" voEnd={voEndPart1} />
    <HookLine />          {/* 0–180 */}
    <JapanContext />      {/* 180–390 */}
    <DemandChart />       {/* 390–720 */}
    <AiEraPivot />        {/* 720–960 */}
    <ClaudeCodeArrives /> {/* 960–1200 */}
  </AbsoluteFill>
);
```

`<Master>` chains:

```tsx
<Series>
  <Series.Sequence durationInFrames={1200}><Part1Backstory /></Series.Sequence>
  <Series.Sequence durationInFrames={1800}><Part2Struggle /></Series.Sequence>
  <Series.Sequence durationInFrames={1800}><Part3Solution /></Series.Sequence>
</Series>
```

Total: 4800 frames @ 30 fps = 160 s = 2:40.

## 6. Audio wiring

`src/audio/PartTrack.tsx` mounts both VO and BGM in a single subtree. Ducking via `interpolate(frame, [voStart-15, voStart, voEnd, voEnd+15], [0.7, 0.18, 0.18, 0.7])` so the BGM dips when VO plays, ramps back when VO ends.

```tsx
<>
  <Audio src={staticFile(`vo/part-${n}.wav`)} volume={1.0} />
  <Audio
    src={staticFile(`bgm/part-${n}-${theme}.mp3`)}
    volume={(f) => duckUnderVO(f, 0, voEnd)}
    loop
  />
</>
```

Cross-fade between parts: handled at Master level. BGM tail fades over last 30 frames of each part; next BGM ramps up over first 30 frames of next part. Visuals can hard-cut at part boundaries.

## 7. Voiceover pipeline (Coqui XTTS v2 with user's own voice)

```bash
# demo/remotion/tts/generate.sh
SPEAKER="../../my-own/my-voices.m4a"   # user's own voice sample (already exists)
for p in 1 2 3; do
  tts --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
      --text "$(cat scripts/part-${p}.txt)" \
      --speaker_wav "$SPEAKER" \
      --language_idx en \
      --out_path "../public/vo/part-${p}.wav"

  # loudness normalize each beat (skip if already consistent)
  ffmpeg -y -i "../public/vo/part-${p}.wav" \
    -af "loudnorm=I=-16:LRA=11:TP=-1.5" \
    "../public/vo/part-${p}-norm.wav"
  mv "../public/vo/part-${p}-norm.wav" "../public/vo/part-${p}.wav"
done

# duration check — Part 2 must be ≤ 60 s; trim script if overshoot
for p in 1 2 3; do
  ffprobe -i "../public/vo/part-${p}.wav" -show_entries format=duration -v quiet -of csv=p=0
done
```

First-run Coqui downloads XTTS v2 model (~1.8 GB). After that, every render is local and offline.

**Risk — Part 2 length:** at 130 wpm the ~150-word script may run 65–70 s. Mitigation: trim trailing "There are a few other minor issues too…" sentence + tighten "covering everything from planning and system design, to development, review, QA and testing, and even documentation and post-release manuals." → "covering planning, dev, review, QA, and docs." Re-measure with `ffprobe`.

## 8. Render

```bash
cd demo/remotion
bun install                                # first time only
bun run studio                             # dev preview, hot-reload Master
bunx remotion render Master ../sfwiz-demo.mp4 --codec=h264
```

No ffmpeg concat step. Audio is embedded via Remotion's `<Audio>` graph; output mp4 already has VO + BGM mixed.

Expected wall time on M-series: ≤ 3 min for full 4800-frame render.

Optional caption burn afterwards:

```bash
node "$IG_TOOL_PATH/index.js" sfwiz-demo.mp4 --srt --no-karaoke --lang en \
  -o sfwiz-demo-cc.mp4
```

## 9. Workflow summary

- **Change copy** → edit `tts/scripts/part-N.txt` → re-run `tts/generate.sh` for that part → reload Studio.
- **Change visual** → edit `Part{N}*.tsx` → Studio hot-reloads.
- **Change BGM** → swap file in `public/bgm/` → reload Studio.
- **Final render** → `bunx remotion render Master`.

Zero timeline software. Everything version-controlled. Re-render under 3 min on M-series.

## 10. Asset checklist

- [x] `demo/my-own/part-{1,2,3}-*.md` — narration scripts (already drafted)
- [x] `demo/my-own/my-voices.m4a` — user's own voice sample (already recorded)
- [ ] `demo/remotion/tts/scripts/part-{1,2,3}.txt` — plain-text copies stripped from MD
- [ ] `demo/remotion/public/vo/part-{1,2,3}.wav` — XTTS outputs
- [ ] `demo/remotion/public/bgm/part-{1,2,3}-*.mp3` — user supplies these (gloomy / pop / energetic)
- [ ] `demo/remotion/src/compositions/{Master,Part1Backstory,Part2Struggle,Part3Solution}.tsx`
- [ ] `demo/remotion/src/audio/PartTrack.tsx`
- [ ] `demo/remotion/src/timing.ts`
- [ ] `demo/remotion/src/Root.tsx` updated to register Master + 3 parts
- [ ] `demo/remotion/.gitignore` ignores `public/vo/`, `public/bgm/`, `tts/output/`
- [ ] `demo/remotion/README.md` updated with 3-part outline + Coqui workflow

## 11. Build order

1. **Strip narration MD → plain text** (`tts/scripts/part-*.txt`).
2. **Drop BGM files** into `public/bgm/` (user step).
3. **Run Coqui XTTS** → `public/vo/part-{1,2,3}.wav`. Listen-test, fix pronunciations, normalize loudness, measure durations. **Gate**: Part 2 ≤ 60 s.
4. **Skeleton compositions** — 3 parts rendering only solid bg + frame counter, register in Root, verify Master sequence runs 4800 frames in Studio.
5. **Wire audio** — add `<PartTrack />` to each part, verify VO syncs and BGM ducks under voice.
6. **Build visuals part-by-part** — Part 1 first (smallest), then Part 3 (most complex), then Part 2.
7. **Master cross-fades** — BGM fade tails between parts.
8. **Render** `bunx remotion render Master`.
9. **QA pass** — watch full 2:40, verify VO/BGM/visual sync, loudness consistency, no clipping.

## 12. Verification

- `cd demo/remotion && bun install && bun studio` — Studio opens, all 4 compositions selectable, Master plays end-to-end without missing-asset errors.
- `bunx remotion render Master ../out.mp4` — produces mp4, exact 4800 frames / 160 s.
- `ffprobe -i ../out.mp4 -show_streams` — confirms 1 video stream (h264, 1920×1080@30) + 1 audio stream (AAC stereo, 44.1k or 48k).
- Manual playback — VO audible over BGM in all 3 parts, hard cuts on visuals at 40 s and 100 s align with BGM transitions, no audible pops at part boundaries.
- Total length matches `00:02:40.00` in QuickTime.

## 13. Open risks

- **Part 2 word count overrun** — see §7 mitigation. If trimmed script still overshoots, fall back: stretch Part 2 to 70 s and shave 10 s off Part 3 → re-balance frames in `timing.ts`.
- **XTTS pronunciation of "SFWiz"** — likely needs phonetic hint ("S-F-Wiz") in source script. Validate in dry-run.
- **BGM track lengths unknown** — if user's tracks are <60 s, loop via Remotion's `loop` prop; if >60 s, trim via `trimBefore` / `trimAfter`.
- **XTTS English-only** — matches user's stated preference (no JP narration). Captions in EN only by default.

## 14. Out of scope

- Captions / subtitles overlay (optional post-render via user's `ig` tool).
- Multi-language tracks.
- VHS / terminal capture (Remotion handles all visuals).
- Schema-driven parametric editing of architecture diagram (hardcoded for tighter reveal-timing control).
- Auto-deploy to YouTube / submission portal.

---

## Companion plan

File-level change list, full per-beat frame math, audio-ducking implementation details: `~/.claude-personal/plans/splendid-chasing-spark.md`.
