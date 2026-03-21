import { describe, expect, it } from 'vitest';

import demo from '../../../../apps/www/src/content/docs/zh-cn/demo-combo.demo';
import DemoInline from '../../../../apps/www/src/content/docs/zh-cn/demo-inline.demo.proto';

import { VueAny, flushVue } from './utils/vue';
import { createVueAdapter } from '../src/adapt';

function renderDemoNodeVue(Vue: any, adapter: ReturnType<typeof createVueAdapter>, node: any): any {
  if (typeof node === 'string') return node;
  if (node.kind === 'text') return node.text;
  if (node.kind === 'box') {
    const kids = (node.children ?? []).map((child: any) => renderDemoNodeVue(Vue, adapter, child));
    return Vue.h('div', { class: node.className }, kids);
  }

  const Component = adapter(DemoInline as any);
  const kids = (node.children ?? []).map((child: any) => renderDemoNodeVue(Vue, adapter, child));
  const props = { ...(node.props ?? {}) } as Record<string, unknown>;
  if (node.className) (props as any).hostClass = node.className;
  return Vue.h(Component, props, () => kids);
}

describe('adapter-vue: previewer demo integration', () => {
  it('renders demo-combo-like tree without leaking raw props to DOM', async () => {
    const adapter = createVueAdapter(VueAny);
    const host = document.createElement('div');
    document.body.appendChild(host);

    const app = VueAny.createApp({
      setup() {
        return () => renderDemoNodeVue(VueAny, adapter, demo.root);
      },
    });

    app.mount(host);
    await flushVue();
    await flushVue();

    const inlineRoots = Array.from(host.querySelectorAll('.bg-red-500')) as HTMLElement[];
    expect(inlineRoots.length).toBeGreaterThanOrEqual(2);
    expect(inlineRoots[0]?.getAttribute('label')).toBe(null);
    expect(inlineRoots[0]?.textContent).toContain('Vue Button');
    expect(host.textContent).toContain('Hello');

    app.unmount();
    host.remove();
  });
});
