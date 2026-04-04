import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, definePrototype, type Prototype } from '@proto.ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import {
  ANATOMY_GET_PROTO_CAP,
  ANATOMY_INSTANCE_TOKEN_CAP,
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
      wiring.attach('anatomy', [
        [ANATOMY_INSTANCE_TOKEN_CAP, args.instance],
        [ANATOMY_PARENT_CAP, args.getParent],
        [ANATOMY_GET_PROTO_CAP, args.getPrototype],
        [ANATOMY_ROOT_TARGET_CAP, (instance: unknown) => instance as Target],
      ]);
    },
  };

  return { host };
}

describe('runtime contract: anatomy.order (v0)', () => {
  it('ANATOMY-ORDER-RT-0100: run.anatomy.order queries reflect host order and self adjacency', () => {
    const family = createAnatomyFamily('rt-anatomy-order');
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

    let orderedIds: unknown[] = [];
    let version = -1;
    let itemAIndex = -1;
    let itemAPrevId: unknown = undefined;
    let itemANextId: unknown = undefined;

    const Root = definePrototype({
      name: 'x-rt-anatomy-order-root',
      setup(def) {
        def.anatomy.family(family, {
          roles: {
            root: { cardinality: { min: 1, max: 1 } },
            item: { cardinality: { min: 0, max: 10 } },
          },
        });
        def.anatomy.claim(family, { role: 'root' });
        def.lifecycle.onUpdated((run) => {
          orderedIds = run.anatomy.order
            .partsOf(family, 'item')
            .map((part) => part.getExpose('id'));
          version = run.anatomy.order.version(family);
        });
        return (r) => r.el('div', r.r.slot());
      },
    });

    const Item = definePrototype({
      name: 'x-rt-anatomy-order-item',
      setup(def) {
        def.anatomy.claim(family, { role: 'item' });
        def.expose.value('id' as any, '');
        def.lifecycle.onUpdated((run) => {
          const prev = run.anatomy.order.prevOfSelf(family, 'item');
          const next = run.anatomy.order.nextOfSelf(family, 'item');
          if (
            run.anatomy.order.indexOfSelf(family, 'item') >= 0 &&
            run.anatomy.order.partsOf(family, 'item').length > 0
          ) {
            itemAIndex = run.anatomy.order.indexOfSelf(family, 'item');
            itemAPrevId = prev?.getExpose('id');
            itemANextId = next?.getExpose('id');
          }
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

    const rootExec = executeWithHost(Root as any, rootCtx.host as any);
    const itemAExec = executeWithHost(
      definePrototype({
        name: 'x-rt-anatomy-order-item-a',
        setup(def) {
          def.anatomy.claim(family, { role: 'item' });
          def.expose.value('id' as any, 'a');
          def.lifecycle.onUpdated((run) => {
            itemAIndex = run.anatomy.order.indexOfSelf(family, 'item');
            itemAPrevId = run.anatomy.order.prevOfSelf(family, 'item')?.getExpose('id');
            itemANextId = run.anatomy.order.nextOfSelf(family, 'item')?.getExpose('id');
          });
          return (r) => r.el('div', r.r.slot());
        },
      }) as any,
      itemACtx.host as any
    );
    executeWithHost(
      definePrototype({
        name: 'x-rt-anatomy-order-item-b',
        setup(def) {
          def.anatomy.claim(family, { role: 'item' });
          def.expose.value('id' as any, 'b');
          return (r) => r.el('div', r.r.slot());
        },
      }) as any,
      itemBCtx.host as any
    );

    rootExec.controller.update();
    itemAExec.controller.update();

    expect(orderedIds).toEqual(['b', 'a']);
    expect(version).toBe(0);
    expect(itemAIndex).toBe(1);
    expect(itemAPrevId).toBe('b');
    expect(itemANextId).toBeUndefined();
  });

  it('ANATOMY-ORDER-RT-0200: run.anatomy query policies return null/empty when no valid domain exists', () => {
    const family = createAnatomyFamily('rt-anatomy-order-policy');
    const orphanTarget = createTarget('orphan', new Map([['orphan', 0]]));
    let seen: Record<string, unknown> | null = null;

    const Orphan = definePrototype({
      name: 'x-rt-anatomy-order-orphan',
      setup(def) {
        def.anatomy.family(family, {
          roles: {
            root: { cardinality: { min: 1, max: 1 } },
            item: { cardinality: { min: 0, max: 10 } },
          },
        });
        def.anatomy.claim(family, { role: 'item' });
        def.lifecycle.onUpdated((run) => {
          seen = {
            parts: run.anatomy.parts(family, { missing: 'null' }),
            emptyParts: run.anatomy.parts(family, { missing: 'empty' }),
            roleParts: run.anatomy.partsOf(family, 'item', { missing: 'null' }),
            emptyRoleParts: run.anatomy.partsOf(family, 'item', { missing: 'empty' }),
            version: run.anatomy.order.version(family, { missing: 'null' }),
            ordered: run.anatomy.order.parts(family, { missing: 'null' }),
            orderedRole: run.anatomy.order.partsOf(family, 'item', { missing: 'null' }),
            index: run.anatomy.order.indexOfSelf(family, 'item', { missing: 'null' }),
            prev: run.anatomy.order.prevOfSelf(family, 'item', { missing: 'null' }),
            next: run.anatomy.order.nextOfSelf(family, 'item', { missing: 'null' }),
          };
        });
        return (r) => r.el('div', r.r.slot());
      },
    });

    const orphanCtx = createHost({
      instance: orphanTarget,
      getParent: () => null,
      getPrototype: (instance) => (instance === orphanTarget ? Orphan : null),
    });

    executeWithHost(Orphan as any, orphanCtx.host as any).controller.update();

    expect(seen).toEqual({
      parts: null,
      emptyParts: [],
      roleParts: null,
      emptyRoleParts: [],
      version: null,
      ordered: null,
      orderedRole: null,
      index: null,
      prev: null,
      next: null,
    });
  });

  it('ANATOMY-ORDER-RT-0300: embedded family declarations allow parts to claim before root setup', () => {
    const family = createAnatomyFamily('rt-anatomy-embedded-family', {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        item: { cardinality: { min: 0, max: 10 } },
      },
      relations: [{ kind: 'contains', parent: 'root', child: 'item' }],
    });
    const orderMap = new Map<string, number>([
      ['root', 0],
      ['item-a', 1],
    ]);
    const rootTarget = createTarget('root', orderMap);
    const itemTarget = createTarget('item-a', orderMap);
    const parents = new Map<unknown, unknown | null>([
      [rootTarget, null],
      [itemTarget, rootTarget],
    ]);

    let beforeRoot: readonly unknown[] | null = [];
    let afterRoot: readonly unknown[] = [];

    const Root = definePrototype({
      name: 'x-rt-anatomy-embedded-root',
      setup(def) {
        def.anatomy.claim(family, { role: 'root' });
      },
    });

    const Item = definePrototype({
      name: 'x-rt-anatomy-embedded-item',
      setup(def) {
        def.anatomy.claim(family, { role: 'item' });
        def.expose.value('id' as any, 'a');
        def.lifecycle.onUpdated((run) => {
          const parts = run.anatomy.order.partsOf(family, 'item', { missing: 'null' });
          if (parts === null) {
            beforeRoot = null;
            return;
          }
          afterRoot = parts.map((part) => part.getExpose('id'));
        });
      },
    });

    const getPrototype = (instance: unknown) => {
      if (instance === rootTarget) return Root;
      if (instance === itemTarget) return Item;
      return null;
    };

    const rootCtx = createHost({
      instance: rootTarget,
      getParent: (instance) => parents.get(instance) ?? null,
      getPrototype,
    });
    const itemCtx = createHost({
      instance: itemTarget,
      getParent: (instance) => parents.get(instance) ?? null,
      getPrototype,
    });

    const itemExec = executeWithHost(Item as any, itemCtx.host as any);
    itemExec.controller.update();
    expect(beforeRoot).toBeNull();

    const rootExec = executeWithHost(Root as any, rootCtx.host as any);
    rootExec.controller.update();
    itemExec.controller.update();

    expect(afterRoot).toEqual(['a']);
  });
});
