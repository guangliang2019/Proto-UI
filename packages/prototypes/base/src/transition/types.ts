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

// asHook 契约（供类型推导）
export type TransitionAsHookContract = {
  state: TransitionHandles;
};
