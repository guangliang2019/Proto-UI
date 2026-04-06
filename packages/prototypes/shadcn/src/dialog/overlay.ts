import { definePrototype, tw } from '@proto.ui/core';
import { asDialogOverlay } from '@proto.ui/prototypes-base';
import type { ShadcnDialogOverlayExposes, ShadcnDialogOverlayProps } from './types';

const dialogOverlay = definePrototype<ShadcnDialogOverlayExposes, ShadcnDialogOverlayProps>({
  name: 'shadcn-dialog-overlay',
  setup(def) {
    asDialogOverlay();
    def.feedback.style.use(tw('fixed inset-0 z-50 bg-black/80'));
  },
});

export default dialogOverlay;
