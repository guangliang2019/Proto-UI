import { describe, expect, it } from 'vitest';
import { definePrototype } from '@proto.ui/core';
import { asTransition, type TransitionProps } from '@proto.ui/hooks';

import { createMountedReactAdapter } from './utils/fake-react';

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc != null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function callControl(mounted: ReturnType<typeof createMountedReactAdapter>, path: string) {
  const handle = mounted.ref.current as {
    getExposes(): Record<string, unknown>;
    update?(): void;
    invokeInCallbackScope?(fn: () => void): void;
  };

  const invoke = () => {
    const exposes = handle.getExposes();
    const fn = resolvePath(exposes, path);
    if (typeof fn === 'function') {
      fn();
    }
  };

  if (typeof handle.invokeInCallbackScope === 'function') {
    handle.invokeInCallbackScope(invoke);
  } else {
    invoke();
  }

  handle.update?.();
}

function readTransitionState(mounted: ReturnType<typeof createMountedReactAdapter>) {
  const exposes = mounted.ref.current.getExposes();
  const getter = resolvePath(exposes, 'transitionState.get');
  if (typeof getter === 'function') {
    return getter();
  }
  return undefined;
}

describe('adapter-react: transition command in closed state', () => {
  it('does not remount when leave is interrupted before complete', () => {
    const proto = definePrototype<TransitionProps>({
      name: 'react-transition-interrupt-no-remount',
      setup() {
        asTransition();
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto as any, {
      open: true,
      appear: false,
    });

    try {
      const firstRoot = mounted.root;
      expect(firstRoot).not.toBeNull();

      callControl(mounted, 'controls.leave');
      expect(readTransitionState(mounted)).toBe('leaving');

      callControl(mounted, 'controls.enter');
      expect(readTransitionState(mounted)).toBe('entering');

      callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('entered');

      // Leaving was interrupted before close-complete, so structural mount should persist.
      expect(mounted.root).toBe(firstRoot);
    } finally {
      mounted.unmount();
    }
  });

  it('keeps controls.enter callable after soft unmount', () => {
    const proto = definePrototype<TransitionProps>({
      name: 'react-transition-command-closed-enter',
      setup() {
        asTransition();
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto as any, {
      open: true,
      appear: false,
    });

    try {
      // entering -> entered
      callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('entered');

      // entered -> leaving -> closed (soft unmount)
      callControl(mounted, 'controls.leave');
      expect(readTransitionState(mounted)).toBe('leaving');
      callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('closed');

      const controlsEnter = resolvePath(mounted.ref.current.getExposes(), 'controls.enter');
      expect(typeof controlsEnter).toBe('function');

      // closed -> entering should still work via command API
      callControl(mounted, 'controls.enter');
      expect(readTransitionState(mounted)).toBe('entering');
    } finally {
      mounted.unmount();
    }
  });

  it('keeps closed tail frame and cancels second-frame unmount on re-enter', () => {
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
      name: 'react-transition-tail-frame-unmount',
      setup() {
        asTransition();
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto as any, {
      open: true,
      appear: false,
    });

    try {
      callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('entered');

      callControl(mounted, 'controls.leave');
      expect(readTransitionState(mounted)).toBe('leaving');

      callControl(mounted, 'controls.complete');
      expect(readTransitionState(mounted)).toBe('closed');
      expect(mounted.root).not.toBe(null);
      expect(rafQueue.size).toBe(1);

      const first = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(first).toBeTruthy();
      if (first) {
        rafQueue.delete(first[0]);
        first[1](16.7);
      }

      // 第一帧后仍应保留 closed 可见帧，并排队第二帧卸载。
      expect(mounted.root).not.toBe(null);
      expect(rafQueue.size).toBe(1);

      // 第二帧卸载触发前反向进入，应取消待执行卸载。
      callControl(mounted, 'controls.enter');
      expect(readTransitionState(mounted)).toBe('entering');
      expect(rafQueue.size).toBe(0);
    } finally {
      mounted.unmount();
      globalThis.requestAnimationFrame = originalRaf;
      globalThis.cancelAnimationFrame = originalCancelRaf;
    }
  });

  it('keeps mounted while close transition is running and supports re-enter cancel', () => {
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
      name: 'react-transition-tail-motion-gate',
      setup() {
        asTransition();
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto as any, {
      open: true,
      appear: false,
    });

    try {
      callControl(mounted, 'controls.complete');
      callControl(mounted, 'controls.leave');
      callControl(mounted, 'controls.complete');

      const first = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(first).toBeTruthy();
      if (first) {
        rafQueue.delete(first[0]);
        first[1](16.7);
      }

      const root = mounted.root as HTMLElement | null;
      expect(root).not.toBeNull();
      root?.dispatchEvent(new Event('transitionrun', { bubbles: true }));

      const second = rafQueue.entries().next().value as [number, FrameRequestCallback] | undefined;
      expect(second).toBeTruthy();
      if (second) {
        rafQueue.delete(second[0]);
        second[1](16.7);
      }

      mounted.ref.current?.update?.();
      expect(mounted.root).not.toBeNull();

      callControl(mounted, 'controls.enter');
      expect(readTransitionState(mounted)).toBe('entering');
    } finally {
      mounted.unmount();
      globalThis.requestAnimationFrame = originalRaf;
      globalThis.cancelAnimationFrame = originalCancelRaf;
    }
  });
});
