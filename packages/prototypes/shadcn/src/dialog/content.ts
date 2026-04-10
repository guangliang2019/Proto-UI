import { definePrototype, tw } from '@proto.ui/core';
import { asDialogContent } from '@proto.ui/prototypes-base';
import type { ShadcnDialogContentExposes, ShadcnDialogContentProps } from './types';

const dialogContent = definePrototype<ShadcnDialogContentExposes, ShadcnDialogContentProps>({
  name: 'shadcn-dialog-content',
  setup(def) {
    asDialogContent();
    def.feedback.style.use(
      tw(
        'fixed left-1/2 top-1/2 grid w-full max-w-lg gap-4 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background p-6 shadow-lg'
      )
    );
  },
});

export default dialogContent;
