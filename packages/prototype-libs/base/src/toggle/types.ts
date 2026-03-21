import { ExposeEvent, ExposeState, State } from '@proto-ui/core';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export type ToggleExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  checked: ExposeState<boolean>;
  click: ExposeEvent<void>;
  checkedChange: ExposeEvent<{ checked: boolean }>;
};

export type ToggleStateHandles = {
  disabled: State<boolean>;
  hovered: State<boolean>;
  focused: State<boolean>;
  focusVisible: State<boolean>;
  pressed: State<boolean>;
  checked: State<boolean>;
};

export type ToggleAsHookContract = {
  state: ToggleStateHandles;
  event: {
    click: void;
    checkedChange: { checked: boolean };
  };
};
