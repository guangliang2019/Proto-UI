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
          parts: (family, options) => impl.parts(family, options as any),
          partsOf: (family, role, options) => impl.partsOf(family, role, options as any),
          order: {
            version: (family, options) => impl.orderVersion(family, options as any),
            parts: (family, options) => impl.orderedParts(family, options as any),
            partsOf: (family, role, options) => impl.orderedPartsOf(family, role, options as any),
            indexOfSelf: (family, role, options) => impl.indexOfSelf(family, role, options as any),
            prevOfSelf: (family, role, options) => impl.prevOfSelf(family, role, options as any),
            nextOfSelf: (family, role, options) => impl.nextOfSelf(family, role, options as any),
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
