import { createReactAdapter, type ReactRuntime } from '../../src/adapt';

type EffectRecord = {
  deps?: any[];
  cleanup?: (() => void) | void;
};

type HookInstance = {
  hooks: any[];
  hookIndex: number;
  dirty: boolean;
  pendingLayoutEffects: Array<() => void>;
  pendingEffects: Array<() => void>;
  hostEl: HTMLElement;
  rootEl: HTMLElement | null;
  component: any;
  props: any;
  ref: any;
};

let CURRENT: HookInstance | null = null;
const OWNED_STYLE_KEYS = new WeakMap<HTMLElement, Set<string>>();

export function createFakeReactRuntime() {
  const runtime: ReactRuntime = {
    useState<T>(init: T) {
      const inst = getCurrent();
      const index = inst.hookIndex++;
      if (!(index in inst.hooks)) inst.hooks[index] = init;
      const setState = (next: T) => {
        const value = typeof next === 'function' ? (next as any)(inst.hooks[index]) : next;
        if (Object.is(inst.hooks[index], value)) return;
        inst.hooks[index] = value;
        inst.dirty = true;
      };
      return [inst.hooks[index], setState];
    },
    useRef<T>(init: T) {
      const inst = getCurrent();
      const index = inst.hookIndex++;
      if (!(index in inst.hooks)) inst.hooks[index] = { current: init };
      return inst.hooks[index];
    },
    useEffect(cb, deps) {
      registerEffect('effect', cb, deps);
    },
    useLayoutEffect(cb, deps) {
      registerEffect('layout', cb, deps);
    },
    useImperativeHandle(ref, create) {
      const value = create();
      if (ref && typeof ref === 'object') ref.current = value;
    },
    forwardRef(render) {
      const component = (props: any, ref: any) => render(props, ref);
      (component as any).__forwardRefRender = render;
      return component;
    },
    createElement(type: any, props?: any, ...children: any[]) {
      const flatChildren = children.flat();
      const nextProps =
        flatChildren.length === 0
          ? { ...(props ?? {}) }
          : {
              ...(props ?? {}),
              children: flatChildren.length === 1 ? flatChildren[0] : flatChildren,
            };
      return {
        type,
        props: nextProps,
        children: flatChildren,
      };
    },
    createPortal(children: any, _container: any) {
      return children;
    },
  };

  function render(
    Component: any,
    props: any = {},
    ref: any = { current: null },
    hostEl: HTMLElement = appendHost()
  ) {
    const inst: HookInstance = {
      hooks: [],
      hookIndex: 0,
      dirty: false,
      pendingLayoutEffects: [],
      pendingEffects: [],
      hostEl,
      rootEl: null,
      component: Component,
      props,
      ref,
    };

    runInstance(inst);

    return {
      ref,
      get root() {
        return inst.rootEl;
      },
      update(nextProps: any = inst.props) {
        inst.props = nextProps;
        runInstance(inst);
      },
      unmount() {
        for (const hook of inst.hooks) {
          if (
            hook &&
            typeof hook === 'object' &&
            'cleanup' in hook &&
            typeof hook.cleanup === 'function'
          ) {
            hook.cleanup();
          }
        }
        inst.rootEl?.remove();
        inst.rootEl = null;
        inst.hostEl.remove();
      },
    };
  }

  return { runtime, render };
}

export function createMountedReactAdapter(
  proto: any,
  props: Record<string, unknown> = {},
  options: Record<string, unknown> = {}
) {
  const fake = createFakeReactRuntime();
  const adapter = createReactAdapter(fake.runtime);
  const Component = adapter(proto, {
    schedule: (task: () => void) => task(),
    ...(options as any),
  } as any);
  const mounted = fake.render(Component, props);
  if (mounted.ref?.current && typeof mounted.ref.current.update === 'function') {
    const rawUpdate = mounted.ref.current.update.bind(mounted.ref.current);
    mounted.ref.current.update = () => {
      rawUpdate();
      mounted.update();
    };
  }
  return { ...mounted, runtime: fake.runtime, Component };
}

export function createMountedReactAdapterInto(
  proto: any,
  hostEl: HTMLElement,
  props: Record<string, unknown> = {},
  options: Record<string, unknown> = {}
) {
  const fake = createFakeReactRuntime();
  const adapter = createReactAdapter(fake.runtime);
  const Component = adapter(proto, {
    schedule: (task: () => void) => task(),
    ...(options as any),
  } as any);
  const mounted = fake.render(Component, props, { current: null }, hostEl);
  if (mounted.ref?.current && typeof mounted.ref.current.update === 'function') {
    const rawUpdate = mounted.ref.current.update.bind(mounted.ref.current);
    mounted.ref.current.update = () => {
      rawUpdate();
      mounted.update();
    };
  }
  return { ...mounted, runtime: fake.runtime, Component };
}

function runInstance(inst: HookInstance) {
  let loops = 0;
  do {
    inst.dirty = false;
    inst.hookIndex = 0;
    inst.pendingLayoutEffects = [];
    inst.pendingEffects = [];

    CURRENT = inst;
    const render = (inst.component as any).__forwardRefRender ?? inst.component;
    const vnode = render(inst.props, inst.ref);
    CURRENT = null;

    inst.rootEl = renderVNode(vnode, inst.rootEl);
    syncHost(inst);

    for (const effect of inst.pendingLayoutEffects) effect();
    for (const effect of inst.pendingEffects) effect();

    loops++;
  } while (inst.dirty && loops < 20);
}

function syncHost(inst: HookInstance) {
  inst.hostEl.replaceChildren(...(inst.rootEl ? [inst.rootEl] : []));
}

function appendHost() {
  const host = document.createElement('div');
  document.body.appendChild(host);
  return host;
}

function registerEffect(kind: 'layout' | 'effect', cb: () => void | (() => void), deps?: any[]) {
  const inst = getCurrent();
  const index = inst.hookIndex++;
  const prev = inst.hooks[index] as EffectRecord | undefined;
  const changed = !prev || !depsEqual(prev.deps, deps);
  const nextRecord: EffectRecord = {
    deps,
    cleanup: prev?.cleanup,
  };
  inst.hooks[index] = nextRecord;
  if (!changed) return;

  const runner = () => {
    if (typeof nextRecord.cleanup === 'function') nextRecord.cleanup();
    nextRecord.cleanup = cb() ?? undefined;
  };

  if (kind === 'layout') inst.pendingLayoutEffects.push(runner);
  else inst.pendingEffects.push(runner);
}

function renderVNode(vnode: any, existing: HTMLElement | null): HTMLElement | null {
  if (vnode == null) return null;
  if (typeof vnode.type !== 'string') {
    throw new Error('fake-react runtime only supports string host elements in tests');
  }

  const el =
    existing && existing.tagName.toLowerCase() === vnode.type
      ? existing
      : document.createElement(vnode.type);

  applyProps(el, vnode.props ?? {});
  renderChildren(el, vnode.children ?? []);

  return el;
}

function applyProps(el: HTMLElement, props: Record<string, any>) {
  el.className = props.className ?? '';

  const prevOwned = OWNED_STYLE_KEYS.get(el) ?? new Set<string>();
  const nextOwned = new Set<string>();

  if (props.style && typeof props.style === 'object') {
    for (const key of prevOwned) {
      if (!(key in props.style)) {
        (el.style as any)[key] = '';
      }
    }
    for (const [key, value] of Object.entries(props.style)) {
      (el.style as any)[key] = value as any;
      nextOwned.add(key);
    }
  }
  OWNED_STYLE_KEYS.set(el, nextOwned);

  if (props.ref && typeof props.ref === 'object') props.ref.current = el;
}

function renderChildren(parent: HTMLElement, children: any[]) {
  parent.replaceChildren(...(children.flat().map(renderChild).filter(Boolean) as Node[]));
}

function renderChild(child: any): Node | null {
  if (child == null || child === false) return null;
  if (typeof child === 'string' || typeof child === 'number') {
    return document.createTextNode(String(child));
  }
  if (Array.isArray(child)) {
    const frag = document.createDocumentFragment();
    for (const part of child) {
      const node = renderChild(part);
      if (node) frag.appendChild(node);
    }
    return frag;
  }
  if (typeof child.type === 'string') {
    const el = document.createElement(child.type);
    applyProps(el, child.props ?? {});
    renderChildren(el, child.children ?? []);
    return el;
  }
  return null;
}

function depsEqual(a?: any[], b?: any[]) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) return false;
  }
  return true;
}

function getCurrent() {
  if (!CURRENT) throw new Error('fake-react hooks called outside render');
  return CURRENT;
}
