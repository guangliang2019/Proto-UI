import { defineAsHook } from '@proto.ui/core';
import { asOpenState } from '../tools';
import {
  HOVER_CARD_CONTEXT,
  HOVER_CARD_FAMILY,
  registerHoverCardFamily,
  type HoverCardContextValue,
} from './shared';
import type {
  HoverCardRootAsHookContract,
  HoverCardRootExposes,
  HoverCardRootProps,
} from './types';

function deriveOpen(ctx: HoverCardContextValue): boolean {
  return ctx.triggerHovered || ctx.triggerFocused || ctx.contentHovered || ctx.contentFocused;
}

function sameContext(a: HoverCardContextValue, b: HoverCardContextValue): boolean {
  return (
    a.open === b.open &&
    a.controlled === b.controlled &&
    a.disabled === b.disabled &&
    a.triggerHovered === b.triggerHovered &&
    a.triggerFocused === b.triggerFocused &&
    a.contentHovered === b.contentHovered &&
    a.contentFocused === b.contentFocused
  );
}

export const asHoverCardRoot = defineAsHook<
  HoverCardRootProps,
  HoverCardRootExposes,
  HoverCardRootAsHookContract
>({
  name: 'as-hover-card-root',
  mode: 'once',
  setup(def) {
    registerHoverCardFamily(def as any);
    def.anatomy.claim(HOVER_CARD_FAMILY, { role: 'root' });

    const updateContext = def.context.provide(HOVER_CARD_CONTEXT, {
      open: false,
      controlled: false,
      disabled: false,
      triggerHovered: false,
      triggerFocused: false,
      contentHovered: false,
      contentFocused: false,
    });
    const openState = asOpenState({
      exposeOpenMethodKey: 'openHoverCard',
    });
    const open = openState.getState?.('open');
    const initialContext: HoverCardContextValue = {
      open: false,
      controlled: false,
      disabled: false,
      triggerHovered: false,
      triggerFocused: false,
      contentHovered: false,
      contentFocused: false,
    };
    let snapshot: HoverCardContextValue = initialContext;
    let published: HoverCardContextValue = initialContext;

    const syncContext = () => {
      const next = {
        ...snapshot,
        open: open?.get() ?? false,
      };
      snapshot = next;
      if (sameContext(published, next)) return;
      published = next;
      updateContext(next);
    };

    def.context.subscribe(HOVER_CARD_CONTEXT, (_run, next) => {
      snapshot = next;
      published = next;
      if (!snapshot.controlled) {
        open?.set(deriveOpen(snapshot), 'reason: hover-card context sync => open');
      }
    });

    def.lifecycle.onCreated((run) => {
      snapshot = {
        ...snapshot,
        controlled: run.props.isProvided('open'),
        disabled: !!run.props.get().disabled,
      };
      syncContext();
    });

    def.props.watch(['open', 'disabled'], (run, next) => {
      snapshot = {
        ...snapshot,
        controlled: run.props.isProvided('open'),
        disabled: !!next.disabled,
      };
      syncContext();
    });

    open?.watch((_run, event) => {
      if (event.type !== 'next') return;
      syncContext();
    });
  },
});
