import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asToggle } from '../toggle';
import { SWITCH_FAMILY } from './shared';
import type { SwitchRootAsHookContract, SwitchRootExposes, SwitchRootProps } from './types';

function setupSwitchRoot(def: DefHandle<SwitchRootProps, SwitchRootExposes>): void {
  def.anatomy.claim(SWITCH_FAMILY, { role: 'root' });
  asToggle();
}

export const asSwitchRoot = defineAsHook<
  SwitchRootProps,
  SwitchRootExposes,
  SwitchRootAsHookContract
>({
  name: 'as-switch-root',
  mode: 'once',
  setup: setupSwitchRoot,
});

const switchRoot = definePrototype({
  name: 'base-switch-root',
  setup: setupSwitchRoot,
});

export default switchRoot;
