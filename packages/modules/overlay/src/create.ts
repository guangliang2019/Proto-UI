import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';

import type { OverlayFacade, OverlayModule, OverlayPort } from './types';
import { OverlayModuleImpl } from './impl';

export function createOverlayModule(ctx: ModuleFactoryArgs): OverlayModule {
  const { init, caps, deps } = ctx;

  return createModule<'overlay', 'instance', OverlayFacade, OverlayPort>({
    name: 'overlay',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new OverlayModuleImpl(caps, init.prototypeName);

      return {
        facade: {
          getOverlay: () => impl.handle,
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
        },
        port: {
          configure: (patch) => impl.configure(patch),
          open: (reason) => impl.open(reason),
          close: (reason) => impl.close(reason),
          toggle: (reason) => impl.toggle(reason),
          isOpen: () => impl.isOpen(),
          getConfig: () => impl.getConfig(),
          getWarnings: () => impl.getWarnings(),
          getLastReason: () => impl.getLastReason(),
          getRegistration: () => impl.getRegistration(),
          registerTrigger: (target) => impl.registerTrigger(target),
          registerAnchor: (target) => impl.registerAnchor(target),
          registerContent: (target) => impl.registerContent(target),
        },
      };
    },
  }) as OverlayModule;
}

export const OverlayModuleDef = defineModule({
  name: 'overlay',
  create: createOverlayModule,
});
