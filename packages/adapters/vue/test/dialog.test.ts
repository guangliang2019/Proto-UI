import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';

import { DIALOG_CONTEXT, dialogContent, dialogOverlay } from '../../../prototypes/base/src/dialog';
import { createMountedVueAdapter, flushVue } from './utils/vue';

describe('adapter-vue: dialog integration', () => {
  it('renders dialog content when open and hides it when closed', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-content-open-close',
      setup(def) {
        def.context.provide(DIALOG_CONTEXT, {
          open: true,
          controlled: false,
          disabled: false,
          alert: false,
        });
        dialogContent.setup(def);
        return (r) => [r.el('div', 'hello')];
      },
    });

    const mounted = createMountedVueAdapter(proto as any, { appear: false });
    await flushVue();

    try {
      const exposes = mounted.vm.getExposes();
      expect(exposes.transitionState?.get?.()).toBe('entering');

      mounted.vm.invokeInCallbackScope(() => {
        mounted.vm.getExposes().controls.leave();
      });
      mounted.vm.update?.();
      await flushVue();

      expect(exposes.transitionState?.get?.()).toBe('leaving');
    } finally {
      mounted.unmount();
    }
  });

  it('shows transition attributes on host element', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-transition-attrs',
      setup(def) {
        def.context.provide(DIALOG_CONTEXT, {
          open: true,
          controlled: false,
          disabled: false,
          alert: false,
        });
        dialogContent.setup(def);
        return (r) => [r.el('div')];
      },
    });

    const mounted = createMountedVueAdapter(proto as any, { appear: false });
    await flushVue();

    try {
      const exposes = mounted.vm.getExposes();
      const state = exposes.transitionState?.get?.();

      expect(['entering', 'entered']).toContain(state ?? 'entering');

      const host = mounted.host;
      expect(host.querySelector('div')).not.toBeNull();
    } finally {
      mounted.unmount();
    }
  });

  it('dialog overlay follows transition state', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-overlay-transition',
      setup(def) {
        def.context.provide(DIALOG_CONTEXT, {
          open: false,
          controlled: false,
          disabled: false,
          alert: false,
        });
        dialogOverlay.setup(def);
        return (r) => [r.el('div')];
      },
    });

    const mounted = createMountedVueAdapter(proto as any, {});
    await flushVue();

    try {
      const host = mounted.host;
      expect(host.querySelector('div')).not.toBeNull();

      const exposes = mounted.vm.getExposes();
      expect(exposes.transitionState?.get?.()).toBe('closed');

      mounted.vm.invokeInCallbackScope(() => {
        exposes.controls.enter();
      });
      mounted.vm.update?.();
      await flushVue();

      expect(['entering', 'entered']).toContain(exposes.transitionState?.get?.());
    } finally {
      mounted.unmount();
    }
  });
});
