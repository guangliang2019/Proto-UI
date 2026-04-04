import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';
import type { RuntimeHost } from '@proto.ui/runtime';
import { executeWithHost } from '@proto.ui/runtime';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto.ui/module-expose';
import { useOpenState } from '../src/tools';

function createHost(initialRaw: Record<string, unknown> = {}) {
  let raw = { ...initialRaw };
  let exposes: Record<string, any> | null = null;

  const host: RuntimeHost<any> = {
    prototypeName: 'as-open-state-contract',
    getRawProps: () => raw,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady(wiring) {
      wiring.attach('expose', [
        [EXPOSE_SET_EXPOSES_CAP, (next: Record<string, unknown>) => (exposes = next)],
      ]);
    },
  };

  return {
    host,
    applyRawProps(next: Record<string, unknown>) {
      raw = { ...next };
    },
    getExposes() {
      return exposes;
    },
  };
}

describe('prototypes/base: useOpenState', () => {
  it('supports uncontrolled defaultOpen initialization and imperative toggle', () => {
    let openHandle: any;
    const P: Prototype = definePrototype({
      name: 'x-as-open-state-0100',
      setup(def) {
        const res = useOpenState();
        openHandle = res.getState?.('open');
        def.lifecycle.onCreated(() => {
          openHandle?.set(false, 'reason: test => close');
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost({ defaultOpen: true });
    executeWithHost(P as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(exposes.open.get()).toBe(false);
  });

  it('supports controlled sync from props updates', () => {
    const P: Prototype = definePrototype({
      name: 'x-as-open-state-0200',
      setup() {
        useOpenState();
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost({ open: true });
    const { controller } = executeWithHost(P as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(exposes.open.get()).toBe(true);

    ctx.applyRawProps({ open: false });
    controller.applyRawProps({ open: false } as any);

    expect(exposes.open.get()).toBe(false);
  });

  it('supports repeated configurable calls without duplicate installation side effects', () => {
    let openHandle: any;
    const P: Prototype = definePrototype({
      name: 'x-as-open-state-0300',
      setup(def) {
        const res = useOpenState();
        useOpenState();
        openHandle = res.getState?.('open');
        def.lifecycle.onCreated(() => {
          openHandle?.set(true, 'reason: test => open');
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost({ defaultOpen: false });
    executeWithHost(P as any, ctx.host as any);

    const exposes = ctx.getExposes() as any;
    expect(typeof exposes.openDropdown).toBe('function');
    expect(exposes.open.get()).toBe(true);
  });
});
