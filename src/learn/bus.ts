import { EventEmitter } from 'events';

export interface EmbedProgressEvent {
  kind: 'embed:progress';
  collection: string;
  done: number;
  total: number;
  currentItem: string;
}

export interface EmbedDoneEvent {
  kind: 'embed:done';
  collection: string;
}

export interface EmbedErrorEvent {
  kind: 'embed:error';
  collection: string;
  message: string;
}

export interface InstallProgressEvent {
  kind: 'install:progress';
  step: number;
  total: number;
  message: string;
}

export interface SubagentSpawnEvent {
  kind: 'subagent:spawn';
  name: string;
}

export interface SubagentDoneEvent {
  kind: 'subagent:done';
  name: string;
  numTurns: number;
  totalCostUsd: number;
}

export type LearnEvent = EmbedProgressEvent | EmbedDoneEvent | EmbedErrorEvent | InstallProgressEvent | SubagentSpawnEvent | SubagentDoneEvent;

export type LearnEventKind = LearnEvent['kind'];

export type LearnEventMap = {
  [K in LearnEventKind]: [Extract<LearnEvent, { kind: K }>];
};

class LearnBus extends EventEmitter {
  override emit<K extends keyof LearnEventMap>(event: K, ...args: LearnEventMap[K]): boolean {
    return super.emit(event, ...args);
  }

  override on<K extends keyof LearnEventMap>(event: K, listener: (...args: LearnEventMap[K]) => void): this {
    return super.on(event, listener as (...args: unknown[]) => void);
  }
}

export const learnBus = new LearnBus();
