import { describe, expect, it } from 'vitest';
import { tw, type Prototype } from '@proto-ui/core';

import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: rule state -> style', () => {
  it('applies rule style on state change and removes it on deactivate', async () => {
    const proto: Prototype = {
      name: 'vue-rule-state-style',
      setup(def: any) {
        const pressed = def.state.bool('pressed', false);

        def.rule({
          when: (w: any) => w.state(pressed).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        def.lifecycle.onUpdated(() => {
          pressed.set(!pressed.get());
        });

        return (r: any) => [r.el('div', {}, ['ok'])];
      },
    } as any;

    const mounted = createMountedVueAdapter(proto);
    await flushVue();
    await flushVue();

    mounted.vm.update();
    await flushVue();
    await flushVue();
    expect(mounted.root?.classList.contains('opacity-50')).toBe(true);

    mounted.vm.update();
    await flushVue();
    await flushVue();
    expect(mounted.root?.classList.contains('opacity-50')).toBe(false);

    mounted.unmount();
  });
});
