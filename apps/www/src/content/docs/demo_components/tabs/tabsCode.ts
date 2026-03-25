import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-shadcn-tabs': formatCode(`
<wc-shadcn-tabs-root default-value="account">
  <wc-shadcn-tabs-list>
    <wc-shadcn-tabs-trigger value="account">Account</wc-shadcn-tabs-trigger>
    <wc-shadcn-tabs-trigger value="password">
      <wc-shadcn-button>Password</wc-shadcn-button>
    </wc-shadcn-tabs-trigger>
    <wc-shadcn-tabs-trigger value="billing" disabled>Billing</wc-shadcn-tabs-trigger>
  </wc-shadcn-tabs-list>
  <wc-shadcn-tabs-content value="account">Make changes to your account here.</wc-shadcn-tabs-content>
  <wc-shadcn-tabs-content value="password">Change your password here.</wc-shadcn-tabs-content>
  <wc-shadcn-tabs-content value="billing">Billing tab is disabled in this preview.</wc-shadcn-tabs-content>
</wc-shadcn-tabs-root>
    `),
  },
  react: {
    'demo-shadcn-tabs': formatCode(`
import {
  ShadcnButton,
  ShadcnTabsContent,
  ShadcnTabsList,
  ShadcnTabsRoot,
  ShadcnTabsTrigger,
} from '@prototype-libs/shadcn';

export function DemoShadcnTabsDemo() {
  return (
    <ShadcnTabsRoot defaultValue="account">
      <ShadcnTabsList>
        <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
        <ShadcnTabsTrigger value="password">
          <ShadcnButton>Password</ShadcnButton>
        </ShadcnTabsTrigger>
        <ShadcnTabsTrigger value="billing" disabled>
          Billing
        </ShadcnTabsTrigger>
      </ShadcnTabsList>
      <ShadcnTabsContent value="account">Make changes to your account here.</ShadcnTabsContent>
      <ShadcnTabsContent value="password">Change your password here.</ShadcnTabsContent>
      <ShadcnTabsContent value="billing">
        Billing tab is disabled in this preview.
      </ShadcnTabsContent>
    </ShadcnTabsRoot>
  );
}
    `),
  },
  vue: {
    'demo-shadcn-tabs': formatCode(`
<script setup lang="ts">
import {
  ShadcnButton,
  ShadcnTabsContent,
  ShadcnTabsList,
  ShadcnTabsRoot,
  ShadcnTabsTrigger,
} from '@prototype-libs/shadcn';
</script>

<template>
  <ShadcnTabsRoot defaultValue="account">
    <ShadcnTabsList>
      <ShadcnTabsTrigger value="account">Account</ShadcnTabsTrigger>
      <ShadcnTabsTrigger value="password">
        <ShadcnButton>Password</ShadcnButton>
      </ShadcnTabsTrigger>
      <ShadcnTabsTrigger value="billing" disabled>Billing</ShadcnTabsTrigger>
    </ShadcnTabsList>
    <ShadcnTabsContent value="account">Make changes to your account here.</ShadcnTabsContent>
    <ShadcnTabsContent value="password">Change your password here.</ShadcnTabsContent>
    <ShadcnTabsContent value="billing">Billing tab is disabled in this preview.</ShadcnTabsContent>
  </ShadcnTabsRoot>
</template>
    `),
  },
};
