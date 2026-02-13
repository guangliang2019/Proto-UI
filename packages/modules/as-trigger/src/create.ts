import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import type { EventPort } from '@proto-ui/modules.event';

import type { AsTriggerFacade, AsTriggerModule } from './types';
import { AsTriggerModuleImpl } from './impl';

export function createAsTriggerModule(ctx: ModuleFactoryArgs): AsTriggerModule {
  const { init, caps, deps } = ctx;

  const eventPort = deps.requirePort<EventPort>('event');

  return createModule<'as-trigger', 'instance', AsTriggerFacade>({
    name: 'as-trigger',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new AsTriggerModuleImpl(caps, init.prototypeName, eventPort);

      return {
        facade: {
          apply: () => impl.apply(),
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
        },
      };
    },
  });
}

export const AsTriggerModuleDef = defineModule({
  name: 'as-trigger',
  deps: ['event'],
  create: createAsTriggerModule,
});
