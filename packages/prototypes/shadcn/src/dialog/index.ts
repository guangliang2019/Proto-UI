import dialogClose from './close';
import dialogContent from './content';
import dialogDescription from './description';
import dialogMask from './overlay';
import dialogRoot from './root';
import dialogTitle from './title';
import dialogTrigger from './trigger';

export type {
  ShadcnDialogRootProps,
  ShadcnDialogRootExposes,
  ShadcnDialogRootAsHookContract,
  ShadcnDialogTriggerProps,
  ShadcnDialogTriggerExposes,
  ShadcnDialogTriggerAsHookContract,
  ShadcnDialogMaskProps,
  ShadcnDialogMaskExposes,
  ShadcnDialogMaskAsHookContract,
  ShadcnDialogContentProps,
  ShadcnDialogContentExposes,
  ShadcnDialogContentAsHookContract,
  ShadcnDialogTitleProps,
  ShadcnDialogTitleExposes,
  ShadcnDialogTitleAsHookContract,
  ShadcnDialogDescriptionProps,
  ShadcnDialogDescriptionExposes,
  ShadcnDialogDescriptionAsHookContract,
  ShadcnDialogCloseProps,
  ShadcnDialogCloseExposes,
  ShadcnDialogCloseAsHookContract,
} from './types';

export {
  dialogRoot,
  dialogTrigger,
  dialogMask,
  dialogContent,
  dialogTitle,
  dialogDescription,
  dialogClose,
};

export { default as shadcnDialogRoot } from './root';
export { default as shadcnDialogTrigger } from './trigger';
export { default as shadcnDialogMask } from './overlay';
export { default as shadcnDialogContent } from './content';
export { default as shadcnDialogTitle } from './title';
export { default as shadcnDialogDescription } from './description';
export { default as shadcnDialogClose } from './close';
