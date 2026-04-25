import type { ToolContext } from '~/tools/types';
import { kickSfLoginWeb } from '~/sf/login-kick';

/** /login command — directly opens sf login web. */
export async function loginCommand(ctx: ToolContext): Promise<{ kicked: boolean }> {
  const answer = await ctx.askUser({
    question: 'Open browser to log in to a Salesforce org via `sf login web`?',
    header: 'SF Login',
    options: [
      { label: 'Yes', description: 'Open browser now' },
      { label: 'No', description: 'Skip' },
    ],
    multiSelect: false,
  });

  if (answer.selected !== 'Yes') return { kicked: false };

  await new Promise<void>((resolve) => {
    let resolved = false;
    const abort = kickSfLoginWeb({
      onLine: (line) => {
        if (line.includes('Successfully authorized')) {
          if (!resolved) { resolved = true; resolve(); abort(); }
        }
      },
      onDone: () => { if (!resolved) { resolved = true; resolve(); } },
    });
  });

  return { kicked: true };
}
