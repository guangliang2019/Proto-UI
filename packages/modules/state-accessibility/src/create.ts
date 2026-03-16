import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import type { AccessibilityStateName } from '@proto-ui/core';
import type { StateFacade, StatePort } from '@proto-ui/modules.state';
import type { StateAccessibilityFacade, StateAccessibilityModule } from './types';

class StateAccessibilityModuleImpl {
  private readonly handles = new Map<AccessibilityStateName, any>();

  constructor(
    private readonly stateFacade: StateFacade,
    private readonly statePort: StatePort
  ) {}

  get(name: AccessibilityStateName) {
    const existing = this.handles.get(name);
    if (existing) return existing;

    const owned = this.stateFacade.bool(`@accessibility/${name}`, false);
    const borrowed = this.statePort.createBorrowedHandle(owned as any);
    (borrowed as any).__stateId = (owned as any).__stateId;
    (borrowed as any).__stateSemantic = (owned as any).__stateSemantic;
    (borrowed as any).__stateKind = (owned as any).__stateKind;
    (borrowed as any).__stateSpec = (owned as any).__stateSpec;

    this.handles.set(name, borrowed);
    return borrowed;
  }
}

export function createStateAccessibilityModule(ctx: ModuleFactoryArgs): StateAccessibilityModule {
  const { init, caps, deps } = ctx;

  return createModule<'state-accessibility', 'instance', StateAccessibilityFacade>({
    name: 'state-accessibility',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ deps }) => {
      const stateFacade = deps.requireFacade<StateFacade>('state');
      const statePort = deps.requirePort<StatePort>('state');
      const impl = new StateAccessibilityModuleImpl(stateFacade, statePort);

      return {
        facade: {
          get: (name) => impl.get(name),
        },
      };
    },
  });
}

export const StateAccessibilityModuleDef = defineModule({
  name: 'state-accessibility',
  deps: ['state'],
  create: createStateAccessibilityModule,
});
