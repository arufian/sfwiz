import { spawn } from 'child_process';
import { learnBus } from '~/learn/bus';
import type { CollectionName } from '~/knowledge/collections';

export interface EmbedOptions {
  qmdBin?: string;
  force?: boolean;
}

/**
 * Run `qmd embed` for a collection and emit progress events.
 * qmd doesn't natively stream JSON progress, so we parse its stderr lines
 * for percentage patterns. Falls back to step-count-only if no percentage found.
 */
export function runEmbed(collection: CollectionName, opts: EmbedOptions = {}): Promise<void> {
  const bin = opts.qmdBin ?? 'qmd';
  const args = ['embed', ...(opts.force ? ['-f'] : [])];

  return new Promise((resolve, reject) => {
    const proc = spawn(bin, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, QMD_COLLECTION: collection },
    });

    let lineBuffer = '';
    let done = 0;
    let total = 0;
    let currentItem = '';

    const parseLine = (line: string) => {
      // Parse patterns like "Embedding 15/243: Database.update"
      const progressMatch = line.match(/(\d+)\/(\d+)[:\s]+(.+)/);
      if (progressMatch) {
        done = parseInt(progressMatch[1]!, 10);
        total = parseInt(progressMatch[2]!, 10);
        currentItem = progressMatch[3]!.trim();
        learnBus.emit('embed:progress', { kind: 'embed:progress', collection, done, total, currentItem });
        return;
      }
      // Parse percentage-only: "48%"
      const pctMatch = line.match(/(\d+)%/);
      if (pctMatch && total > 0) {
        const pct = parseInt(pctMatch[1]!, 10);
        done = Math.round((pct / 100) * total);
        learnBus.emit('embed:progress', { kind: 'embed:progress', collection, done, total, currentItem });
      }
    };

    const handleChunk = (chunk: Buffer) => {
      lineBuffer += chunk.toString('utf8');
      const lines = lineBuffer.split('\n');
      lineBuffer = lines.pop() ?? '';
      for (const line of lines) parseLine(line.replace(/\x1b\[[^m]*m/g, '').trim());
    };

    proc.stdout.on('data', handleChunk);
    proc.stderr.on('data', handleChunk);

    proc.on('close', (code) => {
      if (code === 0) {
        learnBus.emit('embed:done', { kind: 'embed:done', collection });
        resolve();
      } else {
        learnBus.emit('embed:error', { kind: 'embed:error', collection, message: `qmd embed exited ${code}` });
        reject(new Error(`qmd embed exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      learnBus.emit('embed:error', { kind: 'embed:error', collection, message: err.message });
      reject(err);
    });
  });
}
