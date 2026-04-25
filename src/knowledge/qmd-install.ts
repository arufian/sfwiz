import { spawn } from 'child_process';
import { learnBus } from '~/learn/bus';

const INSTALL_STEPS = 5;

/** Install @tobilu/qmd globally via npm. Emits install:progress events. */
export function installQmd(): Promise<string> {
  return new Promise((resolve, reject) => {
    let step = 0;

    learnBus.emit('install:progress', { kind: 'install:progress', step: 0, total: INSTALL_STEPS, message: 'Starting qmd install…' });

    const proc = spawn('npm', ['install', '-g', '@tobilu/qmd'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const parseChunk = (chunk: Buffer) => {
      const text = chunk.toString('utf8');
      const lines = text.split('\n').filter(Boolean);
      for (const line of lines) {
        const barMatch = line.match(/\[([#.]+)\]/);
        if (barMatch) {
          const filled = (barMatch[1] ?? '').split('').filter((c) => c === '#').length;
          const pct = filled / 10;
          step = Math.min(INSTALL_STEPS - 1, Math.round(pct * INSTALL_STEPS));
        } else {
          step = Math.min(step + 1, INSTALL_STEPS - 1);
        }
        learnBus.emit('install:progress', {
          kind: 'install:progress',
          step,
          total: INSTALL_STEPS,
          message: line.slice(0, 80),
        });
      }
    };

    proc.stdout.on('data', parseChunk);
    proc.stderr.on('data', parseChunk);

    proc.on('close', (code) => {
      if (code === 0) {
        learnBus.emit('install:progress', { kind: 'install:progress', step: INSTALL_STEPS, total: INSTALL_STEPS, message: 'qmd installed.' });
        resolve('qmd');
      } else {
        reject(new Error(`npm install exited with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
}
