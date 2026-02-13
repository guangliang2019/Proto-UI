// packages/adapters/web-component/test/contract/event.router.mapping.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto-ui/adapters.base';

function once<T = any>(t: EventTarget, type: string) {
  return new Promise<T>((resolve) => {
    const cb = (e: any) => {
      t.removeEventListener(type, cb as any);
      resolve(e);
    };
    t.addEventListener(type, cb as any);
  });
}

describe('contract: adapter-web-component / event router mapping (v0)', () => {
  it('pointerdown -> pointer.down with native payload in detail', async () => {
    const el = document.createElement('div');
    const global = new EventTarget();
    let enabled = true;

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => enabled,
    });

    const p = once<CustomEvent>(r.rootTarget, 'pointer.down');

    const native = new PointerEvent('pointerdown', { bubbles: true });
    el.dispatchEvent(native);

    const ev = await p;
    expect(ev).toBeInstanceOf(CustomEvent);
    expect((ev as any).detail).toBe(native);

    r.dispose();
  });

  it('click -> press.commit', async () => {
    const el = document.createElement('button');
    const global = new EventTarget();

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => true,
    });

    const p = once<CustomEvent>(r.rootTarget, 'press.commit');

    const native = new MouseEvent('click', { bubbles: true });
    el.dispatchEvent(native);

    const ev = await p;
    expect((ev as any).detail).toBe(native);

    r.dispose();
  });

  it('keydown -> key.down (globalTarget), and Enter/Space -> press.commit (rootTarget)', async () => {
    const el = document.createElement('div');
    const global = new EventTarget();

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => true,
    });

    const pKey = once<CustomEvent>(r.globalTarget, 'key.down');
    const pPress = once<CustomEvent>(r.rootTarget, 'press.commit');

    const native = new KeyboardEvent('keydown', { key: 'Enter' });
    global.dispatchEvent(native);

    const evKey = await pKey;
    expect((evKey as any).detail).toBe(native);

    const evPress = await pPress;
    expect((evPress as any).detail).toBe(native);

    r.dispose();
  });

  it('isEnabled gate: disabled => MUST NOT emit', async () => {
    const el = document.createElement('div');
    const global = new EventTarget();
    let enabled = false;

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => enabled,
    });

    let called = 0;
    r.rootTarget.addEventListener('press.commit', () => called++);
    r.globalTarget.addEventListener('key.down', () => called++);

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    global.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(called).toBe(0);

    enabled = true;
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(called).toBe(1);

    r.dispose();
  });

  it('dispose(): MUST detach native listeners', () => {
    const el = document.createElement('div');
    const global = new EventTarget();

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: global,
      isEnabled: () => true,
    });

    let called = 0;
    r.rootTarget.addEventListener('press.commit', () => called++);

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(called).toBe(1);

    r.dispose();

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(called).toBe(1);
  });
});
