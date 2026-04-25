/**
 * Bun Worker for continuous-learning.
 * Spawned by src/tui/launch.tsx. Runs at daily 03:00 + boot drift.
 * Communicates with main thread via postMessage.
 */
import type { WorkerCommand, WorkerEvent } from '~/learn/worker-messages';
import { isRunDue, defaultSchedulerOptions, type SchedulerState } from '~/learn/scheduler';
import { detectQmd, requireQmd } from '~/knowledge/detect';
import { bootstrapCollections, COLLECTIONS } from '~/knowledge/collections';
import { runEmbed } from '~/knowledge/embed';

const opts = defaultSchedulerOptions({ bootDriftMs: 30_000, pollIntervalMs: 60_000 });
const state: SchedulerState = { lastRunAt: null, status: 'idle' };

function send(ev: WorkerEvent) {
  self.postMessage(ev);
}

async function runLearning() {
  const info = detectQmd();
  if (!info) {
    send({ type: 'error', message: 'qmd not installed — skipping learn run' });
    return;
  }
  bootstrapCollections(info.binPath);

  state.status = 'running';
  send({ type: 'status', status: 'running', lastRunAt: state.lastRunAt });

  for (const col of COLLECTIONS) {
    try {
      await runEmbed(col.name, { qmdBin: info.binPath });
      send({ type: 'done', collection: col.name });
    } catch (err) {
      send({ type: 'error', message: String(err) });
    }
  }

  state.lastRunAt = Date.now();
  state.status = 'idle';
  send({ type: 'status', status: 'idle', lastRunAt: state.lastRunAt });
}

// Boot drift: wait before first poll
setTimeout(() => {
  const intervalId = setInterval(() => {
    if (isRunDue(state, opts)) {
      clearInterval(intervalId);
      runLearning().catch(console.error);
    }
  }, opts.pollIntervalMs);
}, opts.bootDriftMs);

// Handle commands from main thread
self.addEventListener('message', (ev: MessageEvent<WorkerCommand>) => {
  const cmd = ev.data;
  switch (cmd.type) {
    case 'pause':
      state.status = 'paused';
      send({ type: 'status', status: 'paused', lastRunAt: state.lastRunAt });
      break;
    case 'resume':
      state.status = 'idle';
      send({ type: 'status', status: 'idle', lastRunAt: state.lastRunAt });
      break;
    case 'refresh':
      runLearning().catch(console.error);
      break;
    case 'status':
      send({ type: 'status', status: state.status, lastRunAt: state.lastRunAt });
      break;
  }
});

requireQmd; // referenced to avoid tree-shake — required for bootstrapCollections
