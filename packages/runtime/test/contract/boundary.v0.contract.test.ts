import { describe, expect, it } from 'vitest';
import { HOST_ELEMENT_CAP, definePrototype, type BoundaryHandle } from '@proto.ui/core';
import { asBoundary } from '@proto.ui/hooks';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import { BOUNDARY_HOST_BRIDGE_CAP, type BoundaryPort } from '@proto.ui/module-boundary';
import type { PropsBaseType } from '@proto.ui/types';

const createHost = <P extends PropsBaseType>(
  name: string,
  options?: {
    onRuntimeReady?: (wiring: {
      attach(moduleName: string, entries: readonly unknown[]): void;
    }) => void;
  }
) => {
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady: options?.onRuntimeReady as any,
  };

  return { host };
};

describe('runtime contract: interaction boundary (v0)', () => {
  it('BOUNDARY-0100: repeated asBoundary(...) calls on one instance reuse one underlying boundary and merge setup-time configuration deterministically', () => {
    let a!: BoundaryHandle<any>;
    let b!: BoundaryHandle<any>;

    const P = definePrototype({
      name: 'x-boundary-0100',
      setup() {
        a = asBoundary({
          debugLabel: 'alpha',
          meta: { origin: 'first' },
        });
        b = asBoundary({
          debugLabel: 'beta',
          meta: { step: 2 },
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(a).toBe(b);
    expect(port?.getConfig()).toMatchObject({
      debugLabel: 'beta',
      meta: {
        origin: 'first',
        step: 2,
      },
    });
    expect(port?.getWarnings()).toEqual(
      expect.arrayContaining([expect.stringContaining('debugLabel overridden')])
    );
    expect((P as any).__asHooks).toEqual([
      { name: 'asBoundary', order: 0, privileged: true, mode: 'configurable' },
    ]);
  });

  it('BOUNDARY-0200: a boundary can register multiple regions that do not form one DOM subtree and still classify trigger/content interactions as inside', () => {
    const trigger = { id: 'trigger' };
    const content = { id: 'content' };

    const P = definePrototype({
      name: 'x-boundary-0200',
      setup() {
        const boundary = asBoundary();
        boundary.registerRegion(trigger, { role: 'trigger' });
        boundary.registerRegion(content, { role: 'content' });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(port?.getRegions()).toEqual([
      { target: trigger, role: 'trigger' },
      { target: content, role: 'content' },
    ]);
    expect(port?.classify({ target: trigger })).toBe('inside');
    expect(port?.classify({ target: content })).toBe('inside');
  });

  it('BOUNDARY-0300: boundary classification is ternary and preserves inside / outside / unknown without coercing unknown to outside', () => {
    const content = { id: 'content' };
    const outsider = { id: 'outsider' };

    const P = definePrototype({
      name: 'x-boundary-0300',
      setup() {
        const boundary = asBoundary();
        boundary.registerRegion(content, { role: 'content' });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(port?.classify({ target: content })).toBe('inside');
    expect(port?.classify({ target: outsider })).toBe('unknown');
    expect(port?.notify({ target: outsider })).toBe('unknown');
  });

  it('BOUNDARY-0350: boundary implicitly treats the current host element as a region when the host cap is available', () => {
    const hostEl = document.createElement('div');
    const child = document.createElement('button');
    hostEl.appendChild(child);

    const P = definePrototype({
      name: 'x-boundary-0350',
      setup() {
        asBoundary();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, {
      onRuntimeReady(wiring) {
        wiring.attach('boundary', [
          [HOST_ELEMENT_CAP, hostEl],
          [
            BOUNDARY_HOST_BRIDGE_CAP,
            {
              classify({ regions, sample }: any) {
                const target = sample?.target;
                if (!(target instanceof Node)) return 'unknown';
                for (const region of regions) {
                  if (!(region?.target instanceof Node)) return 'unknown';
                  if (region.target === target || region.target.contains(target)) return 'inside';
                }
                return 'outside';
              },
            },
          ],
        ]);
      },
    });

    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(port?.getRegions()).toEqual([{ target: hostEl, role: 'content' }]);
    expect(port?.classify({ target: child })).toBe('inside');
  });

  it('BOUNDARY-0400: outside notifications are derived from one boundary source rather than per-component DOM contains() checks', () => {
    const content = document.createElement('div');
    const outsider = document.createElement('button');
    let outsideCalls = 0;
    let lastClassification: string | undefined;

    const P = definePrototype({
      name: 'x-boundary-0400',
      setup(def) {
        const boundary = asBoundary();
        boundary.registerRegion(content, { role: 'content' });
        boundary.subscribeOutside((event) => {
          outsideCalls += 1;
          lastClassification = event.classification;
        });
        def.lifecycle.onMounted(() => {
          boundary.notify({ target: outsider });
          boundary.notify({ target: content });
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, {
      onRuntimeReady(wiring) {
        wiring.attach('boundary', [
          [
            BOUNDARY_HOST_BRIDGE_CAP,
            {
              classify({ regions, sample }: any) {
                const target = sample?.target;
                if (!(target instanceof Node)) return 'unknown';
                for (const region of regions) {
                  if (!(region?.target instanceof Node)) return 'unknown';
                  if (region.target === target || region.target.contains(target)) return 'inside';
                }
                return 'outside';
              },
            },
          ],
        ]);
      },
    });

    executeWithHost(P as any, host as any);

    expect(outsideCalls).toBe(1);
    expect(lastClassification).toBe('outside');
  });

  it('BOUNDARY-0500: portaled or relocated content remains classifiable as inside when the adapter can prove ownership', () => {
    const content = document.createElement('div');
    const child = document.createElement('button');
    content.appendChild(child);

    const P = definePrototype({
      name: 'x-boundary-0500',
      setup() {
        const boundary = asBoundary();
        boundary.registerRegion(content, { role: 'content' });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, {
      onRuntimeReady(wiring) {
        wiring.attach('boundary', [
          [
            BOUNDARY_HOST_BRIDGE_CAP,
            {
              classify({ regions, sample }: any) {
                const target = sample?.target;
                if (!(target instanceof Node)) return 'unknown';
                for (const region of regions) {
                  if (!(region?.target instanceof Node)) return 'unknown';
                  if (region.target === target || region.target.contains(target)) return 'inside';
                }
                return 'outside';
              },
            },
          ],
        ]);
      },
    });

    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(port?.classify({ target: child })).toBe('inside');
  });

  it('BOUNDARY-0600: if the adapter cannot safely classify an interaction, the boundary must surface unknown instead of fabricating outside', () => {
    const content = document.createElement('div');
    const outsider = document.createElement('button');

    const P = definePrototype({
      name: 'x-boundary-0600',
      setup() {
        const boundary = asBoundary();
        boundary.registerRegion(content, { role: 'content' });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, {
      onRuntimeReady(wiring) {
        wiring.attach('boundary', [
          [
            BOUNDARY_HOST_BRIDGE_CAP,
            {
              classify() {
                return 'unknown';
              },
            },
          ],
        ]);
      },
    });

    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<BoundaryPort>('boundary');

    expect(port?.classify({ target: outsider })).toBe('unknown');
    expect(port?.notify({ target: outsider })).toBe('unknown');
  });

  it.todo(
    'BOUNDARY-0700: boundary registrations are cleaned up on unmount and stop producing outside-derived notifications afterwards'
  );

  it('BOUNDARY-0800: stacked consumers can distinguish the top-most boundary so one outside interaction does not close multiple layers', async () => {
    const outsider = document.createElement('button');
    let firstBoundary!: BoundaryHandle<any>;
    let secondBoundary!: BoundaryHandle<any>;
    let firstOutsideCalls = 0;
    let secondOutsideCalls = 0;

    const First = definePrototype({
      name: 'x-boundary-0800-first',
      setup() {
        firstBoundary = asBoundary();
        firstBoundary.subscribeOutside(() => {
          firstOutsideCalls += 1;
        });
        return (r) => r.el('div', 'first');
      },
    });

    const Second = definePrototype({
      name: 'x-boundary-0800-second',
      setup() {
        secondBoundary = asBoundary();
        secondBoundary.subscribeOutside(() => {
          secondOutsideCalls += 1;
        });
        return (r) => r.el('div', 'second');
      },
    });

    const bridge = {
      classify({ sample }: any) {
        return sample?.target === outsider ? 'outside' : 'unknown';
      },
    };

    const firstRun = executeWithHost(
      First as any,
      createHost(First.name, {
        onRuntimeReady(wiring) {
          wiring.attach('boundary', [[BOUNDARY_HOST_BRIDGE_CAP, bridge]]);
        },
      }).host as any
    );
    const secondRun = executeWithHost(
      Second as any,
      createHost(Second.name, {
        onRuntimeReady(wiring) {
          wiring.attach('boundary', [[BOUNDARY_HOST_BRIDGE_CAP, bridge]]);
        },
      }).host as any
    );

    try {
      firstBoundary.setStackActive(true);
      secondBoundary.setStackActive(true);

      expect(firstBoundary.notify({ target: outsider })).toBe('unknown');
      expect(firstOutsideCalls).toBe(0);

      expect(secondBoundary.notify({ target: outsider })).toBe('outside');
      expect(secondOutsideCalls).toBe(1);

      secondBoundary.setStackActive(false);

      expect(firstBoundary.notify({ target: outsider })).toBe('outside');
      expect(firstOutsideCalls).toBe(1);
    } finally {
      await secondRun.invokeUnmounted();
      await firstRun.invokeUnmounted();
    }
  });
});
