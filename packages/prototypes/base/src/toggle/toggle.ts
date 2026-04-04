import type { DefHandle } from '@proto.ui/core';
import { defineAsHook, definePrototype } from '@proto.ui/core';
import { asButton } from '../button';
import type { ToggleAsHookContract, ToggleExposes, ToggleProps, ToggleStateHandles } from './types';

export type { ToggleProps, ToggleExposes, ToggleStateHandles, ToggleAsHookContract } from './types';

function setupToggle(def: DefHandle<ToggleProps, ToggleExposes>): void {
  asButton();

  def.props.define({
    checked: { type: 'boolean', empty: 'fallback' },
    defaultChecked: { type: 'boolean', empty: 'fallback' },
    disabled: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    defaultChecked: false,
    disabled: false,
  });

  const checked = def.state.fromAccessibility('checked');
  const disabled = def.state.fromInteraction('disabled');
  def.expose.state('checked', checked);
  def.expose.event('checkedChange', { payload: 'json' });

  let controlled = false;

  def.lifecycle.onCreated((run) => {
    controlled = run.props.isProvided('checked');
    checked.set(
      controlled ? !!run.props.get().checked : !!run.props.get().defaultChecked,
      'reason: lifecycle.onCreated => initialize checked'
    );
  });

  def.props.watch(['checked'], (run, next) => {
    controlled = run.props.isProvided('checked');
    if (!controlled) return;
    checked.set(!!next.checked, 'reason: props.watch(checked) => controlled sync');
  });

  def.event.on('press.commit', (run) => {
    if (disabled.get()) return;

    if (controlled) {
      const nextChecked = !checked.get();
      run.event.emit('checkedChange', { checked: nextChecked });
      return;
    }

    const nextChecked = !checked.get();
    checked.set(nextChecked, 'reason: event.on(press.commit) => toggle checked');
    run.event.emit('checkedChange', { checked: nextChecked });
  });
}

export const asToggle = defineAsHook<ToggleProps, ToggleExposes, ToggleAsHookContract>({
  name: 'as-toggle',
  mode: 'once',
  setup: setupToggle,
});

const toggle = definePrototype({
  name: 'base-toggle',
  setup: setupToggle,
});

export default toggle;
