import switchRoot from './root';
import switchThumb from './thumb';

export type {
  SwitchRootProps,
  SwitchRootExposes,
  SwitchRootStateHandles,
  SwitchRootAsHookContract,
  SwitchThumbProps,
  SwitchThumbExposes,
  SwitchThumbAsHookContract,
} from './types';

export { SWITCH_FAMILY } from './shared';
export { asSwitchRoot } from './as-switch-root';
export { asSwitchThumb } from './as-switch-thumb';
export { switchRoot, switchThumb };
