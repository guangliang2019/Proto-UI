import * as Vue from '../../../../../apps/www/node_modules/vue';

import { createVueAdapter } from '../../src/adapt';

export { Vue };
export const VueAny = Vue as any;

export async function flushVue() {
  await Promise.resolve();
  await VueAny.nextTick();
  await Promise.resolve();
}

export function mountVueAdapter(Component: any, props: Record<string, unknown> = {}) {
  const host = document.createElement('div');
  document.body.appendChild(host);

  const app = VueAny.createApp(Component, props);
  const vm = app.mount(host) as any;
  const root = host.firstElementChild as HTMLElement | null;

  return {
    app,
    host,
    vm,
    root,
    unmount() {
      app.unmount();
      host.remove();
    },
  };
}

export function createMountedVueAdapter(proto: any, props: Record<string, unknown> = {}) {
  return createMountedVueAdapterWithOptions(proto, {}, props);
}

export function createMountedVueAdapterWithOptions(
  proto: any,
  options: Record<string, unknown> = {},
  props: Record<string, unknown> = {}
) {
  const adapter = createVueAdapter(VueAny);
  const Component = adapter(proto, options as any);
  return mountVueAdapter(Component, props);
}
