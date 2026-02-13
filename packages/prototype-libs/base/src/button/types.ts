import { State } from '@proto-ui/core';

export interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export type ButtonExposes = {
  disabled: State<boolean>;
  hovered: State<boolean>;
  focused: State<boolean>;
  pressed: State<boolean>;
};
