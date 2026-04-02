import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';
import { AnatomyModuleImpl } from '../../src/impl';
import { makeCaps } from '../utils/fake-caps';

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

describe('anatomy-module: order contract v0', () => {
  it('ANATOMY-ORDER-MOD-0100: version starts at 0 and increments only when ordered signature changes', () => {
    const family = createAnatomyFamily('contract-order-version');
    const root = {};
    const item = {};
    let notifyObserver: (() => void) | null = null;

    const rootCaps = makeCaps({
      instance: root,
      getParent: (instance) => (instance === item ? root : null),
      getPrototype: () => makeProto([]),
      getRootTarget: () => ({
        compareDocumentPosition() {
          return 0;
        },
      }),
      orderObserver: (_target, notify) => {
        notifyObserver = notify;
        return () => {
          notifyObserver = null;
        };
      },
    });

    const rootImpl = new AnatomyModuleImpl(rootCaps, 'root', makeExposePort());
    const itemImpl = new AnatomyModuleImpl(
      makeCaps({
        instance: item,
        getParent: (instance) => (instance === item ? root : null),
        getPrototype: () => makeProto([]),
        getRootTarget: () => ({
          compareDocumentPosition() {
            return 0;
          },
        }),
      }),
      'item',
      makeExposePort()
    );

    rootImpl.family(family, {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        item: { cardinality: { min: 0, max: 10 } },
      },
    });
    rootImpl.claim(family, { role: 'root' });

    let calls = 0;
    rootImpl.port.setOrderCallbackDispatcher((fn) => fn('ctx'));
    rootImpl.port.subscribeOrder(family, () => {
      calls++;
    });

    expect(rootImpl.port.order.version(family)).toBe(0);

    notifyObserver?.();
    expect(calls).toBe(0);
    expect(rootImpl.port.order.version(family)).toBe(0);

    itemImpl.claim(family, { role: 'item' });
    notifyObserver?.();
    expect(calls).toBe(1);
    expect(rootImpl.port.order.version(family)).toBe(1);

    notifyObserver?.();
    expect(calls).toBe(1);
    expect(rootImpl.port.order.version(family)).toBe(1);
  });

  it('ANATOMY-ORDER-MOD-0200: subscribeOrder callback is dispatched through configured callback dispatcher', () => {
    const family = createAnatomyFamily('contract-order-dispatch');
    const root = {};
    const item = {};
    let notifyObserver: (() => void) | null = null;

    const rootImpl = new AnatomyModuleImpl(
      makeCaps({
        instance: root,
        getParent: (instance) => (instance === item ? root : null),
        getPrototype: () => makeProto([]),
        getRootTarget: () => ({
          compareDocumentPosition() {
            return 0;
          },
        }),
        orderObserver: (_target, notify) => {
          notifyObserver = notify;
          return () => {
            notifyObserver = null;
          };
        },
      }),
      'root',
      makeExposePort()
    );
    const itemImpl = new AnatomyModuleImpl(
      makeCaps({
        instance: item,
        getParent: (instance) => (instance === item ? root : null),
        getPrototype: () => makeProto([]),
        getRootTarget: () => ({
          compareDocumentPosition() {
            return 0;
          },
        }),
      }),
      'item',
      makeExposePort()
    );

    rootImpl.family(family, {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        item: { cardinality: { min: 0, max: 10 } },
      },
    });
    rootImpl.claim(family, { role: 'root' });

    let seen: unknown = null;
    rootImpl.port.setOrderCallbackDispatcher((fn) => fn('callback-ctx'));
    rootImpl.port.subscribeOrder(family, (ctx) => {
      seen = ctx;
    });

    itemImpl.claim(family, { role: 'item' });
    notifyObserver?.();

    expect(seen).toBe('callback-ctx');
  });
});
