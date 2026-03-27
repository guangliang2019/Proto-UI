import { describe, expect, it } from 'vitest';
import {
  asFocusable,
  asFocusScope,
  createFocusScopeKey,
  definePrototype,
  type FocusScopeHandle,
  type FocusableHandle,
} from '@proto.ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { FocusPort } from '@proto.ui/module-focus';
import type { PropsBaseType } from '@proto.ui/types';

const createHost = <P extends PropsBaseType>(name: string) => {
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      task();
    },
  };

  return { host };
};

describe('runtime contract: focus (v0)', () => {
  it('FOCUS-0100: repeated asFocusable calls reuse one handle and last compatible scopeKey wins', () => {
    const first = createFocusScopeKey({ debugLabel: 'first' });
    const second = createFocusScopeKey({ debugLabel: 'second' });
    let a!: FocusableHandle<any>;
    let b!: FocusableHandle<any>;

    const P = definePrototype({
      name: 'x-focus-0100',
      setup() {
        a = asFocusable({ scopeKey: first });
        b = asFocusable({ scopeKey: second });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(a).toBe(b);
    expect(port?.getEffectiveScopeKey()).toBe(second);
    expect(port?.getFocusableConfig()).toMatchObject({
      autoFocus: false,
      disabled: false,
      navParticipation: 'auto',
      scopeKey: second,
    });
    expect(port?.getWarnings()).toEqual([expect.stringContaining('focusable.scopeKey overridden')]);
    expect((P as any).__asHooks).toEqual([
      { name: 'asFocusable', order: 0, privileged: true, mode: 'configurable' },
    ]);
  });

  it('FOCUS-0200: repeated asFocusScope calls reuse one handle and key patch is retained', () => {
    const scopeKey = createFocusScopeKey({ debugLabel: 'scope-2' });
    let scopeA!: FocusScopeHandle<any>;
    let scopeB!: FocusScopeHandle<any>;

    const P = definePrototype({
      name: 'x-focus-0200',
      setup() {
        scopeA = asFocusScope({ navigation: 'tab' });
        scopeB = asFocusScope({ key: scopeKey, navigation: 'arrow', loop: true });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(scopeA).toBe(scopeB);
    expect(port?.getEffectiveScopeKey()).toBe(scopeKey);
    expect(port?.getScopeConfig()).toMatchObject({
      key: scopeKey,
      navigation: 'arrow',
      loop: true,
      orientation: 'vertical',
      entry: 'first',
      restore: 'none',
      emptyPolicy: 'none',
      trap: false,
    });
    expect(port?.getWarnings()).toEqual(
      expect.arrayContaining([
        expect.stringContaining('scope.navigation overridden'),
        expect.stringContaining('scope.loop overridden'),
      ])
    );
    expect((P as any).__asHooks).toEqual([
      { name: 'asFocusScope', order: 0, privileged: true, mode: 'configurable' },
    ]);
  });

  it('FOCUS-0300: configure is setup-only on focus handles', () => {
    const key = createFocusScopeKey({ debugLabel: 'late' });
    let focusable!: FocusableHandle<any>;
    let thrown: unknown;

    const P = definePrototype({
      name: 'x-focus-0300',
      setup(def) {
        focusable = asFocusable();
        def.lifecycle.onCreated(() => {
          try {
            focusable.configure({ scopeKey: key });
          } catch (error) {
            thrown = error;
          }
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    executeWithHost(P as any, host as any);

    expect(thrown).toBeTruthy();
    expect(String(thrown)).toMatch(/setup/i);
  });

  it('FOCUS-0400: focus commands update minimal facts snapshot', () => {
    let focusable!: FocusableHandle<any>;

    const P = definePrototype({
      name: 'x-focus-0400',
      setup(def) {
        focusable = asFocusable({ disabled: false });
        def.lifecycle.onCreated(() => {
          focusable.focus({ reason: 'keyboard' });
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(port?.getFacts()).toEqual({
      focused: true,
      focusVisible: true,
      focusable: true,
      active: true,
      hasFocused: true,
    });
  });

  it('FOCUS-0500: disabled focusable rejects focus requests', () => {
    let focusable!: FocusableHandle<any>;

    const P = definePrototype({
      name: 'x-focus-0500',
      setup(def) {
        focusable = asFocusable({ disabled: true });
        def.lifecycle.onCreated(() => {
          focusable.focus({ reason: 'keyboard' });
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(port?.getFacts()).toEqual({
      focused: false,
      focusVisible: false,
      focusable: false,
      active: false,
      hasFocused: false,
    });
  });

  it('FOCUS-0600: autoFocus requests focus after first render commit', () => {
    const P = definePrototype({
      name: 'x-focus-0600',
      setup() {
        asFocusable({ autoFocus: true });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(port?.getFacts()).toEqual({
      focused: true,
      focusVisible: false,
      focusable: true,
      active: true,
      hasFocused: true,
    });
  });

  it('FOCUS-0700: scope emptyPolicy=container activates scope without node focus', () => {
    let scope!: FocusScopeHandle<any>;

    const P = definePrototype({
      name: 'x-focus-0700',
      setup(def) {
        scope = asFocusScope({ emptyPolicy: 'container' });
        def.lifecycle.onCreated(() => {
          scope.focusFirst();
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    const result = executeWithHost(P as any, host as any);
    const port = result.caps.getPort<FocusPort>('focus');

    expect(port?.getFacts()).toEqual({
      focused: false,
      focusVisible: false,
      focusable: true,
      active: true,
      hasFocused: false,
    });
  });
});
