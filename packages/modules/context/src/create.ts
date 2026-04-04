// packages/modules/context/src/create.ts
import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';

import type { ContextFacade, ContextModule, ContextPort } from './types';
import { ContextModuleImpl } from './impl';

export function createContextModule(ctx: ModuleFactoryArgs): ContextModule {
  const { init, caps, deps } = ctx;

  return createModule<'context', 'singleton', ContextFacade, ContextPort>({
    name: 'context',
    scope: 'singleton',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new ContextModuleImpl(caps, init.prototypeName);

      return {
        facade: {
          provide: (key, value) => impl.provide(key as any, value as any),
          subscribe: (key, cb) => impl.subscribe(key as any, cb as any),
          trySubscribe: (key, cb) => impl.trySubscribe(key as any, cb as any),

          read: (key, options) => impl.read(key as any, options),
          tryRead: (key, options) => impl.tryRead(key as any, options),
          update: (key, next, options) => impl.update(key as any, next as any, options),
          tryUpdate: (key, next, options) => impl.tryUpdate(key as any, next as any, options),
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          dispose: () => impl.dispose(),
        },
        port: {
          setCallbackDispatcher: (dispatch) => impl.setCallbackDispatcher(dispatch),
          dumpProviders: () => impl.portDumpProviders(),
          dumpSubscriptions: () => impl.portDumpSubscriptions(),
          dumpCallbackQueue: () => impl.portDumpCallbackQueue(),
        },
      };
    },
  });
}

export const ContextModuleDef = defineModule({
  name: 'context',
  deps: [],
  create: createContextModule,
});
