import { definePrototype, tw } from '@proto.ui/core';
import { asDialogDescription } from '@proto.ui/prototypes-base';
import type { ShadcnDialogDescriptionExposes, ShadcnDialogDescriptionProps } from './types';

const dialogDescription = definePrototype<
  ShadcnDialogDescriptionExposes,
  ShadcnDialogDescriptionProps
>({
  name: 'shadcn-dialog-description',
  setup(def) {
    asDialogDescription();
    def.feedback.style.use(tw('text-sm text-muted-foreground'));
  },
});

export default dialogDescription;
