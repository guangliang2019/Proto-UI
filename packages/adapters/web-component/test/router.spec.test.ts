// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto-ui/adapters.base';

function once(target: EventTarget, type: string) {
  return new Promise<any>((resolve) => {
    target.addEventListener(type, (ev: any) => resolve(ev), { once: true });
  });
}

describe('WC router: createWebProtoEventRouter', () => {
  it('gate disabled => no proto events emitted', async () => {
    const rootEl = document.createElement('div');

    let enabled = false;
    const router = createWebProtoEventRouter({
      rootEl,
      globalEl: window,
      isEnabled: () => enabled,
    });

    const p = Promise.race([
      once(router.rootTarget, 'press.commit').then(() => 'fired'),
      new Promise((r) => setTimeout(() => r('timeout'), 0)),
    ]);

    rootEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const res = await p;
    expect(res).toBe('timeout');

    router.dispose();
  });

  it('click => root press.commit (payload is in CustomEvent.detail)', async () => {
    const rootEl = document.createElement('div');

    const router = createWebProtoEventRouter({
      rootEl,
      globalEl: window,
      isEnabled: () => true,
    });

    const fired = once(router.rootTarget, 'press.commit');
    const native = new MouseEvent('click', { bubbles: true });
    rootEl.dispatchEvent(native);

    const ev = await fired;
    expect(ev).toBeInstanceOf(CustomEvent);
    expect((ev as CustomEvent).detail).toBe(native);

    router.dispose();
  });

  it('keydown Enter => global key.down AND root press.commit', async () => {
    const rootEl = document.createElement('div');

    const router = createWebProtoEventRouter({
      rootEl,
      globalEl: window,
      isEnabled: () => true,
    });

    const keyDownP = once(router.globalTarget, 'key.down');
    const pressCommitP = once(router.rootTarget, 'press.commit');

    const native = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    window.dispatchEvent(native);

    const keyDownEv = await keyDownP;
    const pressCommitEv = await pressCommitP;

    expect((keyDownEv as CustomEvent).detail).toBe(native);
    expect((pressCommitEv as CustomEvent).detail).toBe(native);

    router.dispose();
  });

  it('keyup => global key.up only (no press.commit)', async () => {
    const rootEl = document.createElement('div');

    const router = createWebProtoEventRouter({
      rootEl,
      globalEl: window,
      isEnabled: () => true,
    });

    const keyUpP = once(router.globalTarget, 'key.up');

    // press.commit should not fire on keyup in current policy
    const pressRace = Promise.race([
      once(router.rootTarget, 'press.commit').then(() => 'fired'),
      new Promise((r) => setTimeout(() => r('timeout'), 0)),
    ]);

    const native = new KeyboardEvent('keyup', { key: 'Enter', bubbles: true });
    window.dispatchEvent(native);

    const keyUpEv = await keyUpP;
    expect((keyUpEv as CustomEvent).detail).toBe(native);

    const pressRes = await pressRace;
    expect(pressRes).toBe('timeout');

    router.dispose();
  });
});
