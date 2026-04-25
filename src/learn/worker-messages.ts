/** Message types between main thread and Bun Worker learn worker. */

export type WorkerCommand =
  | { type: 'pause' }
  | { type: 'resume' }
  | { type: 'refresh' }
  | { type: 'status' };

export type WorkerEvent =
  | { type: 'status'; status: string; lastRunAt: number | null }
  | { type: 'progress'; collection: string; done: number; total: number; currentItem: string }
  | { type: 'done'; collection: string }
  | { type: 'error'; message: string };
