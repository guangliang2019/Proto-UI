import { describe, expect, it } from 'vitest';
import { definePrototype, type Prototype } from '@proto-ui/core';
import type { RuntimeHost } from '@proto-ui/runtime';
import { executeWithHost } from '@proto-ui/runtime';
import { EVENT_GLOBAL_TARGET_CAP, EVENT_ROOT_TARGET_CAP } from '@proto-ui/modules.event';
import { asEscapeKey } from '../src/tools';

function createHost() {
  const rootTarget = new EventTarget();
  const globalTarget = new EventTarget();

  const host: RuntimeHost<any> = {
    prototypeName: 'as-escape-key-contract',
    getRawProps: () => ({}),
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
      ]);
    },
  };

  return { host, rootTarget, globalTarget };
}

describe('prototype-libs/base: asEscapeKey', () => {
  it('runs callback on Escape and ignores other keys', () => {
    const calls: string[] = [];

    const P: Prototype = definePrototype({
      name: 'x-as-escape-key-0100',
      setup() {
        asEscapeKey({
          onEscape: () => {
            calls.push('escape');
          },
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost();
    executeWithHost(P as any, ctx.host as any);

    ctx.globalTarget.dispatchEvent(new CustomEvent('key.down', { detail: { key: 'Enter' } }));
    ctx.globalTarget.dispatchEvent(new CustomEvent('key.down', { detail: { key: 'Escape' } }));

    expect(calls).toEqual(['escape']);
  });

  it('supports repeated configurable calls and latest callback wins', () => {
    const calls: string[] = [];

    const P: Prototype = definePrototype({
      name: 'x-as-escape-key-0200',
      setup() {
        asEscapeKey({
          onEscape: () => {
            calls.push('first');
          },
        });
        asEscapeKey({
          onEscape: () => {
            calls.push('second');
          },
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost();
    executeWithHost(P as any, ctx.host as any);

    ctx.globalTarget.dispatchEvent(new CustomEvent('key.down', { detail: { key: 'Escape' } }));

    expect(calls).toEqual(['second']);
  });

  it('can be disabled through configuration', () => {
    const calls: string[] = [];

    const P: Prototype = definePrototype({
      name: 'x-as-escape-key-0300',
      setup() {
        asEscapeKey({
          onEscape: () => {
            calls.push('escape');
          },
        });
        asEscapeKey({
          enabled: false,
        });
        return (r) => r.el('div', 'ok');
      },
    });

    const ctx = createHost();
    executeWithHost(P as any, ctx.host as any);

    ctx.globalTarget.dispatchEvent(new CustomEvent('key.down', { detail: { key: 'Escape' } }));

    expect(calls).toEqual([]);
  });
});
