// packages/modules/rule/src/create.ts
import { createModule, defineModule } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import type { PropsBaseType } from '@proto-ui/types';

import type { RuleFacade, RuleModule, RulePort } from './types';
import { RuleModuleImpl } from './impl';
import type { PropsFacade, PropsPort } from '@proto-ui/modules.props';
import type { StatePort } from '@proto-ui/modules.state';
import type { FeedbackPort } from '@proto-ui/modules.feedback';
import type { ContextFacade } from '@proto-ui/modules.context';

export function createRuleModule<Props extends PropsBaseType>(
  ctx: ModuleFactoryArgs
): RuleModule<Props> {
  const { init, caps, deps } = ctx;

  return createModule<'rule', 'instance', RuleFacade<Props>, RulePort<Props>>({
    name: 'rule',
    scope: 'instance',
    init,
    caps,
    deps,
    build: () => {
      const impl = new RuleModuleImpl<Props>();

      const resolveDeps = () => ({
        propsFacade: deps.tryFacade<PropsFacade<Props>>('props'),
        propsPort: deps.tryPort<PropsPort<Props>>('props'),
        statePort: deps.tryPort<StatePort>('state'),
        feedbackPort: deps.tryPort<FeedbackPort>('feedback'),
        contextFacade: deps.tryFacade<ContextFacade>('context'),
      });

      impl.attachExecutor(resolveDeps);

      return {
        facade: {
          rule: (spec) => impl.define(spec as any),
        },
        port: {
          exportIR: () => impl.exportIR(),
          resolveStateHandle: (id) => impl.resolveStateHandle(id),
          evaluate: (ctx) => impl.evaluate(ctx as any),
          registerExtension: (ext) => impl.registerExtension(ext as any),
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          dispose: () => impl.dispose(),
        },
      };
    },
  });
}

export const RuleModuleDef = defineModule({
  name: 'rule',
  deps: [],
  optionalDeps: ['props', 'state', 'context', 'feedback'],
  create: createRuleModule,
});
