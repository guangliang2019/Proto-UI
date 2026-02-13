import type { ModuleInstance, ModulePort } from '@proto-ui/core';

export type RuleExposeStateWebFacade = {};

export type RuleExposeStateWebPort = ModulePort & {};

export type RuleExposeStateWebModule = ModuleInstance<RuleExposeStateWebFacade> & {
  name: 'rule-expose-state-web';
  scope: 'instance';
};
