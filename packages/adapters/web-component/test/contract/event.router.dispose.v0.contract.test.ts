// packages/adapters/web-component/test/contract/event.router.dispose.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto-ui/adapters.base';

describe('contract: adapter-web-component / event router dispose (v0)', () => {
  it('dispose() must stop proto semantic delivery', () => {
    const el = document.createElement('div');
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener('press.commit' as any, (e: any) => calls.push(e));

    router.dispose();

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual([]);
  });

  it('dispose() must stop native:* delivery', () => {
    const el = document.createElement('div');
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener('native:click' as any, (e: any) => calls.push(e));

    router.dispose();

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual([]);
  });

  it('dispose() must stop host.* delivery', () => {
    const el = document.createElement('div');
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    router.rootTarget.addEventListener('host.click' as any, (e: any) => calls.push(e));

    router.dispose();

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual([]);
  });
});
