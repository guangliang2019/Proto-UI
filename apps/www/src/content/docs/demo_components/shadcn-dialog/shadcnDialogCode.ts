import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-shadcn-dialog': formatCode(`
<wc-shadcn-dialog-root class="relative inline-flex items-start">
  <wc-shadcn-dialog-trigger>Open Dialog</wc-shadcn-dialog-trigger>
  <wc-shadcn-dialog-mask></wc-shadcn-dialog-mask>
  <wc-shadcn-dialog-content>
    <wc-shadcn-dialog-title>Edit Profile</wc-shadcn-dialog-title>
    <wc-shadcn-dialog-description>
      Make changes to your profile here. Click save when you're done.
    </wc-shadcn-dialog-description>
    <div class="flex gap-2 justify-end">
      <wc-shadcn-dialog-close variant="outline">Cancel</wc-shadcn-dialog-close>
      <wc-shadcn-dialog-close>Save changes</wc-shadcn-dialog-close>
    </div>
  </wc-shadcn-dialog-content>
</wc-shadcn-dialog-root>
    `),
  },
  react: {
    'demo-shadcn-dialog': formatCode(`
import {
  ShadcnDialogRoot,
  ShadcnDialogTrigger,
  ShadcnDialogMask,
  ShadcnDialogContent,
  ShadcnDialogTitle,
  ShadcnDialogDescription,
  ShadcnDialogClose,
} from '@prototype-libs/shadcn';

export function DemoShadcnDialogDemo() {
  return (
    <ShadcnDialogRoot className="relative inline-flex items-start">
      <ShadcnDialogTrigger>Open Dialog</ShadcnDialogTrigger>
      <ShadcnDialogMask />
      <ShadcnDialogContent>
        <ShadcnDialogTitle>Edit Profile</ShadcnDialogTitle>
        <ShadcnDialogDescription>
          Make changes to your profile here. Click save when you're done.
        </ShadcnDialogDescription>
        <div className="flex gap-2 justify-end">
          <ShadcnDialogClose variant="outline">Cancel</ShadcnDialogClose>
          <ShadcnDialogClose>Save changes</ShadcnDialogClose>
        </div>
      </ShadcnDialogContent>
    </ShadcnDialogRoot>
  );
}
    `),
  },
  vue: {
    'demo-shadcn-dialog': formatCode(`
<script setup lang="ts">
import {
  ShadcnDialogRoot,
  ShadcnDialogTrigger,
  ShadcnDialogMask,
  ShadcnDialogContent,
  ShadcnDialogTitle,
  ShadcnDialogDescription,
  ShadcnDialogClose,
} from '@prototype-libs/shadcn';
</script>

<template>
  <ShadcnDialogRoot class="relative inline-flex items-start">
    <ShadcnDialogTrigger>Open Dialog</ShadcnDialogTrigger>
    <ShadcnDialogMask />
    <ShadcnDialogContent>
      <ShadcnDialogTitle>Edit Profile</ShadcnDialogTitle>
      <ShadcnDialogDescription>
        Make changes to your profile here. Click save when you're done.
      </ShadcnDialogDescription>
      <div class="flex gap-2 justify-end">
        <ShadcnDialogClose variant="outline">Cancel</ShadcnDialogClose>
        <ShadcnDialogClose>Save changes</ShadcnDialogClose>
      </div>
    </ShadcnDialogContent>
  </ShadcnDialogRoot>
</template>
    `),
  },
};
