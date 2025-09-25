import { Context, Prototype, PrototypeAPI, State, UpdateContext } from '@/core/interface';
import {
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  VNode,
  nextTick,
  provide,
  inject,
} from 'vue';
import { VueRenderer } from './renderer';
import VueEventManager from './managers/event';
import VuePropsManager from './managers/props';
import VueStateManager from './managers/state';
import { WebAttributeManagerImpl } from '../attribute';
import VueLifecycleManager from './managers/lifecycle';
import { VueRenderManager } from './managers/render';
import { createPrototypeElement, PrototypeElement } from '../prototype-element';
import { VueContextManager } from './managers/context';
import { binarySearch } from '@/core/utils/search';
import { debug } from 'console';

type PendingContextOperation<T = any> = {
  type: 'provide' | 'watch';
  context: Context<T>;
} & (
  | {
      type: 'provide';
      initialValue?: T;
      initialValueFn?: (update: (value: Partial<T>, notify?: boolean) => void) => T;
    }
  | {
      type: 'watch';
      callback?: (value: T, changedKeys: string[]) => void;
    }
);

// TODO: VNode的类型判断需要更改一下 

export const VueAdapter = <Props extends {}, Exposes extends {} = {}>(
  prototype: Prototype<Props, Exposes, VNode>
) => {
  const _setup = prototype.setup;

  const _eventManager = new VueEventManager();
  const _propsManager = new VuePropsManager<Props>();
  const _stateManager = new VueStateManager();
  const _lifecycleManager = new VueLifecycleManager();
  const _renderManager = new VueRenderManager();
  let _pendingContextOperations: PendingContextOperation[] = [];
  const _contextManager = new VueContextManager();
  const _exposes: Exposes = {} as Exposes;
  let _getElement: () => HTMLElement = () => {
    throw new Error('[VueAdapter] getElement is not implemented');
  };

  const _pendingPropsListeners: Array<{
    props: (keyof Props)[];
    callback: (props: Props) => void;
  }> = [];

  const _handlePendingPropsListeners = () => {
    _pendingPropsListeners.forEach(({ props, callback }) => {
      _propsManager.onPropsChange((newProps) => {
        callback(newProps);
      });
    });
  };

  const _p: PrototypeAPI<Props, Exposes> = {
    // TODO: 少了context，export部分

    props: {
      define: (props: Props) => {
        _propsManager.defineProps(props);
      },
      set: (props: Partial<Props>) => _propsManager.setProps(props),
      get:  (test: any) => {
        console.log(test, 'test123123');
        return _propsManager.getProps();
      },
      watch: (props: (keyof Props)[], callback: (props: Props) => void) => {
        _pendingPropsListeners.push({ props, callback });
      },
    },
    state: {
      define: <T>(
        initial: T,
        attribute?: string,
        options?: {
          serialize?: (value: T) => string;
          deserialize?: (value: string) => T;
        }
      ) => {
        return _stateManager.useState(initial, attribute, options);
      },
      watch: <T>(state: State<T>, callback: (oldValue: T, newValue: T) => void) => {
        const originalSet = state.set;
        state.set = (value: T) => {
          const oldValue = state.value;
          originalSet.call(state, value);
          callback(value, oldValue);
        };
      },
    },
    // TODO: 这里重构， 使用provide/inject 实现 , 如果使用了 provide的话 并不需要延迟加载，在未挂载的时候就去提供联系
    // 
    context: {
      provide: <T>(context: Context<T>, valueBuilder: (update: UpdateContext<T>) => T) => {
        _pendingContextOperations.push({
          type: 'provide',
          context,
          initialValueFn: valueBuilder,
        });
      },
      watch: <T>(context: Context<T>, listener?: (value: T, changedKeys: string[]) => void) => {
        if (listener) {
          _contextManager.addContextListener(context, listener);
        }
        _pendingContextOperations.push({
          type: 'watch',
          context,
        });
      },
      get: <T>(context: Context<T>) => {
        const consumeValue = _contextManager.getConsumedValue(context);
        if(consumeValue){
          return consumeValue;
        }
        const providedValue = _contextManager.getProvidedValue(context);
        if(providedValue !== undefined){
          return providedValue;
        }
        return inject(context.id);
      },
    },
    expose: {
      define: (key, value) => {
        _exposes[key] = value;
      },
      get: (key) => _exposes[key],
    },
    lifecycle: {
      onCreated: (callback: () => void) => {
        _lifecycleManager.add('created', callback);
      },
      onMounted: (callback: () => void) => {
        _lifecycleManager.add('mounted', callback);
      },
      onUpdated: (callback: () => void) => {
        _lifecycleManager.add('updated', callback);
      },
      onBeforeUnmount: (callback: () => void) => {
        _lifecycleManager.add('beforeUnmount', callback);
      },
      onBeforeDestroy: (callback: () => void) => {
        _lifecycleManager.add('beforeDestroy', callback);
      },
    },
    role: {
      asTrigger: () => {
        _eventManager.markAsTrigger();
      },
    },
    event: {
      on: (eventName, handler, options) => _eventManager.on(eventName, handler, options),
      off: (eventName, handler) => _eventManager.off(eventName, handler),
      emit: (eventName, detail) => _eventManager.emit(eventName, detail),
      once: (eventName, handler) => _eventManager.once(eventName, handler),
      focus: _eventManager.focus,
      setAttribute: (attr, value) => _eventManager.setAttribute(attr, value),
      removeAttribute: (attr) => _eventManager.removeAttribute(attr),
    },
    view: {
      getElement: () => {
        return _getElement();
      },
      update: async () => {
        return _update();
      },
      insertElement: (list, element, index) => {
        if (element === undefined) {
          return _getElement();
        }

        if (index !== undefined) {
          list.splice(index, 0, element);
          return index;
        }
            // 否则根据 DOM 顺序插入
            const currentIndex = binarySearch(list, element, (a, b) => {
              const position = a.compareDocumentPosition(b);
              if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return -1; // a 在 b 前
              } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return 1; // a 在 b 后
              }
              return 0; // a 和 b 相同
            });

            // 如果元素已在列表中，先移除
            if (list.includes(element)) {
              list.splice(list.indexOf(element), 1);
            }

            // 插入到正确位置
            list.splice(currentIndex === -1 ? list.length : currentIndex, 0, element);
            return currentIndex === -1 ? list.length - 1 : currentIndex;
      },

    },
  } as PrototypeAPI<Props, Exposes>;


  
  const _render = _setup(_p);
  const _update = () => {
    if (_render) {
      _renderManager.requestRender();
    }
  };
  // 构建一个 vue 的组件
  return defineComponent({
    // props: _propsManager.getVuePropsDefinition(),
    props: _propsManager.getVuePropsDefinition(),
    setup(props, { attrs,slots }) {
      console.log(attrs, 'attrs123123');
      // TODO: 这里的类型需要考虑一下
       _propsManager.getVuePropsActualValue(props as Props);
      console.log(_propsManager.getProps(), 'test11111');


      // _temp_rootElement 是用来存储这个组件的根元素的
      const _temp_rootElement = createPrototypeElement();
      const _rootRef = ref<HTMLElement | null>(null);
      const _instance = getCurrentInstance();
      if (!_instance) {
        throw new Error('[VueAdapter] getCurrentInstance is not implemented');
      }

      _getElement = () => {
        if (_rootRef.value) return _rootRef.value;
        return _temp_rootElement.element;
      };

      _renderManager.init(_instance);

      _lifecycleManager.trigger('created');

      // 处理所有待处理的 Context 操作, 也就是去构建vue中 provide/inject 的关系，且只能在这里去构建，由于父子生命周期结束的问题只能在此
      // TODO: 现在这个问题就是 初始化没有值的问题，之后在此触发的时候可以等到 onMounted 中再去触发
      // TODO: 首先为什么会重复触发两次， 其次他所触发的值是过滤掉第一个

      _pendingContextOperations.forEach((operation) => {
        if (operation.type === 'provide') {
          const value = operation.initialValueFn
            ? operation.initialValueFn((value, notify = true) => {
              // TODO: 这里的逻辑不清楚
                // const changedKeys = Object.keys(value) ?? [];
                // const currentValue = _contextManager.getProvidedValue(operation.context);
                // Object.assign(currentValue, value); 
                // _contextManager.setProvidedValue(operation.context, currentValue);
                // _contextManager.getConsumers(operation.context).forEach((consumer) => {
                //   console.log('consumer', consumer);
                //   consumer._contextManager?.setConsumedValue(
                //     operation.context,
                //     currentValue,
                //     changedKeys,
                //     notify
                //   );
                // });
              })
            : operation.initialValue;
            // todo: 可能是这里重复申明的问题，也就是所有的申明，获取，更新
            // debugger
            provide(operation.context.id, value);
            console.log(value, 'value123123');
            // _contextManager.setProvidedValue(operation.context, value);

        } else if (operation.type === 'watch') {
          const value = inject(operation.context.id);
          // _contextManager.consumeContext(operation.context);
          if(value !== undefined){
            _contextManager.setConsumedValue(operation.context, value, [], false);
          }
        }
      });
        _pendingContextOperations = [];
        
      onMounted(() => {
        // 处理各个 manager 的初始化
        _propsManager.initRef(_getElement());
        _propsManager.mount();
        _lifecycleManager.trigger('mounting');

        const domElement = getCurrentInstance()?.proxy?.$el;
        // _contextManager.init(_getElement());
        // 暴露 API
        Object.entries(_exposes).forEach(([key, value]) => {
          if (key in domElement) {
            console.warn(
              `[VueAdapter] Property "${key}" already exists on the "${prototype.name}", ` +
                'exposing it will override the original property.'
            );
          }
          Object.defineProperty(domElement, key, {
            value,
            configurable: true,
            enumerable: true,
          });
        });

              // 处理所有待处理的 Context 操作

      // TODO: 这里的方法需要更改 
        // 初始化各个 manager
        const _attributeManager = new WebAttributeManagerImpl(domElement, domElement);
        _eventManager.init(domElement);
        _stateManager.init(domElement, _attributeManager);
        _propsManager.setProps(props);
        _eventManager.mount();


        _handlePendingPropsListeners();
        // 强制更新一次，让没有把样式挂到 DOM 上

        _lifecycleManager.trigger('mounted');
        _update();

      });
      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');
        _eventManager.destroy();
      });

      const _vueRenderer = new VueRenderer(_render, slots);

      return () =>
        h(
          prototype.name,
          { ref: _rootRef, ..._temp_rootElement.toHProps(), ...props },
          // TODO:这里有点奇怪
          // _render?.(VueRenderer) ?? slots.default?.()
          _vueRenderer.createVNode()
        );
    },
  });
};

export default VueAdapter;
