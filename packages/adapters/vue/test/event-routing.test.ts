import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: event routing', () => {
  it('delivers native:click via the adapter root target', async () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'vue-event-native-click',
      setup(def: any) {
        def.event.on('native:click', () => calls.push('native:click'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    mounted.root?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(calls).toEqual(['native:click']);

    mounted.unmount();
  });

  it('maps Enter keydown within the adapter root to press.commit and key.down', async () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'vue-event-key-routing',
      setup(def: any) {
        def.event.onGlobal('key.down', () => calls.push('key.down'));
        def.event.on('press.commit', () => calls.push('press.commit'));
        return (r: any) => r.el('div', {}, ['ok']);
      },
    };

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    mounted.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(calls).toEqual(['press.commit', 'key.down']);

    mounted.unmount();
  });
});
