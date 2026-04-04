// packages/runtime/src/kernel/handles/run.ts
import { PropsBaseType } from '@proto.ui/types';
import type { ModuleOrchestratorFacadeView } from '../../orchestrator/module-orchestrator/types';
import { RunHandle } from '@proto.ui/core';
import { PropsFacade } from '@proto.ui/module-props';
import { ContextFacade } from '@proto.ui/module-context';
import { EventFacade } from '@proto.ui/module-event';
import { AnatomyFacade } from '@proto.ui/module-anatomy';

export const createRunHandle = <P extends PropsBaseType>(
  update: RunHandle<P>['update'],
  moduleHub: ModuleOrchestratorFacadeView
): RunHandle<P> => {
  const facades = moduleHub.getFacades();
  const props = facades['props'] as PropsFacade<P>;
  const context = facades['context'] as ContextFacade;
  const event = facades['event'] as EventFacade;
  const anatomy = facades['anatomy'] as AnatomyFacade | undefined;

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
    event: {
      emit: (key, payload, options) => event.emit(key, payload, options),
    },
    anatomy: {
      has: (family, role) => {
        if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
        return anatomy.has(family, role);
      },
      parts: ((family, options) => {
        if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
        return anatomy.parts(family, options as any);
      }) as RunHandle<P>['anatomy']['parts'],
      partsOf: ((family, role, options) => {
        if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
        return anatomy.partsOf(family, role, options as any);
      }) as RunHandle<P>['anatomy']['partsOf'],
      order: {
        version: ((family, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.version(family, options as any);
        }) as RunHandle<P>['anatomy']['order']['version'],
        parts: ((family, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.parts(family, options as any);
        }) as RunHandle<P>['anatomy']['order']['parts'],
        partsOf: ((family, role, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.partsOf(family, role, options as any);
        }) as RunHandle<P>['anatomy']['order']['partsOf'],
        indexOfSelf: ((family, role, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.indexOfSelf(family, role, options as any);
        }) as RunHandle<P>['anatomy']['order']['indexOfSelf'],
        prevOfSelf: ((family, role, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.prevOfSelf(family, role, options as any);
        }) as RunHandle<P>['anatomy']['order']['prevOfSelf'],
        nextOfSelf: ((family, role, options) => {
          if (!anatomy) throw new Error(`[Anatomy] module unavailable`);
          return anatomy.order.nextOfSelf(family, role, options as any);
        }) as RunHandle<P>['anatomy']['order']['nextOfSelf'],
      },
    },
  };
};
