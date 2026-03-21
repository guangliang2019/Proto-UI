import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import type { ContextKey } from '@proto-ui/types';
import { AdaptToWebComponent } from '@proto-ui/adapters.web-component';

const KEY = { __brand: 'ContextKey', debugName: 'ctx-state-sync' } as ContextKey<{ value: number }>;

describe('contract: adapter-web-component / context callback may set local state (v0)', () => {
  it('context.subscribe callback runs with a usable run handle and may call state.set', async () => {
    const seen: number[] = [];

    const P: Prototype = {
      name: 'x-context-state-sync-1',
      setup(def) {
        const local = def.state.numberDiscrete('local', 0);
        const update = def.context.provide(KEY, { value: 0 });

        def.context.subscribe(KEY, (_run, next) => {
          local.set(next.value, 'reason: context.subscribe => local');
          seen.push(local.get());
        });

        def.lifecycle.onMounted(() => {
          update({ value: 1 });
          update({ value: 2 });
        });

        def.expose.state('local', local);
        return (r) => [r.el('div', 'ok')];
      },
    };

    AdaptToWebComponent(P);

    const el = document.createElement('x-context-state-sync-1') as any;
    document.body.appendChild(el);

    await Promise.resolve();
    await Promise.resolve();

    expect(seen).toEqual([1, 2]);
    expect(el.getExposes().local.get()).toBe(2);

    el.remove();
    await Promise.resolve();
  });
});
