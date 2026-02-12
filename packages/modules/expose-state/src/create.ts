// packages/modules/expose-state/src/create.ts
import { createModule, defineModule } from "@proto-ui/modules.base";
import type { ModuleFactoryArgs } from "@proto-ui/modules.base";

import type {
  ExposeStateFacade,
  ExposeStateModule,
  ExposeStatePort,
} from "./types";
import { ExposeStateModuleImpl } from "./impl";

export function createExposeStateModule(
  ctx: ModuleFactoryArgs
): ExposeStateModule {
  const { init, caps, deps } = ctx;

  return createModule<
    "expose-state",
    "instance",
    ExposeStateFacade,
    ExposeStatePort
  >({
    name: "expose-state",
    scope: "instance",
    init,
    caps,
    deps,
    build: ({ caps, deps }) => {
      const impl = new ExposeStateModuleImpl(caps, deps);

      return {
        facade: {},
        port: impl.port,
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          afterRenderCommit: () => impl.afterRenderCommit(),
          dispose: () => impl.dispose(),
        },
      };
    },
  });
}

export const ExposeStateModuleDef = defineModule({
  name: "expose-state",
  deps: ["expose", "state"],
  create: createExposeStateModule,
});
