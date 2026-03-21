import switchRoot from './root';
import switchThumb from './thumb';

export type {
  ShadcnSwitchRootProps,
  ShadcnSwitchRootExposes,
  ShadcnSwitchRootStateHandles,
  ShadcnSwitchRootAsHookContract,
  ShadcnSwitchThumbProps,
  ShadcnSwitchThumbExposes,
  ShadcnSwitchThumbAsHookContract,
} from './types';

export { switchRoot, switchThumb };
export { default as shadcnSwitchRoot } from './root';
export { default as shadcnSwitchThumb } from './thumb';
