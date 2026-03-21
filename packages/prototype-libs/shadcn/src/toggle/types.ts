import type {
  ToggleAsHookContract,
  ToggleExposes,
  ToggleProps,
  ToggleStateHandles,
} from '@prototype-libs/base';

export interface ShadcnToggleProps extends ToggleProps {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export type ShadcnToggleExposes = ToggleExposes;

export type ShadcnToggleStateHandles = ToggleStateHandles;

export type ShadcnToggleAsHookContract = ToggleAsHookContract;
