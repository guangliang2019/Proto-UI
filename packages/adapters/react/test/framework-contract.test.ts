import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';

import { createReactAdapter } from '../src/adapt';
import { createFakeReactRuntime, createMountedReactAdapter } from './utils/fake-react';

describe('adapter-react: framework contract', () => {
  it('accepts both React runtime and legacy { React } wrapper input', () => {
    const fake = createFakeReactRuntime();

    const proto: Prototype = {
      name: 'react-framework-contract',
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    };

    const direct = createReactAdapter(fake.runtime)(proto);
    const wrapped = createReactAdapter({ React: fake.runtime } as any)(proto);

    expect(direct.displayName).toBe('Proto(react-framework-contract)');
    expect(wrapped.displayName).toBe('Proto(react-framework-contract)');
  });

  it('exposes update/getExposes through forwarded ref handle', () => {
    const proto = definePrototype({
      name: 'react-expose-basic',
      setup(def) {
        def.expose('api', { version: 1 });
        return (r) => [r.el('div', 'ok')];
      },
    });

    const mounted = createMountedReactAdapter(proto);
    expect(typeof mounted.ref.current.update).toBe('function');
    expect(mounted.ref.current.getExposes()).toEqual({ api: { version: 1 } });
  });

  it('consumes adapter props without leaking them onto host DOM', () => {
    let seenLabel: string | null = null;

    const proto = definePrototype({
      name: 'react-props-basic',
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
      hostClassName: 'rounded',
    });

    expect(seenLabel).toBe('Second');
    expect(mounted.root?.className).toContain('rounded');
    expect(mounted.root?.getAttribute('label')).toBe(null);
  });
});
