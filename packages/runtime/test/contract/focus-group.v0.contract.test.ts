import { describe, expect, it } from 'vitest';
import { createFocusGroupKey, definePrototype, type FocusGroupHandle } from '@proto.ui/core';
import { asFocusGroup, asFocusScope } from '@proto.ui/hooks';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { FocusPort } from '@proto.ui/module-focus';
import type { PropsBaseType } from '@proto.ui/types';

const createHost = <P extends PropsBaseType>(name: string) => {
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
  };

  return { host };
};

describe('runtime contract: focus-group (v0)', () => {
  it('FOCUS-GROUP-0100: repeated asFocusGroup calls reuse one handle and keep last patch', () => {
    const first = createFocusGroupKey({ debugLabel: 'group-1' });
    const second = createFocusGroupKey({ debugLabel: 'group-2' });
    let a!: FocusGroupHandle<any>;
    let b!: FocusGroupHandle<any>;

    const P = definePrototype({
      name: 'x-focus-group-0100',
      setup() {
        a = asFocusGroup({ key: first, navigation: 'arrow' });
        b = asFocusGroup({ key: second, orientation: 'horizontal', selectOnFocus: true });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(a).toBe(b);
    expect(port?.getEffectiveGroupKey()).toBe(second);
    expect(port?.getGroupConfig()).toMatchObject({
      key: second,
      navigation: 'arrow',
      orientation: 'horizontal',
      selectOnFocus: true,
      entry: 'first',
      loop: false,
    });
  });

  it('FOCUS-GROUP-0200: asFocusScope exposes its internal group handle', () => {
    let group!: FocusGroupHandle<any>;

    const P = definePrototype({
      name: 'x-focus-group-0200',
      setup() {
        const scope = asFocusScope({
          entry: 'selected',
          group: { navigation: 'arrow', orientation: 'horizontal' },
        });
        group = scope.getGroup()!;
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(group).toBeTruthy();
    expect(port?.getGroupConfig()).toMatchObject({
      navigation: 'arrow',
      orientation: 'horizontal',
    });
  });
});
