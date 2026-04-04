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

    const updateContext = def.context.provide(TRANSITION_CONTEXT, {
      transitionState: 'closed',
      enterDuration: config.enterDuration,
      leaveDuration: config.leaveDuration,
    });

    const syncContext = () => {
      updateContext({
        transitionState: transitionState.get(),
        enterDuration: config.enterDuration,
        leaveDuration: config.leaveDuration,
      });
    };

    const callIfFn = (fn: (() => void) | undefined) => {
      if (typeof fn === 'function') fn();
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
      if (current === 'entered' || current === 'entering') return;

      if (current === 'leaving') {
        if (config.interrupt === 'reverse') {
          transitionTo('entering');
        } else if (config.interrupt === 'wait') {
          api.store.pendingTarget = true;
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
      if (current === 'closed' || current === 'leaving') return;

      if (current === 'entering') {
        if (config.interrupt === 'reverse') {
          transitionTo('leaving');
        } else if (config.interrupt === 'wait') {
          api.store.pendingTarget = false;
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
        const pending = api.store.pendingTarget;
        if (pending === false) {
          api.store.pendingTarget = null;
          handleLeave();
        }
      } else if (current === 'leaving') {
        transitionTo('closed');
        const pending = api.store.pendingTarget;
        if (pending === true) {
          api.store.pendingTarget = null;
          handleEnter();
        }
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
      syncFromProps(run);
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
