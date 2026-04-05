// packages/prototypes/base/src/transition/as-transition.ts
import type { RunHandle } from '@proto.ui/core';
import { getActiveAsHookContext } from '@proto.ui/core/internal';
import type { PresenceFacade } from '@proto.ui/module-presence';
import type {
  TransitionState,
  TransitionProps,
  TransitionExposes,
  TransitionHandles,
  TransitionOptions,
} from './types';

/**
 * Transition 状态机治理（privileged hook，通过 module-presence 控制结构 mount/unmount）
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
export function asTransition(options?: TransitionOptions): TransitionHandles {
  const { def, rt, facades } = getActiveAsHookContext('asTransition');
  rt.ensureSetup('asHook(asTransition)');
  const reg = rt.register('asTransition', { privileged: true, mode: 'configurable' });

  if (reg.action === 'skip' || reg.action === 'configure') {
    return (reg.state.result ?? {}) as TransitionHandles;
  }

  const presenceFacade = facades.presence as PresenceFacade | undefined;
  const presenceHandle = presenceFacade?.createHandle();

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
  } as any);

  // 状态定义（固定 4 节点状态机）
  const transitionState = def.state.enum<['closed', 'entering', 'entered', 'leaving']>(
    stateKey,
    'closed',
    { options: ['closed', 'entering', 'entered', 'leaving'] }
  );
  const isPresent = def.state.bool(isPresentKey, false);

  // store 用于多次调用共享
  const store = reg.state.store as {
    pendingQueue?: Array<'enter' | 'leave'>;
    intendedOpen?: boolean;
    controlled?: boolean;
    transitionTo?: (target: TransitionState) => void;
    handleEnter?: () => void;
    handleLeave?: () => void;
    handleComplete?: () => void;
    syncFromProps?: (run: RunHandle<TransitionProps>) => void;
    syncControlled?: (run: RunHandle<TransitionProps>, nextOpen: boolean) => void;
  };
  store.pendingQueue = [] as Array<'enter' | 'leave'>;

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

  const callIfFn = (fn: (() => void) | undefined) => {
    if (typeof fn === 'function') fn();
  };

  const processPendingQueue = () => {
    const next = store.pendingQueue!.shift();
    if (next === 'enter') {
      handleEnter();
    } else if (next === 'leave') {
      handleLeave();
    }
  };

  // 核心状态机迁移函数
  const transitionTo = (target: TransitionState) => {
    const current = transitionState.get();
    if (current === target) return;

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

    if (target === 'entering') callIfFn(onBeforeEnter);
    if (target === 'leaving') callIfFn(onBeforeLeave);

    transitionState.set(target, `reason: asTransition.transitionTo => ${target}`);
    isPresent.set(target !== 'closed', `reason: asTransition.transitionTo => ${target}`);

    if (target === 'entered') callIfFn(onAfterEnter);
    if (target === 'closed') callIfFn(onAfterLeave);
  };

  const handleEnter = () => {
    store.intendedOpen = true;
    const current = transitionState.get();
    if (current === 'entered') return;
    if (current === 'entering') {
      if (config.interrupt === 'wait') {
        store.pendingQueue!.push('enter');
      }
      return;
    }

    if (current === 'leaving') {
      if (config.interrupt === 'reverse') {
        presenceHandle?.setIntent('enter');
        transitionTo('entering');
      } else if (config.interrupt === 'wait') {
        store.pendingQueue!.push('enter');
      } else if (config.interrupt === 'immediate') {
        presenceHandle?.setIntent('enter');
        transitionTo('closed');
        transitionTo('entering');
      }
      return;
    }

    presenceHandle?.setIntent('enter');
    transitionTo('entering');
  };

  const handleLeave = () => {
    store.intendedOpen = false;
    const current = transitionState.get();
    if (current === 'closed') {
      presenceHandle?.setIntent('leave');
      return;
    }
    if (current === 'leaving') {
      if (config.interrupt === 'wait') {
        store.pendingQueue!.push('leave');
      }
      return;
    }

    if (current === 'entering') {
      if (config.interrupt === 'reverse') {
        presenceHandle?.setIntent('leave');
        transitionTo('leaving');
      } else if (config.interrupt === 'wait') {
        store.pendingQueue!.push('leave');
      } else if (config.interrupt === 'immediate') {
        presenceHandle?.setIntent('leave');
        transitionTo('entered');
        transitionTo('leaving');
      }
      return;
    }

    presenceHandle?.setIntent('leave');
    transitionTo('leaving');
  };

  const handleComplete = () => {
    const current = transitionState.get();

    if (current === 'entering') {
      transitionTo('entered');
      processPendingQueue();
    } else if (current === 'leaving') {
      transitionTo('closed');
      presenceHandle?.setIntent('leave');
      processPendingQueue();
    }
  };

  // Props 初始化与受控同步
  const syncFromProps = (run: RunHandle<TransitionProps>) => {
    refreshCallbacks(run);
    refreshConfig(run);

    const controlled = run.props.isProvided('open');
    store.controlled = controlled;

    const openValue = controlled ? !!run.props.get().open : !!run.props.get().defaultOpen;

    store.intendedOpen = openValue;

    const appear = !!run.props.get().appear;
    const current = transitionState.get();

    if (current === 'closed') {
      if (openValue) {
        presenceHandle?.setIntent('enter');
        if (appear) {
          transitionTo('entering');
        } else {
          transitionTo('entering');
          transitionTo('entered');
        }
      } else {
        presenceHandle?.setIntent('leave');
      }
    }
  };

  const syncControlled = (run: RunHandle<TransitionProps>, nextOpen: boolean) => {
    refreshCallbacks(run);
    refreshConfig(run);

    const controlled = run.props.isProvided('open');
    store.controlled = controlled;
    if (!controlled) return;

    if (store.intendedOpen !== nextOpen) {
      store.intendedOpen = nextOpen;
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

  // 将运行时方法存入 store（内部或测试使用）
  store.transitionTo = transitionTo;
  store.handleEnter = handleEnter;
  store.handleLeave = handleLeave;
  store.handleComplete = handleComplete;
  store.syncFromProps = syncFromProps;
  store.syncControlled = syncControlled;

  const result: TransitionHandles = { transitionState, isPresent };
  reg.state.result = result;
  return result;
}
