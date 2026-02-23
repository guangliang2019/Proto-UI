import { AdaptToWebComponent, setElementProps } from '@proto-ui/adapters.web-component';
import { createReactAdapter } from '@proto-ui/adapters.react';
import { getPrototype } from './registry';
import { loadReact } from './runtimes/react-runtime';
import type { DemoChild, DemoNode, DemoRenderOptions, DemoRenderResult } from './demo-types';

const reactRoots = new WeakMap<HTMLElement, { unmount: () => void; render: (el: any) => void }>();

function renderDemoNodeWc(node: DemoChild, parent: HTMLElement) {
  if (typeof node === 'string') {
    parent.appendChild(document.createTextNode(node));
    return;
  }
  if (node.kind === 'text') {
    parent.appendChild(document.createTextNode(node.text));
    return;
  }
  if (node.kind === 'box') {
    const el = document.createElement('div');
    if (node.className) el.className = node.className;
    parent.appendChild(el);
    const kids = node.children ?? [];
    for (const child of kids) renderDemoNodeWc(child, el);
    return;
  }

  const proto = getPrototype(node.prototypeId);
  const wcName = `wc-${proto.name}`;
  if (!customElements.get(wcName)) {
    AdaptToWebComponent({ ...proto, name: wcName });
  }

  const el = document.createElement(wcName);
  if (node.className) el.className = node.className;
  if (node.props) setElementProps(el, node.props as Record<string, any>);
  parent.appendChild(el);

  const kids = node.children ?? [];
  for (const child of kids) renderDemoNodeWc(child, el);
}

async function renderDemoWc(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  const { host, demo } = opt;
  host.innerHTML = '';
  renderDemoNodeWc(demo.root, host);
  return {
    destroy: () => {
      host.innerHTML = '';
    },
  };
}

function renderDemoNodeReact(
  runtime: any,
  adapter: ReturnType<typeof createReactAdapter>,
  node: DemoChild
): any {
  if (typeof node === 'string') return node;
  if (node.kind === 'text') return node.text;
  if (node.kind === 'box') {
    const kids = (node.children ?? []).map((child) => renderDemoNodeReact(runtime, adapter, child));
    return runtime.createElement('div', { className: node.className }, ...kids);
  }

  const proto = getPrototype(node.prototypeId);
  const Component = adapter(proto as any);
  const kids = (node.children ?? []).map((child) => renderDemoNodeReact(runtime, adapter, child));
  const props = { ...(node.props ?? {}) } as Record<string, unknown>;
  if (node.className) (props as any).hostClassName = node.className;
  return runtime.createElement(Component, props as any, ...kids);
}

async function renderDemoReact(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  const { host, demo } = opt;

  const { React, ReactDOM } = await loadReact();
  const adapter = createReactAdapter({ React, ReactDOM } as any);

  const existingRoot = reactRoots.get(host);
  if (existingRoot) {
    existingRoot.unmount();
    reactRoots.delete(host);
  }
  host.innerHTML = '';

  const root = (ReactDOM as any).createRoot(host);
  reactRoots.set(host, root);

  const tree = renderDemoNodeReact(React, adapter, demo.root);
  root.render(tree);

  return {
    destroy: () => {
      const r = reactRoots.get(host);
      if (r) {
        r.unmount();
        reactRoots.delete(host);
      }
      host.innerHTML = '';
    },
  };
}

export async function renderDemo(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  if (opt.runtime === 'react') return renderDemoReact(opt);
  return renderDemoWc(opt);
}
