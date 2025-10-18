// props.ts
import type * as ReactNS from 'react';

type Watcher<Props> = { keys: (keyof Props)[]; cb: (props: Props) => void };

function shallowPickEqual<Props extends object>(
  a: Props,
  b: Props,
  keys: (keyof Props)[]
) {
  for (const k of keys) if (!Object.is(a[k], b[k])) return false;
  return true;
}

export function createPropsAPI<Props extends object>(
  React: typeof ReactNS,
  getReactProps: () => Props
) {
  // 「定义期」累积的默认值（合并、后者覆盖）
  let defaults: Partial<Props> = {};
  // 是否仍处于定义期（setup 内部）；finalize() 后变为只读
  let openForDefine = true;

  // 订阅者集合（按键过滤通知）
  const watchers = new Set<Watcher<Props>>();

  // 上一次快照（用于运行期变更比对）
  let prevEffective: Props | null = null;

  function effective(): Props {
    // 运行期“有效 props” = 定义期 defaults 作为基底 + 运行时 React props 覆盖
    const run = getReactProps();
    // 注意：不把 defaults 泄漏到宿主 DOM，effective 仅供 p 内部使用
    return Object.assign({}, defaults, run);
  }

  function define(partial: Props): void {
    if (!openForDefine) {
      // 运行期拒绝修改：静默忽略或在开发模式警告
      // console.warn('[props.define] called after setup; ignored.');
      return;
    }
    // 后者覆盖、对象浅合并（与 asHook 多次 define 的语义一致）
    defaults = Object.assign({}, defaults, partial);
  }

  function get(): Props {
    return effective();
  }

  function watch(keys: (keyof Props)[], cb: (props: Props) => void): void {
    const w: Watcher<Props> = { keys, cb };
    watchers.add(w);
  }

  // 每次渲染后由适配器调用，用于侦测运行期值变化并通知订阅者
  function onRenderTick() {
    const next = effective();
    const prev = prevEffective;
    if (prev === null) {
      prevEffective = next;
      // 首帧：不触发 watch，避免重复初始化逻辑
      return;
    }
    if (next === prev) return; // 理论上不会引用等同，但以防万一

    // 逐个 watcher 判断它关心的键是否发生变化
    for (const w of watchers) {
      if (!shallowPickEqual(prev, next, w.keys)) {
        w.cb(next);
      }
    }
    prevEffective = next;
  }

  // 在 setup 结束后由适配器调用，锁定定义期
  function finalizeDefinition() {
    openForDefine = false;
    // finalize 时也拍一次首帧快照，确保后续 onRenderTick 有参照
    if (prevEffective === null) prevEffective = effective();
  }

  function cleanup() {
    watchers.clear();
    prevEffective = null;
    // 不重置 defaults：组件生命周期已结束，无需保留
  }

  return {
    define,
    get,
    watch,
    // 由适配器驱动的生命周期钩子：
    _onRenderTick: onRenderTick,
    _finalizeDefinition: finalizeDefinition,
    _cleanup: cleanup,
  };
}

export type PropsAPI<Props extends object> = ReturnType<typeof createPropsAPI<Props>>;
