// packages/modules/context/test/contract/context.with-tree.v0.contract.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ContextModuleImpl } from '../../src/impl';
import { CONTEXT_CENTER } from '../../src/center';
import { makeCaps, createSysCaps } from '../utils/fake-caps';

const KEY = { __brand: 'ContextKey', debugName: 'ctx' } as any;

function resetCenter() {
  const subs = CONTEXT_CENTER.dumpSubscriptions();
  const prov = CONTEXT_CENTER.dumpProviders();
  const seen = new Set<any>();
  for (const s of subs) seen.add(s.instance);
  for (const p of prov) seen.add(p.instance);
  for (const inst of seen) CONTEXT_CENTER.removeInstance(inst);
}

describe('context-module: contract v0 (with-tree)', () => {
  beforeEach(() => {
    resetCenter();
  });

  it('CTX-MOD-V0-1000: subscribe requires provider at setup', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const sys = createSysCaps();
    sys.__setExecPhase('setup');

    const consumerToken = { id: 'consumer' };
    const caps = makeCaps({ sys, instanceToken: consumerToken, getParent });
    const consumer = new ContextModuleImpl(caps as any, 'proto-consumer');

    expect(() => consumer.subscribe(KEY, () => {})).toThrow(/provider/i);
  });

  it('CTX-MOD-V0-1100: provide + subscribe + update triggers callback', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const providerToken = { id: 'provider' };
    const consumerToken = { id: 'consumer' };
    parentMap.set(consumerToken, providerToken);

    const sysProvider = createSysCaps();
    const sysConsumer = createSysCaps();
    sysProvider.__setExecPhase('setup');
    sysConsumer.__setExecPhase('setup');

    const provider = new ContextModuleImpl(
      makeCaps({
        sys: sysProvider,
        instanceToken: providerToken,
        getParent,
      }) as any,
      'proto-provider'
    );

    const consumer = new ContextModuleImpl(
      makeCaps({
        sys: sysConsumer,
        instanceToken: consumerToken,
        getParent,
      }) as any,
      'proto-consumer'
    );

    const update = provider.provide(KEY, { value: 0 });

    const seen: Array<[number, number, boolean]> = [];
    consumer.subscribe(KEY, (ctx, next, prev) => {
      seen.push([prev.value, next.value, !!ctx]);
    });

    sysProvider.__setExecPhase('callback');
    sysProvider.__setCallbackCtx({ run: true });

    update({ value: 1 });

    expect(seen.length).toBe(1);
    expect(seen[0]).toEqual([0, 1, true]);
  });

  it('CTX-MOD-V0-1200: update requires prior subscription', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const providerToken = { id: 'provider' };
    const consumerToken = { id: 'consumer' };
    parentMap.set(consumerToken, providerToken);

    const sysProvider = createSysCaps();
    const sysConsumer = createSysCaps();
    sysProvider.__setExecPhase('setup');
    sysConsumer.__setExecPhase('setup');

    const provider = new ContextModuleImpl(
      makeCaps({ sys: sysProvider, instanceToken: providerToken, getParent }) as any,
      'proto-provider'
    );
    const consumer = new ContextModuleImpl(
      makeCaps({ sys: sysConsumer, instanceToken: consumerToken, getParent }) as any,
      'proto-consumer'
    );

    provider.provide(KEY, { value: 0 });

    sysConsumer.__setExecPhase('callback');

    expect(() => consumer.update(KEY, { value: 1 })).toThrow(/subscription/i);
  });

  it('CTX-MOD-V0-1300: tryUpdate returns false when provider missing', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const consumerToken = { id: 'consumer' };

    const sysConsumer = createSysCaps();
    sysConsumer.__setExecPhase('setup');

    const consumer = new ContextModuleImpl(
      makeCaps({ sys: sysConsumer, instanceToken: consumerToken, getParent }) as any,
      'proto-consumer'
    );

    consumer.trySubscribe(KEY);

    sysConsumer.__setExecPhase('callback');

    const ok = consumer.tryUpdate(KEY, { value: 1 });
    expect(ok).toBe(false);
  });

  it('CTX-MOD-V0-1400: provide rejects null and non-plain objects', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const sys = createSysCaps();
    sys.__setExecPhase('setup');

    const providerToken = { id: 'provider' };
    const provider = new ContextModuleImpl(
      makeCaps({ sys, instanceToken: providerToken, getParent }) as any,
      'proto-provider'
    );

    expect(() => provider.provide(KEY, null as any)).toThrow(/null/i);
    expect(() => provider.provide(KEY, new Date() as any)).toThrow(/json/i);
  });

  it('CTX-MOD-V0-1500: consumer can rebind to a new provider via tree change', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const providerAToken = { id: 'provider-A' };
    const providerBToken = { id: 'provider-B' };
    const consumerToken = { id: 'consumer' };

    parentMap.set(consumerToken, providerAToken);

    const sysA = createSysCaps();
    const sysB = createSysCaps();
    const sysC = createSysCaps();
    sysA.__setExecPhase('setup');
    sysB.__setExecPhase('setup');
    sysC.__setExecPhase('setup');

    const providerA = new ContextModuleImpl(
      makeCaps({ sys: sysA, instanceToken: providerAToken, getParent }) as any,
      'proto-provider-A'
    );
    const providerB = new ContextModuleImpl(
      makeCaps({ sys: sysB, instanceToken: providerBToken, getParent }) as any,
      'proto-provider-B'
    );
    const consumer = new ContextModuleImpl(
      makeCaps({ sys: sysC, instanceToken: consumerToken, getParent }) as any,
      'proto-consumer'
    );

    providerA.provide(KEY, { value: 1 });
    providerB.provide(KEY, { value: 10 });

    consumer.subscribe(KEY);

    // runtime read from provider A
    sysC.__setExecPhase('callback');
    expect(consumer.read(KEY).value).toBe(1);

    // rebind to provider B
    parentMap.set(consumerToken, providerBToken);
    expect(consumer.read(KEY).value).toBe(10);
  });

  it('CTX-MOD-V0-1600: provider removal leads to disconnected reads', () => {
    const parentMap = new Map<any, any>();
    const getParent = (i: any) => parentMap.get(i) ?? null;

    const providerToken = { id: 'provider' };
    const consumerToken = { id: 'consumer' };
    const optionalToken = { id: 'consumer-optional' };
    parentMap.set(consumerToken, providerToken);
    parentMap.set(optionalToken, providerToken);

    const sysP = createSysCaps();
    const sysC = createSysCaps();
    sysP.__setExecPhase('setup');
    sysC.__setExecPhase('setup');

    const provider = new ContextModuleImpl(
      makeCaps({ sys: sysP, instanceToken: providerToken, getParent }) as any,
      'proto-provider'
    );
    const consumer = new ContextModuleImpl(
      makeCaps({ sys: sysC, instanceToken: consumerToken, getParent }) as any,
      'proto-consumer'
    );
    const consumerOptional = new ContextModuleImpl(
      makeCaps({ sys: sysC, instanceToken: optionalToken, getParent }) as any,
      'proto-consumer-optional'
    );

    provider.provide(KEY, { value: 1 });
    consumer.subscribe(KEY);
    consumerOptional.trySubscribe(KEY);

    sysC.__setExecPhase('callback');
    expect(consumer.read(KEY).value).toBe(1);

    // detach: no provider in ancestry
    parentMap.set(consumerToken, null);
    parentMap.set(optionalToken, null);

    expect(() => consumer.read(KEY)).toThrow(/provider/i);

    expect(consumerOptional.tryRead(KEY)).toBe(null);
  });
});
