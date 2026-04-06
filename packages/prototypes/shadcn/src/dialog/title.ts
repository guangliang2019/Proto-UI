import { definePrototype, tw } from '@proto.ui/core';
import { asDialogTitle } from '@proto.ui/prototypes-base';
import type { ShadcnDialogTitleExposes, ShadcnDialogTitleProps } from './types';

const dialogTitle = definePrototype<ShadcnDialogTitleExposes, ShadcnDialogTitleProps>({
  name: 'shadcn-dialog-title',
  setup(def) {
    asDialogTitle();
    def.feedback.style.use(tw('text-lg font-semibold leading-none tracking-tight'));
  },
});

export default dialogTitle;
