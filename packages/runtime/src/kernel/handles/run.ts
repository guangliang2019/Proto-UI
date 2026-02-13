// packages/runtime/src/kernel/handles/run.ts
import { PropsBaseType } from '@proto-ui/types';
import type { ModuleOrchestratorFacadeView } from '../../orchestrator/module-orchestrator/types';
import { RunHandle } from '@proto-ui/core';
import { PropsFacade } from '@proto-ui/modules.props';
import { ContextFacade } from '@proto-ui/modules.context';

export const createRunHandle = <P extends PropsBaseType>(
  update: RunHandle<P>['update'],
  moduleHub: ModuleOrchestratorFacadeView
): RunHandle<P> => {
  const facades = moduleHub.getFacades();
  const props = facades['props'] as PropsFacade<P>;
  const context = facades['context'] as ContextFacade;

  return {
    update,
    props: {
      get: () => props.get(),
      getRaw: () => props.getRaw(),
      isProvided: (k: string) => props.isProvided(k),
    },
    context: {
      read: (key) => context.read(key),
      tryRead: (key) => context.tryRead(key),
      update: (key, next) => context.update(key, next),
      tryUpdate: (key, next) => context.tryUpdate(key, next),
    },
  };
};
