import { describe, it, expect } from 'vitest';
import { PropsModuleImpl } from '../../src/impl';
import type { PropsSpecMap } from '@proto-ui/types';

/**
 * Watch Resolved Contract v0
 * Contract Doc: internal/contracts/props/watch-resolved.v0.md
 *
 * Impl reference: packages/modules/props/src/impl.ts
 *
 * Focus (module-level):
 * - hydration rule (first applyRaw does not schedule resolved watch tasks)
 * - watchAll trigger condition and WatchInfo semantics
 * - watch(keys) trigger condition and WatchInfo semantics
 * - Object.is based diff semantics (NaN stable)
 * - order: watchAll before keyed watches; registration order within group
 * - resolved-based semantics (undeclared/raw-only changes do not trigger)
 *
 * NOTE:
 * - RunHandle wiring (PROP-V0-2110) is runtime responsibility; not validated here.
 */

function createModule<P extends Record<string, any>>() {
  const caps = {
    onChange: (_fn: (epoch: number) => void) => {},
    has: (_k: string) => false,
    get: (_k: string) => undefined,
  } as any;

  return new PropsModuleImpl<P>(caps, 'test-proto');
}

function drain(mod: PropsModuleImpl<any>) {
  return mod.consumeTasks();
}

function execResolvedTasks(mod: PropsModuleImpl<any>) {
  const tasks = drain(mod);
  const run = {} as any;
  for (const t of tasks) {
    if (t.kind !== 'resolved') continue;
    t.cb(run, t.next, t.prev, t.info);
  }
  return tasks;
}

describe('props: watch(resolved) contract (v0)', () => {
  it('PROP-V0-3200: hydration (first applyRaw) never schedules resolved watch tasks', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let calledAll = 0;
    let calledKeyed = 0;

    pm.watchAllKeys(() => calledAll++);
    pm.watchKeys(['a'], () => calledKeyed++);

    // first applyRaw is hydration => no tasks
    pm.applyRaw({ a: 1 });
    expect(drain(pm).length).toBe(0);
    expect(calledAll).toBe(0);
    expect(calledKeyed).toBe(0);

    // subsequent applyRaw may schedule tasks (if resolved changed)
    pm.applyRaw({ a: 2 });
    execResolvedTasks(pm);

    expect(calledAll).toBe(1);
    expect(calledKeyed).toBe(1);
  });

  it('PROP-V0-3100: resolved snapshot invariants (declared-only, no undefined, shallow immutable)', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    // hydration: snapshot exists & meaningful
    pm.applyRaw({ a: 1, x: 9 } as any);

    const snap: any = pm.get();

    // declared only
    expect(snap).toEqual({ a: 1 });

    // never contains undefined
    expect(Object.values(snap).includes(undefined)).toBe(false);

    // shallow immutable
    expect(() => {
      snap.a = 2;
    }).toThrow();
  });

  it('PROP-V0-3300: watchAll schedules only when at least one declared resolved key changed', () => {
    type P = { a: number; b: number };
    const pm = createModule<P>();
    pm.define({
      a: { kind: 'number', default: 1 },
      b: { kind: 'number', default: 1 },
    } satisfies PropsSpecMap<P>);

    let called = 0;
    let lastAll: string[] = [];
    let lastMatched: string[] = [];

    pm.watchAllKeys((_run, _next, _prev, info) => {
      called++;
      lastAll = [...info.changedKeysAll].sort();
      lastMatched = [...info.changedKeysMatched].sort();
    });

    // hydration
    pm.applyRaw({ a: 1, b: 1 });
    expect(drain(pm).length).toBe(0);

    // raw changes but resolved unchanged (undeclared key only) => should NOT schedule
    pm.applyRaw({ a: 1, b: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);

    // resolved change => should schedule
    pm.applyRaw({ a: 2, b: 1 });
    execResolvedTasks(pm);
    expect(called).toBe(1);
    expect(lastAll).toEqual(['a']);
    expect(lastMatched).toEqual(['a']); // watchAll => matched==all

    // no resolved change => no schedule
    pm.applyRaw({ a: 2, b: 1 });
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(1);
  });

  it('PROP-V0-3400: watch(keys) schedules only when matched keys changed; info contains all-changed and matched-changed', () => {
    type P = { a: number; b: number; c: number };
    const pm = createModule<P>();
    pm.define({
      a: { kind: 'number', default: 1 },
      b: { kind: 'number', default: 1 },
      c: { kind: 'number', default: 1 },
    } satisfies PropsSpecMap<P>);

    let called = 0;
    let lastAll: string[] = [];
    let lastMatched: string[] = [];

    pm.watchKeys(['a', 'b'], (_run, _next, _prev, info) => {
      called++;
      lastAll = [...info.changedKeysAll].sort();
      lastMatched = [...info.changedKeysMatched].sort();
    });

    // hydration
    pm.applyRaw({ a: 1, b: 1, c: 1 });
    expect(drain(pm).length).toBe(0);

    // only undeclared raw change => no schedule
    pm.applyRaw({ a: 1, b: 1, c: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);

    // only c changed => watch(keys) SHOULD NOT fire (not matched)
    // IMPORTANT: do NOT drain here, we want pendingReport to accumulate across applyRaw.
    pm.applyRaw({ a: 1, b: 1, c: 2 });
    expect(called).toBe(0);

    // a changed => schedule
    pm.applyRaw({ a: 2, b: 1, c: 2 });
    execResolvedTasks(pm);
    expect(called).toBe(1);
    expect(lastAll).toEqual(['a', 'c']); // all declared changes
    expect(lastMatched).toEqual(['a']); // matched subset

    // b changed => schedule
    pm.applyRaw({ a: 2, b: 2, c: 2 });
    execResolvedTasks(pm);
    expect(called).toBe(2);
    expect(lastAll).toEqual(['b']);
    expect(lastMatched).toEqual(['b']);
  });

  it('PROP-V0-3500: order: watchAll before keyed watches; registration order preserved within group', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    const order: string[] = [];

    pm.watchAllKeys(() => order.push('all-1'));
    pm.watchAllKeys(() => order.push('all-2'));

    pm.watchKeys(['a'], () => order.push('key-1'));
    pm.watchKeys(['a'], () => order.push('key-2'));

    // hydration
    pm.applyRaw({ a: 1 });
    expect(drain(pm).length).toBe(0);

    // trigger change
    pm.applyRaw({ a: 2 });
    execResolvedTasks(pm);

    expect(order).toEqual(['all-1', 'all-2', 'key-1', 'key-2']);
  });

  it('PROP-V0-3100/3600: diff uses Object.is (NaN stable); raw invalid may not cause resolved change -> no schedule', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({
      a: { kind: 'number', default: 1, validator: (v: number) => v > 0 },
    } satisfies PropsSpecMap<P>);

    let called = 0;
    pm.watchAllKeys(() => called++);

    // hydration
    pm.applyRaw({ a: 2 });
    expect(drain(pm).length).toBe(0);

    // invalid raw -> resolved falls back to prevValid(2) => resolved unchanged => no schedule
    pm.applyRaw({ a: -1 as any });
    expect(pm.get().a).toBe(2);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);

    // NaN rejected by kind:number -> resolved unchanged => no schedule
    pm.applyRaw({ a: NaN as any });
    expect(pm.get().a).toBe(2);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);

    // real resolved change => schedule
    pm.applyRaw({ a: 3 });
    execResolvedTasks(pm);
    expect(pm.get().a).toBe(3);
    expect(called).toBe(1);
  });

  it('PROP-V0-3600: resolved watchers are resolved-based; raw-only change does not trigger them', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let called = 0;
    pm.watchAllKeys(() => called++);

    // hydration
    pm.applyRaw({ a: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);

    // only undeclared x changes -> resolved unchanged -> no schedule
    pm.applyRaw({ a: 1, x: 2 } as any);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);
  });

  it('PROP-V0-3400: registration constraints (empty keys rejected; undeclared keys rejected; watch(keys) requires define first)', () => {
    type P = { a: number };
    const pm0 = createModule<P>();
    expect(() => pm0.watchKeys(['a'], () => {})).toThrow(/define/i);

    const pm = createModule<P>();
    pm.define({ a: { kind: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    expect(() => pm.watchKeys([] as any, () => {})).toThrow();
    expect(() => pm.watchKeys(['x'] as any, () => {})).toThrow(/undeclared/i);
  });
});
