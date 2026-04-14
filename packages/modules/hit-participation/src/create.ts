import { createModule, defineModule } from '@proto.ui/module-base';
import type { ModuleFactoryArgs } from '@proto.ui/module-base';
import type { HitParticipationFacade, HitParticipationPort } from './types';
import { HitParticipationModuleImpl } from './impl';

export function createHitParticipationModule(ctx: ModuleFactoryArgs) {
  const { init, caps, deps } = ctx;

  return createModule<
    'hit-participation',
    'instance',
    HitParticipationFacade,
    HitParticipationPort
  >({
    name: 'hit-participation',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ init, caps }) => {
      const impl = new HitParticipationModuleImpl(caps, init.prototypeName);

      return {
        facade: {
          getHitParticipation: () => impl.handle,
        },
        hooks: {
          onProtoPhase: (phase) => impl.onProtoPhase(phase),
        },
        port: {
          configure: (patch) => impl.configure(patch),
          registerRegion: (target, options) => impl.registerRegion(target, options),
          unregisterRegion: (target) => impl.unregisterRegion(target),
          getConfig: () => impl.getConfig(),
          getWarnings: () => impl.getWarnings(),
          getRegions: () => impl.getRegions(),
        },
      };
    },
  });
}

export const HitParticipationModuleDef = defineModule({
  name: 'hit-participation',
  create: createHitParticipationModule,
});
