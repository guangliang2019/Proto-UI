import { describe, it, expect, vi } from 'vitest';
import { PresenceModuleImpl } from '../src/impl';
import { PRESENCE_HOST_BRIDGE_CAP } from '../src/caps';

describe('PresenceModuleImpl', () => {
  const createImpl = (bridge?: { mount?: () => void; unmount?: () => void }) => {
    const caps = {
      has: (cap: any) => cap === PRESENCE_HOST_BRIDGE_CAP,
      get: (cap: any) => {
        if (cap === PRESENCE_HOST_BRIDGE_CAP) {
          return { mount: () => {}, unmount: () => {}, ...bridge };
        }
        return undefined;
      },
      onChange: () => () => {},
    };
    return new PresenceModuleImpl(caps as any, 'test-proto');
  };

  it('starts as absent', () => {
    const impl = createImpl();
    expect(impl.createHandle().getPhase()).toBe('absent');
  });

  it('enter transitions absent -> mounting -> present', async () => {
    const mount = vi.fn();
    const impl = createImpl({ mount });
    const handle = impl.createHandle();

    const p = impl.awaitMount();
    await handle.setIntent('enter');
    await p;

    expect(mount).toHaveBeenCalledOnce();
    expect(handle.getPhase()).toBe('present');
  });

  it('leave transitions present -> unmounting, confirmed -> absent', async () => {
    const unmount = vi.fn();
    const impl = createImpl({ unmount });
    const handle = impl.createHandle();

    await handle.setIntent('enter');
    expect(handle.getPhase()).toBe('present');

    const p = impl.awaitUnmount();
    handle.setIntent('leave');
    expect(handle.getPhase()).toBe('unmounting');

    await handle.setIntent('leave');
    await p;

    expect(unmount).toHaveBeenCalledOnce();
    expect(handle.getPhase()).toBe('absent');
  });

  it('rapid interrupt unmounting -> enter cancels unmount', async () => {
    const mount = vi.fn();
    const unmount = vi.fn();
    const impl = createImpl({ mount, unmount });
    const handle = impl.createHandle();

    await handle.setIntent('enter');
    handle.setIntent('leave');
    expect(handle.getPhase()).toBe('unmounting');

    handle.setIntent('enter');
    expect(handle.getPhase()).toBe('present');
    expect(unmount).not.toHaveBeenCalled();
    // Stage-1 unmounting reversal must not issue an extra mount.
    expect(mount).toHaveBeenCalledTimes(1);
  });

  it('ignores stale unmount completion after enter cancels pending unmount', async () => {
    let resolveUnmount: (() => void) | null = null;
    const mount = vi.fn();
    const unmount = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveUnmount = resolve;
        })
    );
    const impl = createImpl({ mount, unmount });
    const handle = impl.createHandle();

    await handle.setIntent('enter');
    handle.setIntent('leave');
    const unmountGate = impl.awaitUnmount();
    handle.setIntent('leave');

    expect(handle.getPhase()).toBe('unmounting');
    expect(unmount).toHaveBeenCalledOnce();

    // Reverse while unmount promise is pending.
    handle.setIntent('enter');
    expect(handle.getPhase()).toBe('present');
    await unmountGate;

    // Initial enter + reverse-enter while pending unmount.
    expect(mount).toHaveBeenCalledTimes(2);

    // Late completion of the canceled unmount must be ignored.
    resolveUnmount?.();
    await Promise.resolve();
    expect(handle.getPhase()).toBe('present');
  });

  it('leave from absent resolves any pending mount and subsequent awaitMount returns undefined', async () => {
    const impl = createImpl();
    const handle = impl.createHandle();

    const p = impl.awaitMount();
    expect(p).toBeInstanceOf(Promise);

    await handle.setIntent('leave');
    await p;

    // Subsequent awaitMount should not block since mount was already resolved
    expect(impl.awaitMount()).toBeUndefined();
    expect(handle.getPhase()).toBe('absent');
  });
});
