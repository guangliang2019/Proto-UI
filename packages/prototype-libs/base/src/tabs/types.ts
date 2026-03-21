import { ExposeEvent, ExposeMethod, ExposeState, State } from '@proto-ui/core';
import type { TabsActivationMode, TabsOrientation } from './shared';

export interface TabsRootProps {
  value?: string;
  defaultValue?: string;
  orientation?: TabsOrientation;
  activationMode?: TabsActivationMode;
}

export type TabsRootExposes = {
  value: ExposeState<string>;
};

export type TabsRootStateHandles = {
  value: State<string>;
};

export type TabsRootAsHookContract = {
  state: TabsRootStateHandles;
  event: {};
};

export interface TabsListProps {
  orientation?: TabsOrientation;
  loop?: boolean;
}

export type TabsListExposes = {
  focusFirst: ExposeMethod<() => void>;
  focusLast: ExposeMethod<() => void>;
  focusNext: ExposeMethod<() => void>;
  focusPrev: ExposeMethod<() => void>;
};
export type TabsListAsHookContract = {};

export interface TabsTriggerProps {
  value?: string;
  disabled?: boolean;
}

export type TabsTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  selected: ExposeState<boolean>;
  focusSelf: ExposeMethod<() => void>;
  click: ExposeEvent<void>;
};

export type TabsTriggerStateHandles = {
  disabled: State<boolean>;
  hovered: State<boolean>;
  focused: State<boolean>;
  focusVisible: State<boolean>;
  pressed: State<boolean>;
  selected: State<boolean>;
};

export type TabsTriggerAsHookContract = {
  state: TabsTriggerStateHandles;
  event: {
    click: void;
  };
};

export interface TabsContentProps {
  value?: string;
}

export type TabsContentExposes = {
  current: ExposeState<boolean>;
};

export type TabsContentStateHandles = {
  current: State<boolean>;
};

export type TabsContentAsHookContract = {
  state: TabsContentStateHandles;
};
