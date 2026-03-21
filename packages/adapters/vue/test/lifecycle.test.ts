import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto-ui/core';

import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: lifecycle', () => {
  it('created runs before mounted and unmounted runs on app unmount', async () => {
    const calls: string[] = [];

    const proto: Prototype = {
      name: 'vue-life-basic',
      setup(def) {
        def.lifecycle.onCreated(() => calls.push('created'));
        def.lifecycle.onMounted(() => calls.push('mounted'));
        def.lifecycle.onUnmounted(() => calls.push('unmounted'));
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    expect(calls.slice(0, 2)).toEqual(['created', 'mounted']);

    mounted.unmount();
    await flushVue();

    expect(calls.includes('unmounted')).toBe(true);
  });
});
