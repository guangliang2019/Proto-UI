import type {
  AnatomyClaimDecl,
  AnatomyFamily,
  AnatomyFamilyDecl,
  AnatomyPartView,
  ModuleInstance,
  ModulePort,
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

export type AnatomyFacade = {
  family(family: AnatomyFamily, decl: AnatomyFamilyDecl): void;
  claim(family: AnatomyFamily, decl: AnatomyClaimDecl): void;

  has(family: AnatomyFamily, role: string): boolean;
  parts(family: AnatomyFamily): readonly AnatomyPartView[];
  partsOf(family: AnatomyFamily, role: string): readonly AnatomyPartView[];
};

export type AnatomyPort = ModulePort & {
  getDiagnostics(): readonly AnatomyDiagnostic[];
};

export type AnatomyModule = ModuleInstance<AnatomyFacade> & {
  name: 'anatomy';
  scope: 'instance';
  port?: AnatomyPort;
};
