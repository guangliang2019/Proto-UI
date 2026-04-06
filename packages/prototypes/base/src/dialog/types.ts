import { ExposeMethod, ExposeState, State } from '@proto.ui/core';

export interface DialogRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  alert?: boolean;
}

export type DialogRootExposes = {
  open: ExposeState<boolean>;
  openDialog: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
};

export type DialogRootStateHandles = {
  open: State<boolean>;
};

export type DialogRootAsHookContract = {
  state: DialogRootStateHandles;
};

export interface DialogTriggerProps {
  disabled?: boolean;
}

export type DialogTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: { reason?: 'programmatic' | 'keyboard' | 'pointer' }) => void>;
  click: import('@proto.ui/core').ExposeEvent<void>;
};

export type DialogTriggerAsHookContract = {
  event: {
    click: void;
  };
};

export interface DialogOverlayProps {}

export type DialogOverlayExposes = {
  transitionState: ExposeState<'closed' | 'entering' | 'entered' | 'leaving'>;
  isPresent: ExposeState<boolean>;
};

export type DialogOverlayStateHandles = {
  transitionState: State<'closed' | 'entering' | 'entered' | 'leaving'>;
  isPresent: State<boolean>;
};

export type DialogOverlayAsHookContract = {
  state: DialogOverlayStateHandles;
};

export interface DialogContentProps {
  alert?: boolean;
}

export type DialogContentExposes = {
  open: ExposeState<boolean>;
  transitionState: ExposeState<'closed' | 'entering' | 'entered' | 'leaving'>;
  isPresent: ExposeState<boolean>;
};

export type DialogContentStateHandles = {
  open: State<boolean>;
  transitionState: State<'closed' | 'entering' | 'entered' | 'leaving'>;
  isPresent: State<boolean>;
};

export type DialogContentAsHookContract = {
  state: DialogContentStateHandles;
};

export interface DialogTitleProps {}

export type DialogTitleExposes = {};

export type DialogTitleAsHookContract = {};

export interface DialogDescriptionProps {}

export type DialogDescriptionExposes = {};

export type DialogDescriptionAsHookContract = {};

export interface DialogCloseProps {
  disabled?: boolean;
}

export type DialogCloseExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: { reason?: 'programmatic' | 'keyboard' | 'pointer' }) => void>;
  click: import('@proto.ui/core').ExposeEvent<void>;
};

export type DialogCloseAsHookContract = {
  event: {
    click: void;
  };
};
