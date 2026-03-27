import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';
import { AnatomyModuleImpl } from '../src/impl';
import { makeCaps, createSysCaps } from './utils/fake-caps';

function makeExposePort(record: Record<string, unknown> = {}) {
  return {
    get: (key: string) => record[key],
    getAll: () => ({ ...record }),
    has: (key: string) => Object.prototype.hasOwnProperty.call(record, key),
    keys: () => Object.keys(record),
  } as any;
}

function makeProto(hooks: string[] = []): Prototype<any> {
  const proto: Prototype<any> = { name: `x-${hooks.join('-') || 'plain'}`, setup: () => {} };
  Object.defineProperty(proto as any, '__asHooks', {
    value: hooks.map((name) => ({ name, order: 0, privileged: true })),
    configurable: true,
  });
  return proto;
}

describe('AnatomyModuleImpl', () => {
  it('enforces setup-only family/claim and callback-only runtime access', () => {
    const sys = createSysCaps();
    const instance = {};
    const caps = makeCaps({
      sys,
      instance,
      getParent: () => null,
      getPrototype: () => makeProto(['asSelect']),
    });
    const impl = new AnatomyModuleImpl(caps, 'p-x', makeExposePort());
    const family = createAnatomyFamily('setup-guard');

    sys.__setExecPhase('setup');
    impl.family(family, {
      roles: { root: { cardinality: { min: 1, max: 1 } } },
    });
    impl.claim(family, { role: 'root' });

    sys.__setExecPhase('callback');
    expect(() =>
      impl.family(family, { roles: { root: { cardinality: { min: 1, max: 1 } } } })
    ).toThrow();
    expect(() => impl.claim(family, { role: 'root' })).toThrow();
    expect(() => impl.parts(family)).not.toThrow();
  });

  it('rejects duplicate claim and non-root profile claim', () => {
    const sys = createSysCaps();
    const instance = {};
    const caps = makeCaps({
      sys,
      instance,
      getParent: () => null,
      getPrototype: () => makeProto(['asSelect']),
    });
    const impl = new AnatomyModuleImpl(caps, 'p-x', makeExposePort());
    const family = createAnatomyFamily('claim-rules');

    impl.family(family, {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        item: { cardinality: { min: 0, max: 2 } },
      },
      profiles: {
        default: {},
      },
    });

    expect(() => impl.claim(family, { role: 'item', profile: 'default' })).toThrow();
    impl.claim(family, { role: 'root', profile: 'default' });
    expect(() => impl.claim(family, { role: 'root' })).toThrow();
  });

  it('reports family errors and profile warnings', () => {
    const family = createAnatomyFamily('diag-cardinality');
    const root = {};
    const triggerA = {};
    const triggerB = {};
    const parentMap = new Map<any, any>([
      [root, null],
      [triggerA, root],
      [triggerB, root],
    ]);

    const sysRoot = createSysCaps();
    const rootImpl = new AnatomyModuleImpl(
      makeCaps({
        sys: sysRoot,
        instance: root,
        getParent: (instance) => parentMap.get(instance) ?? null,
        getPrototype: () => makeProto(['asSelect']),
      }),
      'root',
      makeExposePort()
    );
    const triggerImplA = new AnatomyModuleImpl(
      makeCaps({
        instance: triggerA,
        getParent: (instance) => parentMap.get(instance) ?? null,
        getPrototype: () => makeProto(['asTrigger']),
      }),
      'trigger-a',
      makeExposePort()
    );
    const triggerImplB = new AnatomyModuleImpl(
      makeCaps({
        instance: triggerB,
        getParent: (instance) => parentMap.get(instance) ?? null,
        getPrototype: () => makeProto(['asTrigger']),
      }),
      'trigger-b',
      makeExposePort()
    );

    rootImpl.family(family, {
      roles: {
        root: { cardinality: { min: 1, max: 1 }, requires: [{ kind: 'hook', name: 'asSelect' }] },
        trigger: {
          cardinality: { min: 0, max: 2 },
          requires: [{ kind: 'hook', name: 'asTrigger' }],
        },
      },
      profiles: {
        default: {
          roles: {
            trigger: { cardinality: { max: 1 } },
          },
        },
      },
    });
    rootImpl.claim(family, { role: 'root', profile: 'default' });
    triggerImplA.claim(family, { role: 'trigger' });
    triggerImplB.claim(family, { role: 'trigger' });

    const diags = rootImpl.port.getDiagnostics();
    expect(diags.some((it) => it.scope === 'profile' && it.code === 'ANATOMY_PROFILE_MAX')).toBe(
      true
    );
    expect(diags.some((it) => it.scope === 'family' && it.code === 'ANATOMY_FAMILY_MAX')).toBe(
      false
    );
  });

  it('reports missing family hook and relation failures', () => {
    const family = createAnatomyFamily('diag-relation');
    const root = {};
    const item = {};
    const parentMap = new Map<any, any>([
      [root, null],
      [item, root],
    ]);

    const rootImpl = new AnatomyModuleImpl(
      makeCaps({
        instance: root,
        getParent: (instance) => parentMap.get(instance) ?? null,
        getPrototype: () => makeProto(['asSelect']),
      }),
      'root',
      makeExposePort()
    );
    const itemImpl = new AnatomyModuleImpl(
      makeCaps({
        instance: item,
        getParent: (instance) => parentMap.get(instance) ?? null,
        getPrototype: () => makeProto([]),
      }),
      'item',
      makeExposePort()
    );

    rootImpl.family(family, {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        content: { cardinality: { min: 0, max: 1 } },
        item: {
          cardinality: { min: 0, max: 3 },
          requires: [{ kind: 'hook', name: 'asSelectItem' }],
        },
      },
      relations: [{ kind: 'contains', parent: 'content', child: 'item' }],
    });
    rootImpl.claim(family, { role: 'root' });
    itemImpl.claim(family, { role: 'item' });

    const diags = rootImpl.port.getDiagnostics();
    expect(diags.some((it) => it.code === 'ANATOMY_FAMILY_HOOK_REQUIRED')).toBe(true);
    expect(diags.some((it) => it.code === 'ANATOMY_FAMILY_RELATION')).toBe(true);
  });
});
