import { ExposeEvent, ExposeMethod, ExposeState, State } from '@proto-ui/core';

export interface DropdownRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
}

export type DropdownRootExposes = {
  open: ExposeState<boolean>;
  openDropdown: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
};

export type DropdownRootStateHandles = {
  open: State<boolean>;
};

export type DropdownRootAsHookContract = {
  state: DropdownRootStateHandles;
};

export interface DropdownTriggerProps {
  disabled?: boolean;
}

export type DropdownTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  click: ExposeEvent<void>;
};

export type DropdownTriggerAsHookContract = {
  event: {
    click: void;
  };
};

export interface DropdownContentProps {}

export type DropdownContentExposes = {
  open: ExposeState<boolean>;
};

export type DropdownContentStateHandles = {
  open: State<boolean>;
};

export type DropdownContentAsHookContract = {
  state: DropdownContentStateHandles;
};

export interface DropdownItemProps {
  disabled?: boolean;
}

export type DropdownItemExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  click: ExposeEvent<void>;
};

export type DropdownItemAsHookContract = {
  event: {
    click: void;
  };
};
