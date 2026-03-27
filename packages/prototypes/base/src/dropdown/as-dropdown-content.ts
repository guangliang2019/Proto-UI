import { asOverlay, defineAsHook, tw } from '@proto.ui/core';
import { DROPDOWN_CONTEXT, DROPDOWN_FAMILY, registerDropdownFamily } from './shared';
import type {
  DropdownContentAsHookContract,
  DropdownContentExposes,
  DropdownContentProps,
} from './types';

export const asDropdownContent = defineAsHook<
  DropdownContentProps,
  DropdownContentExposes,
  DropdownContentAsHookContract
>({
  name: 'as-dropdown-content',
  mode: 'once',
  setup(def) {
    registerDropdownFamily(def as any);
    def.anatomy.claim(DROPDOWN_FAMILY, { role: 'content' });

    const overlay = asOverlay({
      closeOnEscape: true,
      closeOnOutsidePress: true,
      closeOnFocusOutside: true,
      restore: 'trigger',
      entry: 'content',
    });
    const open = def.state.bool('open', false);

    def.expose.state('open', open);
    def.context.subscribe(DROPDOWN_CONTEXT, (_run, next) => {
      open.set(next.open, 'reason: dropdown context sync => content open');
      if (next.open) {
        overlay.openOverlay('controlled.sync');
        return;
      }
      overlay.close('controlled.sync');
    });

    def.lifecycle.onMounted((run) => {
      const ctx = run.context.read(DROPDOWN_CONTEXT);
      open.set(ctx.open, 'reason: lifecycle.onMounted => content open sync');
      if (ctx.open) {
        overlay.openOverlay('controlled.sync');
      } else {
        overlay.close('controlled.sync');
      }
    });

    def.rule({
      when: (w: any) => w.state(open).eq(false),
      intent: (i: any) => i.feedback.style.use(tw('hidden')),
    });
  },
});
