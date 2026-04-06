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

  it('delays soft unmount to second frame after leaving completes', async () => {
    const originalRaf = globalThis.requestAnimationFrame;
    const originalCancelRaf = globalThis.cancelAnimationFrame;
    let rafSeq = 0;
    const rafQueue = new Map<number, FrameRequestCallback>();

    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      const id = ++rafSeq;
      rafQueue.set(id, cb);
      return id;
    }) as typeof requestAnimationFrame;

    globalThis.cancelAnimationFrame = ((id: number) => {
      rafQueue.delete(id);
    }) as typeof cancelAnimationFrame;

    const proto = definePrototype<TransitionProps>({
      name: 'vue-transition-tail-frame-unmount',
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

      await callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('entered');

      await callControl(mounted, 'controls.leave');
      expect(readTransitionState(mounted)).toBe('leaving');

      await callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('closed');
      expect(mounted.host.firstElementChild).not.toBeNull();
      expect(rafQueue.size).toBe(1);

      const next = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(next).toBeTruthy();
      if (next) {
        rafQueue.delete(next[0]);
        next[1](16.7);
      }

      // 第一帧后应仍然可见，并排队第二帧卸载。
      await flushVue();
      expect(mounted.host.firstElementChild).not.toBeNull();
      expect(rafQueue.size).toBe(1);

      const second = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(second).toBeTruthy();
      if (second) {
        rafQueue.delete(second[0]);
        second[1](16.7);
      }

      await flushVue();
      expect(mounted.host.firstElementChild).toBeNull();
      expect(rafQueue.size).toBe(0);
    } finally {
      mounted.unmount();
      globalThis.requestAnimationFrame = originalRaf;
      globalThis.cancelAnimationFrame = originalCancelRaf;
    }
  });

  it('waits for close transition end before unmount when motion is detected', async () => {
    const originalRaf = globalThis.requestAnimationFrame;
    const originalCancelRaf = globalThis.cancelAnimationFrame;
    let rafSeq = 0;
    const rafQueue = new Map<number, FrameRequestCallback>();

    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      const id = ++rafSeq;
      rafQueue.set(id, cb);
      return id;
    }) as typeof requestAnimationFrame;

    globalThis.cancelAnimationFrame = ((id: number) => {
      rafQueue.delete(id);
    }) as typeof cancelAnimationFrame;

    const proto = definePrototype<TransitionProps>({
      name: 'vue-transition-tail-motion-gate',
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

      await callControl(mounted, 'controls.complete');
      await callControl(mounted, 'controls.leave');
      await callControl(mounted, 'controls.complete');

      const first = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(first).toBeTruthy();
      if (first) {
        rafQueue.delete(first[0]);
        first[1](16.7);
      }

      const root = mounted.host.firstElementChild as HTMLElement | null;
      expect(root).not.toBeNull();
      root?.dispatchEvent(new Event('transitionrun', { bubbles: true }));

      const second = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(second).toBeTruthy();
      if (second) {
        rafQueue.delete(second[0]);
        second[1](16.7);
      }

      await flushVue();
      expect(mounted.host.firstElementChild).not.toBeNull();

      root?.dispatchEvent(new Event('transitionend', { bubbles: true }));
      await flushVue();
      expect(mounted.host.firstElementChild).toBeNull();
    } finally {
      mounted.unmount();
      globalThis.requestAnimationFrame = originalRaf;
      globalThis.cancelAnimationFrame = originalCancelRaf;
    }
  });
});
