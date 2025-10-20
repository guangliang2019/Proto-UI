import type { Prototype, PrototypeAPI } from '@/core/interface';
import { JSX, type Ref, type ParentComponent } from 'solid-js';
import { createComponent, template } from 'solid-js/web';
import { type SolidRuntime } from './interface';

type PropsWithRef<P extends object, E = unknown> = P & {
  ref: Ref<E>;
};

const createSolidAdapter = (runtime: SolidRuntime) => {
  const cache = new WeakMap<Prototype<any, any>, JSX.Element>();

  const adapt = <Props extends object, Exposes extends object>(
    proto: Prototype<Props, Exposes>
  ) => {
    // TODO: 需要仔细研究solid-js渲染方式
    const rootElement: ParentComponent<PropsWithRef<Props, Exposes>> = (props) => {
      const rootComponent = createComponent(() => {
        if (proto.name) {
          return template(`<${proto.name}>`)();
        }
        return [];
      }, props);

      return rootElement;
    };
  };

  return adapt;
};

export { createSolidAdapter };
