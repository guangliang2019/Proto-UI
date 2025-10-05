// @/core/adapters/web/@react/index.ts
// 仅类型导入：不会进运行时 bundle
import type { Prototype } from '@/core/interface';
import type * as ReactNS from 'react';
import type * as ReactDOMClient from 'react-dom/client';

export type ReactRuntime = {
  React: typeof ReactNS;
  ReactDOM: typeof ReactDOMClient;
  version?: string;
};

// 工具：取出 Props，自动加 children 以便在 JSX 中更自然
type PropsOf<T> = T extends { props: infer P } ? P : T extends Prototype<infer P, any> ? P : never;

type WithChildren<P> = P & { children?: ReactNS.ReactNode };

// 有暴露（Exposes 走 ref）
type ExposesOf<T> = T extends { exposes: infer X }
  ? X
  : T extends Prototype<any, infer X>
    ? X
    : void;

type IsVoid<T> = [T] extends [void] ? true : false;

type AdapterComponentAutoOf<TProto> =
  IsVoid<ExposesOf<TProto>> extends true
    ? ReactNS.JSXElementConstructor<WithChildren<PropsOf<TProto>>>
    : ReactNS.ForwardRefExoticComponent<
        WithChildren<PropsOf<TProto>> & ReactNS.RefAttributes<ExposesOf<TProto>>
      >;

export type ReactAdapter = <Proto extends Prototype>(
  Prototype: Proto
) => AdapterComponentAutoOf<Proto>;

export function createReactAdapter(runtime: {
  React: typeof ReactNS;
  ReactDOM: typeof import('react-dom/client');
}): ReactAdapter {
  const { React } = runtime;

  // 用一个“更宽”的元素类型，避免 createElement 推断成 DOMElement：
  type ReactAnyType = ReactNS.ElementType<any>; // 函数组件 | 类组件 | 原生标签 string | exotic component

  const adapter = (<Proto extends Prototype<any, any>>(prototype: Proto) => {
    type P = WithChildren<PropsOf<Proto>>;
    type X = ExposesOf<Proto>; // 可能是 void，也可能是暴露 API

    // 始终返回 forwardRef 组件（X=void 时 ref 是可选且不会被用到）
    const Comp = React.forwardRef<X, P>((props, _ref) => {
      // 把“要渲染的目标”视为 React 的广义元素类型，避免 DOMElement 泛型污染
      const target = prototype.name as ReactAnyType;
      // 收敛返回类型为 ReactElement（而非 DOMElement）
      return React.createElement(target, props) as ReactNS.ReactElement;
    });

    // 这个断言是安全的：
    // - X === void 时：ForwardRefExoticComponent<P & RefAttributes<void>> 具备 call signature，可当 JSXElementConstructor<P> 使用
    // - X !== void 时：恰好就是 ForwardRefExoticComponent
    return Comp as unknown as AdapterComponentAutoOf<Proto>;
  }) satisfies ReactAdapter;

  return adapter;
}
