/** Scheduling logic for continuous-learning worker. Testable without Bun Worker. */

export interface SchedulerState {
  lastRunAt: number | null;
  status: 'idle' | 'running' | 'paused' | 'error';
  error?: string;
}

export interface SchedulerOptions {
  /** Target hour (local time) for daily run, default 3 */
  dailyHour?: number;
  /** Boot drift: wait this many ms after boot before first run check, default 30s */
  bootDriftMs?: number;
  /** How often to poll (ms), default 60_000 */
  pollIntervalMs?: number;
  /** Clock function for testability */
  now?: () => number;
}

/** Returns true if a daily run is due given current state. */
export function isRunDue(state: SchedulerState, opts: Required<SchedulerOptions>): boolean {
  if (state.status === 'paused' || state.status === 'running') return false;
  const now = opts.now();
  if (state.lastRunAt === null) return true;

  const msSinceLast = now - state.lastRunAt;
  const oneDayMs = 24 * 60 * 60 * 1000;
  return msSinceLast >= oneDayMs;
}

export function defaultSchedulerOptions(overrides: SchedulerOptions = {}): Required<SchedulerOptions> {
  return {
    dailyHour: 3,
    bootDriftMs: 30_000,
    pollIntervalMs: 60_000,
    now: Date.now,
    ...overrides,
  };
}
