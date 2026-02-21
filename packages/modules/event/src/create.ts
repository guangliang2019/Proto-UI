// packages/modules/event/src/create.ts
import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';

import type { EventFacade, EventModule, EventPort } from './types';
import { EventModuleImpl } from './impl';

export function createEventModule(ctx: ModuleFactoryArgs): EventModule {
  const { init, caps, deps } = ctx;

  return createModule<'event', 'instance', EventFacade, EventPort>({
    name: 'event',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new EventModuleImpl(caps, init.prototypeName);

      return {
        facade: {
          on: (type, options) => impl.on(type, options),
          onGlobal: (type, options) => impl.onGlobal(type, options),
          off: (token) => impl.off(token),
          registerExposeEvent: (key, spec) => impl.registerExposeEvent(key, spec),
          emit: (key, payload, options) => impl.emit(key, payload, options),
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
        },
        port: {
          bind: (dispatch) => impl.bind(dispatch),
          unbind: () => impl.unbind(),
          getDiagnostics: () => impl.getDiagnostics(),
          redirectRoot: (target) => impl.redirectRoot(target),
        },
      };
    },
  });
}

export const EventModuleDef = defineModule({
  name: 'event',
  deps: [],
  create: createEventModule,
});
