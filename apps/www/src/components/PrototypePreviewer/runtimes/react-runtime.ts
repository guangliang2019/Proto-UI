import type { RuntimeAPI } from './registry';
import { createReactAdapter } from '@proto-ui/adapters.react';
import type * as ReactTypes from 'react';
import type * as ReactDOMTypes from 'react-dom/client';

// 我们不直接 import React，而是用 esm.sh 的 ESM 版本懒加载
// 也可以替换成本地的 "react" / "react-dom/client"（若打包策略允许）
const REACT_SOURCE = 'https://esm.sh/react@18';
const REACT_DOM_SOURCE = 'https://esm.sh/react-dom@18/client';

// 异步加载 React 与 ReactDOM
async function loadReact(): Promise<{ React: typeof ReactTypes; ReactDOM: typeof ReactDOMTypes }> {
  const [React, ReactDOM] = await Promise.all([
    import(/* @vite-ignore */ REACT_SOURCE) as Promise<typeof ReactTypes>,
    import(/* @vite-ignore */ REACT_DOM_SOURCE) as Promise<typeof ReactDOMTypes>,
  ]);
  return { React, ReactDOM };
}

// 保存各宿主节点对应的 React root（避免重复创建）
// 不能使用 ReturnType<ReactDOMTypes['createRoot']>，因为 ReactDOMTypes 仅为类型命名空间
type ReactRoot = {
  unmount: () => void;
  render: (element: React.ReactElement) => void;
};

const reactRoots = new WeakMap<HTMLElement, ReactRoot>();

/**
 * React 运行时实现：
 * - 懒加载 React 依赖
 * - 使用 Proto UI 的 createReactAdapter() 适配 Prototype
 * - 维护宿主 root 的 mount / unmount 生命周期
 */
export const runtime: RuntimeAPI = {
  id: 'react',
  label: 'React',

  async mount(host, prototype, options) {
    // 防止重复渲染
    const existingRoot = reactRoots.get(host);
    if (existingRoot) {
      existingRoot.unmount();
      reactRoots.delete(host);
    }

    // 确保容器干净
    host.innerHTML = '';

    const [{ React, ReactDOM }] = await Promise.all([loadReact()]);
    const adapter = createReactAdapter({ React, ReactDOM });

    // 通过适配器获得 React 组件
    const Component = adapter(prototype);
    const root = ReactDOM.createRoot(host);

    // 保存 root 实例
    reactRoots.set(host, root);

    // 渲染（不使用 StrictMode，避免开发模式双重渲染）
    root.render(React.createElement(Component, options?.props ?? {}));
  },

  async unmount(host) {
    const root = reactRoots.get(host);
    if (root) {
      root.unmount();
      reactRoots.delete(host);
    }
    host.innerHTML = '';
  },
};
