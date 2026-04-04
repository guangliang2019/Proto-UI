export type {
  SwitchRootProps,
  SwitchRootExposes,
  SwitchRootStateHandles,
  SwitchRootAsHookContract,
  SwitchThumbProps,
  SwitchThumbExposes,
  SwitchThumbStateHandles,
  SwitchThumbAsHookContract,
} from './types';

export { SWITCH_FAMILY } from './shared';
export { asSwitchRoot, default as switchRoot } from './root';
export { asSwitchThumb, default as switchThumb } from './thumb';
