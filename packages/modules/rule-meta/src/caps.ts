import { cap } from '@proto.ui/core';

export type RuleMetaGetter = (key: string) => unknown;

export const RULE_META_GET_CAP = cap<RuleMetaGetter>('@proto.ui/rule-meta/get');
