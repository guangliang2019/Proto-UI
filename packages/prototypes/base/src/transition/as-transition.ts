// packages/prototypes/base/src/transition/as-transition.ts
import { defineAsHook } from '@proto.ui/core';
import type { ContextKey } from '@proto.ui/types';
import type { RunHandle } from '@proto.ui/core';
import type {
  TransitionState,
  TransitionProps,
  TransitionExposes,
  TransitionHandles,
  TransitionOptions,
  TransitionContextValue,
} from './types';

export const TRANSITION_CONTEXT: ContextKey<TransitionContextValue> = {
  __brand: 'ContextKey',
  debugName: 'base-transition',
} as ContextKey<TransitionContextValue>;

interface TransitionParentRegistry {
  children: Array<{ getState: () => TransitionState }>;
  tryCompleteLeave: () => void;
}

// 模块级 WeakMap：用 parentRef 对象作为 key，避免在 Context 中传递函数
const transitionParentRegistries = new WeakMap<object, TransitionParentRegistry>();

/**
 * Transition 状态机治理
 *
 * 管理感知生命周期：closed → entering → entered → leaving → closed
 * 视觉动画委托给宿主平台通过暴露的状态驱动。
 *
 * 状态机节点（源码级固定，可通过修改源码扩展）：
 * - closed: 不可见，不在 DOM 中
 * - entering: 进入动画中，DOM 存在
 * - entered: 完全可见，稳定状态
 * - leaving: 离开动画中，DOM 仍存在
 *
 * 扩展方式：修改 transitionTo 中的 validTransitions 和状态定义
 */
export const asTransition = defineAsHook<
  TransitionProps,
  TransitionExposes,
  TransitionHandles,
  TransitionOptions | undefined
>({
  name: 'asTransition',
  mode: 'configurable',
  setup(def, options, api) {
    const stateKey = options?.stateKey ?? 'transitionState';
    const isPresentKey = options?.isPresentKey ?? 'isPresent';

    // 声明 Props
    def.props.define({
      open: { type: 'boolean', empty: 'fallback' },
      defaultOpen: { type: 'boolean', empty: 'fallback' },
      appear: { type: 'boolean', empty: 'fallback' },
      enterDuration: { type: 'number', empty: 'fallback' },
      leaveDuration: { type: 'number', empty: 'fallback' },
      interrupt: {
        type: 'string',
        empty: 'fallback',
        enum: ['reverse', 'wait', 'immediate'],
      } as any,
      dependsOnParentTransition: { type: 'boolean', empty: 'fallback' },
      onBeforeEnter: { type: 'any', empty: 'accept' },
      onAfterEnter: { type: 'any', empty: 'accept' },
      onBeforeLeave: { type: 'any', empty: 'accept' },
      onAfterLeave: { type: 'any', empty: 'accept' },
    } as any);

    def.props.setDefaults({
      defaultOpen: false,
      appear: false,
      enterDuration: 300,
      leaveDuration: 200,
      interrupt: 'reverse',
      dependsOnParentTransition: false,
    } as any);

    // 状态定义（固定 4 节点状态机）
    const transitionState = def.state.enum<['closed', 'entering', 'entered', 'leaving']>(
      stateKey,
      'closed',
      { options: ['closed', 'entering', 'entered', 'leaving'] }
    );
    const isPresent = def.state.bool(isPresentKey, false);

    // 将引用存入 store，支持 configurable 模式多次调用共享
    api.store.transitionState = transitionState;
    api.store.isPresent = isPresent;
    api.store.pendingQueue = [] as Array<'enter' | 'leave'>;

    // 闭包变量：生命周期回调（在 onCreated / watch 中刷新）
    let onBeforeEnter: (() => void) | undefined;
    let onAfterEnter: (() => void) | undefined;
    let onBeforeLeave: (() => void) | undefined;
    let onAfterLeave: (() => void) | undefined;

    // 闭包变量：当前配置（在 onCreated / watch 中刷新）
    let config: {
      interrupt: 'reverse' | 'wait' | 'immediate';
      enterDuration: number;
      leaveDuration: number;
    } = {
      interrupt: 'reverse',
      enterDuration: 300,
      leaveDuration: 200,
    };

    const refreshCallbacks = (run: RunHandle<TransitionProps>) => {
      const props = run.props.get();
      onBeforeEnter = props.onBeforeEnter;
      onAfterEnter = props.onAfterEnter;
      onBeforeLeave = props.onBeforeLeave;
      onAfterLeave = props.onAfterLeave;
    };

    const refreshConfig = (run: RunHandle<TransitionProps>) => {
      const props = run.props.get();
      config.interrupt = (props.interrupt as typeof config.interrupt) ?? 'reverse';
      config.enterDuration = props.enterDuration ?? 300;
      config.leaveDuration = props.leaveDuration ?? 200;
    };

    // parent-child 协调：已注册的子节点
    const registeredChildren: Array<{ getState: () => TransitionState }> = [];
    let parentCtxRef: object | undefined;
    let unregisterChild: (() => void) | undefined;

    const tryCompleteLeave = () => {
      if (transitionState.get() !== 'leaving') return;
      if (registeredChildren.some((c) => c.getState() !== 'closed')) return;
      transitionTo('closed');
      processPendingQueue();
    };

    // 创建 parentRef 并在模块级 WeakMap 注册，避免 Context 传递函数
    const parentRef = api.store.parentRef ?? { __kind: 'transition-parent' as const };
    api.store.parentRef = parentRef;
    transitionParentRegistries.set(parentRef, {
      children: registeredChildren,
      tryCompleteLeave,
    });

    const updateContext = def.context.provide(TRANSITION_CONTEXT, {
      transitionState: 'closed',
      enterDuration: config.enterDuration,
      leaveDuration: config.leaveDuration,
      parentRef,
    });

    // 订阅 context 变化，满足 tryRead/tryUpdate 的订阅要求；
    // 仅当 child 通过 tryUpdate 触发且 transitionState 未改变时（next.transitionState === prev.transitionState），
    // 才安全重试 tryCompleteLeave，避免 parent 自身状态同步时提前关闭
    def.context.trySubscribe(TRANSITION_CONTEXT, (ctx, next, prev) => {
      if (
        next &&
        prev &&
        (next as TransitionContextValue).transitionState ===
          (prev as TransitionContextValue).transitionState
      ) {
        tryCompleteLeave();
      }
    });

    const syncContext = () => {
      updateContext({
        transitionState: transitionState.get(),
        enterDuration: config.enterDuration,
        leaveDuration: config.leaveDuration,
        parentRef,
      });
    };

    const callIfFn = (fn: (() => void) | undefined) => {
      if (typeof fn === 'function') fn();
    };

    const processPendingQueue = () => {
      const next = api.store.pendingQueue.shift();
      if (next === 'enter') {
        handleEnter();
      } else if (next === 'leave') {
        handleLeave();
      }
    };

    // 核心状态机迁移函数
    // 注意：如需扩展中间状态（如 enter-preparing），修改此处 validTransitions
    const transitionTo = (target: TransitionState) => {
      const current = transitionState.get();
      if (current === target) return;

      // 有效转换路径（源码级可扩展：修改此处以支持新的中间状态）
      const validTransitions: Record<TransitionState, TransitionState[]> = {
        closed: ['entering'],
        entering: ['entered', 'leaving', 'closed'],
        entered: ['leaving'],
        leaving: ['closed', 'entering'],
      };

      if (!validTransitions[current].includes(target)) {
        console.warn(`[asTransition] Invalid transition: ${current} → ${target}`);
        return;
      }

      // 生命周期回调
      if (target === 'entering') callIfFn(onBeforeEnter);
      if (target === 'leaving') callIfFn(onBeforeLeave);

      transitionState.set(target, `reason: asTransition.transitionTo => ${target}`);
      isPresent.set(target !== 'closed', `reason: asTransition.transitionTo => ${target}`);
      syncContext();

      if (target === 'entered') callIfFn(onAfterEnter);
      if (target === 'closed') callIfFn(onAfterLeave);
    };

    // 供外部驱动状态机的方法
    const handleEnter = () => {
      api.store.intendedOpen = true;
      const current = transitionState.get();
      if (current === 'entered') return;
      if (current === 'entering') {
        if (config.interrupt === 'wait') {
          api.store.pendingQueue.push('enter');
        }
        return;
      }

      if (current === 'leaving') {
        if (config.interrupt === 'reverse') {
          transitionTo('entering');
        } else if (config.interrupt === 'wait') {
          api.store.pendingQueue.push('enter');
        } else if (config.interrupt === 'immediate') {
          transitionTo('closed');
          transitionTo('entering');
        }
        return;
      }

      transitionTo('entering');
    };

    const handleLeave = () => {
      api.store.intendedOpen = false;
      const current = transitionState.get();
      if (current === 'closed') return;
      if (current === 'leaving') {
        if (config.interrupt === 'wait') {
          api.store.pendingQueue.push('leave');
        }
        return;
      }

      if (current === 'entering') {
        if (config.interrupt === 'reverse') {
          transitionTo('leaving');
        } else if (config.interrupt === 'wait') {
          api.store.pendingQueue.push('leave');
        } else if (config.interrupt === 'immediate') {
          transitionTo('entered');
          transitionTo('leaving');
        }
        return;
      }

      transitionTo('leaving');
    };

    const handleComplete = () => {
      const current = transitionState.get();

      if (current === 'entering') {
        transitionTo('entered');
        processPendingQueue();
      } else if (current === 'leaving') {
        tryCompleteLeave();
      }

      // 若当前组件依赖 parent transition，在完成时通过 tryUpdate 触发 parent 的订阅回调，
      // 使 parent 在自身的 callback scope 内安全重试 tryCompleteLeave
      if (api.store.dependsOnParentTransition && parentCtxRef && api.store.run) {
        (api.store.run as RunHandle<TransitionProps>).context.tryUpdate(
          TRANSITION_CONTEXT,
          (prev) => prev,
          { skipSelf: true }
        );
      }
    };

    // Props 初始化与受控同步
    const syncFromProps = (run: RunHandle<TransitionProps>) => {
      refreshCallbacks(run);
      refreshConfig(run);

      const controlled = run.props.isProvided('open');
      api.store.controlled = controlled;

      const openValue = controlled ? !!run.props.get().open : !!run.props.get().defaultOpen;

      api.store.intendedOpen = openValue;

      const appear = !!run.props.get().appear;
      const current = transitionState.get();

      // 仅在初始化/首次同步时处理初始状态
      if (current === 'closed' && openValue) {
        if (appear) {
          transitionTo('entering');
        } else {
          // 即使 appear=false 也先 entering 再 entered，
          // 以保留生命周期副作用与状态检查的一致性
          transitionTo('entering');
          transitionTo('entered');
        }
      }
    };

    const syncControlled = (run: RunHandle<TransitionProps>, nextOpen: boolean) => {
      refreshCallbacks(run);
      refreshConfig(run);

      const controlled = run.props.isProvided('open');
      api.store.controlled = controlled;
      if (!controlled) return;

      if (api.store.intendedOpen !== nextOpen) {
        api.store.intendedOpen = nextOpen;
        if (nextOpen) {
          handleEnter();
        } else {
          handleLeave();
        }
      }
    };

    def.lifecycle.onCreated((run) => {
      // 缓存 run 供 handleComplete 等运行时方法使用
      api.store.run = run;

      syncFromProps(run);

      const props = run.props.get();
      api.store.dependsOnParentTransition = !!props.dependsOnParentTransition;

      if (props.dependsOnParentTransition) {
        const parentCtx = run.context.tryRead(TRANSITION_CONTEXT, { skipSelf: true });
        if (parentCtx?.parentRef) {
          parentCtxRef = parentCtx.parentRef;
          const registry = transitionParentRegistries.get(parentCtxRef);
          if (registry) {
            const child = { getState: () => transitionState.get() };
            registry.children.push(child);
            unregisterChild = () => {
              const idx = registeredChildren.indexOf(child);
              if (idx !== -1) registeredChildren.splice(idx, 1);
            };
          }
        }
      }
    });

    def.lifecycle.onUnmounted(() => {
      unregisterChild?.();
      unregisterChild = undefined;
    });

    def.props.watch(['open'] as any, (run, next) => {
      syncControlled(run, !!(next as any).open);
    });

    // 暴露公共 API
    def.expose.state('transitionState', transitionState);
    def.expose.state('isPresent', isPresent);
    def.expose.method('enter', handleEnter);
    def.expose.method('leave', handleLeave);
    def.expose.method('complete', handleComplete);
    def.expose.value('controls', {
      enter: handleEnter,
      leave: handleLeave,
      complete: handleComplete,
    });

    // 将运行时方法存入 api.store（内部或测试使用）
    api.store.transitionTo = transitionTo;
    api.store.handleEnter = handleEnter;
    api.store.handleLeave = handleLeave;
    api.store.handleComplete = handleComplete;
    api.store.syncFromProps = syncFromProps;
    api.store.syncControlled = syncControlled;
  },
});
