import { ExposeMethod, ExposeState, State } from '@proto-ui/core';
import type {
  ToggleAsHookContract,
  ToggleExposes,
  ToggleProps,
  ToggleStateHandles,
} from '../toggle/types';

export interface SwitchRootProps extends ToggleProps {}

export type SwitchRootExposes = ToggleExposes;

export type SwitchRootStateHandles = ToggleStateHandles;

export type SwitchRootAsHookContract = ToggleAsHookContract;

export interface SwitchThumbProps {}

export type SwitchThumbExposes = {
  checked: ExposeState<boolean>;
  isChecked: ExposeMethod<() => boolean | null>;
};

export type SwitchThumbStateHandles = {
  checked: State<boolean>;
};

export type SwitchThumbAsHookContract = {
  state: SwitchThumbStateHandles;
};
