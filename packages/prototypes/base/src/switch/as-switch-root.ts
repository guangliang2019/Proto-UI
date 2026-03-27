import { defineAsHook } from '@proto.ui/core';
import { asToggle } from '../toggle/as-toggle';
import { registerSwitchFamily, SWITCH_FAMILY } from './shared';
import type { SwitchRootAsHookContract, SwitchRootExposes, SwitchRootProps } from './types';

export const asSwitchRoot = defineAsHook<
  SwitchRootProps,
  SwitchRootExposes,
  SwitchRootAsHookContract
>({
  name: 'as-switch-root',
  mode: 'once',
  setup(def) {
    registerSwitchFamily(def as any);
    def.anatomy.claim(SWITCH_FAMILY, { role: 'root' });
    asToggle();
  },
});
