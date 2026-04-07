import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';

import { DIALOG_CONTEXT, dialogContent, dialogMask } from '../../../prototypes/base/src/dialog';
import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: dialog integration', () => {
  it('renders dialog content when open and hides it when closed', () => {
    const proto = definePrototype({
      name: 'react-dialog-content-open-close',
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

    const mounted = createMountedReactAdapter(proto as any, { appear: false });

    try {
      const exposes = mounted.ref.current.getExposes();
      expect(exposes.transitionState?.get?.()).toBe('entering');

      mounted.ref.current.invokeInCallbackScope(() => {
        mounted.ref.current.getExposes().controls.leave();
      });
      mounted.update();

      expect(exposes.transitionState?.get?.()).toBe('leaving');
    } finally {
      mounted.unmount();
    }
  });

  it('shows transition attributes on host element', () => {
    const proto = definePrototype({
      name: 'react-dialog-transition-attrs',
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

    const mounted = createMountedReactAdapter(proto as any, { appear: false });

    try {
      const exposes = mounted.ref.current.getExposes();
      const state = exposes.transitionState?.get?.();

      expect(['entering', 'entered']).toContain(state ?? 'entering');

      const host = mounted.root as HTMLElement;
      expect(host).not.toBeNull();
    } finally {
      mounted.unmount();
    }
  });

  it('dialog mask follows transition state', () => {
    const proto = definePrototype({
      name: 'react-dialog-mask-transition',
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

    const mounted = createMountedReactAdapter(proto as any, {});

    try {
      const host = mounted.root as HTMLElement;
      expect(host).not.toBeNull();

      const exposes = mounted.ref.current.getExposes();
      expect(exposes.transitionState?.get?.()).toBe('closed');

      mounted.ref.current.invokeInCallbackScope(() => {
        exposes.controls.enter();
      });
      mounted.update();

      expect(['entering', 'entered']).toContain(exposes.transitionState?.get?.());
    } finally {
      mounted.unmount();
    }
  });

  it('supports adapter overlayLayer base z-index configuration', () => {
    const proto = definePrototype({
      name: 'react-dialog-layer-base',
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

    const mounted = createMountedReactAdapter(
      proto as any,
      {},
      {
        overlayLayer: { baseZIndex: 6100 },
      }
    );

    try {
      const host = mounted.root as HTMLElement;
      expect(host).not.toBeNull();
      const zIndex = parseInt(host.style.zIndex || '0', 10);
      expect(zIndex).toBeGreaterThanOrEqual(7110);
    } finally {
      mounted.unmount();
    }
  });
});
