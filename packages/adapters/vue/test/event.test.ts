import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: events', () => {
  it('enables native events only after Vue commit boundary', async () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'vue-event-gate-basic',
      setup(def: any) {
        def.event.on('press.commit', () => calls.push('press.commit'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedVueAdapter(proto);

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual([]);

    await flushVue();

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit']);

    mounted.unmount();
  });

  it('disables native events after unmount', async () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'vue-event-after-unmount',
      setup(def: any) {
        def.event.on('press.commit', () => calls.push('press.commit'));
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit']);

    const root = mounted.root;
    mounted.unmount();
    await flushVue();

    root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['press.commit', 'unmounted']);
  });
});
