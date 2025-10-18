// state.ts
import type * as ReactNS from 'react';
import type { State } from '@/core/interface';

type SerDe<T> = {
  serialize?: (v: T) => string;
  deserialize?: (s: string) => T;
};

type Resource = { refresh(): void; cleanup(): void };

const isDataAttr = (name?: string) => !!name && /^data-[a-z0-9-]+$/i.test(name);
const isCssVar = (name?: string) => !!name && /^--[a-z0-9-]+$/i.test(name);

function defaultSerialize<T>(v: T): string {
  if (v === null || v === undefined) return '';
  // 统一转字符串，布尔/数字/字符串都可直接 toString
  return String(v as any);
}

export function createStateAPI(React: typeof ReactNS, getRoot: () => EventTarget | null) {
  const resources = new Set<Resource>();

  function applyToDOM<T>(attributeName: string | undefined, value: T, opts?: SerDe<T>) {
    if (!attributeName) return;
    const el = getRoot() as HTMLElement | null;
    if (!el) return; // root 未就绪，等待 refresh

    const s = (opts?.serialize ?? defaultSerialize)(value);

    if (isDataAttr(attributeName)) {
      // data-*：空串/undefined/null → 移除；否则设置
      if (s === '') el.removeAttribute(attributeName);
      else el.setAttribute(attributeName, s);
    } else if (isCssVar(attributeName)) {
      // CSS var：空串/undefined/null → removeProperty；否则 setProperty
      if (s === '') el.style.removeProperty(attributeName);
      else el.style.setProperty(attributeName, s);
    }
  }

  function createCoreStore<T>(
    initial: T,
    attributeName?: string,
    opts?: SerDe<T>
  ): State<T> & {
    _subscribe(fn: (o: T, n: T) => void): () => void;
    _refresh(): void;
    _cleanup(): void;
  } {
    let value = initial;
    const subs = new Set<(o: T, n: T) => void>();

    // 初次/刷新时把当前值写入 DOM
    const refresh = () => applyToDOM(attributeName, value, opts);

    // set：先写 DOM，再通知订阅者（避免订阅者里读取 DOM 时出现旧值）
    const set = (next: T) => {
      if (Object.is(next, value)) return;
      const prev = value;
      value = next;
      applyToDOM(attributeName, value, opts);
      subs.forEach((fn) => fn(prev, value));
    };

    // 资源登记，随组件清理
    const res: Resource = {
      refresh,
      cleanup() {
        subs.clear();
        // 清理 DOM 痕迹（保守策略：移除 css var；data-* 若为空则等价无）
        if (attributeName && isCssVar(attributeName)) {
          const el = getRoot() as HTMLElement | null;
          if (el) el.style.removeProperty(attributeName);
        }
        if (attributeName && isDataAttr(attributeName)) {
          const el = getRoot() as HTMLElement | null;
          if (el) el.removeAttribute(attributeName);
        }
      },
    };
    resources.add(res);

    // 尽量首帧写入（root 未就绪时会在 refresh 时补）
    refresh();

    const store: State<T> & {
      _subscribe(fn: (o: T, n: T) => void): () => void;
      _refresh(): void;
      _cleanup(): void;
    } = {
      get value() {
        return value;
      },
      set,
      _subscribe(fn) {
        subs.add(fn);
        return () => subs.delete(fn);
      },
      _refresh: refresh,
      _cleanup: res.cleanup,
    };

    return store;
  }

  function define<T>(initial: T, attributeName?: string, options?: SerDe<T>): State<T> {
    return createCoreStore<T>(initial, attributeName, options);
  }

  function watch<T>(state: State<T>, cb: (oldValue: T, newValue: T) => void): void {
    // 仅在本组件生命周期内有效
    const st = state as any as { _subscribe: (fn: (o: T, n: T) => void) => () => void };
    const unsub = st._subscribe(cb);
    const res: Resource = {
      refresh() {},
      cleanup() {
        unsub();
      },
    };
    resources.add(res);
  }

  function refresh() {
    // root 首次可用或变化：重放所有 DOM Bridge
    resources.forEach((r) => r.refresh());
  }

  function cleanup() {
    resources.forEach((r) => r.cleanup());
    resources.clear();
  }

  // 可选：按需把状态桥接进 React 渲染（默认不使用就不触发重渲染）
  function useProtoState<T>(state: State<T>): T {
    return React.useSyncExternalStore(
      (notify) => (state as any)._subscribe((_o: T, _n: T) => notify()),
      () => state.value,
      () => state.value
    );
  }

  return {
    define,
    watch,
    refresh,
    cleanup,
    useProtoState, // 需要时可从 adapter 暴露
  };
}

export type StateAPI = ReturnType<typeof createStateAPI>;
