// packages/runtime/test/contract/as-hook.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype, State } from '@proto.ui/core';
import { defineAsHook, definePrototype, tw } from '@proto.ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { PropsBaseType } from '@proto.ui/types';
import { EVENT_ROOT_TARGET_CAP } from '@proto.ui/module-event';

/**
 * Runtime Contract (v0): asHook
 *
 * Skeleton only. Implementation pending.
 */
describe('runtime contract: asHook (v0)', () => {
  const createHost = <P extends PropsBaseType>(name: string, initialRaw?: Record<string, any>) => {
    let raw = { ...(initialRaw ?? {}) };
    const commits: any[] = [];
    const scheduled: Array<() => void> = [];
    const host: RuntimeHost<P> = {
      prototypeName: name,
      getRawProps: () => raw as any,
      commit(children) {
        commits.push(children);
      },
      schedule(task) {
        scheduled.push(task);
      },
      onRuntimeReady() {},
      onUnmountBegin() {},
    };

    const flush = () => {
      while (scheduled.length) {
        const job = scheduled.shift()!;
        job();
      }
    };

    const setRaw = (next: Record<string, any>) => {
      raw = { ...(next ?? {}) };
    };

    return { host, commits, flush, setRaw };
  };

  it('AS-HOOK-0100: setup-only: calling asHook outside setup must throw', () => {
    const asOnce = defineAsHook({
      name: 'asOnce',
      setup() {},
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0100',
      setup(def) {
        def.lifecycle.onCreated(() => {
          expect(() => asOnce()).toThrow(/setup context|setup only/i);
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);
  });

  it('AS-HOOK-0200: dedupe by name: first asHook wins; subsequent same-name asHooks are skipped', () => {
    let a = 0;
    let b = 0;

    const asFirst = defineAsHook({
      name: 'asDup',
      setup() {
        a += 1;
      },
    });

    const asSecond = defineAsHook({
      name: 'asDup',
      setup() {
        b += 1;
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0200',
      setup() {
        asFirst();
        asSecond();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(a).toBe(1);
    expect(b).toBe(0);
  });

  it('AS-HOOK-0300: module results (except state) attach to caller; module-level dedupe handled by modules', () => {
    const calls: string[] = [];

    const asProps = defineAsHook({
      name: 'asProps',
      setup(def) {
        def.props.define({ a: { type: 'number' } } as any);
        def.props.watch(['a'], () => {
          calls.push('watch:a');
        });
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0300',
      setup() {
        asProps();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, { a: 1 });
    const { controller } = executeWithHost(P as any, host as any);

    // hydration should not trigger
    expect(calls).toEqual([]);

    controller.applyRawProps({ a: 2 } as any);
    expect(calls).toEqual(['watch:a']);
  });

  it('AS-HOOK-0350: props watch disposers are exposed and can deactivate captured watchers', () => {
    const calls: string[] = [];
    let res: any;

    const asProps = defineAsHook({
      name: 'asPropsWithDispose',
      setup(def) {
        def.props.define({ a: { type: 'number' } } as any);
        def.props.watch(['a'], () => {
          calls.push('watch:a');
        });
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0350',
      setup() {
        res = asProps();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name, { a: 1 });
    const { controller } = executeWithHost(P as any, host as any);

    expect(Array.isArray(res?.disposers?.all)).toBe(true);
    expect(Array.isArray(res?.disposers?.props)).toBe(true);
    expect(res?.disposers?.props?.length).toBe(1);

    controller.applyRawProps({ a: 2 } as any);
    expect(calls).toEqual(['watch:a']);

    res.disposers.props[0]();
    controller.applyRawProps({ a: 3 } as any);
    expect(calls).toEqual(['watch:a']);
  });

  it('AS-HOOK-0400: state handles from asHook must be projected to borrowed view', () => {
    let borrowed: any;
    let seen: any[] = [];

    const asState = defineAsHook({
      name: 'asState',
      setup(def) {
        def.state.bool('open', false);
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0400',
      setup(def) {
        const res = asState();
        borrowed = (res as any).state;

        (borrowed as any).watch?.((run: any, e: any) => {
          seen.push({ run, e });
        });

        def.lifecycle.onCreated(() => {
          (borrowed as any).set(true);
        });

        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(typeof borrowed?.watch).toBe('function');
    expect(seen.length).toBeGreaterThan(0);
    expect(typeof seen[0]?.run?.update).toBe('function');
  });

  it('AS-HOOK-0450: named state handles are exposed as borrowed facade and can drive rules', () => {
    let named: any;
    let openHandle: any;
    let artifacts: any;

    const asState = defineAsHook<PropsBaseType, Record<string, never>, { open: State<boolean> }>({
      name: 'asNamedState',
      setup(def) {
        def.state.bool('open', false);
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0450',
      setup(def) {
        const res = asState();
        named = res.stateHandles;
        openHandle = res.getState?.('open');
        artifacts = res.artifacts;

        def.rule({
          when: (w: any) => w.state(openHandle).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        def.lifecycle.onCreated(() => {
          openHandle?.set(true);
        });

        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const { controller } = executeWithHost(P as any, host as any);

    expect(typeof named?.open?.watch).toBe('function');
    expect(named?.open).toBe(openHandle);
    expect(artifacts?.stateHandles).toBe(named);
    expect(controller.getRuleStyleTokens()).toContain('opacity-50');
  });

  it('AS-HOOK-0460: event disposers deactivate captured listeners', () => {
    let calls = 0;
    let res: any;
    const rootTarget = new EventTarget();

    const asEvent = defineAsHook({
      name: 'asEvent',
      setup(def) {
        def.event.on('pointer.enter', () => {
          calls += 1;
        });
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0470',
      setup(def) {
        res = asEvent();
        def.lifecycle.onMounted(() => {
          rootTarget.dispatchEvent(new CustomEvent('pointer.enter'));
          res?.disposers?.event?.[0]?.();
          rootTarget.dispatchEvent(new CustomEvent('pointer.enter'));
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps: () => ({}),
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
      onRuntimeReady(wiring) {
        wiring.attach('event', [[EVENT_ROOT_TARGET_CAP, () => rootTarget]]);
      },
    };

    executeWithHost(P as any, host as any);

    expect(Array.isArray(res?.disposers?.event)).toBe(true);
    expect(calls).toBe(1);
  });

  it('AS-HOOK-0470: expose.event keys are captured as artifacts', () => {
    let artifacts: any;

    const asExposeEvent = defineAsHook({
      name: 'asExposeEvent',
      setup(def) {
        def.expose.event('ready', { payload: 'void' });
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0480',
      setup() {
        artifacts = asExposeEvent().artifacts;
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(artifacts?.eventKeys).toEqual({ ready: 'ready' });
  });

  it('AS-HOOK-0480: rule disposers remove captured rules from evaluation', () => {
    let res: any;

    const asRule = defineAsHook({
      name: 'asRule',
      setup(def) {
        def.rule({
          when: (w: any) => w.t(),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0480',
      setup() {
        res = asRule();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const { controller } = executeWithHost(P as any, host as any);

    expect(controller.getRuleStyleTokens()).toContain('opacity-50');
    expect(Array.isArray(res?.disposers?.rule)).toBe(true);

    res.disposers.rule[0]();
    expect(controller.getRuleStyleTokens()).not.toContain('opacity-50');
  });

  it('AS-HOOK-0500: render fragment returned by asHook can be composed into caller render', () => {
    const asFrag = defineAsHook({
      name: 'asFrag',
      setup() {
        return () => 'hook';
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0500',
      setup() {
        const { render } = asFrag() as any;
        return () => [render?.(), 'host'];
      },
    });

    const { host, commits } = createHost(P.name);
    executeWithHost(P as any, host as any);

    const first = commits[0];
    expect(first).toEqual(['hook', 'host']);
  });

  it('AS-HOOK-0550: setup return must follow prototype contract (render function or void)', () => {
    const asBad = defineAsHook({
      name: 'asBad',
      setup() {
        return { illegal: true } as any;
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0550',
      setup() {
        expect(() => asBad()).toThrow(/render function or void/i);
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);
  });

  it('AS-HOOK-0600: asHook trace is readable and includes name + order + privileged flag', () => {
    const asTrace = defineAsHook({
      name: 'asTrace',
      setup() {},
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0600',
      setup() {
        asTrace();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    const trace = (P as any).__asHooks as Array<any>;
    expect(Array.isArray(trace)).toBe(true);
    expect(trace.length).toBe(1);
    expect(trace[0]).toMatchObject({ name: 'asTrace', order: 0, privileged: false });

    const desc = Object.getOwnPropertyDescriptor(P as any, '__asHooks');
    expect(desc?.enumerable).toBe(false);
    expect(desc?.set).toBeUndefined();
  });

  it('AS-HOOK-0700: parameterized asHook passes options into setup', () => {
    let seen: Array<number | undefined> = [];

    const asParam = defineAsHook<PropsBaseType, Record<string, never>, {}, { value?: number }>({
      name: 'asParam',
      setup(_def, options) {
        seen.push(options?.value);
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0700',
      setup() {
        asParam({ value: 1 });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(seen).toEqual([1]);
  });

  it('AS-HOOK-0800: configurable hook runs setup once and configure on later calls', () => {
    let setupCount = 0;
    let configureCount = 0;
    let first: any;
    let second: any;
    let storeRef: Record<string, unknown> | undefined;

    const asConfigurable = defineAsHook<
      PropsBaseType,
      Record<string, never>,
      { open: State<boolean> },
      { open?: boolean }
    >({
      name: 'asConfigurable',
      mode: 'configurable',
      setup(def, options, api) {
        setupCount += 1;
        const open = def.state.bool('open', !!options?.open);
        api.store.open = open;
        api.store.lastOpen = !!options?.open;
        storeRef = api.store;
      },
      configure(api, options) {
        configureCount += 1;
        api.store.lastOpen = options?.open;
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0800',
      setup() {
        first = asConfigurable({ open: false });
        second = asConfigurable({ open: true });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(setupCount).toBe(1);
    expect(configureCount).toBe(2);
    expect(first).toBe(second);
    expect(first.getState?.('open')?.get()).toBe(false);
    expect(storeRef?.lastOpen).toBe(true);
    expect((P as any).__asHooks[0]).toMatchObject({ name: 'asConfigurable', mode: 'configurable' });
  });

  it('AS-HOOK-0900: once mode skips later same-name calls', () => {
    let setupCount = 0;

    const asExplicitOnce = defineAsHook<
      PropsBaseType,
      Record<string, never>,
      {},
      { label?: string }
    >({
      name: 'asExplicitOnce',
      mode: 'once',
      setup() {
        setupCount += 1;
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-0900',
      setup() {
        asExplicitOnce({ label: 'a' });
        asExplicitOnce({ label: 'b' });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(setupCount).toBe(1);
    expect((P as any).__asHooks[0]).toMatchObject({ name: 'asExplicitOnce', mode: 'once' });
  });

  it('AS-HOOK-1000: multiple mode installs independently on repeated calls', () => {
    let setupCount = 0;

    const asMultiple = defineAsHook({
      name: 'asMultiple',
      mode: 'multiple',
      setup() {
        setupCount += 1;
      },
    });

    const P: Prototype = definePrototype({
      name: 'x-as-hook-1000',
      setup() {
        asMultiple();
        asMultiple();
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(setupCount).toBe(2);
    expect((P as any).__asHooks[0]).toMatchObject({ name: 'asMultiple', mode: 'multiple' });
  });
});
