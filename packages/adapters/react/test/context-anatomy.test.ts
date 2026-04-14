import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';

import { createMountedReactAdapter, createMountedReactAdapterInto } from './utils/fake-react';

const KEY = { __brand: 'ContextKey', debugName: 'ctx' } as ContextKey<{ value: number }>;
const FAMILY = createAnatomyFamily('react-anatomy-basic');

function registerFamily(def: any) {
  def.anatomy.family(FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      item: { cardinality: { min: 0, max: 10 } },
    },
    relations: [],
  });
}

describe('adapter-react: context and anatomy', () => {
  it('supports context provide/subscribe/update', () => {
    const contextLog: Array<[number, number]> = [];
    let mounted = false;

    const proto: Prototype = {
      name: 'react-context-basic',
      setup(def) {
        const update = def.context.provide(KEY, { value: 0 });
        def.context.subscribe(KEY, (_run, next, prev) => {
          contextLog.push([prev.value, next.value]);
        });
        def.lifecycle.onMounted((run) => {
          mounted = true;
          run.context.update(KEY, { value: 1 });
          update({ value: 2 });
        });
        return (r) => [r.el('div', 'ok')];
      },
    };

    const mountedAdapter = createMountedReactAdapter(proto);

    expect(mounted).toBe(true);
    expect(contextLog).toEqual([
      [0, 1],
      [1, 2],
    ]);

    mountedAdapter.unmount();
  });

  it('supports anatomy runtime lookup across nested adapters', () => {
    const anatomyCalls: string[] = [];

    const Root: Prototype = {
      name: 'react-root-basic',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'root' });
        return (r) => [r.slot()];
      },
    };

    const Item: Prototype = {
      name: 'react-item-basic',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'item' });
        def.lifecycle.onMounted((run) => {
          const roots = run.anatomy.partsOf(FAMILY, 'root');
          if (roots.length > 0) anatomyCalls.push('found-root');
        });
        return (r) => [r.el('button', 'item')];
      },
    };

    const host = document.createElement('div');
    document.body.appendChild(host);

    const mountedRoot = createMountedReactAdapterInto(Root, host);
    const mountedItem = createMountedReactAdapterInto(Item, mountedRoot.root as HTMLElement);

    expect(anatomyCalls).toEqual(['found-root']);

    mountedItem.unmount();
    mountedRoot.unmount();
    host.remove();
  });
});
