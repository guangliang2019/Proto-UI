import { createModule, defineModule, ModuleBase } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs, ModuleDeps } from '@proto-ui/modules.base';
import type { RulePort } from '@proto-ui/modules.rule';
import type { RuleMetaFacade, RuleMetaModule } from './types';
import { RULE_META_GET_CAP } from './caps';

class RuleMetaModuleImpl extends ModuleBase {
  private readonly rulePort: RulePort<any>;

  constructor(caps: any, deps: ModuleDeps) {
    super(caps);
    this.rulePort = deps.requirePort<RulePort<any>>('rule');
    this.rulePort.registerExtension({
      beforePlan: (ctx) => {
        if (ctx.readMeta) return { kind: 'continue' };
        const getter = this.caps.has(RULE_META_GET_CAP) ? this.caps.get(RULE_META_GET_CAP) : null;
        if (!getter) return { kind: 'continue' };
        ctx.readMeta = (key: string) => getter(key);
        return { kind: 'continue' };
      },
    });
  }
}

export function createRuleMetaModule(ctx: ModuleFactoryArgs): RuleMetaModule {
  const { init, caps, deps } = ctx;

  return createModule<'rule-meta', 'instance', RuleMetaFacade>({
    name: 'rule-meta',
    scope: 'instance',
    init,
    caps,
    deps,
    build: ({ caps, deps }) => {
      const impl = new RuleMetaModuleImpl(caps, deps);
      return {
        facade: {},
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
        },
      };
    },
  }) as any;
}

export const RuleMetaModuleDef = defineModule({
  name: 'rule-meta',
  deps: ['rule'],
  create: createRuleMetaModule,
});
