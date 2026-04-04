import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { TABS_CONTEXT, TABS_FAMILY } from './shared';
import type { TabsRootAsHookContract, TabsRootExposes, TabsRootProps } from './types';

function setupTabsRoot(def: DefHandle<TabsRootProps, TabsRootExposes>): void {
  def.anatomy.claim(TABS_FAMILY, { role: 'root' });

  def.props.define({
    value: { type: 'string', empty: 'fallback' },
    defaultValue: { type: 'string', empty: 'fallback' },
    orientation: { type: 'string', empty: 'fallback', enum: ['horizontal', 'vertical'] },
    activationMode: { type: 'string', empty: 'fallback', enum: ['automatic', 'manual'] },
  });
  def.props.setDefaults({
    defaultValue: '',
    orientation: 'horizontal',
    activationMode: 'automatic',
  });

  const updateContext = def.context.provide(TABS_CONTEXT, {
    value: '',
    orientation: 'horizontal',
    activationMode: 'automatic',
    controlled: false,
  });
  const value = def.state.string('value', '');
  let currentOrientation: 'horizontal' | 'vertical' = 'horizontal';
  let currentActivationMode: 'automatic' | 'manual' = 'automatic';
  let controlled = false;

  def.expose.state('value', value);

  def.context.subscribe(TABS_CONTEXT, (_run, next) => {
    if (controlled) return;
    value.set(next.value, 'reason: context.subscribe => uncontrolled tabs value sync');
  });

  def.lifecycle.onCreated((run) => {
    controlled = run.props.isProvided('value');
    const initialValue = controlled
      ? (run.props.get().value ?? '')
      : (run.props.get().defaultValue ?? '');
    currentOrientation = run.props.get().orientation ?? 'horizontal';
    currentActivationMode = run.props.get().activationMode ?? 'automatic';
    value.set(initialValue, 'reason: lifecycle.onCreated => initialize tabs value');
    updateContext({
      value: value.get(),
      orientation: currentOrientation,
      activationMode: currentActivationMode,
      controlled,
    });
  });

  def.props.watch(['value', 'orientation', 'activationMode'], (run, next) => {
    controlled = run.props.isProvided('value');
    if (controlled) {
      value.set(next.value ?? '', 'reason: props.watch(value) => controlled tabs sync');
    }
    currentOrientation = next.orientation ?? 'horizontal';
    currentActivationMode = next.activationMode ?? 'automatic';
    updateContext({
      value: value.get(),
      orientation: currentOrientation,
      activationMode: currentActivationMode,
      controlled,
    });
  });
}

export const asTabsRoot = defineAsHook<TabsRootProps, TabsRootExposes, TabsRootAsHookContract>({
  name: 'as-tabs-root',
  mode: 'once',
  setup: setupTabsRoot,
});

const tabsRoot = definePrototype({
  name: 'base-tabs-root',
  setup: setupTabsRoot,
});

export default tabsRoot;
