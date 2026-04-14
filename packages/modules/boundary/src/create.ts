import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';
import type { BoundaryFacade, BoundaryPort } from './types';
import { BoundaryModuleImpl } from './impl';

export function createBoundaryModule(ctx: ModuleFactoryArgs) {
  const { init, caps, deps } = ctx;

  return createModule<'boundary', 'instance', BoundaryFacade, BoundaryPort>({
    name: 'boundary',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new BoundaryModuleImpl(caps, init.prototypeName);

      return {
        facade: {
          getBoundary: () => impl.handle,
        },
        hooks: {
          onProtoPhase: (phase) => impl.onProtoPhase(phase),
        },
        port: {
          configure: (patch) => impl.configure(patch),
          setStackActive: (active) => impl.setStackActive(active),
          registerRegion: (target, options) => impl.registerRegion(target, options),
          unregisterRegion: (target) => impl.unregisterRegion(target),
          classify: (sample) => impl.classify(sample),
          notify: (sample) => impl.notify(sample),
          subscribeOutside: (cb) => impl.subscribeOutside(cb),
          getConfig: () => impl.getConfig(),
          getWarnings: () => impl.getWarnings(),
          getRegions: () => impl.getRegions(),
        },
      };
    },
  });
}

export const BoundaryModuleDef = defineModule({
  name: 'boundary',
  create: createBoundaryModule,
});
