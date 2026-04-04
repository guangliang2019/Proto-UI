import type { ExposeMethod, ExposeState, ExposeValue, State } from '@proto.ui/core';

// 状态机类型
export type TransitionState = 'closed' | 'entering' | 'entered' | 'leaving';

// Props 类型
export type TransitionProps = {
  open?: boolean;
  defaultOpen?: boolean;
  appear?: boolean;
  enterDuration?: number;
  leaveDuration?: number;
  interrupt?: 'reverse' | 'wait' | 'immediate';
  dependsOnParentTransition?: boolean;
  onBeforeEnter?: () => void;
  onAfterEnter?: () => void;
  onBeforeLeave?: () => void;
  onAfterLeave?: () => void;
};

// 命令式控制方法
export type TransitionControls = {
  enter: () => void;
  leave: () => void;
  complete: () => void;
};

// Exposes 类型
export type TransitionExposes = {
  transitionState: ExposeState<TransitionState>;
  isPresent: ExposeState<boolean>;
  enter: ExposeMethod<() => void>;
  leave: ExposeMethod<() => void>;
  complete: ExposeMethod<() => void>;
  controls: ExposeValue<TransitionControls>;
};

// Handles 类型（供其他组件复用）
export type TransitionHandles = {
  transitionState: State<TransitionState>;
  isPresent: State<boolean>;
};

// asHook 选项
export type TransitionOptions = {
  stateKey?: string;
  isPresentKey?: string;
};

// Context 值类型（供 parent-child 协调）
// 注意：Context 系统不支持函数值，因此通过 parentRef 对象在模块级 WeakMap 中做二次查找
export type TransitionContextValue = {
  transitionState: TransitionState;
  enterDuration: number;
  leaveDuration: number;
  parentRef?: object;
};

// asHook 契约（供类型推导）
export type TransitionAsHookContract = {
  state: TransitionHandles;
};
