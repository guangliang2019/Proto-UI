import type { PropsBaseType } from '@proto-ui/types';
import type { ObservedStateHandle } from './state';

export type FocusScopeMeta = Readonly<{
  kind?: string;
  debugLabel?: string;
}>;

export type FocusGroupMeta = Readonly<{
  kind?: string;
  debugLabel?: string;
}>;

export type FocusScopeKey = Readonly<{
  id: symbol;
  meta?: FocusScopeMeta;
}>;

export type FocusGroupKey = Readonly<{
  id: symbol;
  meta?: FocusGroupMeta;
}>;

export function createFocusScopeKey(meta?: FocusScopeMeta): FocusScopeKey {
  return Object.freeze({
    id: Symbol(meta?.debugLabel ?? '@proto-ui/focus-scope'),
    meta: meta ? Object.freeze({ ...meta }) : undefined,
  });
}

export function createFocusGroupKey(meta?: FocusGroupMeta): FocusGroupKey {
  return Object.freeze({
    id: Symbol(meta?.debugLabel ?? '@proto-ui/focus-group'),
    meta: meta ? Object.freeze({ ...meta }) : undefined,
  });
}

export type FocusRequestOptions = Readonly<{
  reason?: 'programmatic' | 'keyboard' | 'pointer';
}>;

export type FocusableConfigPatch = Readonly<{
  scopeKey?: FocusScopeKey;
  groupKey?: FocusGroupKey;
  autoFocus?: boolean;
  disabled?: boolean;
  navParticipation?: 'auto' | 'none';
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusableConfig = Readonly<{
  scopeKey?: FocusScopeKey;
  groupKey?: FocusGroupKey;
  autoFocus: boolean;
  disabled: boolean;
  navParticipation: 'auto' | 'none';
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusScopeConfigPatch = Readonly<{
  key?: FocusScopeKey;
  trap?: boolean;
  loop?: boolean;
  navigation?: 'tab' | 'arrow' | 'tab+arrow';
  orientation?: 'vertical' | 'horizontal' | 'both';
  entry?: 'first' | 'selected' | 'active' | 'container' | 'manual';
  restore?: 'previous' | 'trigger' | 'none';
  emptyPolicy?: 'container' | 'none';
  group?: boolean | FocusGroupConfigPatch;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusScopeConfig = Readonly<{
  key?: FocusScopeKey;
  trap: boolean;
  loop: boolean;
  navigation: 'tab' | 'arrow' | 'tab+arrow';
  orientation: 'vertical' | 'horizontal' | 'both';
  entry: 'first' | 'selected' | 'active' | 'container' | 'manual';
  restore: 'previous' | 'trigger' | 'none';
  emptyPolicy: 'container' | 'none';
  group?: boolean | FocusGroupConfigPatch;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusGroupConfigPatch = Readonly<{
  key?: FocusGroupKey;
  loop?: boolean;
  navigation?: 'none' | 'tab' | 'arrow' | 'tab+arrow';
  orientation?: 'vertical' | 'horizontal' | 'both';
  entry?: 'first' | 'selected' | 'active' | 'manual';
  selectOnFocus?: boolean;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusGroupConfig = Readonly<{
  key?: FocusGroupKey;
  loop: boolean;
  navigation: 'none' | 'tab' | 'arrow' | 'tab+arrow';
  orientation: 'vertical' | 'horizontal' | 'both';
  entry: 'first' | 'selected' | 'active' | 'manual';
  selectOnFocus: boolean;
  meta?: Readonly<Record<string, unknown>>;
}>;

export type FocusFacts = Readonly<{
  focused: boolean;
  focusVisible: boolean;
  focusable: boolean;
  active: boolean;
  hasFocused: boolean;
}>;

export interface FocusableHandle<P extends PropsBaseType = PropsBaseType> {
  focused: ObservedStateHandle<boolean, P>;
  focusVisible: ObservedStateHandle<boolean, P>;
  focusable: ObservedStateHandle<boolean, P>;

  focus(options?: FocusRequestOptions): void;
  blur(): void;
  isFocused(): boolean;
  setDisabled(disabled: boolean): void;

  configure(patch: FocusableConfigPatch): void;
}

export interface FocusScopeHandle<P extends PropsBaseType = PropsBaseType> {
  active: ObservedStateHandle<boolean, P>;
  hasFocused: ObservedStateHandle<boolean, P>;

  focusFirst(): void;
  focusLast(): void;
  focusNext(): void;
  focusPrev(): void;
  focusSelected(): void;
  restoreFocus(): void;

  configure(patch: FocusScopeConfigPatch): void;
  getGroup(): FocusGroupHandle<P> | null;
}

export interface FocusGroupHandle<P extends PropsBaseType = PropsBaseType> {
  active: ObservedStateHandle<boolean, P>;
  hasFocused: ObservedStateHandle<boolean, P>;

  focusFirst(): void;
  focusLast(): void;
  focusNext(): void;
  focusPrev(): void;
  focusSelected(): void;

  configure(patch: FocusGroupConfigPatch): void;
}
