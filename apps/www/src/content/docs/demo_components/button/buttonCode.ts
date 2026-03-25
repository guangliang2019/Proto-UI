import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-button': formatCode(`
<div class="flex flex-wrap items-center gap-3">
  <wc-shadcn-button>Default</wc-shadcn-button>
  <div>
    <wc-shadcn-button>Default2</wc-shadcn-button>
  </div>
  <wc-shadcn-button variant="outline">Outline</wc-shadcn-button>
  <wc-shadcn-button variant="destructive">Destructive</wc-shadcn-button>
  <wc-shadcn-button variant="ghost" size="icon">+</wc-shadcn-button>
  <wc-shadcn-button disabled>Disabled</wc-shadcn-button>
</div>
    `),
    'demo-Secondray': formatCode(`
<div class="flex flex-wrap items-center gap-3">
  <wc-shadcn-button>Default</wc-shadcn-button>
  <wc-shadcn-button variant="secondary">Secondary2</wc-shadcn-button>
  <wc-shadcn-button variant="outline">Outline</wc-shadcn-button>
</div>
    `),
  },
  react: {
    'demo-button': formatCode(`
import { ShadcnButton } from '@prototype-libs/shadcn';

export function DemoButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ShadcnButton>Default</ShadcnButton>
      <div>
        <ShadcnButton>Default2</ShadcnButton>
      </div>
      <ShadcnButton variant="outline">Outline</ShadcnButton>
      <ShadcnButton variant="destructive">Destructive</ShadcnButton>
      <ShadcnButton variant="ghost" size="icon">
        +
      </ShadcnButton>
      <ShadcnButton disabled>Disabled</ShadcnButton>
    </div>
  );
}
    `),
    'demo-Secondray': formatCode(`
import { ShadcnButton } from '@prototype-libs/shadcn';

export function DemoSecondrayDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ShadcnButton>Default</ShadcnButton>
      <ShadcnButton variant="secondary">Secondary2</ShadcnButton>
      <ShadcnButton variant="outline">Outline</ShadcnButton>
    </div>
  );
}
    `),
  },
  vue: {
    'demo-button': formatCode(`
<script setup lang="ts">
import { ShadcnButton } from '@prototype-libs/shadcn';
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ShadcnButton>Default</ShadcnButton>
    <div>
      <ShadcnButton>Default2</ShadcnButton>
    </div>
    <ShadcnButton variant="outline">Outline</ShadcnButton>
    <ShadcnButton variant="destructive">Destructive</ShadcnButton>
    <ShadcnButton variant="ghost" size="icon">+</ShadcnButton>
    <ShadcnButton disabled>Disabled</ShadcnButton>
  </div>
</template>
    `),
    'demo-Secondray': formatCode(`
<script setup lang="ts">
import { ShadcnButton } from '@prototype-libs/shadcn';
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ShadcnButton>Default</ShadcnButton>
    <ShadcnButton variant="secondary">Secondary2</ShadcnButton>
    <ShadcnButton variant="outline">Outline</ShadcnButton>
  </div>
</template>
    `),
  },
};
