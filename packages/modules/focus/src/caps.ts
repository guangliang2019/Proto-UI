import { cap } from '@proto.ui/core';
import type { FocusRequestOptions } from '@proto.ui/core';

export type FocusInstanceToken = unknown;
export type FocusParentGetter = (instance: FocusInstanceToken) => FocusInstanceToken | null;

export type FocusRootTargetGetter = () => HTMLElement | null;

export type FocusIsNativelyFocusable = (target: HTMLElement) => boolean;

export type FocusSetFocusable = (target: HTMLElement, enabled: boolean) => void;

export type FocusRequestFocus = (target: HTMLElement, options?: FocusRequestOptions) => void;

export type FocusBlur = (target: HTMLElement) => void;

export const FOCUS_ROOT_TARGET_CAP = cap<FocusRootTargetGetter>('@proto.ui/focus/getRootTarget');
export const FOCUS_INSTANCE_TOKEN_CAP = cap<FocusInstanceToken>('@proto.ui/focus/instanceToken');
export const FOCUS_PARENT_CAP = cap<FocusParentGetter>('@proto.ui/focus/getParent');

export const FOCUS_IS_NATIVELY_FOCUSABLE_CAP = cap<FocusIsNativelyFocusable>(
  '@proto.ui/focus/isNativelyFocusable'
);

export const FOCUS_SET_FOCUSABLE_CAP = cap<FocusSetFocusable>('@proto.ui/focus/setFocusable');

export const FOCUS_REQUEST_FOCUS_CAP = cap<FocusRequestFocus>('@proto.ui/focus/requestFocus');

export const FOCUS_BLUR_CAP = cap<FocusBlur>('@proto.ui/focus/blur');
