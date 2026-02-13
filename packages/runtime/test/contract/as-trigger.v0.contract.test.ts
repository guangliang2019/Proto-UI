// packages/runtime/test/contract/as-trigger.v0.contract.test.ts
import { describe, it, expect } from 'vitest';
import { definePrototype, asTrigger } from '@proto-ui/core';
import type { Prototype } from '@proto-ui/core';
import type { RuntimeHost } from '../../src';
import { executeWithHost } from '../../src';
import type { PropsBaseType } from '@proto-ui/types';
import { EVENT_ROOT_TARGET_CAP, EVENT_GLOBAL_TARGET_CAP } from '@proto-ui/modules.event';
import {
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
  AS_TRIGGER_GET_PROTO_CAP,
} from '@proto-ui/modules.as-trigger';

class FakeTarget implements EventTarget {
  readonly logs: string[] = [];
  addEventListener(..._args: any[]): void {
    this.logs.push('add');
  }
  removeEventListener(..._args: any[]): void {
    this.logs.push('remove');
  }
  dispatchEvent(_event: Event): boolean {
    return true;
  }
}

const createHost = <P extends PropsBaseType>(name: string) => {
  const scheduled: Array<() => void> = [];
  const host: RuntimeHost<P> = {
    prototypeName: name,
    getRawProps: () => ({}) as any,
    commit(_children, signal) {
      signal?.done();
    },
    schedule(task) {
      scheduled.push(task);
      task();
    },
  };

  return { host };
};

describe('runtime contract: asTrigger (v0)', () => {
  it('AS-TRIGGER-0100: when parent is trigger, redirect root target to parent', () => {
    const parentTarget = new FakeTarget();
    const childTarget = new FakeTarget();

    const parentProto: Prototype = {
      name: 'x-parent-trigger',
      setup() {},
    } as any;

    Object.defineProperty(parentProto, '__asHooks', {
      get: () => [{ name: 'asTrigger', order: 0, privileged: true }],
      enumerable: false,
      configurable: false,
    });

    const P = definePrototype({
      name: 'x-as-trigger-0100',
      setup(def) {
        asTrigger();
        def.event.on('click' as any, () => {});
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    host.onRuntimeReady = (wiring) => {
      wiring.attach('event', [
        [EVENT_ROOT_TARGET_CAP, () => childTarget],
        [EVENT_GLOBAL_TARGET_CAP, () => childTarget],
      ]);

      wiring.attach('as-trigger', [
        [AS_TRIGGER_INSTANCE_CAP, childTarget],
        [AS_TRIGGER_PARENT_CAP, (inst: any) => (inst === childTarget ? parentTarget : null)],
        [AS_TRIGGER_GET_PROTO_CAP, (inst: any) => (inst === parentTarget ? parentProto : null)],
      ]);
    };

    executeWithHost(P as any, host as any);

    expect(parentTarget.logs).toEqual(['add']);
    expect(childTarget.logs).toEqual([]);
  });

  it('AS-TRIGGER-0150: multi-level trigger chain redirects to outermost trigger', () => {
    const grandTarget = new FakeTarget();
    const parentTarget = new FakeTarget();
    const childTarget = new FakeTarget();

    const grandProto: Prototype = { name: 'x-grand-trigger', setup() {} } as any;
    const parentProto: Prototype = { name: 'x-parent-trigger', setup() {} } as any;

    Object.defineProperty(grandProto, '__asHooks', {
      get: () => [{ name: 'asTrigger', order: 0, privileged: true }],
      enumerable: false,
      configurable: false,
    });
    Object.defineProperty(parentProto, '__asHooks', {
      get: () => [{ name: 'asTrigger', order: 0, privileged: true }],
      enumerable: false,
      configurable: false,
    });

    const P = definePrototype({
      name: 'x-as-trigger-0150',
      setup(def) {
        asTrigger();
        def.event.on('click' as any, () => {});
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    host.onRuntimeReady = (wiring) => {
      wiring.attach('event', [
        [EVENT_ROOT_TARGET_CAP, () => childTarget],
        [EVENT_GLOBAL_TARGET_CAP, () => childTarget],
      ]);

      wiring.attach('as-trigger', [
        [AS_TRIGGER_INSTANCE_CAP, childTarget],
        [
          AS_TRIGGER_PARENT_CAP,
          (inst: any) =>
            inst === childTarget ? parentTarget : inst === parentTarget ? grandTarget : null,
        ],
        [
          AS_TRIGGER_GET_PROTO_CAP,
          (inst: any) =>
            inst === parentTarget ? parentProto : inst === grandTarget ? grandProto : null,
        ],
      ]);
    };

    executeWithHost(P as any, host as any);

    expect(grandTarget.logs).toEqual(['add']);
    expect(parentTarget.logs).toEqual([]);
    expect(childTarget.logs).toEqual([]);
  });

  it('AS-TRIGGER-0200: when parent is NOT trigger, use self root target', () => {
    const parentTarget = new FakeTarget();
    const childTarget = new FakeTarget();

    const parentProto: Prototype = {
      name: 'x-parent-non-trigger',
      setup() {},
    } as any;

    Object.defineProperty(parentProto, '__asHooks', {
      get: () => [{ name: 'asOther' }],
      enumerable: false,
      configurable: false,
    });

    const P = definePrototype({
      name: 'x-as-trigger-0200',
      setup(def) {
        asTrigger();
        def.event.on('click' as any, () => {});
        return (r) => r.el('div', 'ok');
      },
    });

    const { host } = createHost(P.name);
    host.onRuntimeReady = (wiring) => {
      wiring.attach('event', [
        [EVENT_ROOT_TARGET_CAP, () => childTarget],
        [EVENT_GLOBAL_TARGET_CAP, () => childTarget],
      ]);

      wiring.attach('as-trigger', [
        [AS_TRIGGER_INSTANCE_CAP, childTarget],
        [AS_TRIGGER_PARENT_CAP, (inst: any) => (inst === childTarget ? parentTarget : null)],
        [AS_TRIGGER_GET_PROTO_CAP, (inst: any) => (inst === parentTarget ? parentProto : null)],
      ]);
    };

    executeWithHost(P as any, host as any);

    expect(childTarget.logs).toEqual(['add']);
    expect(parentTarget.logs).toEqual([]);
  });
});
