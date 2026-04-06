import { setElementProps } from '@proto.ui/adapter-web-component';
import { createReactAdapter, type ReactRuntime } from '@proto.ui/adapter-react';
import { createVueAdapter } from '@proto.ui/adapter-vue';
import { getPrototype } from './registry';
import { loadReact } from './runtimes/react-runtime';
import { loadVue } from './runtimes/vue-runtime';
import type { DemoChild, DemoRenderOptions, DemoRenderResult, DemoRuntimeApi } from './demo-types';
import { ensurePreviewWcRegistered } from './wc-registry';

const reactRoots = new WeakMap<
  HTMLElement,
  { unmount: () => void; render: (el: unknown) => void }
>();
const reactComponentCache = new WeakMap<object, Map<string, object>>();
const vueComponentCache = new WeakMap<object, Map<string, object>>();

function getScopedComponentCache<T extends object>(
  cache: WeakMap<object, Map<string, T>>,
  adapter: object
): Map<string, T> {
  let scopedCache = cache.get(adapter);
  if (!scopedCache) {
    scopedCache = new Map<string, T>();
    cache.set(adapter, scopedCache);
  }
  return scopedCache;
}

type DemoInstance = {
  getExposes?(): Record<string, unknown>;
  update?(): void;
  invokeInCallbackScope?(fn: () => void): void;
};

function callInScope(inst: DemoInstance, fn: () => void) {
  if (typeof inst.invokeInCallbackScope === 'function') {
    let invoked = false;
    let result: unknown;
    inst.invokeInCallbackScope(() => {
      invoked = true;
      result = fn();
    });
    // Some adapters expose invokeInCallbackScope early but wire it later.
    // Fallback to direct invocation so first-click controls are not dropped.
    if (!invoked) {
      return fn();
    }
    return result;
  }
  return fn();
}

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
    if (node.ref) el.setAttribute('data-demo-ref', node.ref);
    parent.appendChild(el);
    const kids = node.children ?? [];
    for (const child of kids) renderDemoNodeWc(child, el);
    return;
  }

  const proto = getPrototype(node.prototypeId);
  const wcName = ensurePreviewWcRegistered(node.prototypeId, proto);

  const el = document.createElement(wcName);
  if (node.className) el.className = node.className;
  if (node.ref) el.setAttribute('data-demo-ref', node.ref);
  if (node.props) setElementProps(el, node.props);
  parent.appendChild(el);

  const kids = node.children ?? [];
  for (const child of kids) renderDemoNodeWc(child, el);
}

function collectDemoRefs(host: HTMLElement): Record<string, HTMLElement> {
  const refs: Record<string, HTMLElement> = {};
  host.querySelectorAll('[data-demo-ref]').forEach((el) => {
    const ref = el.getAttribute('data-demo-ref');
    if (ref) refs[ref] = el as HTMLElement;
  });
  return refs;
}

function resolvePath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => {
    if (o != null && typeof o === 'object') {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

async function renderDemoWc(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  const { host, demo } = opt;
  host.innerHTML = '';
  renderDemoNodeWc(demo.root, host);

  const refs = collectDemoRefs(host);
  const api: DemoRuntimeApi = {
    call(ref, path, ...args) {
      const el = refs[ref] as DemoInstance & HTMLElement;
      if (!el) return;
      const exposes = el.getExposes?.() ?? {};
      const fn = resolvePath(exposes, path);
      if (typeof fn !== 'function') return;
      return fn(...args);
    },
    getExposes(ref) {
      const el = refs[ref] as DemoInstance & HTMLElement;
      return el?.getExposes?.();
    },
    setProps(ref, next) {
      const el = refs[ref] as DemoInstance &
        HTMLElement & { setProps?(v: Record<string, unknown>): void; update?(): void };
      if (!el) return;
      el.setProps?.(next);
      el.update?.();
    },
  };

  const cleanup = demo.setup?.({ host, refs, api });

  return {
    destroy: () => {
      if (typeof cleanup === 'function') cleanup();
      host.innerHTML = '';
    },
  };
}

async function renderDemoReact(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  const { host, demo } = opt;

  const { React, ReactDOM } = await loadReact();
  const adapter = createReactAdapter(React as unknown as ReactRuntime);

  const existingRoot = reactRoots.get(host);
  if (existingRoot) {
    existingRoot.unmount();
    reactRoots.delete(host);
  }
  host.innerHTML = '';

  const componentRefs = new Map<string, DemoInstance>();
  const propsMap = new Map<string, Record<string, unknown>>();

  function initProps(node: DemoChild) {
    if (typeof node === 'string' || node.kind === 'text') return;
    if (node.kind === 'proto' && node.ref && node.props) {
      propsMap.set(node.ref, { ...node.props });
    }
    for (const child of node.children ?? []) initProps(child);
  }
  initProps(demo.root);

  function renderNode(node: DemoChild): unknown {
    if (typeof node === 'string') return node;
    if (node.kind === 'text') return node.text;
    if (node.kind === 'box') {
      const kids = (node.children ?? []).map((child) => renderNode(child));
      return React.createElement(
        'div',
        { className: node.className, 'data-demo-ref': node.ref },
        ...kids
      );
    }

    const proto = getPrototype(node.prototypeId);
    const scopedCache = getScopedComponentCache(reactComponentCache, adapter);
    let Component = scopedCache.get(node.prototypeId);
    if (!Component) {
      Component = adapter(proto as Prototype<PropsBaseType>);
      scopedCache.set(node.prototypeId, Component);
    }
    const kids = (node.children ?? []).map((child) => renderNode(child));
    const mergedProps: Record<string, unknown> = { ...(node.props ?? {}) };
    if (node.ref) {
      mergedProps['data-demo-ref'] = node.ref;
      Object.assign(mergedProps, propsMap.get(node.ref) ?? {});
      mergedProps.ref = (instance: unknown) => {
        if (instance) componentRefs.set(node.ref!, instance as DemoInstance);
        else componentRefs.delete(node.ref!);
      };
    }
    if (node.className) mergedProps.hostClassName = node.className;
    return React.createElement(Component, mergedProps as Record<string, unknown>, ...kids);
  }

  const root = (
    ReactDOM as {
      createRoot(el: HTMLElement): { render: (el: unknown) => void; unmount: () => void };
    }
  ).createRoot(host);
  reactRoots.set(host, root);

  function renderTree() {
    return renderNode(demo.root);
  }

  root.render(renderTree());

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const refs = collectDemoRefs(host);

  const api: DemoRuntimeApi = {
    call(ref, path, ...args) {
      const inst = componentRefs.get(ref);
      if (!inst) return;
      const exposes = inst.getExposes?.() ?? {};
      const fn = resolvePath(exposes, path);
      if (typeof fn !== 'function') return;
      const result = callInScope(inst, () => fn(...args));
      inst.update?.();
      return result;
    },
    getExposes(ref) {
      const inst = componentRefs.get(ref);
      return inst?.getExposes?.();
    },
    setProps(ref, next) {
      const current = propsMap.get(ref);
      if (!current) return;
      Object.assign(current, next);
      root.render(renderTree());
    },
  };

  const cleanup = demo.setup?.({ host, refs, api });

  return {
    destroy: () => {
      if (typeof cleanup === 'function') cleanup();
      const r = reactRoots.get(host);
      if (r) {
        r.unmount();
        reactRoots.delete(host);
      }
      host.innerHTML = '';
    },
  };
}

const vueApps = new WeakMap<HTMLElement, { unmount: () => void }>();

async function renderDemoVue(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  const { host, demo } = opt;

  const Vue = await loadVue();
  const adapter = createVueAdapter(Vue);

  const existingApp = vueApps.get(host);
  if (existingApp) {
    existingApp.unmount();
    vueApps.delete(host);
  }
  host.innerHTML = '';

  const componentRefs = new Map<string, DemoInstance>();
  const propsMap = Vue.reactive<Record<string, Record<string, unknown>>>({});

  function initProps(node: DemoChild) {
    if (typeof node === 'string' || node.kind === 'text') return;
    if (node.kind === 'proto' && node.ref && node.props) {
      propsMap[node.ref] = { ...node.props };
    }
    for (const child of node.children ?? []) initProps(child);
  }
  initProps(demo.root);

  function renderNode(node: DemoChild): unknown {
    if (typeof node === 'string') return node;
    if (node.kind === 'text') return node.text;
    if (node.kind === 'box') {
      const kids = (node.children ?? []).map((child) => renderNode(child));
      return Vue.h(
        'div',
        {
          class: node.className,
          'data-demo-ref': node.ref,
          ref: node.ref
            ? (el: unknown) => {
                if (el) componentRefs.set(node.ref!, el as DemoInstance);
              }
            : undefined,
        },
        kids
      );
    }

    const proto = getPrototype(node.prototypeId);
    const scopedCache = getScopedComponentCache(vueComponentCache, adapter);
    let Component = scopedCache.get(node.prototypeId);
    if (!Component) {
      Component = adapter(proto as Prototype<PropsBaseType>);
      scopedCache.set(node.prototypeId, Component);
    }
    const kids = (node.children ?? []).map((child) => renderNode(child));
    const mergedProps: Record<string, unknown> = { ...(node.props ?? {}) };
    if (node.ref) {
      mergedProps['data-demo-ref'] = node.ref;
      Object.assign(mergedProps, propsMap[node.ref] ?? {});
      mergedProps.ref = (el: unknown) => {
        if (el) componentRefs.set(node.ref!, el as DemoInstance);
      };
    }
    if (node.className) mergedProps.hostClass = node.className;
    return Vue.h(Component, mergedProps, () => kids);
  }

  const app = Vue.createApp({
    setup() {
      return () => renderNode(demo.root);
    },
  });

  app.mount(host);
  vueApps.set(host, app);

  await new Promise((resolve) => requestAnimationFrame(resolve));
  const refs = collectDemoRefs(host);

  const api: DemoRuntimeApi = {
    call(ref, path, ...args) {
      const inst = componentRefs.get(ref);
      if (!inst) return;
      const exposes = inst.getExposes?.() ?? {};
      const fn = resolvePath(exposes, path);
      if (typeof fn !== 'function') return;
      const result = callInScope(inst, () => fn(...args));
      inst.update?.();
      return result;
    },
    getExposes(ref) {
      const inst = componentRefs.get(ref);
      return inst?.getExposes?.();
    },
    setProps(ref, next) {
      if (propsMap[ref]) {
        Object.assign(propsMap[ref], next);
      }
      const inst = componentRefs.get(ref);
      if (inst) {
        inst.update?.();
      }
    },
  };

  const cleanup = demo.setup?.({ host, refs, api });

  return {
    destroy: () => {
      if (typeof cleanup === 'function') cleanup();
      const a = vueApps.get(host);
      if (a) {
        a.unmount();
        vueApps.delete(host);
      }
      host.innerHTML = '';
    },
  };
}

export async function renderDemo(opt: DemoRenderOptions): Promise<DemoRenderResult> {
  if (opt.runtime === 'react') return renderDemoReact(opt);
  if (opt.runtime === 'vue') return renderDemoVue(opt);
  return renderDemoWc(opt);
}
