/** @jsxImportSource @opentui/react */
import { ACCENT, DIM, OK, WARN } from '~/ui/theme';

export type QmdSubPhase = 'checking' | 'install-prompt' | 'installing' | 'failed';

export function QmdScreen({
  sub,
  installStep,
  installTotal,
  installMessage,
  installError,
  promptSelected,
}: {
  sub: QmdSubPhase;
  installStep: number;
  installTotal: number;
  installMessage: string;
  installError: string | null;
  promptSelected: number;
}) {
  return (
    <box border={true} borderStyle="rounded" borderColor={ACCENT} width={72}>
      <text fg={ACCENT}>{'  Step 1 — knowledge base (qmd)'}</text>
      <text> </text>
      {sub === 'checking' ? (
        <>
          <text>{'  Checking for the qmd CLI…'}</text>
          <text fg={DIM}>{'  qmd indexes Salesforce reference docs locally.'}</text>
        </>
      ) : null}
      {sub === 'install-prompt' ? (
        <>
          <text>{'  qmd is not installed. Install now?'}</text>
          <text fg={DIM}>{'  Runs: npm install -g @tobilu/qmd  (≈30s)'}</text>
          <text> </text>
          {['Yes, install qmd', 'Skip (knowledge disabled this session)'].map((label, i) => (
            <text key={label} fg={i === promptSelected ? ACCENT : '#aaa'}>
              {`  ${i === promptSelected ? '❯' : ' '} ${i + 1}. ${label}`}
            </text>
          ))}
        </>
      ) : null}
      {sub === 'installing' ? (
        <>
          <text>{'  Installing qmd via npm…'}</text>
          <text> </text>
          <text fg={DIM}>{`  ${renderBar(installStep, installTotal)}  ${installStep}/${installTotal}`}</text>
          <text fg={DIM}>{`  ${installMessage}`.slice(0, 68)}</text>
        </>
      ) : null}
      {sub === 'failed' ? (
        <>
          <text fg={WARN}>{'  qmd install failed:'}</text>
          <text fg={DIM}>{`  ${installError ?? 'unknown error'}`.slice(0, 68)}</text>
          <text> </text>
          <text fg={DIM}>{'  Continuing without qmd. Run /knowledge install later.'}</text>
          <text fg={OK}>{'  Press Enter to continue.'}</text>
        </>
      ) : null}
      <text> </text>
      <text fg={DIM}>
        {sub === 'install-prompt' ? '  ↑/↓ choose · Enter confirm · Esc skip' : '  '}
      </text>
    </box>
  );
}

function renderBar(done: number, total: number, width = 24): string {
  if (total <= 0) return '░'.repeat(width);
  const filled = Math.min(width, Math.round((done / total) * width));
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}
