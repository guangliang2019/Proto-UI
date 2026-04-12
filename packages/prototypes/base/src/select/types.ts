import { ExposeEvent, ExposeMethod, ExposeState, FocusRequestOptions, State } from '@proto.ui/core';
import type {
  CollectionExposes,
  CollectionItemExposes,
  CollectionItemSnapshotExposed as CollectionItemSnapshot,
} from '@proto.ui/core';

export interface SelectRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
}

export type SelectRootExposes = {
  open: ExposeState<boolean>;
  value: ExposeState<string>;
  textValue: ExposeState<string>;
  openDropdown: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
} & CollectionExposes;

export type SelectRootStateHandles = {
  open: State<boolean>;
  value: State<string>;
  textValue: State<string>;
};

export type SelectRootAsHookContract = {
  state: SelectRootStateHandles;
};

export interface SelectTriggerProps {
  disabled?: boolean;
}

export type SelectTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: FocusRequestOptions) => void>;
  click: ExposeEvent<void>;
};

export type SelectTriggerAsHookContract = {
  event: {
    click: void;
  };
};

export interface SelectValueProps {
  placeholder?: string;
}

export type SelectValueExposes = {};

export type SelectValueAsHookContract = {};

export interface SelectContentProps {}

export type SelectContentExposes = {
  open: ExposeState<boolean>;
  focusFirst: ExposeMethod<() => void>;
  focusLast: ExposeMethod<() => void>;
  focusNext: ExposeMethod<() => void>;
  focusPrev: ExposeMethod<() => void>;
  focusSelected: ExposeMethod<() => void>;
};

export type SelectContentStateHandles = {
  open: State<boolean>;
};

export type SelectContentAsHookContract = {
  state: SelectContentStateHandles;
};

export interface SelectItemProps {
  disabled?: boolean;
  value?: string;
  textValue?: string;
  closeOnSelect?: boolean;
}

export type SelectItemExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  // `active` follows the committed select value, not the transient roving focus cursor.
  // When the select still has no value, every item remains inactive.
  active: ExposeState<boolean>;
  // `selected` mirrors the committed value as the accessibility-facing selected state.
  selected: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: FocusRequestOptions) => void>;
  click: ExposeEvent<void>;
} & CollectionItemExposes;

export type SelectItemAsHookContract = {
  event: {
    click: void;
  };
};

export type SelectItemSnapshot = CollectionItemSnapshot &
  Readonly<{
    value: string;
    textValue: string;
    disabled: boolean;
  }>;
