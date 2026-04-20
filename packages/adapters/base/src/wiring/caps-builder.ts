// packages/adapters/base/src/wiring/caps-builder.ts
import type { CapEntries } from '@proto.ui/core';
import type { WiringSpec } from '../types';

export type CapsWiringBuilder = {
  add(moduleName: string, provide: () => CapEntries): CapsWiringBuilder;
  use(moduleName: string, entries: CapEntries | (() => CapEntries)): CapsWiringBuilder;
  build(): WiringSpec;
};

export function createCapsWiring(): CapsWiringBuilder {
  const modules: WiringSpec = {};

  const add = (moduleName: string, provide: () => CapEntries) => {
    modules[moduleName] = provide as any;
    return api;
  };

  const use = (moduleName: string, entries: CapEntries | (() => CapEntries)) => {
    return add(
      moduleName,
      typeof entries === 'function' ? (entries as () => CapEntries) : () => entries
    );
  };

  const api: CapsWiringBuilder = {
    add,
    use,

    build() {
      return modules;
    },
  };

  return api;
}
