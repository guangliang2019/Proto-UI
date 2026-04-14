import { ExposeEvent, ExposeMethod, ExposeState, FocusRequestOptions, State } from '@proto.ui/core';
import type {
  CollectionExposes,
  CollectionItemExposes,
  CollectionItemSnapshotExposed as CollectionItemSnapshot,
} from '@proto.ui/core';

/**
 * Boundary:
 * - base dropdown models an overlay-backed, menu-like collection shell
 * - it owns open/close, active item, roving focus, and typeahead
 * - item commit close behavior and open-entry behavior are exposed as narrow policy surfaces
 * - transient active navigation state remains internal unless a stable consumer emerges
 * - it does not define persistent selection, checked/radio semantics, or submenu structure
 * - TODO: if layered submenu interaction proves reusable across dropdown-menu and context-menu,
 *   extract a non-privileged coordination hook tentatively named `asNestedMenuLayer`
 */
export interface DropdownRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  closeOnItemCommit?: boolean;
  openEntry?: DropdownOpenEntry;
  openEntryValue?: string;
}

export type DropdownRootExposes = {
  open: ExposeState<boolean>;
  openDropdown: ExposeMethod<(reason?: string) => void>;
  close: ExposeMethod<(reason?: string) => void>;
  toggle: ExposeMethod<(reason?: string) => void>;
} & CollectionExposes;

export type DropdownRootStateHandles = {
  open: State<boolean>;
};

export type DropdownRootAsHookContract = {
  state: DropdownRootStateHandles;
};

export interface DropdownTriggerProps {
  disabled?: boolean;
}

export type DropdownTriggerExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: FocusRequestOptions) => void>;
  click: ExposeEvent<void>;
};

export type DropdownTriggerAsHookContract = {
  event: {
    click: void;
  };
};

export interface DropdownContentProps {}

export type DropdownContentExposes = {
  open: ExposeState<boolean>;
  focusFirst: ExposeMethod<() => void>;
  focusLast: ExposeMethod<() => void>;
  focusNext: ExposeMethod<() => void>;
  focusPrev: ExposeMethod<() => void>;
};

export type DropdownContentStateHandles = {
  open: State<boolean>;
};

export type DropdownContentAsHookContract = {
  state: DropdownContentStateHandles;
};

export interface DropdownItemProps {
  disabled?: boolean;
  value?: string;
  textValue?: string;
  closeOnCommit?: boolean;
}

export type DropdownItemExposes = {
  disabled: ExposeState<boolean>;
  hovered: ExposeState<boolean>;
  focused: ExposeState<boolean>;
  focusVisible: ExposeState<boolean>;
  pressed: ExposeState<boolean>;
  active: ExposeState<boolean>;
  focusSelf: ExposeMethod<(options?: FocusRequestOptions) => void>;
  click: ExposeEvent<void>;
} & CollectionItemExposes;

export type DropdownItemAsHookContract = {
  event: {
    click: void;
  };
};

export type DropdownOpenEntry = 'active-or-first' | 'first' | 'last' | 'value-or-first';

export type DropdownMenuItemSnapshot = CollectionItemSnapshot &
  Readonly<{
    value: string;
    textValue: string;
    disabled: boolean;
  }>;
