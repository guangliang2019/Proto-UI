import { defineAsHook } from '@proto.ui/core';
import { asToggle } from '../toggle/as-toggle';
import { SWITCH_FAMILY } from './shared';
import type { SwitchRootAsHookContract, SwitchRootExposes, SwitchRootProps } from './types';

export const asSwitchRoot = defineAsHook<
  SwitchRootProps,
  SwitchRootExposes,
  SwitchRootAsHookContract
>({
  name: 'as-switch-root',
  mode: 'once',
  setup(def) {
    def.anatomy.claim(SWITCH_FAMILY, { role: 'root' });
    asToggle();
  },
});
