import { describe, expect, test } from 'bun:test';
import EventEmitter from 'events';
import { TuiEventBus } from '~/tui/events';

describe('TuiEventBus', () => {
  test('proxies agent events from source emitter', () => {
    const bus = new TuiEventBus();
    const source = new EventEmitter();
    bus.proxyFrom(source);

    const received: string[] = [];
    bus.on('turn:thinking', () => received.push('thinking'));
    bus.on('tool:running', () => received.push('tool:running'));

    source.emit('turn:thinking');
    source.emit('tool:running', 'call-1', 'echo');

    expect(received).toEqual(['thinking', 'tool:running']);
  });

  test('typed emit + on', () => {
    const bus = new TuiEventBus();
    const texts: string[] = [];
    bus.on('turn:stream', (text) => texts.push(text));
    bus.emit('turn:stream', 'hello');
    expect(texts).toEqual(['hello']);
  });
});
