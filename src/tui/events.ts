import EventEmitter from 'events';
import type { AgentEventMap } from '~/agent/types';

/**
 * Typed event bus bridging the agent loop and TUI components.
 * Agent emits; TUI components subscribe.
 */
export class TuiEventBus extends EventEmitter {
  override emit<K extends keyof AgentEventMap>(
    event: K,
    ...args: AgentEventMap[K]
  ): boolean {
    return super.emit(event as string, ...args);
  }

  override on<K extends keyof AgentEventMap>(
    event: K,
    listener: (...args: AgentEventMap[K]) => void,
  ): this {
    return super.on(event as string, listener as (...a: unknown[]) => void);
  }

  /** Wire an AgentLoop's events through this bus. */
  proxyFrom(source: EventEmitter): void {
    const events: (keyof AgentEventMap)[] = [
      'turn:thinking', 'turn:stream', 'turn:done',
      'tool:pending', 'tool:running', 'tool:done', 'tool:error',
      'subagent:spawn', 'subagent:stream', 'subagent:tool', 'subagent:result',
    ];
    for (const ev of events) {
      source.on(ev as string, (...args: unknown[]) => {
        this.emit(ev, ...(args as AgentEventMap[typeof ev]));
      });
    }
  }
}

export const tuiEvents = new TuiEventBus();
