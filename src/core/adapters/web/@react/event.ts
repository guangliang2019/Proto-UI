// event.ts
import type * as ReactNS from 'react';

type AnyListener = EventListenerOrEventListenerObject;
type Opts = boolean | AddEventListenerOptions | undefined;

type LocalReg = {
  kind: 'local';
  type: string;
  listener: AnyListener;
  options: Opts;
  bound: boolean;
  target: EventTarget | null;
};
type GlobalReg = {
  kind: 'global';
  type: string;
  listener: AnyListener;
  options: Opts;
  target: EventTarget;
  bound: boolean;
};

type Reg = LocalReg | GlobalReg;

function isSameListener(a: AnyListener, b: AnyListener) {
  // 函数引用或对象引用相等即可
  return a === b;
}

function resolveGlobalTarget(t: 'window' | 'document' | EventTarget): EventTarget {
  if (t === 'window') return window;
  if (t === 'document') return document;
  return t;
}

/**
 * React 宿主下的事件系统：
 * - on/off：绑定在组件根节点（root）上，root 可能在首帧后才拿到 → 支持延迟绑定与 root 变化重绑。
 * - onGlobal/offGlobal：绑定在 window/document/任意 EventTarget 上，立即生效。
 * - cleanup：组件卸载时统一清理。
 * - refresh：在 root 变化或初次拿到 root 时重绑本地事件。
 */
export function createEventAPI(
  React: typeof ReactNS,
  getRoot: () => EventTarget | null
) {
  const locals = new Set<LocalReg>();
  const globals = new Set<GlobalReg>();

  function bindLocal(r: LocalReg) {
    const el = getRoot();
    if (!el) return; // root 未就绪，等 refresh 再绑
    // 如果之前绑在了旧 root，先解绑
    if (r.bound && r.target && r.target !== el) {
      r.target.removeEventListener(r.type, r.listener as any, r.options as any);
      r.bound = false;
      r.target = null;
    }
    if (!r.bound) {
      el.addEventListener(r.type, r.listener as any, r.options as any);
      r.bound = true;
      r.target = el;
    }
  }

  function unbind(r: Reg) {
    const tgt = r.kind === 'local' ? r.target : r.target;
    if (r.bound && tgt) {
      tgt.removeEventListener(r.type, r.listener as any, (r as any).options as any);
      r.bound = false;
      if (r.kind === 'local') (r as LocalReg).target = null;
    }
  }

  function offMatch(
    set: Set<Reg>,
    kind: Reg['kind'],
    type: string,
    listener?: AnyListener,
    options?: Opts,
    target?: EventTarget
  ) {
    for (const r of Array.from(set)) {
      if (r.kind !== kind) continue;
      if (r.type !== type) continue;
      if (listener && !isSameListener(r.listener, listener)) continue;

      // options 与 target（针对 global）不强制精确比对，便于宽松关闭
      if (kind === 'global' && target && r.target !== target) continue;

      unbind(r);
      set.delete(r);
    }
  }

  const api = {
    on(type: string, listener: AnyListener, options?: Opts) {
      const r: LocalReg = {
        kind: 'local',
        type,
        listener,
        options,
        bound: false,
        target: null,
      };
      locals.add(r);
      // 立刻尝试绑定（若 root 已存在）
      bindLocal(r);
      // 返回注销函数（语法糖）
      return () => api.off(type, listener, options);
    },

    off(type: string, listener?: AnyListener, options?: Opts) {
      offMatch(locals as unknown as Set<Reg>, 'local', type, listener, options);
    },

    onGlobal(
      target: 'window' | 'document' | EventTarget,
      type: string,
      listener: AnyListener,
      options?: Opts
    ) {
      const tgt = resolveGlobalTarget(target);
      const r: GlobalReg = {
        kind: 'global',
        type,
        listener,
        options,
        target: tgt,
        bound: false,
      };
      globals.add(r);
      // 全局目标始终可直接绑定
      tgt.addEventListener(type, listener as any, options as any);
      r.bound = true;
      return () => api.offGlobal(target, type, listener, options);
    },

    offGlobal(
      targetOrType: 'window' | 'document' | EventTarget | string,
      maybeType?: string,
      listener?: AnyListener,
      options?: Opts
    ) {
      // 支持两种调用：
      // 1) offGlobal(target, type, listener?, options?)
      // 2) offGlobal(type, listener?, options?)  // 宽松：关闭所有 target 上该事件
      if (typeof targetOrType === 'string' && maybeType === undefined) {
        // 形式 2
        const type = targetOrType;
        offMatch(globals as unknown as Set<Reg>, 'global', type, listener, options);
      } else {
        // 形式 1
        const target = resolveGlobalTarget(targetOrType as any);
        const type = maybeType as string;
        offMatch(globals as unknown as Set<Reg>, 'global', type, listener, options, target);
      }
    },

    /** 当 root 首次可用或变化时调用，重绑 local 事件 */
    refresh() {
      for (const r of locals) bindLocal(r);
    },

    /** 卸载时统一清理全部事件 */
    cleanup() {
      for (const r of locals) unbind(r);
      locals.clear();
      for (const r of globals) unbind(r);
      globals.clear();
    },
  };

  return api;
}

export type EventAPI = ReturnType<typeof createEventAPI>;
