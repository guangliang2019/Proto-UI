import { cap } from '@proto.ui/core';

export type RuleExposeStateWebNativeVariantPolicyArgs = {
  semantic?: string;
  variant: string;
};

export type RuleExposeStateWebNativeVariantPolicy = (
  args: RuleExposeStateWebNativeVariantPolicyArgs
) => boolean;

export const RULE_EXPOSE_STATE_WEB_NATIVE_VARIANT_POLICY_CAP =
  cap<RuleExposeStateWebNativeVariantPolicy>('@proto.ui/rule-expose-state-web/nativeVariantPolicy');
