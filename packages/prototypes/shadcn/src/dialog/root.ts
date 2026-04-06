import { definePrototype, tw } from '@proto.ui/core';
import { asDialogRoot } from '@proto.ui/prototypes-base';
import type { ShadcnDialogRootExposes, ShadcnDialogRootProps } from './types';

const dialogRoot = definePrototype<ShadcnDialogRootProps, ShadcnDialogRootExposes>({
  name: 'shadcn-dialog-root',
  setup(def) {
    asDialogRoot();
    def.feedback.style.use(tw('relative inline-flex items-start'));
  },
});

export default dialogRoot;
