import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import { EVENT_EMIT_CAP } from '@proto-ui/modules.event';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto-ui/modules.expose';

function createMockHost() {
  const emitted: Array<{ key: string; payload: any; options: any }> = [];
  const exposes: Array<Record<string, unknown>> = [];

  const host: RuntimeHost<any> = {
    prototypeName: 'expose-event-contract',
    getRawProps() {
      return {};
    },
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady(wiring) {
      wiring.attach('event', [
        [
          EVENT_EMIT_CAP,
          (key, payload, options) => {
            emitted.push({ key, payload, options });
          },
        ],
      ]);
      wiring.attach('expose', [[EXPOSE_SET_EXPOSES_CAP, (r) => exposes.push(r)]]);
    },
  };

  return { host, emitted, exposes };
}

describe('runtime contract: expose-event (v0)', () => {
  it('emit registered expose.event maps to host sink', () => {
    const P: Prototype<any> = {
      name: 'x-expose-event-emit',
      setup(def) {
        def.expose.event('ready', { payload: 'json' });
        def.lifecycle.onMounted((run) => {
          run.event.emit('ready', { ok: true }, { note: 'x' });
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const { host, emitted, exposes } = createMockHost();
    executeWithHost(P as any, host as any);

    expect(emitted).toEqual([{ key: 'ready', payload: { ok: true }, options: { note: 'x' } }]);
    expect(exposes.length).toBeGreaterThan(0);
    const last = exposes[exposes.length - 1];
    expect((last as any).ready).toMatchObject({ __pui_expose: 'event' });
  });

  it('emit unregistered expose.event throws', () => {
    const P: Prototype<any> = {
      name: 'x-expose-event-throw',
      setup(def) {
        def.lifecycle.onMounted((run) => {
          run.event.emit('missing', 1);
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const { host } = createMockHost();
    expect(() => executeWithHost(P as any, host as any)).toThrow();
  });
});
