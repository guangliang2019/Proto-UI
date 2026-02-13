import { describe, it, expect } from 'vitest';
import { createHostWiring } from '../src/wiring/host-wiring';

function fakeWiring(controllers: Record<string, any>) {
  return {
    attach(name: string, entries: any) {
      const c = controllers[name];
      if (!c) return false;
      c.attach(entries);
      return true;
    },
    reset(name?: string) {
      if (!name) {
        for (const c of Object.values(controllers)) {
          c.reset();
        }
        return;
      }
      const c = controllers[name];
      if (!c) return;
      c.reset();
    },
  };
}

describe('adapter-base: host-wiring', () => {
  it('afterUnmount swallows reset errors and clears controllers (idempotent)', () => {
    const wiring = createHostWiring({
      prototypeName: 'x-proto',
      modules: {
        props: () => ({}),
        feedback: () => ({}),
      },
    });

    const calls: string[] = [];

    const props = {
      attach() {
        calls.push('props.attach');
      },
      reset() {
        calls.push('props.reset');
        throw new Error('boom');
      },
    };

    const feedback = {
      attach() {
        calls.push('feedback.attach');
      },
      reset() {
        calls.push('feedback.reset');
      },
    };

    wiring.onRuntimeReady(fakeWiring({ props, feedback }) as any);

    expect(() => wiring.afterUnmount()).not.toThrow();
    expect(calls).toEqual(['props.attach', 'feedback.attach', 'props.reset', 'feedback.reset']);

    // Must be idempotent: second call should do nothing, must not throw.
    expect(() => wiring.afterUnmount()).not.toThrow();
    expect(calls).toEqual(['props.attach', 'feedback.attach', 'props.reset', 'feedback.reset']);
  });

  it('onRuntimeReady ignores missing controllers', () => {
    const wiring = createHostWiring({
      prototypeName: 'x-proto',
      modules: {
        props: () => ({}),
        feedback: () => ({}),
      },
    });

    const calls: string[] = [];
    const props = {
      attach() {
        calls.push('props.attach');
      },
      reset() {
        calls.push('props.reset');
      },
    };

    // feedback controller missing
    expect(() => wiring.onRuntimeReady(fakeWiring({ props }) as any)).not.toThrow();
    expect(() => wiring.afterUnmount()).not.toThrow();

    expect(calls).toEqual(['props.attach', 'props.reset']);
  });

  it('calls provide once per module and attaches returned partial', () => {
    let called = 0;

    const wiring = createHostWiring({
      prototypeName: 'x-proto',
      modules: {
        props: ({ prototypeName }) => {
          called++;
          return { foo: prototypeName, n: called };
        },
      },
    });

    let attached: any = null;

    const props = {
      attach(p: any) {
        attached = p;
      },
      reset() {},
    };

    wiring.onRuntimeReady(fakeWiring({ props }) as any);

    expect(called).toBe(1);
    expect(attached).toEqual({ foo: 'x-proto', n: 1 });
  });
});
