import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto-ui/core';
import { tw } from '@proto-ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';

describe('runtime contract: state semantic accessors (v0)', () => {
  it('fromInteraction returns a shared borrowed handle for the same semantic slot', () => {
    let a: any;
    let b: any;

    const P: Prototype = {
      name: 'state-interaction-shared',
      setup(def) {
        a = def.state.fromInteraction('disabled');
        b = def.state.fromInteraction('disabled');

        def.rule({
          when: (w: any) => w.state(a).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('opacity-50')),
        });

        def.lifecycle.onCreated(() => {
          a.set(true);
        });

        return (r) => [r.el('div', 'ok')];
      },
    };

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    const { controller } = executeWithHost(P as any, host as any);
    expect(a).toBe(b);
    expect(typeof a.watch).toBe('function');
    expect(controller.getRuleStyleTokens()).toContain('opacity-50');
  });

  it('fromAccessibility returns a shared borrowed handle for the same semantic slot', () => {
    let a: any;
    let b: any;

    const P: Prototype = {
      name: 'state-accessibility-shared',
      setup(def) {
        a = def.state.fromAccessibility('expanded');
        b = def.state.fromAccessibility('expanded');

        def.rule({
          when: (w: any) => w.state(a).eq(true),
          intent: (i: any) => i.feedback.style.use(tw('bg-muted')),
        });

        def.lifecycle.onCreated(() => {
          a.set(true);
        });

        return (r) => [r.el('div', 'ok')];
      },
    };

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    const { controller } = executeWithHost(P as any, host as any);
    expect(a).toBe(b);
    expect(typeof a.watch).toBe('function');
    expect(controller.getRuleStyleTokens()).toContain('bg-muted');
  });

  it('fromInteraction supports focusVisible as a shared semantic slot', () => {
    let a: any;
    let b: any;

    const P: Prototype = {
      name: 'state-interaction-focus-visible-shared',
      setup(def) {
        a = def.state.fromInteraction('focusVisible');
        b = def.state.fromInteraction('focusVisible');
        return (r) => [r.el('div', 'ok')];
      },
    };

    const host: RuntimeHost<any> = {
      prototypeName: P.name,
      getRawProps() {
        return {};
      },
      commit(_children, signal) {
        signal?.done();
      },
      schedule(task) {
        task();
      },
    };

    executeWithHost(P as any, host as any);
    expect(a).toBe(b);
    expect(typeof a.watch).toBe('function');
  });
});
