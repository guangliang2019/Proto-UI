import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';

import { VueAny, flushVue } from './utils/vue';
import { createVueAdapter } from '../src/adapt';

describe('adapter-vue: slots', () => {
  it('maps slot() to Vue default slot', async () => {
    const proto: Prototype = {
      name: 'vue-slot-basic',
      setup() {
        return (r) => [r.el('div', [r.slot()])];
      },
    };

    const Component = createVueAdapter(VueAny)(proto);
    const host = document.createElement('div');
    document.body.appendChild(host);

    const app = VueAny.createApp({
      setup() {
        return () => VueAny.h(Component, {}, () => [VueAny.h('span', { class: 'inner' }, 'hello')]);
      },
    });

    app.mount(host);
    await flushVue();

    expect(host.querySelector('.inner')?.textContent).toBe('hello');

    app.unmount();
    host.remove();
  });
});
