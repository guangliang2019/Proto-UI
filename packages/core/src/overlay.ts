import type { PropsBaseType } from '@proto.ui/types';
import type { ObservedStateHandle } from './state';

export type OverlayPlacement = 'top' | 'right' | 'bottom' | 'left';
export type OverlayAlign = 'start' | 'center' | 'end';

export type OverlayFocusEntry = 'first' | 'selected' | 'content' | 'manual';
export type OverlayFocusRestore = 'trigger' | 'previous' | 'none';
export type OverlayLayerRole = 'overlay' | 'dialog-mask' | 'dialog-content' | (string & {});

export type OverlayReason =
  | 'trigger.press'
  | 'trigger.hover'
  | 'context.menu'
  | 'escape'
  | 'outside.press'
  | 'focus.outside'
  | 'item.commit'
  | 'controlled.sync'
  | 'programmatic'
  | (string & {});

export type OverlayConfigPatch = Readonly<{
  defaultOpen?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsidePress?: boolean;
  closeOnFocusOutside?: boolean;
  closeOnAnchorPress?: boolean;
  closeOnTriggerPress?: boolean;
  placement?: OverlayPlacement;
  align?: OverlayAlign;
  sideOffset?: number;
  alignOffset?: number;
  entry?: OverlayFocusEntry;
  restore?: OverlayFocusRestore;
  portal?: boolean;
  modal?: boolean;
  layerRole?: OverlayLayerRole;
  layerOffset?: number;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type OverlayConfig = Readonly<{
  defaultOpen: boolean;
  closeOnEscape: boolean;
  closeOnOutsidePress: boolean;
  closeOnFocusOutside: boolean;
  closeOnAnchorPress: boolean;
  closeOnTriggerPress: boolean;
  placement: OverlayPlacement;
  align: OverlayAlign;
  sideOffset: number;
  alignOffset: number;
  entry: OverlayFocusEntry;
  restore: OverlayFocusRestore;
  portal: boolean;
  modal: boolean;
  layerRole: OverlayLayerRole;
  layerOffset: number;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type OverlayRegistration = Readonly<{
  trigger: unknown | null;
  anchor: unknown | null;
  content: unknown | null;
}>;

export interface OverlayHandle<P extends PropsBaseType = PropsBaseType> {
  open: ObservedStateHandle<boolean, P>;

  isOpen(): boolean;
  openOverlay(reason?: OverlayReason): void;
  close(reason?: OverlayReason): void;
  toggle(reason?: OverlayReason): void;

  configure(patch: OverlayConfigPatch): void;

  registerTrigger(target: unknown): void;
  registerAnchor(target: unknown): void;
  registerContent(target: unknown): void;
}
