import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-base-hover-card': formatCode(`
<wc-base-hover-card-root class="relative inline-flex items-start">
  <wc-base-hover-card-trigger class="rounded border px-3 py-1.5">
    Hover me
  </wc-base-hover-card-trigger>
  <wc-base-hover-card-content class="mt-3 w-72 rounded border bg-white p-3 shadow">
    Base hover-card content. Move pointer between trigger and content to keep it open.
  </wc-base-hover-card-content>
</wc-base-hover-card-root>
    `),
  },
  react: {
    'demo-base-hover-card': formatCode(`
import {
  BaseHoverCardRoot,
  BaseHoverCardTrigger,
  BaseHoverCardContent,
} from '@prototype-libs/base';

export function DemoBaseHoverCardDemo() {
  return (
    <BaseHoverCardRoot className="relative inline-flex items-start">
      <BaseHoverCardTrigger className="rounded border px-3 py-1.5">
        Hover me
      </BaseHoverCardTrigger>
      <BaseHoverCardContent className="mt-3 w-72 rounded border bg-white p-3 shadow">
        Base hover-card content. Move pointer between trigger and content to keep it open.
      </BaseHoverCardContent>
    </BaseHoverCardRoot>
  );
}
    `),
  },
  vue: {
    'demo-base-hover-card': formatCode(`
<script setup lang="ts">
import {
  BaseHoverCardRoot,
  BaseHoverCardTrigger,
  BaseHoverCardContent,
} from '@prototype-libs/base';
</script>

<template>
  <BaseHoverCardRoot class="relative inline-flex items-start">
    <BaseHoverCardTrigger class="rounded border px-3 py-1.5">
      Hover me
    </BaseHoverCardTrigger>
    <BaseHoverCardContent class="mt-3 w-72 rounded border bg-white p-3 shadow">
      Base hover-card content. Move pointer between trigger and content to keep it open.
    </BaseHoverCardContent>
  </BaseHoverCardRoot>
</template>
    `),
  },
};
