// packages/core/src/handles.ts
import {
  EventListenerToken,
  EventTypeV0,
  JsonObject,
  ContextKey,
  PropsBaseType,
  PropsSpecMap,
  StateEvent,
} from '@proto-ui/types';
import {
  UnUse,
  StyleHandle,
  TemplateType,
  TemplateProps,
  TemplateChildren,
  TemplateNode,
} from './spec';
import { StateDefAPI } from './state';

// 统一错误上下文，方便在 runtime 做 phase guard 时给出可诊断信息

export interface GuardInfo {
  prototypeName: string;
  phase: Phase;
}

/**
 * Handles are how we strictly separate phases:
 * - def: setup-only (declare intent, register callbacks). After setup, any def usage must throw.
 * - renderer: render-time (build template). It provides el/r + a readonly view `read`.
 * - run: callback-time (runtime callbacks, lifecycle/effects/handlers).
 *
 * core only defines types; runtime enforces phase rules via guards.
 */

export type Phase = 'setup' | 'render' | 'callback' | 'unknown';

export interface RunHandle<Props extends PropsBaseType> {
  update(): void;

  props: {
    get(): Readonly<Props>;
    getRaw(): Readonly<Props & PropsBaseType>;
    isProvided(key: keyof Props): boolean;
  };

  context: {
    read<T extends JsonObject>(key: ContextKey<T>): T;
    tryRead<T extends JsonObject>(key: ContextKey<T>): T | null;
    update<T extends JsonObject>(key: ContextKey<T>, next: T | ((prev: T) => T)): void;
    tryUpdate<T extends JsonObject>(key: ContextKey<T>, next: T | ((prev: T) => T)): boolean;
  };
}

export interface DefHandle<Props extends PropsBaseType, Exposes = Record<string, unknown>> {
  lifecycle: {
    onCreated(cb: (run: RunHandle<Props>) => void): void;
    onMounted(cb: (run: RunHandle<Props>) => void): void;
    onUpdated(cb: (run: RunHandle<Props>) => void): void;
    onUnmounted(cb: (run: RunHandle<Props>) => void): void;
  };

  props: {
    define(decl: PropsSpecMap<Props>): void;
    setDefaults(partialDefaults: PropsDefaults<Props>): void;
    watch(keys: (keyof Props & string)[], cb: PropsWatchCallback<Props>): void;
    watchAll(cb: PropsWatchCallback<Props>): void;

    watchRaw(keys: (keyof Props & string)[], cb: RawWatchCallback<Props & PropsBaseType>): void;
    watchRawAll(cb: RawWatchCallback<Props & PropsBaseType>): void;
  };

  feedback: {
    style: {
      use: (...handles: StyleHandle[]) => UnUse;
    };
  };

  expose: <K extends keyof Exposes>(key: K, value: Exposes[K]) => void;

  rule: (spec: any) => void;

  event: {
    on(
      type: EventTypeV0,
      cb: ProtoEventCallback<Props>,
      options?: EventListenerOptions
    ): EventListenerToken;
    off(token: EventListenerToken): void;
    onGlobal(
      type: EventTypeV0,
      cb: ProtoEventCallback<Props>,
      options?: EventListenerOptions
    ): EventListenerToken;
  };

  state: StateDefAPI;

  context: {
    provide<T extends JsonObject>(
      key: ContextKey<T>,
      defaultValue: T
    ): (next: T | ((prev: T) => T)) => void;
    subscribe<T extends JsonObject>(key: ContextKey<T>, onChange?: ContextOnChange<Props, T>): void;
    trySubscribe<T extends JsonObject>(
      key: ContextKey<T>,
      onChange?: ContextOnChangeOptional<Props, T>
    ): void;
  };
}

export type ContextOnChange<P extends PropsBaseType, T extends JsonObject> = (
  run: RunHandle<P>,
  next: T,
  prev: T
) => void;

export type ContextOnChangeOptional<P extends PropsBaseType, T extends JsonObject> = (
  run: RunHandle<P>,
  next: T | null,
  prev: T | null
) => void;

// render-time 句柄：构造模板 + 只读读取视图（read）
// 注意：这里不叫 run，避免和 callback-time 的 run 混淆
export interface RenderReadHandle<Props extends PropsBaseType> {
  props: RunHandle<Props>['props'];
}

export interface ElementFactory {
  (type: TemplateType): TemplateNode;
  (type: TemplateType, children: TemplateChildren): TemplateNode;
  (type: TemplateType, props: TemplateProps, children?: TemplateChildren): TemplateNode;
}

export interface RendererHandle<Props extends PropsBaseType> {
  el: ElementFactory;
  r: ReservedFactories;
  read: RenderReadHandle<Props>; // render 阶段可用的 readonly 快照视图
}

export interface ReservedFactories {
  slot(): TemplateNode;
}

/**
 * Resolved props snapshot type:
 * - Shape is P
 * - Values are whatever component author declared in P (including nulls if they want them)
 *
 * Note: runtime canonicalization (undefined -> null) is a policy detail; TS can only reflect it
 * if author chose to include null in P[K]. That’s intentional to avoid lying types.
 */
export type PropsSnapshot<P extends PropsBaseType> = Readonly<P>;

/** Defaults should be aligned to Props shape. */
export type PropsDefaults<P extends PropsBaseType> = Partial<P>;

export type WatchInfo<P extends PropsBaseType> = {
  changedKeysAll: Array<keyof P & string>;
  changedKeysMatched: Array<keyof P & string>;
};

export type PropsWatchCallback<P extends PropsBaseType> = (
  run: RunHandle<P>,
  next: PropsSnapshot<P>,
  prev: PropsSnapshot<P>,
  info: WatchInfo<P>
) => void;

export type RawWatchCallback<P extends PropsBaseType> = (
  run: RunHandle<P>,
  nextRaw: Readonly<P & PropsBaseType>,
  prevRaw: Readonly<P & PropsBaseType>,
  info: WatchInfo<P & PropsBaseType>
) => void;

export type ProtoEventCallback<P extends PropsBaseType> = (run: RunHandle<P>, ev: any) => void;

export type StateWatchCallback<V, P extends PropsBaseType> = (
  run: RunHandle<P>,
  e: StateEvent<V>
) => void;

export type StateSubscribeCallback<V> = (e: StateEvent<V>) => void;
