import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';
import { asTransition, type TransitionProps } from '@proto.ui/hooks';

import { createMountedVueAdapter, flushVue } from './utils/vue';

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc != null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

async function callControl(mounted: ReturnType<typeof createMountedVueAdapter>, path: string) {
  const vm = mounted.vm as {
    getExposes(): Record<string, unknown>;
    update?(): void;
    invokeInCallbackScope?(fn: () => void): void;
  };

  const invoke = () => {
    const exposes = vm.getExposes();
    const fn = resolvePath(exposes, path);
    if (typeof fn === 'function') {
      fn();
    }
  };

  if (typeof vm.invokeInCallbackScope === 'function') {
    vm.invokeInCallbackScope(invoke);
  } else {
    invoke();
  }

  vm.update?.();
  await flushVue();
}

function readTransitionState(mounted: ReturnType<typeof createMountedVueAdapter>) {
  const exposes = mounted.vm.getExposes();
  const getter = resolvePath(exposes, 'transitionState.get');
  if (typeof getter === 'function') {
    return getter();
  }
  return undefined;
}

describe('adapter-vue: transition command in closed state', () => {
  it('keeps controls.enter callable after soft unmount', async () => {
    const proto = definePrototype<TransitionProps>({
      name: 'vue-transition-command-closed-enter',
      setup() {
        asTransition();
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedVueAdapter(proto as any, {
      open: true,
      appear: false,
    });

    try {
      await flushVue();

      // entering -> entered
      await callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('entered');

      // entered -> leaving -> closed (soft unmount)
      await callControl(mounted, 'controls.leave');
      expect(readTransitionState(mounted)).toBe('leaving');
      await callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('closed');

      const controlsEnter = resolvePath(mounted.vm.getExposes(), 'controls.enter');
      expect(typeof controlsEnter).toBe('function');

      // closed -> entering should still work via command API
      await callControl(mounted, 'controls.enter');
      expect(readTransitionState(mounted)).toBe('entering');
    } finally {
      mounted.unmount();
    }
  });
});
