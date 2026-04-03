import { describe, expect, it } from 'vitest';
import { createAnatomyFamily, type Prototype } from '@proto.ui/core';
import { AnatomyModuleImpl } from '../../src/impl';
import { makeCaps } from '../utils/fake-caps';

/**
 * Usage note:
 * - Anatomy query policy is about tolerant structural reads, not semantic optionality.
 * - Family declaration locality is a separate concern; prefer `createAnatomyFamily(..., decl)`
 *   for stable shared families instead of per-part `register*Family(def)` helpers.
 * - `missing: 'null' | 'empty'` is compliant for derived/read-only projections.
 * - It should not be used to hide required structure in interaction-critical behavior.
 * - See `internal/contracts/anatomy/query-policy.v0.impl-notes.md`.
 * - See `internal/contracts/anatomy/family-declaration.v0.impl-notes.md`.
 */

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

    (notifyObserver as (() => void) | null)?.();
    expect(calls).toBe(0);
    expect(rootImpl.port.order.version(family)).toBe(0);

    itemImpl.claim(family, { role: 'item' });
    (notifyObserver as (() => void) | null)?.();
    expect(calls).toBe(1);
    expect(rootImpl.port.order.version(family)).toBe(1);

    (notifyObserver as (() => void) | null)?.();
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
    (notifyObserver as (() => void) | null)?.();

    expect(seen).toBe('callback-ctx');
  });

  it('ANATOMY-ORDER-MOD-0300: embedded family declarations allow direct claims without prior family() registration', () => {
    const family = createAnatomyFamily('contract-embedded-family', {
      roles: {
        root: { cardinality: { min: 1, max: 1 } },
        item: { cardinality: { min: 0, max: 10 } },
      },
      relations: [{ kind: 'contains', parent: 'root', child: 'item' }],
    });
    const root = {};
    const item = {};

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

    expect(() => itemImpl.claim(family, { role: 'item' })).not.toThrow();
    expect(() => rootImpl.claim(family, { role: 'root' })).not.toThrow();
  });
});
