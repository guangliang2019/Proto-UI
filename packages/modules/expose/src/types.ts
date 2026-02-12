// packages/modules/expose/src/types.ts
import type { ModuleInstance, ModulePort } from "@proto-ui/core";

export type ExposeFacade = {
  expose(key: string, value: unknown): void;
};

export type ExposeDiag = {
  key: string;
  valueType: string;
  isFunction: boolean;
  isObject: boolean;
};

export type ExposePort = ModulePort & {
  get(key: string): unknown | undefined;
  getAll(): Record<string, unknown>;
  has(key: string): boolean;
  keys(): readonly string[];
  getDiagnostics?(): readonly ExposeDiag[];
};

export type ExposeModule = ModuleInstance<ExposeFacade> & {
  name: "expose";
  scope: "instance";
};
