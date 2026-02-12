import { createModule, defineModule } from "@proto-ui/modules.base";
import type { ModuleFactoryArgs } from "@proto-ui/modules.base";
import type { TestSysModule } from "./types";
import { TestSysImpl } from "./impl";

export function createTestSysModule(ctx: ModuleFactoryArgs): TestSysModule {
  const { init, caps, deps } = ctx;

  return createModule({
    name: "test-sys",
    scope: "instance",
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new TestSysImpl(caps, init.prototypeName);

      return {
        facade: {},
        hooks: {},
        port: impl.port(),
      };
    },
  }) as any;
}

export const TestSysModuleDef = defineModule({
  name: "test-sys",
  deps: [],
  create: createTestSysModule,
});
