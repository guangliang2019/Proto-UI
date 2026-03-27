import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto.ui/core';
import { definePrototype } from '@proto.ui/core';
import type { RuntimeHost } from '@proto.ui/runtime';
import { executeWithHost } from '@proto.ui/runtime';
import {
  EVENT_EMIT_CAP,
  EVENT_GLOBAL_TARGET_CAP,
  EVENT_ROOT_TARGET_CAP,
} from '@proto.ui/module-event';
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
} from '@proto.ui/module-as-trigger';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto.ui/module-expose';
import toggle from '../src/toggle';
import { asToggle } from '../src/toggle/as-toggle';

function createHost(initialRaw: Record<string, unknown> = {}) {
  let raw = { ...initialRaw };
  const rootTarget = new EventTarget();
  const globalTarget = new EventTarget();
  const emitted: Array<{ key: string; payload: unknown }> = [];
  let exposes: Record<string, any> | null = null;

  const host: RuntimeHost<any> = {
    prototypeName: 'base-toggle-contract',
    getRawProps: () => raw,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady(wiring) {
      wiring.attach('event', [
        [EVENT_ROOT_TARGET_CAP, () => rootTarget],
        [EVENT_GLOBAL_TARGET_CAP, () => globalTarget],
        [EVENT_EMIT_CAP, (key: string, payload: unknown) => emitted.push({ key, payload })],
      ]);
      wiring.attach('as-trigger', [
        [AS_TRIGGER_INSTANCE_CAP, rootTarget],
        [AS_TRIGGER_PARENT_CAP, () => null],
        [AS_TRIGGER_GET_PROTO_CAP, () => null],
      ]);
      wiring.attach('expose', [
        [EXPOSE_SET_EXPOSES_CAP, (next: Record<string, unknown>) => (exposes = next)],
      ]);
    },
  };

  return {
    host,
    rootTarget,
    emitted,
    applyRawProps(next: Record<string, unknown>) {
      raw = { ...next };
    },
    getExposes() {
      return exposes;
    },
  };
}

describe('prototypes/base: toggle', () => {
  it('base-toggle initializes from defaultChecked and flips checked on press.commit', () => {
    const ctx = createHost({ defaultChecked: true });
    const { invokeUnmounted } = executeWithHost(toggle as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(exposes.checked.get()).toBe(true);

    ctx.rootTarget.dispatchEvent(new CustomEvent('press.commit'));

    expect(exposes.checked.get()).toBe(false);
    expect(ctx.emitted).toEqual([
      { key: 'click', payload: undefined },
      { key: 'checkedChange', payload: { checked: false } },
    ]);

    invokeUnmounted();
  });

  it('asToggle mirrors controlled checked prop and emits next checked without mutating local state', () => {
    const P: Prototype<{ checked?: boolean }> = definePrototype({
      name: 'x-base-as-toggle',
      setup() {
        asToggle();
        return (r) => r.el('button', 'ok');
      },
    });

    const ctx = createHost({ checked: true });
    const { controller, invokeUnmounted } = executeWithHost(P as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(exposes.checked.get()).toBe(true);

    ctx.rootTarget.dispatchEvent(new CustomEvent('press.commit'));

    expect(exposes.checked.get()).toBe(true);
    expect(ctx.emitted).toEqual([
      { key: 'click', payload: undefined },
      { key: 'checkedChange', payload: { checked: false } },
    ]);

    ctx.applyRawProps({ checked: false });
    controller.applyRawProps({ checked: false } as any);
    expect(exposes.checked.get()).toBe(false);

    invokeUnmounted();
  });

  it('disabled toggle keeps checked stable and suppresses click/checkedChange', () => {
    const ctx = createHost({ defaultChecked: false, disabled: true });
    executeWithHost(toggle as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(exposes.checked.get()).toBe(false);

    ctx.rootTarget.dispatchEvent(new CustomEvent('pointer.down'));
    ctx.rootTarget.dispatchEvent(new CustomEvent('press.commit'));

    expect(exposes.checked.get()).toBe(false);
    expect(ctx.emitted).toEqual([]);
  });
});
