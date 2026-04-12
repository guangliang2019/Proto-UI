import { describe, expect, it } from 'vitest';
import {
  HOST_ELEMENT_CAP,
  definePrototype,
  type HitParticipationHandle,
  type HitParticipationRegion,
} from '@proto.ui/core';
import { asBoundary, asHitParticipation } from '@proto.ui/hooks';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { BoundaryPort } from '@proto.ui/module-boundary';
import {
  HIT_PARTICIPATION_HOST_BRIDGE_CAP,
  type HitParticipationPort,
} from '@proto.ui/module-hit-participation';
import type { OverlayPort } from '@proto.ui/module-overlay';
import { asOverlay } from '@proto.ui/hooks';
import type { PropsBaseType } from '@proto.ui/types';

const createHost = <P extends PropsBaseType>(name: string) => {
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
  };

  return { host };
};

describe('runtime contract: hit participation (v0)', () => {
  it('HIT-0100: repeated asHitParticipation(...) calls on one instance reuse one underlying capability and merge setup-time configuration deterministically', () => {
    let a!: HitParticipationHandle<any>;
    let b!: HitParticipationHandle<any>;

    const P = definePrototype({
      name: 'x-hit-0100',
      setup() {
        a = asHitParticipation({
          mode: 'disabled',
          debugLabel: 'alpha',
          meta: { origin: 'first' },
        });
        b = asHitParticipation({
          mode: 'passthrough',
          debugLabel: 'beta',
          meta: { step: 2 },
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<HitParticipationPort>('hit-participation');

    expect(a).toBe(b);
    expect(port?.getConfig()).toMatchObject({
      mode: 'passthrough',
      debugLabel: 'beta',
      meta: {
        origin: 'first',
        step: 2,
      },
    });
    expect(port?.getWarnings()).toEqual(
      expect.arrayContaining([
        expect.stringContaining('mode overridden'),
        expect.stringContaining('debugLabel overridden'),
      ])
    );
    expect((P as any).__asHooks).toEqual([
      { name: 'asHitParticipation', order: 0, privileged: true, mode: 'configurable' },
    ]);
  });

  it('HIT-0200: a region can explicitly opt out of hit participation without requiring event-time cancellation logic', () => {
    const mask = { id: 'mask' };

    const P = definePrototype({
      name: 'x-hit-0200',
      setup() {
        const hit = asHitParticipation({ mode: 'disabled' });
        hit.registerRegion(mask, { role: 'mask' as any });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<HitParticipationPort>('hit-participation');

    expect(port?.getConfig().mode).toBe('disabled');
    expect(port?.getRegions()).toEqual([{ target: mask, role: 'mask', mode: 'disabled' }]);
  });

  it('HIT-0300: passthrough allows interaction to continue through the region without being rewritten as boundary outside', () => {
    const content = { id: 'content' };
    const outsider = { id: 'outsider' };

    const P = definePrototype({
      name: 'x-hit-0300',
      setup() {
        const hit = asHitParticipation({ mode: 'passthrough' });
        hit.registerRegion(content, { role: 'content' as any });

        const boundary = asBoundary();
        boundary.registerRegion(content, { role: 'content' });

        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const hitPort = result.caps.getPort<HitParticipationPort>('hit-participation');
    const boundaryPort = result.caps.getPort<BoundaryPort>('boundary');

    expect(hitPort?.getConfig().mode).toBe('passthrough');
    expect(hitPort?.getRegions()).toEqual([
      { target: content, role: 'content', mode: 'passthrough' },
    ]);
    expect(boundaryPort?.notify({ target: outsider })).toBe('unknown');
  });

  it.todo(
    'HIT-0400: hit participation remains independent from feedback/style even if an adapter uses style as one implementation detail'
  );

  it('HIT-0500: hit participation remains independent from event registration and does not require extra def.event plumbing', () => {
    const hostEl = document.createElement('div');
    const mask = document.createElement('div');
    const syncCalls: Array<readonly HitParticipationRegion[]> = [];

    const P = definePrototype({
      name: 'x-hit-0500',
      setup() {
        const hit = asHitParticipation({ mode: 'passthrough' });
        hit.registerRegion(mask, { role: 'mask' as any });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(
      P as any,
      {
        ...host,
        onRuntimeReady(wiring) {
          wiring.attach('hit-participation', [
            [HOST_ELEMENT_CAP, hostEl],
            [
              HIT_PARTICIPATION_HOST_BRIDGE_CAP,
              {
                sync({ regions }: { regions: readonly HitParticipationRegion[] }) {
                  syncCalls.push(regions);
                },
              },
            ],
          ]);
        },
      } as any
    );

    expect(syncCalls.length).toBeGreaterThan(0);
    expect(syncCalls.at(-1)).toEqual([
      { target: hostEl, role: 'content', mode: 'passthrough' },
      { target: mask, role: 'mask', mode: 'passthrough' },
    ]);
  });

  it('HIT-0600: overlay-adjacent structures such as masks or decorative wrappers can declare passthrough without implicitly enabling dismiss or modal policy', () => {
    const hostEl = document.createElement('div');
    const mask = document.createElement('div');
    const syncCalls: Array<readonly HitParticipationRegion[]> = [];

    const P = definePrototype({
      name: 'x-hit-0600',
      setup() {
        const hit = asHitParticipation({ mode: 'passthrough' });
        hit.registerRegion(mask, { role: 'mask' as any });

        asOverlay({
          defaultOpen: true,
          closeOnOutsidePress: false,
          modal: false,
        });

        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(
      P as any,
      {
        ...host,
        onRuntimeReady(wiring) {
          wiring.attach('hit-participation', [
            [HOST_ELEMENT_CAP, hostEl],
            [
              HIT_PARTICIPATION_HOST_BRIDGE_CAP,
              {
                sync({ regions }: { regions: readonly HitParticipationRegion[] }) {
                  syncCalls.push(regions);
                },
              },
            ],
          ]);
        },
      } as any
    );

    const overlayPort = result.caps.getPort<OverlayPort>('overlay');

    expect(syncCalls.at(-1)).toEqual([
      { target: hostEl, role: 'content', mode: 'passthrough' },
      { target: mask, role: 'mask', mode: 'passthrough' },
    ]);
    expect(overlayPort?.getConfig().modal).toBe(false);
    expect(overlayPort?.isOpen()).toBe(true);
    expect(overlayPort?.getLastReason()).not.toBe('outside.press');
  });

  it('HIT-0700: hit-participation registrations are cleaned up on unmount and no longer affect host hit behavior afterwards', async () => {
    const content = { id: 'content' };
    const hostEl = document.createElement('div');
    const syncCalls: Array<readonly HitParticipationRegion[]> = [];

    const P = definePrototype({
      name: 'x-hit-0700',
      setup() {
        const hit = asHitParticipation();
        hit.registerRegion(content, { role: 'content' as any });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(
      P as any,
      {
        ...host,
        onRuntimeReady(wiring) {
          wiring.attach('hit-participation', [
            [HOST_ELEMENT_CAP, hostEl],
            [
              HIT_PARTICIPATION_HOST_BRIDGE_CAP,
              {
                sync({ regions }: { regions: readonly HitParticipationRegion[] }) {
                  syncCalls.push(regions);
                },
              },
            ],
          ]);
        },
      } as any
    );
    const port = result.caps.getPort<HitParticipationPort>('hit-participation');

    expect(port?.getRegions()).toEqual([
      { target: content, role: 'content', mode: 'participating' },
    ]);

    await result.invokeUnmounted();

    expect(port?.getRegions()).toEqual([]);
    expect(syncCalls.at(-1)).toEqual([]);
  });
});
