// createReactAdapter.ts
import type { Prototype, PrototypeAPI } from '@/core/interface';
import type * as ReactNS from 'react';
import { ReactRuntime } from './interface';
import { createReactH, defaultRender } from './h';
import { createEventAPI } from './event';
import { createStateAPI } from './state';
import { createPropsAPI } from './props';

// 简单的守卫函数
function isPrototypeLike(v: any): v is Prototype<any, any> {
  return v && typeof v === 'object' && typeof v.setup === 'function' && typeof v.name === 'string';
}

export function createReactAdapter(runtime: ReactRuntime) {
  const { React } = runtime;
  const cache = new WeakMap<Prototype<any, any>, ReactNS.ElementType>();

  const adapt = <Props extends {}, Exposes extends {}>(proto: Prototype<Props, Exposes>) => {
    const RootElement = React.forwardRef<Exposes, { children?: ReactNS.ReactNode } & Props>(
      (props, ref) => {
        const rootElRef = React.useRef<HTMLElement | null>(null);

        const renderRef = React.useRef<null | ((h: any) => any)>(null);
        const pRef = React.useRef<PrototypeAPI<Props, Exposes> | null>(null);

        // --- props API（供 setup 期定义 & 运行期只读 + 订阅）
        const propsAPI = React.useMemo(
          () => createPropsAPI<Readonly<Props>>(React, () => props as Props),
          // props 对象在每次渲染都会变化引用，但 API 本身不应重建
          // 因此依赖仅限 React（稳定），真实值由 getReactProps() 捕获
          [React]
        );
        const eventAPI = React.useMemo(
          () => createEventAPI(React, () => rootElRef.current),
          [React]
        );
        const stateAPI = React.useMemo(
          () => createStateAPI(React, () => rootElRef.current),
          [React]
        );

        if (renderRef.current === null) {
          const p: PrototypeAPI<Props, Exposes> = {
            props: {
              define: propsAPI.define,
              get: propsAPI.get,
              watch: propsAPI.watch,
            },
            expose: (ex: any) => {
              if (typeof ref === 'function') ref(ex);
              else if (ref) (ref as React.RefObject<Exposes | null>).current = ex;
            },
            event: {
              on: eventAPI.on,
              off: eventAPI.off,
              onGlobal: eventAPI.onGlobal,
              offGlobal: eventAPI.offGlobal,
            },
            state: {
              define: stateAPI.define,
              watch: stateAPI.watch,
            },
            view: {
              update: () => Promise.resolve(),
            }
            // TODO: context...
          } as any;
          pRef.current = p;

          const fromSetup = proto.setup?.(p);
          renderRef.current = typeof fromSetup === 'function' ? fromSetup : defaultRender;
        } else {
          if (pRef.current) (pRef.current as any).props = props;
        }

        // root 出现/变化：事件与状态的 DOM Bridge 同步
        React.useLayoutEffect(() => {
          eventAPI.refresh();
          stateAPI.refresh();
        });

        React.useEffect(() => {
          return () => {
            // 卸载统一清理
            stateAPI.cleanup();
            eventAPI.cleanup();
            if (typeof ref === 'function') ref(null as any);
            else if (ref) (ref as React.MutableRefObject<Exposes | null>).current = null;
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const h = React.useMemo(
          () =>
            createReactH(React, props.children, {
              resolveType: (t: any) => {
                if (!isPrototypeLike(t)) return undefined;
                let C = cache.get(t);
                if (!C) {
                  C = adapt(t) as unknown as ReactNS.ElementType;
                  cache.set(t, C);
                }
                return C;
              },
            }),
          [React, props.children]
        );

        const inner = renderRef.current!(h) ?? null;

        const Target = (proto.name || React.Fragment) as ReactNS.ElementType;
        const { children: _ignored, ...rest } = props as Record<string, unknown>;
        const withRefProps =
          Target === React.Fragment
            ? rest
            : { ...rest, ref: rootElRef as unknown as React.LegacyRef<any> };

        return React.createElement(Target, withRefProps, inner);
      }
    );

    RootElement.displayName = proto.name ? `Proto(${proto.name})` : 'Proto(Component)';
    return RootElement;
  };

  return adapt;
}
