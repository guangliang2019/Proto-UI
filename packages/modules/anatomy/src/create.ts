import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';
import type { ExposePort } from '@proto.ui/module-expose';

import type { AnatomyFacade, AnatomyModule, AnatomyPort } from './types';
import { AnatomyModuleImpl } from './impl';

export function createAnatomyModule(ctx: ModuleFactoryArgs): AnatomyModule {
  const { init, caps, deps } = ctx;
  const exposePort = deps.requirePort<ExposePort>('expose');

  return createModule<'anatomy', 'instance', AnatomyFacade, AnatomyPort>({
    name: 'anatomy',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new AnatomyModuleImpl(caps, init.prototypeName, exposePort);
      return {
        facade: {
          family: (family, decl) => impl.family(family, decl),
          claim: (family, decl) => impl.claim(family, decl),
          has: (family, role) => impl.has(family, role),
          parts: (family) => impl.parts(family),
          partsOf: (family, role) => impl.partsOf(family, role),
          order: {
            version: (family) => impl.orderVersion(family),
            parts: (family) => impl.orderedParts(family),
            partsOf: (family, role) => impl.orderedPartsOf(family, role),
            indexOfSelf: (family, role) => impl.indexOfSelf(family, role),
            prevOfSelf: (family, role) => impl.prevOfSelf(family, role),
            nextOfSelf: (family, role) => impl.nextOfSelf(family, role),
          },
        },
        port: impl.port,
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          dispose: () => impl.dispose(),
        },
      };
    },
  });
}

export const AnatomyModuleDef = defineModule({
  name: 'anatomy',
  deps: ['expose'],
  create: createAnatomyModule,
});
