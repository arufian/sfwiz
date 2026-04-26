# Demo Video Part Implementation Workflow

Reusable process for implementing each part (Part 1, 2, 3) of the sfwiz demo video.

## Steps

### Step 1 — Plan (2 Opus reviewers in parallel)
Spawn 2 Opus model agents simultaneously. Each produces a full rewrite plan:
- **Reviewer A**: Visual storytelling angle (Impact + Demo lens). Full beat-by-beat storyboard, frame ranges, visual metaphors.
- **Reviewer B**: Technical Remotion implementation angle (Depth + Opus use lens). JSX skeletons, spring configs, component structure.

Both plans saved to `.claude/plan/part{N}-revision-reviewer-{a|b}.md`.

### Step 2 — POV Judge
Spawn 1 Opus POV judge with both plans. Judge picks best element per beat (can mix). Reports verdict to user.

### Step 3 — User Confirmation
Present POV judge verdict. Wait for user approval before proceeding.

### Step 4 — Implementation (main orchestrator)
Implement the approved plan:
- Create/rewrite scene TSX files
- Update composition file imports + Sequence wiring
- Update timing.ts if beat durations change
- Update SUBTITLES array to match new VO scripts
- TypeScript check (`bunx tsc --noEmit`) must pass before declaring done

**Simultaneously** — spawn background VO subagent:
- Speaker: `/Users/balfian/devs/hackathons/claude-code/demo/my-own/my-voices2.wav`
- Model: `tts_models/multilingual/multi-dataset/xtts_v2`
- Normalize: `ffmpeg loudnorm=I=-16:LRA=11:TP=-1.5`
- Output: `demo/remotion/public/vo/part-{N}-*.wav`
- Measure duration with ffprobe and report
- If VO overruns beat budget: extend `timing.ts` to match actual VO duration (no trim loops)

### Step 5 — VO Timing Reconciliation
When VO subagent reports durations:
- Compare each clip to its beat frame budget
- If over: extend `beats.X = sec(measured_duration + 0.5)` in timing.ts
- Update SUBTITLES endFrames to match new absolute positions
- TypeScript check again

---

## Key constraints
- All scene files under `demo/remotion/src/scenes/part{N}/`
- Shared components at `demo/remotion/src/scenes/part2/_shared/` (Typewriter, PipelineNode, TerminalBox)
- Theme: `src/theme.ts` — never add new tokens
- Timing: `src/timing.ts` — always update beats here, never hardcode frame numbers in components
- VO speaker: always `my-voices2.wav`
- Demo/ is gitignored — no commit needed for video assets

## Judging criteria to serve
- Impact (30%): visuals must show real-world problem/solution, not abstract
- Demo (25%): working, impressive, holds live — memorable frames
- Opus 4.7 Use (25%): surface claude-opus-4-7 in UI/terminal wherever plausible
- Depth & Execution (20%): craft visible, non-trivial animation, real SF vocabulary
