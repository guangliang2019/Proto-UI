import type {
  AnatomyClaimDecl,
  AnatomyFamily,
  AnatomyFamilyDecl,
  AnatomyOrderView,
  AnatomyPartView,
  ModuleInstance,
  ModulePort,
  Unsubscribe,
} from '@proto.ui/core';

export type AnatomyDiagnostic = {
  level: 'warning' | 'error';
  scope: 'family' | 'profile';
  code: string;
  message: string;
  family: AnatomyFamily;
  role?: string;
  profile?: string;
};

export type AnatomyOrderCallbackCtx = unknown;
export type AnatomyOrderCallbackDispatcher = (fn: (ctx: AnatomyOrderCallbackCtx) => void) => void;
export type AnatomyOrderChangeCb = (ctx: AnatomyOrderCallbackCtx) => void;

export type AnatomyFacade = {
  family(family: AnatomyFamily, decl: AnatomyFamilyDecl): void;
  claim(family: AnatomyFamily, decl: AnatomyClaimDecl): void;

  has(family: AnatomyFamily, role: string): boolean;
  parts: AnatomyOrderView['parts'];
  partsOf: AnatomyOrderView['partsOf'];
  order: AnatomyOrderView;
};

export type AnatomyPort = ModulePort & {
  getDiagnostics(): readonly AnatomyDiagnostic[];
  parts: AnatomyOrderView['parts'];
  order: AnatomyOrderView;
  setOrderCallbackDispatcher(dispatch: AnatomyOrderCallbackDispatcher): void;
  subscribeOrder(family: AnatomyFamily, cb: AnatomyOrderChangeCb): Unsubscribe;
};

export type AnatomyModule = ModuleInstance<AnatomyFacade> & {
  name: 'anatomy';
  scope: 'instance';
  port?: AnatomyPort;
};
