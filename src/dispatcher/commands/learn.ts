import type { ToolContext } from '~/tools/types';

export type LearnSubcommand = 'status' | 'refresh' | 'pause' | 'resume';

export interface LearnWorkerHandle {
  send(cmd: { type: string }): void;
  status(): { status: string; lastRunAt: number | null };
}

let workerHandle: LearnWorkerHandle | null = null;

export function setLearnWorkerHandle(handle: LearnWorkerHandle | null) {
  workerHandle = handle;
}

export async function learnCommand(
  sub: LearnSubcommand,
  _ctx: ToolContext,
): Promise<{ message: string }> {
  if (!workerHandle) {
    return { message: 'Continuous learning worker not running.' };
  }

  switch (sub) {
    case 'status': {
      const s = workerHandle.status();
      const ago = s.lastRunAt ? `last run ${new Date(s.lastRunAt).toLocaleString()}` : 'never run';
      return { message: `Learn worker: ${s.status} (${ago})` };
    }
    case 'refresh':
      workerHandle.send({ type: 'refresh' });
      return { message: 'Triggered knowledge refresh.' };
    case 'pause':
      workerHandle.send({ type: 'pause' });
      return { message: 'Learning worker paused.' };
    case 'resume':
      workerHandle.send({ type: 'resume' });
      return { message: 'Learning worker resumed.' };
  }
}
