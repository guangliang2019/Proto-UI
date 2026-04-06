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
});
