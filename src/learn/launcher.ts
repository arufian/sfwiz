/**
 * Spawns the continuous-learning Bun Worker and exposes a handle compatible
 * with `setLearnWorkerHandle` from `src/dispatcher/commands/learn.ts`.
 */
import type { LearnWorkerHandle } from '~/dispatcher/commands/learn';
import type { WorkerCommand, WorkerEvent } from '~/learn/worker-messages';

export interface LearnLauncherEvents {
  onEvent?: (ev: WorkerEvent) => void;
}

export function startLearnWorker(events: LearnLauncherEvents = {}): LearnWorkerHandle | null {
  let worker: Worker;
  try {
    worker = new Worker(new URL('./worker.ts', import.meta.url).href);
  } catch {
    return null;
  }

  let lastStatus: { status: string; lastRunAt: number | null } = {
    status: 'idle',
    lastRunAt: null,
  };

  worker.addEventListener('message', (ev: MessageEvent<WorkerEvent>) => {
    const data = ev.data;
    if (data.type === 'status') {
      lastStatus = { status: data.status, lastRunAt: data.lastRunAt };
    }
    events.onEvent?.(data);
  });

  return {
    send(cmd: { type: string }) {
      worker.postMessage(cmd as WorkerCommand);
    },
    status() {
      return lastStatus;
    },
  };
}
