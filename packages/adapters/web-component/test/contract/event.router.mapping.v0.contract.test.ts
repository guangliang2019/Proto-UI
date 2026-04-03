// packages/adapters/web-component/test/contract/event.router.mapping.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto.ui/adapter-base';

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

  it('keydown within root -> key.down (globalTarget), and Enter/Space -> press.commit (rootTarget)', async () => {
    const el = document.createElement('div');
    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: el,
      isEnabled: () => true,
    });

    const pKey = once<CustomEvent>(r.globalTarget, 'key.down');
    const pPress = once<CustomEvent>(r.rootTarget, 'press.commit');

    const native = new KeyboardEvent('keydown', { key: 'Enter' });
    el.dispatchEvent(native);

    const evKey = await pKey;
    expect((evKey as any).detail).toBe(native);

    const evPress = await pPress;
    expect((evPress as any).detail).toBe(native);

    r.dispose();
  });

  it.each(['Enter', ' '])(
    'keyboard commit %j followed by zero-detail synthetic click -> emits press.commit once',
    (key) => {
      const el = document.createElement('div');
      const button = document.createElement('button');
      el.appendChild(button);
      document.body.appendChild(el);

      const r = createWebProtoEventRouter({
        rootEl: el,
        globalEl: window,
        isEnabled: () => true,
      });

      const calls: Event[] = [];
      r.rootTarget.addEventListener('press.commit', (ev) => calls.push(ev));

      button.focus();
      button.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }));

      expect(calls).toHaveLength(1);
      expect((calls[0] as CustomEvent).detail).toBeInstanceOf(KeyboardEvent);

      r.dispose();
      el.remove();
    }
  );

  it('keydown on global target uses composedPath to map press.commit back to the adapter root', async () => {
    const el = document.createElement('div');
    const button = document.createElement('button');
    el.appendChild(button);
    document.body.appendChild(el);

    const r = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const pPress = once<CustomEvent>(r.rootTarget, 'press.commit');
    const native = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    Object.defineProperty(native, 'composedPath', {
      value: () => [button, el, document.body, document, window],
    });

    window.dispatchEvent(native);

    const evPress = await pPress;
    expect((evPress as any).detail).toBe(native);

    r.dispose();
    el.remove();
  });

  it('nested proto roots route keyboard press.commit to the nearest owner only', () => {
    const parent = document.createElement('div');
    const child = document.createElement('button');
    const triggerMark = Symbol.for('@proto.ui/as-trigger/confirm-owner');

    (parent as any)[triggerMark] = true;
    (child as any)[triggerMark] = true;
    parent.appendChild(child);
    document.body.appendChild(parent);

    const parentRouter = createWebProtoEventRouter({
      rootEl: parent,
      globalEl: window,
      isEnabled: () => true,
    });
    const childRouter = createWebProtoEventRouter({
      rootEl: child,
      globalEl: window,
      isEnabled: () => true,
    });

    let parentCalls = 0;
    let childCalls = 0;
    parentRouter.rootTarget.addEventListener('press.commit', () => parentCalls++);
    childRouter.rootTarget.addEventListener('press.commit', () => childCalls++);

    child.focus();
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      })
    );

    expect(parentCalls).toBe(0);
    expect(childCalls).toBe(1);

    parentRouter.dispose();
    childRouter.dispose();
    parent.remove();
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
