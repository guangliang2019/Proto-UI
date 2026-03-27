import { cap } from '@proto.ui/core';
import type { Prototype } from '@proto.ui/core';

export type AnatomyInstanceToken = unknown;

export type AnatomyParentGetter = (instance: AnatomyInstanceToken) => AnatomyInstanceToken | null;
export type AnatomyPrototypeGetter = (instance: AnatomyInstanceToken) => Prototype<any> | null;

export const ANATOMY_INSTANCE_TOKEN_CAP = cap<AnatomyInstanceToken>(
  '@proto.ui/anatomy/instanceToken'
);
export const ANATOMY_PARENT_CAP = cap<AnatomyParentGetter>('@proto.ui/anatomy/getParent');
export const ANATOMY_GET_PROTO_CAP = cap<AnatomyPrototypeGetter>('@proto.ui/anatomy/getPrototype');
