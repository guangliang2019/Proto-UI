import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

describe('contract: adapter-web-component / event disabled after unmount (v0)', () => {
  it('after disconnected, native events must not invoke proto callbacks', async () => {
    const calls: string[] = [];

    const P: Prototype = {
      name: 'x-wc-event-after-unmount',
      setup(def: any) {
        def.event.on('press.commit', () => calls.push('press.commit'));
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r: any) => r.el('div', {}, ['x']);
      },
    };

    AdaptToWebComponent(P, { shadow: false });

    const el = document.createElement(P.name) as any;
    document.body.appendChild(el);

    // 等待“commit done -> bind/enable”的任何可能异步
    await Promise.resolve();

    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit']);

    el.remove();
    await Promise.resolve();

    // unmount 后再点，不应再触发
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit', 'unmounted']);
  });
});
