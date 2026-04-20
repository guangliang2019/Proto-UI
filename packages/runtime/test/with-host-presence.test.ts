import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto.ui/core';
import { defineAsHook } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';
import { executeWithHost, RuntimeHost } from '../src';
import { PRESENCE_HOST_BRIDGE_CAP } from '@proto.ui/module-presence';
import type { PresenceFacade, PresenceHandle } from '@proto.ui/module-presence';

function createMockHost() {
  const calls: string[] = [];
  const scheduled: Array<() => void> = [];

  const host: RuntimeHost<any> = {
    prototypeName: 'test-presence-proto',
    getRawProps() {
      return {};
    },
    commit(children, signal) {
      calls.push('commit');
      signal?.done();
    },
    schedule(task) {
      calls.push('schedule-mounted');
      scheduled.push(task);
    },
    onRuntimeReady(wiring) {
      wiring.attach('presence', [
        [
          PRESENCE_HOST_BRIDGE_CAP,
          {
            mount: () => calls.push('bridge:mount'),
            unmount: () => calls.push('bridge:unmount'),
          },
        ],
      ]);
    },
  };

  return { host, calls, scheduled };
}

let capturedPresenceFacade: PresenceFacade | undefined;

// Helper asHook to capture the presence facade during prototype setup
const capturePresenceFacade = defineAsHook({
  name: 'capturePresence',
  setup() {
    const { facades } = getActiveAsHookContext('capturePresence');
    capturedPresenceFacade = facades.presence as PresenceFacade | undefined;
  },
});

describe('runtime integration: with-host presence wiring', () => {
  it('delays mounted phase until presence handle intent is set to enter', async () => {
    const { host, calls, scheduled } = createMockHost();

    let handle!: PresenceHandle;

    const P: Prototype = {
      name: 'x-presence-mount-delay',
      setup(def) {
        capturePresenceFacade();
        const facade = capturedPresenceFacade;
        expect(facade).toBeTruthy();
        handle = facade!.createHandle();
        def.lifecycle.onMounted(() => calls.push('mounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    const res = executeWithHost(P, host);

    // mounted phase should NOT be reached yet because awaitMount is pending
    expect(calls.includes('mounted')).toBe(false);
    expect(scheduled.length).toBe(0);

    // delay intent slightly to simulate async transition decision
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        handle.setIntent('enter');
        resolve();
      }, 10);
    });

    // flush microtasks so async setIntent completes and resolves awaitMount
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    // after intent is set, finishMount should have run and scheduled mounted callbacks
    expect(calls.includes('bridge:mount')).toBe(true);
    expect(handle.getPhase()).toBe('present');
    expect(scheduled.length).toBe(1);

    // flush scheduled mounted callback
    scheduled[0]();
    expect(calls.includes('mounted')).toBe(true);

    // clean up
    const unmountPromise = res.invokeUnmounted();
    expect(unmountPromise).toBeInstanceOf(Promise);

    // flush microtasks for async unmount path to hit awaitUnmount
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    // unmount should be blocked because presence awaits unmount confirmation
    expect(calls.includes('bridge:unmount')).toBe(false);

    // confirm leave to resolve awaitUnmount
    handle.setIntent('leave');
    handle.setIntent('leave');

    await unmountPromise;
    expect(calls.includes('bridge:unmount')).toBe(true);
  });

  it('proceeds synchronously when no presence handle is created', () => {
    const { host, calls, scheduled } = createMockHost();

    const P: Prototype = {
      name: 'x-presence-no-handle',
      setup(def) {
        def.lifecycle.onMounted(() => calls.push('mounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    executeWithHost(P, host);

    // mount should finish synchronously when no handle exists
    expect(scheduled.length).toBe(1);
    scheduled[0]();
    expect(calls.includes('mounted')).toBe(true);
  });
});
