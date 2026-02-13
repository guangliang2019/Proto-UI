// packages/adapters/web-component/test/contract/event.router.host.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto-ui/adapters.base';

describe('contract: adapter-web-component / event router host.* (v0)', () => {
  it('host.* should forward to adapter-defined host target (v0: same as native)', () => {
    const el = document.createElement('div');

    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    const calls: any[] = [];
    const cb = (ev: any) => calls.push(ev);

    router.rootTarget.addEventListener('host.click' as any, cb);

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(calls.length).toBe(1);
    expect(calls[0]).toBeInstanceOf(MouseEvent);

    router.dispose();
  });
});
