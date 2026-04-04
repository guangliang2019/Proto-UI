import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-base-transition-command': formatCode(`
<wc-base-transition open appear class="transition-wrapper">
  <div class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
    <span class="text-lg font-semibold">Animated Box</span>
  </div>
</wc-base-transition>
    `),
    'demo-base-transition-controlled': formatCode(`
<wc-base-transition class="transition-wrapper">
  <div class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none">
    <span class="text-lg font-semibold">Click Me</span>
  </div>
</wc-base-transition>
    `),
  },
  react: {
    'demo-base-transition-command': formatCode(`
import { BaseTransition } from '@prototype-libs/base';

export function DemoBaseTransitionCommandDemo() {
  return (
    <BaseTransition open appear className="transition-wrapper">
      <div className="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
        <span className="text-lg font-semibold">Animated Box</span>
      </div>
    </BaseTransition>
  );
}
    `),
    'demo-base-transition-controlled': formatCode(`
import { BaseTransition } from '@prototype-libs/base';
import { useState } from 'react';

export function DemoBaseTransitionControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <BaseTransition open={open} className="transition-wrapper">
      <div
        className="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-lg font-semibold">Click Me</span>
      </div>
    </BaseTransition>
  );
}
    `),
  },
  vue: {
    'demo-base-transition-command': formatCode(`
<script setup lang="ts">
import { BaseTransition } from '@prototype-libs/base';
</script>

<template>
  <BaseTransition open appear class="transition-wrapper">
    <div class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
      <span class="text-lg font-semibold">Animated Box</span>
    </div>
  </BaseTransition>
</template>
    `),
    'demo-base-transition-controlled': formatCode(`
<script setup lang="ts">
import { BaseTransition } from '@prototype-libs/base';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <BaseTransition :open="open" class="transition-wrapper">
    <div
      class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none"
      @click="open = !open"
    >
      <span class="text-lg font-semibold">Click Me</span>
    </div>
  </BaseTransition>
</template>
    `),
  },
};
