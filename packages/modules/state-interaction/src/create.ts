import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import type { InteractionStateName } from '@proto-ui/core';
import type { StateFacade, StatePort } from '@proto-ui/modules.state';
import type { StateInteractionFacade, StateInteractionModule } from './types';

class StateInteractionModuleImpl {
  private readonly handles = new Map<InteractionStateName, any>();

  constructor(
    private readonly stateFacade: StateFacade,
    private readonly statePort: StatePort
  ) {}

  get(name: InteractionStateName) {
    const existing = this.handles.get(name);
    if (existing) return existing;

    const owned = this.stateFacade.bool(`@interaction/${name}`, false);
    const borrowed = this.statePort.createBorrowedHandle(owned as any);
    (borrowed as any).__stateId = (owned as any).__stateId;
    (borrowed as any).__stateSemantic = (owned as any).__stateSemantic;
    (borrowed as any).__stateKind = (owned as any).__stateKind;
    (borrowed as any).__stateSpec = (owned as any).__stateSpec;

    this.handles.set(name, borrowed);
    return borrowed;
  }
}

export function createStateInteractionModule(ctx: ModuleFactoryArgs): StateInteractionModule {
  const { init, caps, deps } = ctx;

  return createModule<'state-interaction', 'instance', StateInteractionFacade>({
    name: 'state-interaction',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ deps }) => {
      const stateFacade = deps.requireFacade<StateFacade>('state');
      const statePort = deps.requirePort<StatePort>('state');
      const impl = new StateInteractionModuleImpl(stateFacade, statePort);

      return {
        facade: {
          get: (name) => impl.get(name),
        },
      };
    },
  });
}

export const StateInteractionModuleDef = defineModule({
  name: 'state-interaction',
  deps: ['state'],
  create: createStateInteractionModule,
});
