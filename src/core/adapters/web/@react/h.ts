// h.ts
import { defaultRender, Renderer } from '@/core/interface';
import type * as ReactTypes from 'react';

type ResolveType = (type: any) => ReactTypes.ElementType | undefined;
type IsPrototype = (v: any) => boolean;

// —— 最小 DOM 属性映射（保留你已有的）——
const DOM_PROP_MAP: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  contenteditable: 'contentEditable',
};

function mergeClass(a?: unknown, b?: unknown): string | undefined {
  const sa = typeof a === 'string' ? a : '';
  const sb = typeof b === 'string' ? b : '';
  const joined = [sa, sb].filter(Boolean).join(' ').trim();
  return joined || undefined;
}

function mapPropsForReact(props: any): any {
  if (!props) return null;
  const { class: klass, className, ...rest } = props;
  const mapped: Record<string, any> = {};
  for (const k in rest) {
    if (!Object.prototype.hasOwnProperty.call(rest, k)) continue;
    const v = rest[k];
    mapped[DOM_PROP_MAP[k] || k] = v;
  }
  const merged = mergeClass(klass, className);
  if (merged) mapped.className = merged;
  return mapped;
}

function createReactH(
  React: typeof ReactTypes,
  children: ReactTypes.ReactNode,
  opts: {
    resolveType: ResolveType;   // ★ 关键：由 adapter 注入
    isPrototype?: IsPrototype;  // 可选：显式判断是否 Prototype（也可内联到 resolve）
  }
) {
  let slotUsed = false;

  function isEmptyChildren(n: ReactTypes.ReactNode) {
    let empty = true;
    React.Children.forEach(n, (c) => {
      if (c !== null && c !== undefined && typeof c !== 'boolean') empty = false;
    });
    return empty;
  }

  const h: Renderer<ReactTypes.ReactNode> = (type, rawProps, ...kids) => {
    // 1) 单匿名 <slot> + fallback
    if (type === 'slot') {
      if (process.env.NODE_ENV !== 'production') {
        if (rawProps && Object.keys(rawProps).length) {
          throw new Error('[ProtoUI] <slot> 仅支持匿名占位，不接受任何 props（不支持具名/传值）。');
        }
      }
      if (slotUsed) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[ProtoUI] 模板中出现多个 <slot>；协议仅允许一个，后续将被忽略。');
        }
        return null;
      }
      slotUsed = true;

      if (!isEmptyChildren(children)) return children;
      return kids.length ? React.createElement(React.Fragment, null, ...kids) : null;
    }

    // 2) Prototype 作为 type：交给 resolveType 变成宿主组件
    if (type != null) {
      const resolved = opts.resolveType(type);
      if (resolved) {
        const mapped = mapPropsForReact(rawProps);
        return React.createElement(resolved, mapped, ...kids);
      }
    }

    // 3) 常规：交回 React（允许 string/function/object/symbol 等）
    if (type == null) return null;
    const mapped = mapPropsForReact(rawProps);
    return React.createElement(type as any, mapped, ...kids);
  };

  return h;
}

export { createReactH, defaultRender };
