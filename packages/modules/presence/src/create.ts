import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';
import { PresenceModuleImpl } from './impl';
import type { PresenceFacade, PresencePort } from './types';

export function createPresenceModule(
  ctx: ModuleFactoryArgs
): ReturnType<typeof createModule<'presence', 'instance', PresenceFacade, PresencePort>> {
  const { init, caps } = ctx;
  const impl = new PresenceModuleImpl(caps);

  return createModule<'presence', 'instance', PresenceFacade, PresencePort>({
    name: 'presence',
    scope: 'instance',
    init,
    caps,
    deps: ctx.deps,
    build: () => ({
      facade: {
        createHandle: (policy) => impl.createHandle(policy),
      },
      hooks: {},
      port: {
        awaitMount: () => impl.awaitMount(),
        awaitUnmount: () => impl.awaitUnmount(),
      },
    }),
  }) as any;
}

export const PresenceModuleDef = defineModule({
  name: 'presence',
  deps: [],
  create: createPresenceModule,
});
