import type { ModuleInstance } from '@proto-ui/core';

export type RuleMetaFacade = {};

export type RuleMetaModule = ModuleInstance<RuleMetaFacade> & {
  name: 'rule-meta';
  scope: 'instance';
};
