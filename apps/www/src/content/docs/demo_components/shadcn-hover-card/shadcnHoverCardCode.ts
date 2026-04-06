import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-shadcn-hover-card': formatCode(`
<wc-shadcn-hover-card-root class="relative inline-flex items-start">
  <wc-shadcn-hover-card-trigger>@proto-ui</wc-shadcn-hover-card-trigger>
  <wc-shadcn-hover-card-content class="mt-3">
    Build headless protocols once, then skin them per host.
  </wc-shadcn-hover-card-content>
</wc-shadcn-hover-card-root>
    `),
  },
  react: {
    'demo-shadcn-hover-card': formatCode(`
import {
  ShadcnHoverCardRoot,
  ShadcnHoverCardTrigger,
  ShadcnHoverCardContent,
} from '@prototype-libs/shadcn';

export function DemoShadcnHoverCardDemo() {
  return (
    <ShadcnHoverCardRoot className="relative inline-flex items-start">
      <ShadcnHoverCardTrigger>@proto-ui</ShadcnHoverCardTrigger>
      <ShadcnHoverCardContent className="mt-3">
        Build headless protocols once, then skin them per host.
      </ShadcnHoverCardContent>
    </ShadcnHoverCardRoot>
  );
}
    `),
  },
  vue: {
    'demo-shadcn-hover-card': formatCode(`
<script setup lang="ts">
import {
  ShadcnHoverCardRoot,
  ShadcnHoverCardTrigger,
  ShadcnHoverCardContent,
} from '@prototype-libs/shadcn';
</script>

<template>
  <ShadcnHoverCardRoot class="relative inline-flex items-start">
    <ShadcnHoverCardTrigger>@proto-ui</ShadcnHoverCardTrigger>
    <ShadcnHoverCardContent class="mt-3">
      Build headless protocols once, then skin them per host.
    </ShadcnHoverCardContent>
  </ShadcnHoverCardRoot>
</template>
    `),
  },
};
