import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto.ui/core';
import type { RuntimeHost } from '@proto.ui/runtime';
import { executeWithHost } from '@proto.ui/runtime';
import { EXPOSE_SET_EXPOSES_CAP } from '@proto.ui/module-expose';
import { PRESENCE_HOST_BRIDGE_CAP } from '@proto.ui/module-presence';
import { EVENT_EMIT_CAP } from '@proto.ui/module-event';
import { asTransition, type TransitionProps, type TransitionExposes } from '../src/transition';

function createHost(
  initialRaw: Partial<TransitionProps> = {},
  opts: { bridge?: { mount?: () => void; unmount?: () => void } } = {}
) {
  let raw: Partial<TransitionProps> = { ...initialRaw };
  let exposes: TransitionExposes | null = null;
  const bridgeCalls = { mount: 0, unmount: 0 };
  const emitted: Array<{ key: string; payload: any }> = [];

  const host: RuntimeHost<TransitionProps> = {
    prototypeName: 'as-transition-contract',
    getRawProps: () => raw as Readonly<TransitionProps>,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
    onRuntimeReady(wiring) {
      wiring.attach('presence', [
        [
          PRESENCE_HOST_BRIDGE_CAP,
          {
            mount: () => {
              bridgeCalls.mount++;
              opts.bridge?.mount?.();
            },
            unmount: () => {
              bridgeCalls.unmount++;
              opts.bridge?.unmount?.();
            },
          },
        ],
      ]);
      wiring.attach('expose', [
        [
          EXPOSE_SET_EXPOSES_CAP,
          (next: Record<string, unknown>) => (exposes = next as TransitionExposes),
        ],
      ]);
      wiring.attach('event', [
        [EVENT_EMIT_CAP, (key: string, payload: any) => emitted.push({ key, payload })],
      ]);
    },
  };

  return {
    host,
    applyRawProps(next: Partial<TransitionProps>) {
      raw = { ...next };
    },
    getExposes() {
      return exposes!;
    },
    getBridgeCalls() {
      return bridgeCalls;
    },
    getEmitted() {
      return emitted;
    },
  };
}

function mountTransition(proto: Prototype<TransitionProps>, ctx: ReturnType<typeof createHost>) {
  // executeWithHost 的泛型约束与 Prototype 内部推断存在微妙不匹配，
  // 在此处统一收敛一次强转，避免在用例中反复出现 as any
  return executeWithHost(proto as any, ctx.host as any);
}

function createTransitionProto(
  name: string,
  setupCallback?: (def: any) => void
): Prototype<TransitionProps> {
  return definePrototype<TransitionProps>({
    name,
    setup(def) {
      asTransition();
      setupCallback?.(def);
      return (r) => r.el('div', 'ok');
    },
  });
}

describe('prototypes/base: asTransition', () => {
  it('AS-TRANSITION-0100: initializes to closed state by default', () => {
    const ctx = createHost();
    const P = createTransitionProto('x-as-transition-0100');

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('closed');
    expect(ctx.getExposes().isPresent.get()).toBe(false);
  });

  it('AS-TRANSITION-0200: with open=true and appear=false, starts at entering', () => {
    const ctx = createHost({ open: true, appear: false });
    const P = createTransitionProto('x-as-transition-0200');

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('entering');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0300: with open=true and appear=true, starts at entering', () => {
    const ctx = createHost({ open: true, appear: true });
    const P = createTransitionProto('x-as-transition-0300');

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('entering');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0400: complete flow: closed → entering → entered', () => {
    const ctx = createHost();
    const P = createTransitionProto('x-as-transition-0400', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        exposes.controls.complete();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('entered');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0500: complete flow: entered → leaving → closed', () => {
    const ctx = createHost({ open: true, appear: false });
    const P = createTransitionProto('x-as-transition-0500', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.leave();
        exposes.controls.complete();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('closed');
    expect(ctx.getExposes().isPresent.get()).toBe(false);
  });

  it('AS-TRANSITION-0600: reverse interrupt: entering + leave → leaving', () => {
    const ctx = createHost({ interrupt: 'reverse' });
    const P = createTransitionProto('x-as-transition-0600', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        exposes.controls.leave();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('leaving');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0700: reverse interrupt: leaving + enter → entering', () => {
    const ctx = createHost({ open: true, appear: false, interrupt: 'reverse' });
    const P = createTransitionProto('x-as-transition-0700', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.leave();
        exposes.controls.enter();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('entering');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0800: immediate interrupt: entering + leave should reset through entered', () => {
    const ctx = createHost({
      interrupt: 'immediate',
    });
    const P = createTransitionProto('x-as-transition-0800', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        exposes.controls.leave();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getEmitted().some((e) => e.key === 'afterEnter')).toBe(true);
    expect(ctx.getExposes().transitionState.get()).toBe('leaving');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-0900: immediate interrupt: leaving + enter should reset through closed', () => {
    const ctx = createHost({
      open: true,
      appear: false,
      interrupt: 'immediate',
    });
    const P = createTransitionProto('x-as-transition-0900', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.leave();
        exposes.controls.enter();
      });
    });

    mountTransition(P, ctx);

    expect(ctx.getEmitted().some((e) => e.key === 'afterLeave')).toBe(true);
    expect(ctx.getExposes().transitionState.get()).toBe('entering');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-1000: wait interrupt: entering + leave → wait until complete', () => {
    const steps: string[] = [];
    const ctx = createHost({ interrupt: 'wait' });
    const P = createTransitionProto('x-as-transition-1000', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        steps.push(`after-enter:${exposes.transitionState.get()}`);

        exposes.controls.leave();
        steps.push(`after-leave:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`after-complete:${exposes.transitionState.get()}`);
      });
    });

    mountTransition(P, ctx);

    expect(steps).toEqual([
      'after-enter:entering',
      'after-leave:entering',
      'after-complete:leaving',
    ]);
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-1100: wait interrupt: leaving + enter → wait until complete', () => {
    const steps: string[] = [];
    const ctx = createHost({ open: true, appear: false, interrupt: 'wait' });
    const P = createTransitionProto('x-as-transition-1100', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.leave();
        steps.push(`after-leave:${exposes.transitionState.get()}`);

        exposes.controls.enter();
        steps.push(`after-enter:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`after-complete:${exposes.transitionState.get()}`);
      });
    });

    mountTransition(P, ctx);

    expect(steps).toEqual([
      'after-leave:entering',
      'after-enter:entering',
      'after-complete:leaving',
    ]);
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-1200: complete() has no effect in closed or entered states', () => {
    const steps: string[] = [];
    const ctx = createHost();
    const P = createTransitionProto('x-as-transition-1200', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.complete();
        steps.push(`closed-complete:${exposes.transitionState.get()}`);

        exposes.controls.enter();
        exposes.controls.complete();
        steps.push(`entered-complete1:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`entered-complete2:${exposes.transitionState.get()}`);
      });
    });

    mountTransition(P, ctx);

    expect(steps).toEqual([
      'closed-complete:closed',
      'entered-complete1:entered',
      'entered-complete2:entered',
    ]);
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-1900: wait interrupt queues multiple state changes', () => {
    const steps: string[] = [];
    const ctx = createHost({ interrupt: 'wait' });
    const P = createTransitionProto('x-as-transition-1900', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        steps.push(`after-enter:${exposes.transitionState.get()}`);

        exposes.controls.leave();
        steps.push(`after-leave1:${exposes.transitionState.get()}`);

        exposes.controls.enter();
        steps.push(`after-enter2:${exposes.transitionState.get()}`);

        exposes.controls.leave();
        steps.push(`after-leave2:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`after-complete1:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`after-complete2:${exposes.transitionState.get()}`);

        exposes.controls.complete();
        steps.push(`after-complete3:${exposes.transitionState.get()}`);
      });
    });

    mountTransition(P, ctx);

    expect(steps).toEqual([
      'after-enter:entering',
      'after-leave1:entering',
      'after-enter2:entering',
      'after-leave2:entering',
      'after-complete1:leaving',
      'after-complete2:entering',
      'after-complete3:leaving',
    ]);
  });

  it('AS-TRANSITION-1300: idempotent enter/leave calls', () => {
    const ctx = createHost();
    const P = createTransitionProto('x-as-transition-1300', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.enter();
        exposes.controls.enter();
        exposes.controls.enter();
        expect(exposes.transitionState.get()).toBe('entering');
        expect(exposes.isPresent.get()).toBe(true);

        exposes.controls.complete();
        exposes.controls.complete();
        expect(exposes.transitionState.get()).toBe('entered');
        expect(exposes.isPresent.get()).toBe(true);

        exposes.controls.leave();
        exposes.controls.leave();
        exposes.controls.leave();
        expect(exposes.transitionState.get()).toBe('leaving');
        expect(exposes.isPresent.get()).toBe(true);

        exposes.controls.complete();
        exposes.controls.complete();
        expect(exposes.transitionState.get()).toBe('closed');
        expect(exposes.isPresent.get()).toBe(false);
      });
    });

    mountTransition(P, ctx);
  });

  it('AS-TRANSITION-1400: configurable mode shares state across calls', () => {
    const ctx = createHost();
    const P = definePrototype<TransitionProps>({
      name: 'x-as-transition-1400',
      setup() {
        asTransition({ stateKey: 'transitionState' });
        asTransition({ stateKey: 'transitionState' });
        return (r) => r.el('div', 'ok');
      },
    });

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('closed');
  });

  it('AS-TRANSITION-1500: supports controlled sync from props updates', () => {
    const steps: string[] = [];
    const ctx = createHost({ open: false });
    const P = createTransitionProto('x-as-transition-1500', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        steps.push(`init:${exposes.transitionState.get()}:${exposes.isPresent.get()}`);
      });

      def.lifecycle.onUpdated(() => {
        const exposes = ctx.getExposes();
        const state = exposes.transitionState.get();
        steps.push(`updated:${state}:${exposes.isPresent.get()}`);

        if (state === 'entering' || state === 'leaving') {
          exposes.controls.complete();
          steps.push(`after-complete:${exposes.transitionState.get()}:${exposes.isPresent.get()}`);
        }
      });
    });

    const { controller } = mountTransition(P, ctx);

    ctx.applyRawProps({ open: true });
    controller.applyRawProps({ open: true });
    controller.update();

    ctx.applyRawProps({ open: false });
    controller.applyRawProps({ open: false });
    controller.update();

    expect(steps).toEqual([
      'init:closed:false',
      'updated:entering:true',
      'after-complete:entered:true',
      'updated:leaving:true',
      'after-complete:closed:false',
    ]);
  });

  it('AS-TRANSITION-1600: supports uncontrolled defaultOpen initialization', () => {
    const ctx = createHost({ defaultOpen: true });
    const P = createTransitionProto('x-as-transition-1600');

    mountTransition(P, ctx);

    expect(ctx.getExposes().transitionState.get()).toBe('entering');
    expect(ctx.getExposes().isPresent.get()).toBe(true);
  });

  it('AS-TRANSITION-1700: emits lifecycle events during controlled transitions', () => {
    const ctx = createHost({ open: false });

    const P = createTransitionProto('x-as-transition-1700', (def) => {
      def.lifecycle.onUpdated(() => {
        const exposes = ctx.getExposes();
        const state = exposes.transitionState.get();
        if (state === 'entering' || state === 'leaving') {
          exposes.controls.complete();
        }
      });
    });

    const { controller } = mountTransition(P, ctx);

    ctx.applyRawProps({ open: true });
    controller.applyRawProps({ open: true });
    controller.update();

    ctx.applyRawProps({ open: false });
    controller.applyRawProps({ open: false });
    controller.update();

    const keys = ctx.getEmitted().map((e) => e.key);
    expect(keys).toContain('beforeEnter');
    expect(keys).toContain('afterEnter');
    expect(keys).toContain('beforeLeave');
    expect(keys).toContain('afterLeave');
  });

  it('AS-TRANSITION-2000: presence bridge is driven by enter/leave/complete', async () => {
    const ctx = createHost(
      { open: true, appear: true },
      {
        bridge: {
          mount: () => {},
          unmount: () => {},
        },
      }
    );
    const P = createTransitionProto('x-as-transition-2000', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.complete();
        exposes.controls.leave();
        exposes.controls.complete();
      });
    });

    mountTransition(P, ctx);
    // flush microtasks for setIntent('enter') -> bridge.mount,
    // finishMount -> onMounted, and setIntent('leave') -> bridge.unmount
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(ctx.getExposes().transitionState.get()).toBe('closed');
    expect(ctx.getBridgeCalls().mount).toBe(1);
    expect(ctx.getBridgeCalls().unmount).toBe(1);
  });

  it('AS-TRANSITION-2100: rapid enter cancels pending unmount', async () => {
    const ctx = createHost(
      { open: true, appear: false },
      {
        bridge: {
          mount: () => {},
          unmount: () => {},
        },
      }
    );
    const P = createTransitionProto('x-as-transition-2100', (def) => {
      def.lifecycle.onMounted(() => {
        const exposes = ctx.getExposes();
        exposes.controls.leave();
        exposes.controls.enter();
        exposes.controls.complete();
      });
    });

    mountTransition(P, ctx);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(ctx.getExposes().transitionState.get()).toBe('entered');
    expect(ctx.getBridgeCalls().mount).toBe(1);
    expect(ctx.getBridgeCalls().unmount).toBe(0);
  });
});
