/** @jsxImportSource @opentui/react */
import { ACCENT, DIM } from '~/ui/theme';

/**
 * Minimal full-screen wrapper used during first-run setup. Centers a single
 * card vertically and shows a small "sfwiz setup" header — deliberately no
 * logo, no sidebar, no splash, so each step reads like the Claude Code
 * first-run prompts (the user's reference UI).
 */
export function SetupChrome({
  width,
  height,
  step,
  totalSteps,
  title,
  children,
}: {
  width: number;
  height: number;
  step: number;
  totalSteps: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <box style={{ width, height, flexDirection: 'column' }}>
      <box style={{ paddingLeft: 2, paddingRight: 2, paddingTop: 1, flexDirection: 'row' }}>
        <text content="sfwiz setup" style={{ fg: ACCENT }} />
        <text content={`  step ${step}/${totalSteps}`} style={{ fg: DIM }} />
        <text content="  ·  " style={{ fg: DIM }} />
        <text content={title} style={{ fg: DIM }} />
      </box>
      <box style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </box>
    </box>
  );
}
