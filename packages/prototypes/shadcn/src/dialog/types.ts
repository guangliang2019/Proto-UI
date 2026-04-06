import type {
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
} from '@proto.ui/prototypes-base';

export type ShadcnDialogRootProps = DialogRootProps;
export type ShadcnDialogRootExposes = DialogRootExposes;
export type ShadcnDialogRootAsHookContract = DialogRootAsHookContract;

export type ShadcnDialogTriggerProps = DialogTriggerProps & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
};
export type ShadcnDialogTriggerExposes = DialogTriggerExposes;
export type ShadcnDialogTriggerAsHookContract = DialogTriggerAsHookContract;

export type ShadcnDialogOverlayProps = DialogOverlayProps;
export type ShadcnDialogOverlayExposes = DialogOverlayExposes;
export type ShadcnDialogOverlayAsHookContract = DialogOverlayAsHookContract;

export type ShadcnDialogContentProps = DialogContentProps;
export type ShadcnDialogContentExposes = DialogContentExposes;
export type ShadcnDialogContentAsHookContract = DialogContentAsHookContract;

export type ShadcnDialogTitleProps = DialogTitleProps;
export type ShadcnDialogTitleExposes = DialogTitleExposes;
export type ShadcnDialogTitleAsHookContract = DialogTitleAsHookContract;

export type ShadcnDialogDescriptionProps = DialogDescriptionProps;
export type ShadcnDialogDescriptionExposes = DialogDescriptionExposes;
export type ShadcnDialogDescriptionAsHookContract = DialogDescriptionAsHookContract;

export type ShadcnDialogCloseProps = DialogCloseProps & {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
};
export type ShadcnDialogCloseExposes = DialogCloseExposes;
export type ShadcnDialogCloseAsHookContract = DialogCloseAsHookContract;
