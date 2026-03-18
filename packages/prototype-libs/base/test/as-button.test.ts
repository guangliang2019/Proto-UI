import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { definePrototype } from '@proto-ui/core';
import type { RuntimeHost } from '@proto-ui/runtime';
import { executeWithHost } from '@proto-ui/runtime';
import type { FocusPort } from '@proto-ui/modules.focus';
import {
  EVENT_EMIT_CAP,
  EVENT_GLOBAL_TARGET_CAP,
  EVENT_ROOT_TARGET_CAP,
} from '@proto-ui/modules.event';
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
} from '@proto-ui/modules.as-trigger';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto-ui/modules.expose';
import { asButton } from '../src/button/as-button';

function createHost(initialRaw: Record<string, unknown> = {}) {
  let raw = { ...initialRaw };
  const rootTarget = new EventTarget();
  const globalTarget = new EventTarget();
  const emitted: string[] = [];
  let exposes: Record<string, any> | null = null;

  const host: RuntimeHost<any> = {
    prototypeName: 'base-as-button-contract',
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
        [EVENT_EMIT_CAP, (key) => emitted.push(key)],
      ]);
      wiring.attach('as-trigger', [
        [AS_TRIGGER_INSTANCE_CAP, rootTarget],
        [AS_TRIGGER_PARENT_CAP, () => null],
        [AS_TRIGGER_GET_PROTO_CAP, () => null],
      ]);
      wiring.attach('expose', [[EXPOSE_SET_EXPOSES_CAP, (next) => (exposes = next)]]);
    },
  };

  return {
    host,
    rootTarget,
    globalTarget,
    emitted,
    getExposes() {
      return exposes;
    },
  };
}

describe('prototype-libs/base: asButton', () => {
  it('tracks hovered/focused/pressed and gates click emission when disabled', () => {
    const P: Prototype<{ disabled?: boolean }> = definePrototype({
      name: 'x-base-as-button',
      setup() {
        asButton();
        return (r) => r.el('button', 'ok');
      },
    });

    const ctx = createHost({ disabled: false });
    const { controller, caps } = executeWithHost(P as any, ctx.host as any);
    const focusPort = caps.getPort<FocusPort>('focus');

    const exposes = ctx.getExposes() as any;
    expect(exposes).toBeTruthy();

    ctx.rootTarget.dispatchEvent(new CustomEvent('pointer.enter'));
    expect(exposes.hovered.get()).toBe(true);

    ctx.globalTarget?.dispatchEvent?.(new CustomEvent('key.down'));
    ctx.rootTarget.dispatchEvent(new CustomEvent('native:focus'));
    expect(exposes.focused.get()).toBe(true);
    expect(exposes.focusVisible.get()).toBe(true);

    ctx.rootTarget.dispatchEvent(new CustomEvent('pointer.down'));
    expect(exposes.pressed.get()).toBe(true);
    expect(exposes.focusVisible.get()).toBe(false);

    ctx.rootTarget.dispatchEvent(new CustomEvent('press.commit'));
    expect(exposes.pressed.get()).toBe(false);
    expect(ctx.emitted).toEqual(['click']);

    controller.applyRawProps({ disabled: true } as any);
    expect(exposes.hovered.get()).toBe(false);
    expect(exposes.focused.get()).toBe(false);
    expect(exposes.focusVisible.get()).toBe(false);
    expect(exposes.pressed.get()).toBe(false);
    expect(focusPort?.getFocusableConfig().disabled).toBe(true);
    expect(focusPort?.getFacts()).toMatchObject({
      focused: false,
      focusVisible: false,
      focusable: false,
    });

    ctx.rootTarget.dispatchEvent(new CustomEvent('pointer.enter'));
    ctx.rootTarget.dispatchEvent(new CustomEvent('native:focus'));
    ctx.rootTarget.dispatchEvent(new CustomEvent('pointer.down'));
    ctx.rootTarget.dispatchEvent(new CustomEvent('press.commit'));

    expect(exposes.hovered.get()).toBe(false);
    expect(exposes.focused.get()).toBe(false);
    expect(exposes.focusVisible.get()).toBe(false);
    expect(exposes.pressed.get()).toBe(false);
    expect(ctx.emitted).toEqual(['click']);
  });
});
