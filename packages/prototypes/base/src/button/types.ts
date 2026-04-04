import { ExposeEvent, ExposeMethod, ExposeState, FocusRequestOptions, State } from '@proto.ui/core';

export interface ButtonProps {
  disabled?: boolean;
}

export type ButtonExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: FocusRequestOptions) => void>;
  click: ExposeEvent<void>;
};

export type ButtonStateHandles = {
  disabled: State<boolean>;
  hovered: State<boolean>;
  focused: State<boolean>;
  focusVisible: State<boolean>;
  pressed: State<boolean>;
};

export type ButtonAsHookContract = {
  state: ButtonStateHandles;
  event: {
    click: void;
  };
};
