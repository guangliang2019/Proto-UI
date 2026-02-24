import { ExposeState, ExposeEvent } from '@proto-ui/core';

export interface ButtonProps {
  disabled: boolean;
}

export type ButtonExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  click: ExposeEvent<void>;
};
