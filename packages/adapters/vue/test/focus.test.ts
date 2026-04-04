import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';
import { asFocusScope } from '@proto.ui/hooks';

import { asButton } from '../../../prototypes/base/src/button';
import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: focus wiring', () => {
  it('makes asButton host focusable and syncs focus/blur to exposes', async () => {
    const proto = definePrototype({
      name: 'vue-focusable-button',
      setup() {
        asButton();
        return (r) => [r.el('button', 'ok')];
      },
    });

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    expect(mounted.root?.tabIndex).toBe(0);

    const exposes = mounted.vm.getExposes();
    expect(exposes.focused.get()).toBe(false);

    mounted.root?.focus();
    expect(exposes.focused.get()).toBe(true);

    mounted.root?.blur();
    expect(exposes.focused.get()).toBe(false);

    mounted.unmount();
  });

  it('does not make focus-scope-only host focusable', async () => {
    const proto = definePrototype({
      name: 'vue-focus-scope-only',
      setup() {
        asFocusScope({ emptyPolicy: 'container' });
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedVueAdapter(proto);
    await flushVue();

    expect(mounted.root?.tabIndex).toBe(-1);

    mounted.unmount();
  });
});
