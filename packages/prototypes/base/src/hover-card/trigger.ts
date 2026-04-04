import { defineAsHook, definePrototype, type DefHandle } from '@proto.ui/core';
import { asButton } from '../button';
import { HOVER_CARD_CONTEXT, HOVER_CARD_FAMILY } from './shared';
import type {
  HoverCardTriggerAsHookContract,
  HoverCardTriggerExposes,
  HoverCardTriggerProps,
} from './types';

function setupHoverCardTrigger(
  def: DefHandle<HoverCardTriggerProps, HoverCardTriggerExposes>
): void {
  def.anatomy.claim(HOVER_CARD_FAMILY, { role: 'trigger' });
  asButton();

  def.props.define({
    disabled: { type: 'boolean', empty: 'fallback' },
  });
  def.props.setDefaults({
    disabled: false,
  });

  def.context.subscribe(HOVER_CARD_CONTEXT);

  const updateFlags = (
    run: any,
    patch: Partial<{
      triggerHovered: boolean;
      triggerFocused: boolean;
    }>
  ) => {
    const ownDisabled = !!run.props.get().disabled;
    const ctx = run.context.read(HOVER_CARD_CONTEXT);
    if (ownDisabled || ctx.disabled) {
      run.context.update(HOVER_CARD_CONTEXT, (prev: any) => ({
        ...prev,
        triggerHovered: false,
        triggerFocused: false,
      }));
      return;
    }
    run.context.update(HOVER_CARD_CONTEXT, (prev: any) => ({ ...prev, ...patch }));
  };

  def.event.on('pointer.enter', (run) => {
    updateFlags(run, { triggerHovered: true });
  });
  def.event.on('pointer.leave', (run) => {
    updateFlags(run, { triggerHovered: false });
  });
  def.event.on('native:focus', (run) => {
    updateFlags(run, { triggerFocused: true });
  });
  def.event.on('native:blur', (run) => {
    updateFlags(run, { triggerFocused: false });
  });
}

export const asHoverCardTrigger = defineAsHook<
  HoverCardTriggerProps,
  HoverCardTriggerExposes,
  HoverCardTriggerAsHookContract
>({
  name: 'as-hover-card-trigger',
  mode: 'once',
  setup: setupHoverCardTrigger,
});

const hoverCardTrigger = definePrototype({
  name: 'base-hover-card-trigger',
  setup: setupHoverCardTrigger,
});

export default hoverCardTrigger;
