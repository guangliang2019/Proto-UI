import { ExposeEvent, ExposeMethod, ExposeState, State } from '@proto-ui/core';

export interface HoverCardRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export type HoverCardRootExposes = {
  open: ExposeState<boolean>;
  openHoverCard: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
};

export type HoverCardRootStateHandles = {
  open: State<boolean>;
};

export type HoverCardRootAsHookContract = {
  state: HoverCardRootStateHandles;
};

export interface HoverCardTriggerProps {
  disabled?: boolean;
}

export type HoverCardTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  click: ExposeEvent<void>;
};

export type HoverCardTriggerAsHookContract = {
  event: {
    click: void;
  };
};

export interface HoverCardContentProps {}

export type HoverCardContentExposes = {
  open: ExposeState<boolean>;
};

export type HoverCardContentStateHandles = {
  open: State<boolean>;
};

export type HoverCardContentAsHookContract = {
  state: HoverCardContentStateHandles;
};
