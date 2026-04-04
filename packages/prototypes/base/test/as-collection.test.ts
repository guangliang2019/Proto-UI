import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, definePrototype, type Prototype } from '@proto.ui/core';
import { asCollection, asCollectionItem } from '@proto.ui/hooks';
import { executeWithHost, type RuntimeHost } from '@proto.ui/runtime';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto.ui/module-expose';
import {
  ANATOMY_GET_PROTO_CAP,
  ANATOMY_INSTANCE_TOKEN_CAP,
  ANATOMY_ORDER_OBSERVER_CAP,
  ANATOMY_PARENT_CAP,
  ANATOMY_ROOT_TARGET_CAP,
} from '@proto.ui/module-anatomy';

type Target = {
  id: string;
  compareDocumentPosition(other: Target): number;
};

function createTarget(id: string, orderMap: Map<string, number>): Target {
  return {
    id,
    compareDocumentPosition(other: Target) {
      const a = orderMap.get(id) ?? 0;
      const b = orderMap.get(other.id) ?? 0;
      if (a < b) return 4;
      if (a > b) return 2;
      return 0;
    },
  };
}

function createHost(args: {
  instance: Target;
  getParent: (instance: unknown) => unknown | null;
  getPrototype: (instance: unknown) => Prototype<any> | null;
}) {
  let exposes: Record<string, any> | null = null;
  let orderNotify: (() => void) | null = null;

  const host: RuntimeHost<any> = {
    prototypeName: `host-${args.instance.id}`,
    getRawProps: () => ({}),
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady(wiring) {
      wiring.attach('expose', [
        [EXPOSE_SET_EXPOSES_CAP, (next: Record<string, unknown>) => (exposes = next)],
      ]);
      wiring.attach('anatomy', [
        [ANATOMY_INSTANCE_TOKEN_CAP, args.instance],
        [ANATOMY_PARENT_CAP, args.getParent],
        [ANATOMY_GET_PROTO_CAP, args.getPrototype],
        [ANATOMY_ROOT_TARGET_CAP, (instance: unknown) => instance as Target],
        [
          ANATOMY_ORDER_OBSERVER_CAP,
          (_target: unknown, notify: () => void) => {
            orderNotify = notify;
            return () => {
              orderNotify = null;
            };
          },
        ],
      ]);
    },
  };

  return {
    host,
    getExposes() {
      return exposes as Record<string, any>;
    },
    notifyOrderChange() {
      orderNotify?.();
    },
  };
}

describe('prototypes/base: asCollection', () => {
  it('provides live ordered collection snapshots and item indexes', () => {
    const family = createAnatomyFamily('x-collection-family');
    const orderMap = new Map<string, number>([
      ['root', 0],
      ['item-a', 2],
      ['item-b', 1],
    ]);
    const rootTarget = createTarget('root', orderMap);
    const itemATarget = createTarget('item-a', orderMap);
    const itemBTarget = createTarget('item-b', orderMap);
    const parents = new Map<unknown, unknown | null>([
      [rootTarget, null],
      [itemATarget, rootTarget],
      [itemBTarget, rootTarget],
    ]);

    const Root = definePrototype({
      name: 'x-collection-root',
      setup(def) {
        def.anatomy.family(family, {
          roles: {
            root: { cardinality: { min: 1, max: 1 } },
            item: { cardinality: { min: 0, max: 10 } },
          },
        });
        asCollection({ family, rootRole: 'root' });
        return (r) => r.el('div', r.r.slot());
      },
    });

    const Item = definePrototype<{ id?: string }>({
      name: 'x-collection-item',
      setup(def) {
        def.props.define({
          id: { type: 'string', empty: 'fallback' },
        });
        def.props.setDefaults({
          id: '',
        });
        asCollectionItem({
          family,
          getMeta: (run) => ({ id: run.props.get().id ?? '' }),
        });
        return (r) => r.el('div', r.r.slot());
      },
    });

    const getPrototype = (instance: unknown) => {
      if (instance === rootTarget) return Root;
      if (instance === itemATarget || instance === itemBTarget) return Item;
      return null;
    };

    const rootCtx = createHost({
      instance: rootTarget,
      getParent: (instance) => parents.get(instance) ?? null,
      getPrototype,
    });
    const itemACtx = createHost({
      instance: itemATarget,
      getParent: (instance) => parents.get(instance) ?? null,
      getPrototype,
    });
    const itemBCtx = createHost({
      instance: itemBTarget,
      getParent: (instance) => parents.get(instance) ?? null,
      getPrototype,
    });

    executeWithHost(Root as any, rootCtx.host as any);
    const itemA = executeWithHost(
      Item as any,
      {
        ...itemACtx.host,
        getRawProps: () => ({ id: 'a' }),
      } as any
    );
    executeWithHost(
      Item as any,
      {
        ...itemBCtx.host,
        getRawProps: () => ({ id: 'b' }),
      } as any
    );

    rootCtx.notifyOrderChange();
    itemACtx.notifyOrderChange();

    const rootExposes = rootCtx.getExposes();
    const itemAExposes = itemACtx.getExposes();

    expect(rootExposes.getCollectionCount()).toBe(2);
    expect(rootExposes.getCollectionItems()).toEqual([
      { id: 'b', index: 0, total: 2, first: true, last: false },
      { id: 'a', index: 1, total: 2, first: false, last: true },
    ]);
    expect(itemAExposes.collectionIndex.get()).toBe(1);
    expect(itemAExposes.collectionTotal.get()).toBe(2);

    orderMap.set('item-a', 1);
    orderMap.set('item-b', 2);
    rootCtx.notifyOrderChange();
    itemACtx.notifyOrderChange();

    expect(rootExposes.getCollectionItems()).toEqual([
      { id: 'a', index: 0, total: 2, first: true, last: false },
      { id: 'b', index: 1, total: 2, first: false, last: true },
    ]);
    expect(itemAExposes.collectionIndex.get()).toBe(0);
  });
});
