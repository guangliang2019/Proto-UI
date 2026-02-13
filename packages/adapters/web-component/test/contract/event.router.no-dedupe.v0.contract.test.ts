// packages/adapters/web-component/test/contract/event.router.no-dedupe.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { createWebProtoEventRouter } from '@proto-ui/adapters.base';

describe('contract: adapter-web-component / event router no-dedupe (v0)', () => {
  it('adding same callback twice must result in two deliveries (native:*)', () => {
    const el = document.createElement('div');
    const router = createWebProtoEventRouter({
      rootEl: el,
      globalEl: window,
      isEnabled: () => true,
    });

    let n = 0;
    const cb = () => n++;

    router.rootTarget.addEventListener('native:click' as any, cb);
    router.rootTarget.addEventListener('native:click' as any, cb);

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(n).toBe(2);

    router.dispose();
  });
});
