import dialogRoot from './root';

export type {
  DialogCloseAsHookContract,
  DialogCloseExposes,
  DialogCloseProps,
  DialogContentAsHookContract,
  DialogContentExposes,
  DialogContentProps,
  DialogDescriptionAsHookContract,
  DialogDescriptionExposes,
  DialogDescriptionProps,
  DialogOverlayAsHookContract,
  DialogOverlayExposes,
  DialogOverlayProps,
  DialogRootAsHookContract,
  DialogRootExposes,
  DialogRootProps,
  DialogTitleAsHookContract,
  DialogTitleExposes,
  DialogTitleProps,
  DialogTriggerAsHookContract,
  DialogTriggerExposes,
  DialogTriggerProps,
} from './types';
export type { DialogContextValue } from './shared';

export { DIALOG_CONTEXT, DIALOG_FAMILY } from './shared';
export { asDialogRoot, default as dialogRoot } from './root';
export { asDialogTrigger, default as dialogTrigger } from './trigger';
export { asDialogOverlay, default as dialogOverlay } from './overlay';
export { asDialogContent, default as dialogContent } from './content';
export { asDialogTitle, default as dialogTitle } from './title';
export { asDialogDescription, default as dialogDescription } from './description';
export { asDialogClose, default as dialogClose } from './close';

export default dialogRoot;
