import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';

import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: expose', () => {
  it('exposes update and getExposes on component public instance', async () => {
    const proto: Prototype = {
      name: 'vue-expose-basic',
      setup(def) {
        def.expose('api', { version: 1 });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    expect(typeof mounted.vm.update).toBe('function');
    expect(mounted.vm.getExposes()).toEqual({ api: { version: 1 } });

    mounted.unmount();
  });

  it('consumes undeclared Vue attrs as adapter raw props instead of falling through to DOM', async () => {
    let seenLabel: string | null = null;

    const proto = definePrototype({
      name: 'vue-attrs-props-basic',
      setup(def) {
        def.props.define({
          label: { type: 'string', default: 'fallback' },
        });
        def.lifecycle.onMounted((run) => {
          seenLabel = String(run.props.get().label ?? 'missing');
        });
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedVueAdapter(proto, {
      label: 'Second',
    });

    await flushVue();

    expect(seenLabel).toBe('Second');
    expect(mounted.root?.getAttribute('label')).toBe(null);

    mounted.unmount();
  });
});
