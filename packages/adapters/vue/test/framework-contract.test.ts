import { describe, expect, it } from 'vitest';
import type { Prototype } from '@proto-ui/core';

import { createVueAdapter, type VueRuntime } from '../src/adapt';

function createFakeVueRuntime() {
  const mounted: Array<() => void> = [];
  const beforeUnmount: Array<() => void> = [];

  let capturedOptions: any = null;

  const runtime: VueRuntime = {
    defineComponent(opt: any) {
      capturedOptions = opt;
      return opt;
    },
    h(type: any, props?: any, children?: any) {
      return { type, props, children };
    },
    ref<T>(value: T) {
      return { value };
    },
    shallowRef<T>(value: T) {
      return { value };
    },
    watch() {},
    onMounted(cb: () => void) {
      mounted.push(cb);
    },
    onBeforeUnmount(cb: () => void) {
      beforeUnmount.push(cb);
    },
    nextTick() {
      return Promise.resolve();
    },
  };

  return {
    runtime,
    get options() {
      return capturedOptions;
    },
    mounted,
    beforeUnmount,
  };
}

describe('adapter-vue: framework contract', () => {
  it('registers Vue component options with host props and inheritAttrs disabled', () => {
    const fake = createFakeVueRuntime();

    const proto: Prototype = {
      name: 'vue-framework-contract',
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    };

    const Component = createVueAdapter(fake.runtime)(proto);

    expect(Component).toBe(fake.options);
    expect(fake.options.name).toBe('Proto(vue-framework-contract)');
    expect(fake.options.inheritAttrs).toBe(false);
    expect(fake.options.props.hostClass).toBeTruthy();
    expect(fake.options.props.hostStyle).toBeTruthy();
  });

  it('calls Vue ctx.expose with adapter handle and registers lifecycle hooks', () => {
    const fake = createFakeVueRuntime();

    const proto: Prototype = {
      name: 'vue-framework-expose',
      setup() {
        return (r) => [r.el('div', 'ok')];
      },
    };

    createVueAdapter(fake.runtime)(proto);

    const exposed: { current?: any } = {};
    const setupResult = fake.options.setup(
      { hostClass: undefined, hostStyle: undefined },
      {
        attrs: {},
        slots: {},
        expose(value: any) {
          exposed.current = value;
        },
      }
    );

    expect(typeof setupResult).toBe('function');
    expect(typeof exposed.current.update).toBe('function');
    expect(typeof exposed.current.getExposes).toBe('function');
    expect(fake.mounted.length).toBeGreaterThan(0);
    expect(fake.beforeUnmount.length).toBeGreaterThan(0);
  });
});
