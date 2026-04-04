import { defineAsHook, definePrototype, tw, type DefHandle } from '@proto.ui/core';
import { TABS_CONTEXT, TABS_FAMILY } from './shared';
import type { TabsContentAsHookContract, TabsContentExposes, TabsContentProps } from './types';

function syncCurrentFromContext(
  nextValue: string,
  ownValue: string,
  current: { set(value: boolean, reason?: string): void }
): void {
  current.set(ownValue === nextValue, 'reason: tabs context sync => current');
}

function setupTabsContent(def: DefHandle<TabsContentProps, TabsContentExposes>): void {
  def.anatomy.claim(TABS_FAMILY, { role: 'content' });
  const current = def.state.fromAccessibility('current');

  def.props.define({
    value: { type: 'string', empty: 'fallback' },
  });
  def.props.setDefaults({
    value: '',
  });

  let ownValue = '';
  def.expose.state('current', current);

  def.context.subscribe(TABS_CONTEXT, (_run, next) => {
    syncCurrentFromContext(next.value, ownValue, current);
  });

  def.lifecycle.onMounted((run) => {
    ownValue = run.props.get().value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    syncCurrentFromContext(ctx.value, ownValue, current);
  });

  def.props.watch(['value'], (run, next) => {
    ownValue = next.value ?? '';
    const ctx = run.context.read(TABS_CONTEXT);
    syncCurrentFromContext(ctx.value, ownValue, current);
  });

  def.rule({
    when: (w: any) => w.state(current).eq(false),
    intent: (i: any) => i.feedback.style.use(tw('hidden')),
  });
}

export const asTabsContent = defineAsHook<
  TabsContentProps,
  TabsContentExposes,
  TabsContentAsHookContract
>({
  name: 'as-tabs-content',
  mode: 'once',
  setup: setupTabsContent,
});

const tabsContent = definePrototype({
  name: 'base-tabs-content',
  setup: setupTabsContent,
});

export default tabsContent;
