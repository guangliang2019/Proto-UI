import { cap } from '@proto.ui/core';
import type { Prototype, Unsubscribe } from '@proto.ui/core';

export type AnatomyInstanceToken = unknown;
export type AnatomyRootTarget = {
  compareDocumentPosition?(other: unknown): number;
};

export type AnatomyParentGetter = (instance: AnatomyInstanceToken) => AnatomyInstanceToken | null;
export type AnatomyPrototypeGetter = (instance: AnatomyInstanceToken) => Prototype<any> | null;
export type AnatomyRootTargetGetter = (instance: AnatomyInstanceToken) => AnatomyRootTarget | null;
export type AnatomyOrderObserver = (target: AnatomyRootTarget, notify: () => void) => Unsubscribe;

export const ANATOMY_INSTANCE_TOKEN_CAP = cap<AnatomyInstanceToken>(
  '@proto.ui/anatomy/instanceToken'
);
export const ANATOMY_PARENT_CAP = cap<AnatomyParentGetter>('@proto.ui/anatomy/getParent');
export const ANATOMY_GET_PROTO_CAP = cap<AnatomyPrototypeGetter>('@proto.ui/anatomy/getPrototype');
export const ANATOMY_ROOT_TARGET_CAP = cap<AnatomyRootTargetGetter>(
  '@proto.ui/anatomy/getRootTarget'
);
export const ANATOMY_ORDER_OBSERVER_CAP = cap<AnatomyOrderObserver>(
  '@proto.ui/anatomy/orderObserver'
);
