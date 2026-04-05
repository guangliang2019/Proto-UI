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
    const unmount = vi.fn();
    const impl = createImpl({ unmount });
    const handle = impl.createHandle();

    await handle.setIntent('enter');
    handle.setIntent('leave');
    expect(handle.getPhase()).toBe('unmounting');

    handle.setIntent('enter');
    expect(handle.getPhase()).toBe('present');
    expect(unmount).not.toHaveBeenCalled();
  });
});
