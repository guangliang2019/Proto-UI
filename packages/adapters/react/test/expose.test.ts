import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';

import { createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: expose', () => {
  it('exposes update and getExposes on forwarded ref handle', () => {
    const proto: Prototype = {
      name: 'react-expose-basic',
      setup(def) {
        def.expose('api', { version: 1 });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mounted = createMountedReactAdapter(proto);

    expect(typeof mounted.ref.current.update).toBe('function');
    expect(mounted.ref.current.getExposes()).toEqual({ api: { version: 1 } });

    mounted.unmount();
  });

  it('consumes undeclared React props as adapter raw props instead of host attrs', () => {
    let seenLabel: string | null = null;

    const proto = definePrototype({
      name: 'react-attrs-props-basic',
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

    const mounted = createMountedReactAdapter(proto, {
      label: 'Second',
    });

    expect(seenLabel).toBe('Second');
    expect(mounted.root?.getAttribute('label')).toBe(null);

    mounted.unmount();
  });
});
