import { describe, expect, it } from 'vitest';
import { asFocusScope, definePrototype } from '@proto.ui/core';

import { asButton } from '../../../prototypes/base/src/button/as-button';
import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: focus wiring', () => {
  it('makes asButton host focusable and syncs focus/blur to exposes', () => {
    const proto = definePrototype({
      name: 'react-focusable-button',
      setup() {
        asButton();
        return (r) => [r.el('button', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto);

    expect(mounted.root?.tabIndex).toBe(0);

    const exposes = mounted.ref.current.getExposes();
    expect(exposes.focused.get()).toBe(false);

    mounted.root?.focus();
    expect(exposes.focused.get()).toBe(true);

    mounted.root?.blur();
    expect(exposes.focused.get()).toBe(false);

    mounted.unmount();
  });

  it('does not make focus-scope-only host focusable', () => {
    const proto = definePrototype({
      name: 'react-focus-scope-only',
      setup() {
        asFocusScope({ emptyPolicy: 'container' });
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto);

    expect(mounted.root?.tabIndex).toBe(-1);

    mounted.unmount();
  });
});
