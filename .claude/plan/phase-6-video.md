# Phase 6 — Demo video

Status: **ready (optional but recommended)**.

> **2026-04-25 update — drop the "Best Managed Agents" prize positioning from the narration only.** Architecture descriptions stay: orchestrator + 6 persona subagents via `@anthropic-ai/claude-agent-sdk` `query()`. Lead with the safety + learning story (single orchestrator, 6 isolated persona subagents, runtime safety gate on destructive ops, opt-in continuous learning).

Hackathon deliverable. Voice-only narration (user preference — English is third language). Terminal recorded with VHS so every take is reproducible.

---

## 1. Targets

| Metric | Value |
|--------|-------|
| Length | 90–120 s |
| Aspect | 16:9 @ 1920×1080 |
| Fps | 30 |
| Codec | H.264 (mp4) + AAC audio |
| Size budget | ≤ 60 MB (hackathon upload limits) |
| Captions | burned-in `.ass` subtitles (user's `ig` karaoke tool can produce them) |
| Language | English VO; captions EN + JA optional |

## 2. Narrative arc (Crossbeam-mirror · first-person VO · no on-camera author)

Hard constraints:
- **Author does not speak on camera.** VO only. English is author's third language → Coqui XTTS clone of a **CC0 / OSS-licensed English sample voice** carries narration. Script written in clean simple English.
- **First-person narrator voice** (like Crossbeam). VO says "I" but TTS renders it — viewer experiences author's credibility without seeing their face or hearing their native accent. Story stays personal, delivery stays polished.
- **No interview / stakeholder camera shot.** Stakes land via big-type stat card + VO — Crossbeam had a mayor; we use a text card.
- **All graphics code-rendered via Remotion.** Title, stakes, failed-attempts montage, Sarah card, outro — all compiled from TS. Zero manual editing.

Reference: Mike Brown's Crossbeam. Mirror the 7-beat arc. Replace on-camera elements with Remotion cards + VHS terminal.

| Beat | Secs | Visual (Remotion/VHS) | VO copy (first-person, TTS) |
|------|------|-----------------------|-----------------------------|
| **1. Contrarian hook** | 0–8 | Remotion: large tagline text animates in over dark gradient | "Everyone thinks Salesforce has a deploy problem. It doesn't. It has an orchestration problem." |
| **2. Credibility** | 8–18 | Remotion: text lines stagger-fade listing author credentials | "My name is [Author]. I've been a Salesforce developer for years. In that time I've built four tools trying to solve the same pipeline — each one handled a slice. None handled the whole thing." |
| **3. Stakes** | 18–28 | Remotion stat card — big numbers animate in ("3 hrs per deploy · every sprint · every org") | "A single Settings deploy can take three hours. Across ten orgs, every sprint, that's a full engineer — gone." |
| **4. Architectural reveal** | 28–62 | VHS terminal: designer → developer → reviewer → qa → deploy-manager · ask_user modal hero shot | "So I built sfwiz. I describe a feature. Parallel sub-agents launch. A designer reads my sObjects and drafts the design. A developer writes the Apex, the handler, the tests. An isolated reviewer — read-only by design — catches an FLS miss. Back to the developer. QA runs the tests: eighty-seven percent. Deploy-manager stops. Every destructive action goes through a structured user confirmation." |
| **5. Reverse-test** | 62–77 | VHS: `/persona reviewer` over buggy fixture; issue list streams | "To prove the reviewer catches real bugs, I flipped the system. I asked Claude to write buggy Apex on purpose — FLS violations, SOQL in loops, missing bulkify. The reviewer caught every one." |
| **6. Pivot — admins + knowledge** | 77–97 | VHS: `/settings`, `/users`, `/knowledge` Apex question streams | "Built for developers — but admins have the same pain. Forty-two settings types, users, permission sets, sharing rules. Same engine, same safety gates. And behind it, three always-fresh knowledge collections — Apex reference, LWC guide, the current release notes. Ask a hard question, get the real doc." |
| **7. Close / vision** | 97–115 | Remotion outro card: repo URL + install cmd + tiny credits line | "Salesforce runs a third of the Fortune five hundred. Every hour saved here compounds. Built on Anthropic Claude. Opus 4.7 for judgment. Sonnet 4.6 for code. sfwiz. Open-source. One terminal. My whole org." |

Fallback trim if over-run: drop beat 5. Story stays intact.

## 3. Recording stack (100% open-source / free)

| Layer | Tool | License | Role |
|-------|------|---------|------|
| Terminal capture | [VHS](https://github.com/charmbracelet/vhs) | MIT | `.tape` script → `terminal.mp4`, deterministic |
| Voice clone / TTS | [Coqui XTTS v2](https://github.com/coqui-ai/TTS) via author's `ig/coqui_tts.py` | MPL-2.0 | narration |
| Voice sample source | [LibriVox](https://librivox.org) (CC0 public-domain audiobooks) · [Mozilla Common Voice](https://commonvoice.mozilla.org) (CC0) | CC0 | 30 s clean clip for XTTS to clone; NOT the author's voice |
| Graphics / cards / motion | [Remotion](https://www.remotion.dev) (TypeScript → video) | Remotion individual/OSS license (free for individuals + OSS projects) | title, stakes, credibility, outro cards |
| Diagram asset (if needed) | [Excalidraw](https://github.com/excalidraw/excalidraw) · [Inkscape](https://inkscape.org) · [GIMP](https://www.gimp.org) | MIT / GPL / GPL | static PNGs for stats, logo, architecture sketch |
| Concat + encode | [ffmpeg](https://ffmpeg.org) | LGPL | stitch + merge VO + burn captions |
| Captions | author's `ig/index.js` (uses `mlx-whisper` + ffmpeg) | MIT (mlx-whisper) + LGPL | auto `.srt` / `.ass` burn |
| Music bed (optional) | [MusicGen](https://github.com/facebookresearch/audiocraft) · [Stable Audio Open](https://github.com/Stability-AI/stable-audio-tools) · [Bark](https://github.com/suno-ai/bark) · or just silence | MIT / Apache | 110 s ambient if desired — optional |
| B-roll (optional) | [Stable Video Diffusion](https://github.com/Stability-AI/generative-models) · [CogVideoX](https://github.com/THUDM/CogVideo) · [Mochi-1](https://github.com/genmoai/models) · [AnimateDiff](https://github.com/guoyww/AnimateDiff) | MIT / Apache | Crossbeam-style mood clips — optional; Remotion cards usually sufficient |

All scriptable. All free. All reproducible via one shell script (see §8b).

### Remotion license note

Free for: individuals, OSS projects (repo must be public OSS-licensed), companies with ≤ 3 employees, projects with revenue < \$100k/yr. Hackathon use by an individual open-source repo = fully covered. Add the required credit line in the project README:

> *"Video rendered with Remotion (https://remotion.dev)."*

No payment, no account, no cloud service.

## 4. Script (voiceover text · first-person · ~270 words ≈ 110 s)

Written in simple English for Coqui XTTS. First-person narrator = the author. TTS delivers; author never records own voice.

```
[Beat 1 · Contrarian hook · 0-8s]
Everyone thinks Salesforce has a deploy problem.
It doesn't. It has an orchestration problem.

[Beat 2 · Credibility · 8-18s]
My name is [Author].
I've been a Salesforce developer for years.
In that time, I built four tools trying to solve the same pipeline.
Each one handled a slice. None handled the whole thing.

[Beat 3 · Stakes · 18-28s]
A single Settings deploy can take three hours.
Across ten orgs, every sprint, that is a full engineer — gone.
Multiply by every Salesforce team on the planet.

[Beat 4 · Architectural reveal · 28-62s]
So I built sfwiz.
I describe a feature — an Opportunity trigger.
Parallel sub-agents launch.
A designer reads my sObjects and drafts the design.
A developer writes the Apex, the handler, and the test class.
An isolated reviewer — read-only by design — catches an FLS miss. Back to the developer.
QA runs the tests. Eighty-seven percent coverage.
Deploy-manager stops.
Every destructive action goes through a structured user confirmation.
Ship-shaped from the first commit.

[Beat 5 · Reverse-test · 62-77s]
To prove the reviewer catches real bugs, I flipped the system.
I asked Claude to write buggy Apex on purpose — FLS violations, SOQL in loops, missing bulkify.
The reviewer caught every one.

[Beat 6 · Pivot · 77-97s]
Built for developers — but admins have the same pain.
Forty-two settings types. Users. Permission sets. Sharing rules.
Same engine. Same safety gates.
And behind it — three always-fresh knowledge collections.
Apex reference. LWC guide. The current release notes.
Ask a hard question — get the real doc, not a training snapshot.

[Beat 7 · Close · 97-115s]
Salesforce runs a third of the Fortune five hundred.
Every hour saved here compounds.
Built on Anthropic Claude.
Claude Agent SDK for persona handoffs.
Opus four point seven for judgment. Sonnet four point six for code.
sfwiz. Open-source. One terminal. My whole org.
```

**Coqui pacing**:
- Numbers spelled out ("four point six", not "4.6", not "4,6") — XTTS reads cleaner
- En-dash " — " = short pause. Single period = beat. Comma = breath. Two periods → longer pause.
- Split each beat into its own `.txt` file (§6) so TTS batches small + you can re-gen one line without re-rendering whole track.
- Replace `[Author]` in beat 2 with real name (or a fictional Salesforce-dev handle) before rendering.

## 5. VHS `.tape` (demo/demo.tape)

Terminal beats only. Non-terminal beats (personal hook, stakes, stakeholder quote) are filmed/rendered separately and spliced in post.

```tape
# sfwiz demo tape — terminal beats 4, 5, 6, 7 only
# beats 1-3 are camera/overlay cuts assembled in ffmpeg post
Output demo/terminal.mp4
Set Shell "bash"
Set FontSize 18
Set Width 1920
Set Height 1080
Set Theme "Dracula"
Set Padding 24
Set Framerate 30

# ── Beat 4 · Architectural reveal (30 s of terminal) ──────
Type "sfwiz"
Enter
Sleep 2s

Type "Create an Opportunity trigger: flip Stage to Closed Won when Amount > 1,000,000 and Probability >= 90."
Enter
# designer streams design-doc.md
Sleep 5s
# developer writes force-app files; tree flashes red
Sleep 6s
# reviewer rejects (FLS)
Sleep 4s
# developer patches
Sleep 4s
# qa runs — coverage 87%
Sleep 4s
# deploy-manager → ask_user modal (hero shot)
Sleep 3s
Down
Enter   # pick scratch org
Sleep 2s

# ── Beat 5 · Reverse-test (15 s) ──────────────────────────
Type "/persona reviewer"
Enter
Sleep 1s
Type "Review: force-app/main/default/classes/BadHandler.cls  (deliberately buggy fixture)"
Enter
Sleep 10s
# reviewer lists 4 issues on screen
Sleep 3s

# ── Beat 6 · Pivot — admin side + knowledge (20 s) ────────
Type "/settings"
Enter
Sleep 3s
Escape
Type "/users"
Enter
Sleep 2s
Escape
Type "/knowledge"
Enter
Sleep 2s
Escape
Type "How does Database.executeBatch scale with scope size, and what is the default?"
Enter
Sleep 10s

# ── Beat 7 · Close (10 s) ─────────────────────────────────
Type "/learn status"
Enter
Sleep 4s
Ctrl+D
Sleep 1s
Hide
Type "# sfwiz · github.com/<you>/sfwiz · bun install -g sfwiz"
```

Render: `vhs demo/demo.tape` → `demo/terminal.mp4`. Composition with non-terminal beats happens in §7.

## 6. Voiceover pipeline

**Voice sample sourcing (author is not a native English speaker, does not want own voice on output)**:

Two legal paths:
1. **Public-domain / CC0 speaker**: a short clean-speech sample from LibriVox (CC0) or commoncorpus. Pick a voice whose timbre matches the product mood (calm / documentary / tech-docu). 30 s is enough.
2. **Licensed AI sample voice**: ElevenLabs "Share a voice" public library (many CC-licensed or free-tier voices). Download a 30 s preview → use as `voice-sample.wav`.

Record `voice-sample.wav` at 24 kHz mono WAV, -16 LUFS. No background music, minimal reverb. Save to `demo/voice-sample.wav`. Attribution line goes in README if license requires.

```bash
# 1. sample voice (one 30s clean clip; NOT the author's voice)
SPEAKER="demo/voice-sample.wav"

# 2. render each beat as its own wav for easier sync
for i in 1 2 3 4; do
  TEXT=$(cat demo/script.beat-$i.txt)
  python /Users/balfian/devs/experiments/tablet-app/ig/coqui_tts.py \
    en "$TEXT" "$SPEAKER" "demo/vo-beat-$i.wav"
done

# 3. stitch + add 300 ms silence between beats
ffmpeg -y \
  -i demo/vo-beat-1.wav -i demo/vo-beat-2.wav \
  -i demo/vo-beat-3.wav -i demo/vo-beat-4.wav \
  -filter_complex "[0][1][2][3]concat=n=4:v=0:a=1,apad=pad_dur=0.3" \
  -ac 2 -ar 48000 demo/vo.wav

# 4. (optional) light compression + LUFS normalize to -16 LUFS
ffmpeg -y -i demo/vo.wav -af "loudnorm=I=-16:LRA=11:TP=-1.5" demo/vo-final.wav
```

Cost check: first-run Coqui downloads the XTTS v2 model (~1.8 GB). After that, every render is local + offline.

## 7. Compose final video

Assemble 7 beats. Beats 1-3 use camera / overlay cuts; beats 4-7 use the VHS terminal render.

```bash
# assets expected:
#   demo/beat-1-hook.mp4          (8s — title card or selfie on cam)
#   demo/beat-2-stakes.mp4        (12s — stakeholder quote or animated stat card)
#   demo/beat-3-failed.mp4        (10s — montage overlay)
#   demo/terminal.mp4             (75s — from VHS, covers beats 4-7)
#   demo/outro-card.mp4           (5s — logo + repo URL + install cmd)
#   demo/vo-final.wav             (≈110s — from §6)

# 1. concat video segments
ffmpeg -y \
  -f concat -safe 0 -i <(printf "file '%s'\n" \
    "$PWD/demo/beat-1-hook.mp4" \
    "$PWD/demo/beat-2-stakes.mp4" \
    "$PWD/demo/beat-3-failed.mp4" \
    "$PWD/demo/terminal.mp4" \
    "$PWD/demo/outro-card.mp4") \
  -c copy demo/video-nocap.mp4

# 2. merge voiceover
ffmpeg -y \
  -i demo/video-nocap.mp4 \
  -i demo/vo-final.wav \
  -c:v copy -c:a aac -b:a 192k -shortest \
  demo/sfwiz-demo.mp4

# 3. burn captions via user's ig karaoke tool (generic Coqui-XTTS-compatible location)
node "$IG_TOOL_PATH/index.js" \
  demo/sfwiz-demo.mp4 --srt --no-karaoke --lang en -o demo/sfwiz-demo-cc.mp4
```

Resulting artifacts: `demo/sfwiz-demo.mp4` (plain) + `demo/sfwiz-demo-cc.mp4` (burned captions).

If beats 1-3 assets unavailable, fall back to **terminal-only cut**: skip step 1, feed `demo/terminal.mp4` directly to step 2. VO beats 1-3 then overlay on a simple animated title card.

## 8. Shot list (cross-reference to narrative arc)

| Beat | Frame | Scene | Source | Timing |
|------|-------|-------|--------|--------|
| 1 Hook | 0–8 s | Title card OR author-cam selfie; text overlay "Salesforce orchestration problem" | external | 8 s |
| 2 Stakes | 8–20 s | Stakeholder quote (admin or dev) OR animated stat card (orgs, hours, sprints) | external | 12 s |
| 3 Failed attempts | 20–30 s | 3-panel montage: Claude Code terminal · sfdx output · browser extension — each flashes for ~3 s | overlay | 10 s |
| 4 Reveal | 30–35 s | sfwiz boots, dir tree full view | VHS | 5 s |
| 4 Reveal | 35–42 s | Designer streams design-doc.md | VHS | 7 s |
| 4 Reveal | 42–48 s | Developer writes files; tree turns red | VHS | 6 s |
| 4 Reveal | 48–52 s | Reviewer FLS issue | VHS | 4 s |
| 4 Reveal | 52–57 s | Developer patch; QA 87% coverage | VHS | 5 s |
| 4 Reveal | 57–60 s | `ask_user` modal — hero shot | VHS | 3 s |
| 5 Reverse-test | 60–75 s | `/persona reviewer`; buggy fixture; issue list streams | VHS | 15 s |
| 6 Pivot | 75–80 s | `/settings` 42-type tree | VHS | 5 s |
| 6 Pivot | 80–83 s | `/users` panel | VHS | 3 s |
| 6 Pivot | 83–95 s | `/knowledge` → qmd_query answer streams | VHS | 12 s |
| 7 Close | 95–100 s | `/learn status` fresh badges | VHS | 5 s |
| 7 Close | 100–110 s | Outro card: repo URL + install cmd; Anthropic Claude + Claude Agent SDK credit | external | 10 s |

## 8a. Prior-winner patterns (distilled)

Studied two winner videos:
- Crossbeam · Mike Brown · https://www.youtube.com/watch?v=jHwBkFSvyk0
- Post visit AI · Miho · https://www.youtube.com/watch?v=V29UCOii2jE

**Pattern intersection (what actually matters — NONE require After Effects)**

| Ingredient | Where we use it |
|------------|-----------------|
| Credentialed first-person narrator | Author as lifelong Salesforce dev. "I've shipped N orgs." |
| Real-world setting shot | Desk with monitors + Salesforce Setup open |
| Specific prior-work credibility | Mention the 4 prior experiments honestly — "I tried, each handled a slice" |
| "Spark" moment | Personal story: where/when the idea struck (road, flight, etc.) |
| Named persona walkthrough | "Sarah is a SF admin at a 50-person startup managing 3 orgs" — not a feature list |
| Specific Claude-capability name | "Opus 4.7 for reviewer judgment", "Claude Agent SDK for persona handoffs", "Sonnet 4.6 for code", "1M context for repo scans" |
| Dual-audience reveal / pivot | dev → admin (already in beat 6) |
| Values close | "safety gates, sovereignty, open-source" |

**Crossbeam-specific** (contrarian opener): *"Everyone thinks California has a housing crisis. We don't. We have a permit crisis."* → mirror: *"Salesforce doesn't have a deploy problem. It has an orchestration problem."*

**Post-visit-specific** (persona walkthrough): *"Alex is 40 and recently he felt like his heart skips a beat."* → mirror: *"Sarah is a SF admin at a 50-person startup. Tuesday morning, Settings deploy fails, again."*

**What winners did NOT use**
- After Effects motion graphics
- 3D animation (Crossbeam: one pre-rendered clip total)
- Complex color grading
- Agency-level sound design

**Editing = cuts + music bed + captions. Nothing more.**

## 8b. Zero-timeline editing — Remotion-driven assembly (100% OSS)

**Hard constraints**:
- Author is a beginner editor. No timeline software.
- Open-source / free tools only. No Canva, no Runway, no Suno, no DaVinci.
- Crossbeam-style polish, without the manual editing hours.

**Solution**: Remotion composes **all non-terminal beats** (title, credibility, stakes, outro) as code. VHS renders terminal beats. ffmpeg concatenates. One `bun` command produces the final video.

### Remotion project layout

```
demo/
├─ remotion/
│  ├─ package.json
│  ├─ remotion.config.ts
│  ├─ src/
│  │  ├─ Root.tsx              registerRoot; defines each <Composition>
│  │  ├─ compositions/
│  │  │  ├─ Title.tsx          beat 1 — 8 s tagline animation
│  │  │  ├─ Credibility.tsx    beat 2 — 10 s stagger-fade of credentials
│  │  │  ├─ Stakes.tsx         beat 3 — 10 s stat-card animate-in
│  │  │  └─ Outro.tsx          beat 7 — 18 s repo URL + install cmd + credits
│  │  └─ theme.ts              colors + type + spring configs
│  └─ tsconfig.json
├─ demo.tape                    § 5  VHS script
├─ script.beat-1.txt ... beat-7.txt   VO text per beat
├─ voice-sample.wav              CC0 30 s clip (LibriVox / Common Voice)
├─ build.sh                      assembly script (below)
└─ vo.sh                         TTS batch (§ 6)
```

### Remotion composition spec (beats that are NOT terminal)

Each composition renders at 1920×1080 @ 30 fps. Design only uses CSS/SVG (no external assets needed). Animations use `spring()` + `interpolate()` from `remotion`.

| Composition | Duration | Key frames |
|-------------|----------|-----------|
| `Title` | 8 s | 0-2s: fade-in tagline line 1. 2-4s: fade-in tagline line 2 (contrarian flip). 4-8s: hold + subtle gradient drift |
| `Credibility` | 10 s | 4 stagger-fade text lines, 1 per 2 s, with monospace "accent" marks |
| `Stakes` | 10 s | Big-number counter animates 0 → 3 ("hours"), then pans to "× every sprint", then "× every org". Pure type + color blocks |
| `Outro` | 18 s | Logo assembles (SVG-based), repo URL types in (monospace), install cmd types in, credit line fades under |

Render each composition:

```bash
cd demo/remotion
bunx remotion render Title    ../seg-title.mp4   --props='{}' --codec=h264 --image-format=png
bunx remotion render Credibility ../seg-credibility.mp4
bunx remotion render Stakes   ../seg-stakes.mp4
bunx remotion render Outro    ../seg-outro.mp4
```

All TS. No GUI. Tweak a color → re-run. Change copy → edit `Title.tsx` → re-run. Editing = coding.

### Assembly — `demo/build.sh`

```bash
#!/usr/bin/env bash
# demo/build.sh — 100% OSS, zero-timeline assembly
set -euo pipefail
cd "$(dirname "$0")"

# 1. terminal beats 4-6 → terminal.mp4
vhs demo.tape

# 2. remotion beats 1, 2, 3, 7 → seg-*.mp4
pushd remotion > /dev/null
bunx remotion render Title       ../seg-title.mp4
bunx remotion render Credibility ../seg-credibility.mp4
bunx remotion render Stakes      ../seg-stakes.mp4
bunx remotion render Outro       ../seg-outro.mp4
popd > /dev/null

# 3. TTS per-beat → vo-beat-*.wav → vo-final.wav
bash vo.sh

# 4. concat video track
ffmpeg -y -f concat -safe 0 -i <(printf "file '%s'\n" \
  "$PWD/seg-title.mp4" \
  "$PWD/seg-credibility.mp4" \
  "$PWD/seg-stakes.mp4" \
  "$PWD/terminal.mp4" \
  "$PWD/seg-outro.mp4") \
  -c copy video-silent.mp4

# 5. merge VO (+ optional ambient bed)
if [ -f bed.wav ]; then
  ffmpeg -y -i video-silent.mp4 -i vo-final.wav -i bed.wav \
    -filter_complex "[1:a]volume=1.0[vo];[2:a]volume=0.15[bed];[vo][bed]amix=inputs=2:duration=first[mix]" \
    -map 0:v -map "[mix]" -c:v copy -c:a aac -b:a 192k -shortest \
    sfwiz-demo.mp4
else
  ffmpeg -y -i video-silent.mp4 -i vo-final.wav \
    -c:v copy -c:a aac -b:a 192k -shortest \
    sfwiz-demo.mp4
fi

# 6. caption burn (author's ig tool; OSS: mlx-whisper + ffmpeg)
node "$IG_TOOL_PATH/index.js" sfwiz-demo.mp4 --srt --no-karaoke --lang en \
  -o sfwiz-demo-cc.mp4

echo "done → demo/sfwiz-demo-cc.mp4"
```

Full re-render on M-series: ≤ 3 min. Tweak + re-run cycle: under 60 s if only one composition changes.

### Workflow summary

- **Change tagline copy** → edit `Title.tsx` line → `bunx remotion render Title` → `bash build.sh` step 4+.
- **Change VO wording** → edit `script.beat-N.txt` → rerun `vo.sh` beat N → `build.sh` step 5+.
- **Change terminal timing** → edit `demo.tape` → `vhs demo.tape` → `build.sh` step 4+.
- **Bed music added later** → drop `bed.wav` (MusicGen output) → rerun step 5.

Zero mouse-dragging. Everything version-controlled.

### Asset checklist (all OSS / CC0)

- [ ] `demo/demo.tape` (§ 5) — scripted terminal
- [ ] `demo/script.beat-{1..7}.txt` — VO per beat (§ 4)
- [ ] `demo/voice-sample.wav` — 30 s CC0 speaker clip from LibriVox or Mozilla Common Voice (NOT author)
- [ ] `demo/remotion/` — Title, Credibility, Stakes, Outro compositions (TS; author writes these)
- [ ] *(optional)* `demo/bed.wav` — MusicGen / Stable Audio Open output; 110 s ambient; CC
- [ ] *(optional)* architectural-reveal overlay render — Remotion composition layered on VHS mp4 via ffmpeg `overlay`; skip for v0.1 if time tight

**Post-production time target**: ≤ 3 h total — Remotion comps (~2 h), script (~30 min), asset collection (~30 min). After that, every re-render is under 3 min.

## 9. Rehearsal checklist

Day before upload:

- [ ] Clean scratch org ready; alias `demo-scratch` set as default
- [ ] LLM key set; cache warm by running a dummy turn first
- [ ] qmd knowledge fresh (run `/learn refresh all` 12 h in advance)
- [ ] Terminal theme locked (VHS `Dracula`); font `JetBrains Mono Nerd Font` installed
- [ ] Voice sample re-recorded in the same room / mic used for VO
- [ ] Backup script ready if provider rate-limits during take
- [ ] `demo.tape` dry-run 3×; wall time measured; compare to VO duration
- [ ] Disk: ≥ 2 GB free (XTTS model + intermediate files)

## 10. Delivery

| Surface | Format | Notes |
|---------|--------|-------|
| Hackathon submission | mp4 (captions burned) | under 60 MB |
| YouTube (primary) | mp4 1080p | unlisted until public release |
| README demo GIF | `demo/demo.gif` from VHS, under 10 MB | loop-friendly hero for repo |
| Twitter / X | 30-s hype cut (re-edit from beats 2 + 3) | MP4 ≤ 20 MB |

All produced from the same VHS take + same VO. One script, multiple surfaces.

## 11. Fallback / contingency

- If Coqui quality disappoints → fall back to ElevenLabs (user has account?) or skip VO entirely, ship with on-screen captions only.
- If `ask_user` demo glitches live → keep a pre-rendered 4-s clip of the modal and splice.
- If knowledge panel slow → warm it with a scripted pre-run before tape starts.
- If VHS can't capture a certain opentui animation cleanly (Equalizer / palette sparkle / embed progress bar) → record that section with asciinema + agg and splice.

## 12. Open questions

- Single take vs. 3 takes and cut? (Lean: 3 beat-takes, concatenated — easier retakes.)
- Background music bed? (Lean: no; VO focus. Add only if empty air feels dead.)
- Host URL for mp4? (GitHub release asset is free + reliable; YouTube for shareability.)
- Accessibility: add audio description track for visually impaired reviewers?
