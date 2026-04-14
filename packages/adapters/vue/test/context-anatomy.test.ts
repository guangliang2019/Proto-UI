import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';

import { VueAny, createMountedVueAdapter, flushVue } from './utils/vue';
import { createVueAdapter } from '../src/adapt';

const KEY = { __brand: 'ContextKey', debugName: 'ctx' } as ContextKey<{ value: number }>;
const FAMILY = createAnatomyFamily('vue-anatomy-basic');

function registerFamily(def: any) {
  def.anatomy.family(FAMILY, {
    roles: {
      root: { cardinality: { min: 1, max: 1 } },
      item: { cardinality: { min: 0, max: 10 } },
    },
    relations: [],
  });
}

describe('adapter-vue: context and anatomy', () => {
  it('supports context provide/subscribe/update', async () => {
    const contextLog: Array<[number, number]> = [];
    let mounted = false;

    const proto: Prototype = {
      name: 'vue-context-basic',
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

    const mountedAdapter = createMountedVueAdapter(proto);
    await flushVue();
    await flushVue();

    expect(mounted).toBe(true);
    expect(contextLog).toEqual([
      [0, 1],
      [1, 2],
    ]);

    mountedAdapter.unmount();
  });

  it('supports anatomy runtime lookup across nested adapters', async () => {
    const anatomyCalls: string[] = [];

    const Root: Prototype = {
      name: 'vue-root-basic',
      setup(def) {
        registerFamily(def);
        def.anatomy.claim(FAMILY, { role: 'root' });
        return (r) => [r.slot()];
      },
    };

    const Item: Prototype = {
      name: 'vue-item-basic',
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

    const adapter = createVueAdapter(VueAny);
    const RootComponent = adapter(Root);
    const ItemComponent = adapter(Item);

    const host = document.createElement('div');
    document.body.appendChild(host);

    const app = VueAny.createApp({
      setup() {
        return () => VueAny.h(RootComponent, {}, () => [VueAny.h(ItemComponent)]);
      },
    });

    app.mount(host);
    await flushVue();
    await flushVue();

    expect(anatomyCalls).toEqual(['found-root']);

    app.unmount();
    host.remove();
  });
});
