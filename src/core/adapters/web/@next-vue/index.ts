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


export const VueAdapter = <Props extends {}, Exposes extends {} = {}, El = any>(
  prototype: Prototype<Props, Exposes, El>
) => {
  // 创建一个临时的 propsManager 用于获取 Vue props 定义
  const _tempPropsManager = new VuePropsManager<Props>();

  // 调用 prototype.setup 一次以获取 props 定义
  const _tempP = {
    props: {
      define: (props: Props) => _tempPropsManager.defineProps(props),
      set: () => { },
      get: () => ({} as Props),
      watch: () => { },
    },
    state: { define: () => ({} as any), watch: () => { } },
    context: { provide: () => { }, watch: () => { }, get: () => undefined as any },
    expose: { define: () => { }, get: () => undefined },
    lifecycle: {
      onCreated: () => { },
      onMounted: () => { },
      onUpdated: () => { },
      onBeforeUnmount: () => { },
      onBeforeDestroy: () => { },
    },
    role: { asTrigger: () => { } },
    event: {
      on: () => { },
      off: () => { },
      emit: () => { },
      once: () => { },
      click: () => { },
      clearAll: () => { },
      onGlobal: () => { },
      offGlobal: () => { },
      onceGlobal: () => { },
      clearGlobal: () => { },
      focus: { set: () => { }, setPriority: () => { }, getPriority: () => 0 },
      setAttribute: () => { },
      removeAttribute: () => { },
    },
    view: {
      getElement: () => document.createElement('div'),
      update: async () => { },
      forceUpdate: async () => { },
      insertElement: () => 0,
      compareElementPosition: () => 0,
    },
  } as PrototypeAPI<Props, Exposes>;

  // 调用一次获取 props 定义
  prototype.setup(_tempP);
  const vuePropsDefinition = _tempPropsManager.getVuePropsDefinition();

  // 构建 Vue 组件
  return defineComponent({
    props: vuePropsDefinition,
    setup(props, { slots }) {

      // ✅ 为每个实例创建独立的 managers
      const _eventManager = new VueEventManager();
      const _propsManager = new VuePropsManager<Props>();
      const _stateManager = new VueStateManager();
      const _lifecycleManager = new VueLifecycleManager();
      const _renderManager = new VueRenderManager();
      let _pendingContextOperations: PendingContextOperation[] = [];
      const _contextManager = new VueContextManager();
      const _exposes: Exposes = {} as Exposes;
      const _contextUnsubscribers: Array<() => void> = [];

      // ✅ 为每个实例创建独立的 getElement
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

      // ✅ 为每个实例构建独立的 PrototypeAPI
      const _p: PrototypeAPI<Props, Exposes> = {
        props: {
          define: (props: Props) => {
            _propsManager.defineProps(props);
          },
          set: (props: Partial<Props>) => _propsManager.setProps(props),
          get: () => {
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
        // TODO: 这里重构， 这里需要重新判断是使用provide/inject 还和webComponent一样 ，要注意的是该适配器的是手动更新的，使用这个 provide/inject 只是去连接而已
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
            if (consumeValue) {
              return consumeValue;
            }
            const providedValue = _contextManager.getProvidedValue(context);
            if (providedValue !== undefined) {
              return providedValue;
            }
            // 从 inject 获取容器，返回容器中的值
            const contextContainer = inject<any>(context.id);
            return contextContainer?.value;
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

      // ✅ 为每个实例调用 prototype.setup
      const _render = prototype.setup(_p);
      const _update = () => {
        if (_render) {
          _renderManager.requestRender();
        }
      };

      // ✅ 第一步：立即设置 props，确保后续代码能访问
      _propsManager.getVuePropsActualValue(props as Props);

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

      // 处理所有待处理的 Context 操作
      _pendingContextOperations.forEach((operation) => {
        if (operation.type === 'provide') {
          // 创建包含值和订阅者的容器
          const subscribers = new Set<(value: any, changedKeys: string[]) => void>();
          const contextContainer = {
            value: undefined as any,
            subscribe: (callback: (value: any, changedKeys: string[]) => void) => {
              subscribers.add(callback);
              return () => subscribers.delete(callback);
            },
          };

          // 定义更新函数
          const updateFn = (partialValue: Partial<any>, notify = true) => {
            const oldValue = contextContainer.value;
            contextContainer.value = { ...oldValue, ...partialValue };
            _contextManager.setProvidedValue(operation.context, contextContainer.value);

            // 找出变化的键
            const changedKeys = Object.keys(partialValue);

            // 通知所有订阅者
            if (notify) {
              subscribers.forEach(callback => callback(contextContainer.value, changedKeys));
            }
          };

          // 初始化值
          contextContainer.value = operation.initialValueFn
            ? operation.initialValueFn(updateFn)
            : operation.initialValue;

          _contextManager.provideContext(operation.context, contextContainer.value);

          // 通过 provide 传递容器（不是值！）
          provide(operation.context.id, contextContainer);
        } else if (operation.type === 'watch') {
          const contextContainer = inject<any>(operation.context.id);
          if (contextContainer) {
            // 设置初始值
            _contextManager.setConsumedValue(operation.context, contextContainer.value, [], false);

            // 订阅更新
            const unsubscribe = contextContainer.subscribe((newValue: any, changedKeys: string[]) => {
              _contextManager.setConsumedValue(operation.context, newValue, changedKeys, true);
            });
            _contextUnsubscribers.push(unsubscribe);
          }
        }
      });
      _pendingContextOperations = [];

      onMounted(() => {
        _lifecycleManager.trigger('mounting');
        const realElement = _getElement();

        // 暴露 API - 使用 realElement
        Object.entries(_exposes).forEach(([key, value]) => {
          if (key in realElement) {
            console.warn(
              `[VueAdapter] Property "${key}" already exists on the "${prototype.name}", ` +
              'exposing it will override the original property.'
            );
          }
          Object.defineProperty(realElement, key, {
            value,
            configurable: true,
            enumerable: true,
          });
        });

        // 初始化各个 manager
        const _attributeManager = new WebAttributeManagerImpl(realElement, realElement);
        _eventManager.init(realElement);
        _stateManager.init(realElement, _attributeManager);
        _propsManager.setProps(props);
        _eventManager.mount();

        _handlePendingPropsListeners();

        _lifecycleManager.trigger('mounted');
      });

      onBeforeUnmount(() => {
        _lifecycleManager.trigger('beforeUnmount');

        // 取消所有 Context 订阅
        _contextUnsubscribers.forEach(unsubscribe => unsubscribe());
        _contextManager.destroy();

        _eventManager.destroy();
      });

      const _vueRenderer = new VueRenderer(_render as any, slots);

      return () =>
        h(
          prototype.name,
          { ref: _rootRef, ..._temp_rootElement.toHProps(), ...props },
          _vueRenderer.createVNode()
        );
    },
  });
};

export default VueAdapter;

