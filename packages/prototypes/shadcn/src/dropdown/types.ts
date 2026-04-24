import type {
  DropdownContentAsHookContract,
  DropdownContentExposes,
  DropdownContentProps,
  DropdownItemAsHookContract,
  DropdownItemExposes,
  DropdownItemProps,
  DropdownRootAsHookContract,
  DropdownRootExposes,
  DropdownRootProps,
  DropdownTriggerAsHookContract,
  DropdownTriggerExposes,
  DropdownTriggerProps,
} from '@proto.ui/prototypes-base';

export type ShadcnDropdownTriggerIndicatorIcon = 'chevron-down' | 'chevrons-up-down';

export type ShadcnDropdownRootProps = DropdownRootProps;
export type ShadcnDropdownRootExposes = DropdownRootExposes;
export type ShadcnDropdownRootAsHookContract = DropdownRootAsHookContract;

export interface ShadcnDropdownTriggerProps extends DropdownTriggerProps {
  indicator?: boolean;
  indicatorIcon?: ShadcnDropdownTriggerIndicatorIcon;
  indicatorSize?: number;
  indicatorStrokeWidth?: number;
}
export type ShadcnDropdownTriggerExposes = DropdownTriggerExposes;
export type ShadcnDropdownTriggerAsHookContract = DropdownTriggerAsHookContract;

export type ShadcnDropdownContentProps = DropdownContentProps;
export type ShadcnDropdownContentExposes = DropdownContentExposes;
export type ShadcnDropdownContentAsHookContract = DropdownContentAsHookContract;

export type ShadcnDropdownItemProps = DropdownItemProps;
export type ShadcnDropdownItemExposes = DropdownItemExposes;
export type ShadcnDropdownItemAsHookContract = DropdownItemAsHookContract;
