import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import { SYS_CAP } from '@proto-ui/modules.base';

import { StateModuleImpl } from './impl';
import type { StateFacade, StateModule, StatePort } from './types';

export function createStateModule(ctx: ModuleFactoryArgs): StateModule {
  const { init, caps, deps } = ctx;

  return createModule<'state', 'instance', StateFacade, StatePort>({
    name: 'state',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ caps }) => {
      const sys = caps.get(SYS_CAP);
      const impl = new StateModuleImpl(sys);

      return {
        facade: impl.facade,
        port: impl.port,
        hooks: {
          dispose: () => impl.dispose(),
        },
      };
    },
  });
}

export const StateModuleDef = defineModule({
  name: 'state',
  deps: [],
  create: createStateModule,
});
