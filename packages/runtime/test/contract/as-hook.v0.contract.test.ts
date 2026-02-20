// packages/runtime/test/contract/as-hook.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { defineAsHook, definePrototype } from '@proto-ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { PropsBaseType } from '@proto-ui/types';

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
      setup() {
        return {};
      },
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
        return {};
      },
    });

    const asSecond = defineAsHook({
      name: 'asDup',
      setup() {
        b += 1;
        return {};
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
        return {};
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

  it('AS-HOOK-0400: state handles from asHook must be projected to borrowed view', () => {
    let borrowed: any;
    let seen: any[] = [];

    const asState = defineAsHook({
      name: 'asState',
      setup(def) {
        const s = def.state.bool('open', false);
        return { state: s };
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

  it('AS-HOOK-0500: render fragment returned by asHook can be composed into caller render', () => {
    const asFrag = defineAsHook({
      name: 'asFrag',
      setup() {
        return { render: () => 'hook' };
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

  it('AS-HOOK-0600: asHook trace is readable and includes name + order + privileged flag', () => {
    const asTrace = defineAsHook({
      name: 'asTrace',
      setup() {
        return {};
      },
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
});
