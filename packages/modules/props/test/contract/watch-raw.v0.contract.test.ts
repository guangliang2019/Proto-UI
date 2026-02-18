// packages/modules/props/test/contract/watch-raw.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { PropsModuleImpl } from '../../src/impl';
import type { PropsSpecMap } from '@proto-ui/types';

/**
 * Watch Raw Contract v0
 * Contract Doc: internal/contracts/props/watch-raw.v0.md
 *
 * Impl reference: packages/modules/props/src/impl.ts
 *
 * Focus (module-level):
 * - hydration rule (first applyRaw does not schedule raw watch tasks)
 * - watchRawAll unionKeys(prev,next) and trigger condition
 * - watchRaw(keys) allows undeclared keys + matched semantics
 * - Object.is diff semantics for raw (NaN stable; -0 and 0 differ)
 * - order: raw tasks before resolved tasks; within raw: rawAll before raw(keys)
 *
 * NOTE:
 * - RunHandle wiring (PROP-V0-2110) is runtime responsibility; not validated here.
 * - Warning emission (PROP-V0-4500) is "may" in v0; current impl does not emit; not asserted.
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

function execAllTasks(mod: PropsModuleImpl<any>, order: string[]) {
  const tasks = drain(mod);
  const run = {} as any;
  for (const t of tasks) {
    // tag order by type + (we will push custom tags via callbacks)
    t.cb(run, t.next, t.prev, t.info);
  }
  return tasks;
}

describe('props: watch(raw) contract (v0)', () => {
  it('PROP-V0-4200: hydration (first applyRaw) never schedules raw watch tasks', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let calledAll = 0;
    let calledKeyed = 0;

    pm.watchRawAllKeys(() => calledAll++);
    pm.watchRawKeys(['a'], () => calledKeyed++);

    // hydration => no tasks
    pm.applyRaw({ a: 1 });
    expect(drain(pm).length).toBe(0);
    expect(calledAll).toBe(0);
    expect(calledKeyed).toBe(0);

    // subsequent applyRaw may schedule (if changed)
    pm.applyRaw({ a: 2 });
    const tasks = drain(pm);
    for (const t of tasks) {
      if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);
    }

    expect(calledAll).toBe(1);
    expect(calledKeyed).toBe(1);
  });

  it('PROP-V0-4300: watchRawAll uses unionKeys(prev,next) and schedules only when at least one raw key changed', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    const seen: Array<{ all: string[]; matched: string[] }> = [];
    pm.watchRawAllKeys((_run, _nextRaw, _prevRaw, info) => {
      seen.push({
        all: [...info.changedKeysAll].sort(),
        matched: [...info.changedKeysMatched].sort(),
      });
    });

    // hydration
    pm.applyRaw({ a: 1 });
    expect(drain(pm).length).toBe(0);

    // only undeclared key added => should schedule; unionKeys includes x
    pm.applyRaw({ a: 1, x: 1 } as any);
    const t1 = drain(pm);
    for (const t of t1) if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);

    expect(seen.length).toBe(1);
    expect(seen[0].all).toEqual(['x']);
    expect(seen[0].matched).toEqual(['x']); // rawAll => matched==all

    // no raw change => no schedule
    pm.applyRaw({ a: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);
    expect(seen.length).toBe(1);

    // remove x => schedule; unionKeys includes x
    pm.applyRaw({ a: 1 } as any);
    const t2 = drain(pm);
    for (const t of t2) if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);

    expect(seen.length).toBe(2);
    expect(seen[1].all).toEqual(['x']);
    expect(seen[1].matched).toEqual(['x']);
  });

  it('PROP-V0-4400: watchRaw(keys) allows undeclared keys and schedules only when matched keys changed', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let called = 0;
    let lastAll: string[] = [];
    let lastMatched: string[] = [];

    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pm.watchRawKeys(['x', 'y'], (_run, _nextRaw, _prevRaw, info) => {
      called++;
      lastAll = [...info.changedKeysAll].sort();
      lastMatched = [...info.changedKeysMatched].sort();
    });

    // hydration
    pm.applyRaw({ a: 1 });
    expect(drain(pm).length).toBe(0);

    // only x changes => schedule
    pm.applyRaw({ a: 1, x: 1 } as any);
    const t1 = drain(pm);
    for (const t of t1) if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);

    expect(called).toBe(1);
    expect(lastAll).toEqual(['x']);
    expect(lastMatched).toEqual(['x']);

    // only z changes (not matched) => no schedule
    pm.applyRaw({ a: 1, x: 1, z: 1 } as any);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(1);

    // y changes => schedule
    pm.applyRaw({ a: 1, x: 1, z: 1, y: 2 } as any);
    const t2 = drain(pm);
    for (const t of t2) if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);

    expect(called).toBe(2);
    expect(lastAll).toEqual(['y']);
    expect(lastMatched).toEqual(['y']);
  });

  it('PROP-V0-4100: Object.is treats NaN as stable (NaN -> NaN does not trigger)', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let called = 0;
    pm.watchRawAllKeys(() => called++);

    // hydration
    pm.applyRaw({ x: NaN } as any);
    expect(drain(pm).length).toBe(0);

    // NaN -> NaN should not schedule
    pm.applyRaw({ x: NaN } as any);
    expect(drain(pm).length).toBe(0);
    expect(called).toBe(0);
  });

  it('PROP-V0-4100: Object.is distinguishes -0 and 0 (-0 -> 0 triggers)', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    let called = 0;
    pm.watchRawAllKeys(() => called++);

    // hydration
    pm.applyRaw({ x: -0 } as any);
    expect(drain(pm).length).toBe(0);

    // -0 -> 0 should schedule
    pm.applyRaw({ x: 0 } as any);
    const tasks = drain(pm);
    for (const t of tasks) if (t.kind === 'raw') t.cb({} as any, t.next, t.prev, t.info);

    expect(called).toBe(1);
  });

  it('PROP-V0-4600: order: raw tasks before resolved tasks; within raw: rawAll before raw(keys); registration order preserved', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    const order: string[] = [];

    pm.watchRawAllKeys(() => order.push('rawAll-1'));
    pm.watchRawAllKeys(() => order.push('rawAll-2'));

    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pm.watchRawKeys(['x'], () => order.push('rawKey-1'));
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pm.watchRawKeys(['x'], () => order.push('rawKey-2'));

    pm.watchAllKeys(() => order.push('resAll-1'));
    pm.watchKeys(['a'], () => order.push('resKey-1'));

    // hydration
    pm.applyRaw({ a: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);

    // trigger change
    pm.applyRaw({ a: 2, x: 2 } as any);
    execAllTasks(pm, order);

    expect(order).toEqual(['rawAll-1', 'rawAll-2', 'rawKey-1', 'rawKey-2', 'resAll-1', 'resKey-1']);
  });

  it('PROP-V0-4400: watchRaw(keys) rejects empty key list', () => {
    type P = { a: number };
    const pm = createModule<P>();
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    expect(() => pm.watchRawKeys([] as any, () => {})).toThrow();
  });

  it('PROP-V0-4700: raw diffs can trigger raw watchers even when resolved unchanged (undeclared key changes)', () => {
    type P = { a: number };
    const pm = createModule<P>();

    // declared key a is stable; we will mutate only undeclared x
    pm.define({ a: { type: 'number', default: 1 } } satisfies PropsSpecMap<P>);

    const calls: string[] = [];
    pm.watchRawAllKeys(() => calls.push('rawAll'));
    pm.watchAllKeys(() => calls.push('resolvedAll'));

    // hydration
    pm.applyRaw({ a: 1, x: 1 } as any);
    expect(drain(pm).length).toBe(0);

    // only x changes => raw should fire; resolved should NOT (declared resolved unchanged)
    pm.applyRaw({ a: 1, x: 2 } as any);
    const tasks = drain(pm);
    for (const t of tasks) t.cb({} as any, t.next, t.prev, t.info);

    expect(calls).toEqual(['rawAll']);
  });
});
