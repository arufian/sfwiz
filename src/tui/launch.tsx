import { createCliRenderer } from '@opentui/core';
import { createRoot } from '@opentui/react';
import { App } from '~/tui/App';

export async function launch({
  trustBypass = false,
  forceFirstRun = false,
}: { trustBypass?: boolean; forceFirstRun?: boolean } = {}) {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    targetFps: 60,
    useMouse: true,
    useKittyKeyboard: {},
  });

  const restoreTty = () => {
    try {
      process.stdout.write(
        '\x1b[?1000l\x1b[?1002l\x1b[?1003l\x1b[?1006l\x1b[?1015l\x1b[?25h\x1b[?1049l',
      );
    } catch {}
  };
  process.on('exit', restoreTty);
  for (const sig of ['SIGHUP', 'SIGTERM', 'SIGQUIT'] as const) {
    process.on(sig, () => {
      try {
        renderer.destroy();
      } catch {}
      restoreTty();
      process.exit(0);
    });
  }

  createRoot(renderer).render(
    <App renderer={renderer} trustBypass={trustBypass} forceFirstRun={forceFirstRun} />,
  );
}
