import { asOverlay, defineAsHook, tw } from '@proto-ui/core';
import { HOVER_CARD_CONTEXT, HOVER_CARD_FAMILY, registerHoverCardFamily } from './shared';
import type {
  HoverCardContentAsHookContract,
  HoverCardContentExposes,
  HoverCardContentProps,
} from './types';

function deriveOpen(next: {
  open: boolean;
  controlled: boolean;
  triggerHovered: boolean;
  triggerFocused: boolean;
  contentHovered: boolean;
  contentFocused: boolean;
}): boolean {
  if (next.controlled) return next.open;
  return next.triggerHovered || next.triggerFocused || next.contentHovered || next.contentFocused;
}

export const asHoverCardContent = defineAsHook<
  HoverCardContentProps,
  HoverCardContentExposes,
  HoverCardContentAsHookContract
>({
  name: 'as-hover-card-content',
  mode: 'once',
  setup(def) {
    registerHoverCardFamily(def as any);
    def.anatomy.claim(HOVER_CARD_FAMILY, { role: 'content' });

    const overlay = asOverlay({
      closeOnEscape: true,
      closeOnOutsidePress: true,
      closeOnFocusOutside: true,
      restore: 'trigger',
      entry: 'content',
      placement: 'bottom',
      sideOffset: 8,
      meta: {
        overlayKind: 'hover-card',
      },
    });
    const open = def.state.bool('open', false);

    def.expose.state('open', open);
    def.context.subscribe(HOVER_CARD_CONTEXT, (_run, next) => {
      const nextOpen = deriveOpen(next);
      open.set(nextOpen, 'reason: hover-card context sync => content open');
      if (nextOpen) {
        overlay.openOverlay('trigger.hover');
        return;
      }
      overlay.close('controlled.sync');
    });

    def.lifecycle.onMounted((run) => {
      const ctx = run.context.read(HOVER_CARD_CONTEXT);
      const nextOpen = deriveOpen(ctx);
      open.set(nextOpen, 'reason: lifecycle.onMounted => hover-card content open sync');
      if (nextOpen) {
        overlay.openOverlay('trigger.hover');
      } else {
        overlay.close('controlled.sync');
      }
    });

    const updateFlags = (
      run: any,
      patch: Partial<{
        contentHovered: boolean;
        contentFocused: boolean;
      }>
    ) => {
      run.context.update(HOVER_CARD_CONTEXT, (prev: any) => ({ ...prev, ...patch }));
    };

    def.event.on('pointer.enter', (run) => {
      updateFlags(run, { contentHovered: true });
    });
    def.event.on('pointer.leave', (run) => {
      updateFlags(run, { contentHovered: false });
    });
    def.event.on('native:focus', (run) => {
      updateFlags(run, { contentFocused: true });
    });
    def.event.on('native:blur', (run) => {
      updateFlags(run, { contentFocused: false });
    });

    def.rule({
      when: (w: any) => w.state(open).eq(false),
      intent: (i: any) => i.feedback.style.use(tw('hidden')),
    });
  },
});
