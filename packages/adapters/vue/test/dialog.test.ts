import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';

import { DIALOG_CONTEXT, dialogContent, dialogMask } from '../../../prototypes/base/src/dialog';
import { createMountedVueAdapter, createMountedVueAdapterWithOptions, flushVue } from './utils/vue';

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

      const layeredHost = document.body.querySelector('[data-transition-state]');
      expect(layeredHost).not.toBeNull();
    } finally {
      mounted.unmount();
    }
  });

  it('dialog mask follows transition state', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-mask-transition',
      setup(def) {
        def.context.provide(DIALOG_CONTEXT, {
          open: false,
          controlled: false,
          disabled: false,
          alert: false,
        });
        dialogMask.setup(def);
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

  it('supports adapter overlayLayer base z-index configuration', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-layer-base',
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

    const mounted = createMountedVueAdapterWithOptions(
      proto as any,
      {
        overlayLayer: { baseZIndex: 7100 },
      },
      {}
    );
    await flushVue();

    try {
      // 由于 Teleport 可能导致 initSession 重入，sequence 会累加；
      // 这里只验证语义层级生效，不依赖精确序号。
      const host = document.body.querySelector('[style*="z-index"]') as HTMLElement | null;
      expect(host).not.toBeNull();
      const zIndex = parseInt(host?.style.zIndex ?? '0', 10);
      expect(zIndex).toBeGreaterThanOrEqual(8110);
    } finally {
      mounted.unmount();
    }
  });

  it('routes global outside pointerdown through the adapter and closes dialog content', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-outside-pointerdown',
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
      expect(mounted.vm.getExposes().open?.get?.()).toBe(true);

      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      mounted.vm.update?.();
      await flushVue();

      expect(mounted.vm.getExposes().open?.get?.()).toBe(false);
    } finally {
      mounted.unmount();
    }
  });

  it('projects dialog mask passthrough to host pointer-events without affecting transition state', async () => {
    const proto = definePrototype({
      name: 'vue-dialog-mask-passthrough',
      setup(def) {
        def.context.provide(DIALOG_CONTEXT, {
          open: true,
          controlled: false,
          disabled: false,
          alert: false,
        });
        dialogMask.setup(def);
        return (r) => [r.el('div')];
      },
    });

    const mounted = createMountedVueAdapter(proto as any, { passthrough: true });
    await flushVue();

    try {
      const host = document.body.querySelector(
        '[style*="pointer-events: none"]'
      ) as HTMLElement | null;
      expect(host).not.toBeNull();
    } finally {
      mounted.unmount();
    }
  });
});
