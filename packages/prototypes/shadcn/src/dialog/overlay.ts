import { definePrototype, tw } from '@proto.ui/core';
import { asDialogMask } from '@proto.ui/prototypes-base';
import type { ShadcnDialogMaskExposes, ShadcnDialogMaskProps } from './types';

const dialogMask = definePrototype<ShadcnDialogMaskExposes, ShadcnDialogMaskProps>({
  name: 'shadcn-dialog-mask',
  setup(def) {
    asDialogMask();
    def.feedback.style.use(tw('fixed inset-0 z-50 bg-black/80'));
  },
});

export default dialogMask;
