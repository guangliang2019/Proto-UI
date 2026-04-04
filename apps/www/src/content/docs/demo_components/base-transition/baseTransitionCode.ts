import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

const cssSnippet = `
/* 宿主通过 data-transition-state 属性驱动样式 */
.transition-wrapper[data-transition-state="closed"] .transition-box {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.transition-wrapper[data-transition-state="entering"] .transition-box {
  opacity: 0.7;
  transform: scale(0.98) translateY(-2px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-wrapper[data-transition-state="entered"] .transition-box {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.transition-wrapper[data-transition-state="leaving"] .transition-box {
  opacity: 0.5;
  transform: scale(0.98) translateY(2px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
`.trim();

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
    'demo-base-transition-command': formatCode(`
<wc-base-transition id="transition" open appear class="transition-wrapper">
  <div class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
    <span class="text-lg font-semibold">Animated Box</span>
  </div>
</wc-base-transition>

<div class="flex flex-wrap items-center justify-center gap-2 mt-4">
  <button id="enterBtn" class="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer select-none">Enter</button>
  <button id="leaveBtn" class="px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer select-none">Leave</button>
  <button id="completeBtn" class="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md cursor-pointer select-none">Complete</button>
</div>

<script>
  const el = document.getElementById('transition');
  const controls = el.getExposes().controls;

  document.getElementById('enterBtn').addEventListener('click', () => controls.enter());
  document.getElementById('leaveBtn').addEventListener('click', () => controls.leave());
  document.getElementById('completeBtn').addEventListener('click', () => controls.complete());
</script>

<style>
${cssSnippet}
</style>
    `),
    'demo-base-transition-controlled': formatCode(`
<wc-base-transition id="transition" class="transition-wrapper">
  <div id="box" class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none">
    <span class="text-lg font-semibold">Click Me</span>
  </div>
</wc-base-transition>

<div class="flex flex-wrap items-center justify-center gap-2 mt-4">
  <button id="toggleBtn" class="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 rounded-md cursor-pointer select-none">Toggle Open</button>
</div>

<script>
  const el = document.getElementById('transition');
  const box = document.getElementById('box');
  const toggleBtn = document.getElementById('toggleBtn');

  let open = false;

  const toggleOpen = () => {
    open = !open;
    el.setProps({ open });
  };

  toggleBtn.addEventListener('click', toggleOpen);
  box.addEventListener('click', toggleOpen);

  // CSS 过渡结束后自动推进状态机
  box.querySelector('.transition-box').addEventListener('transitionend', () => {
    const state = el.getExposes().transitionState.get();
    if (state === 'entering' || state === 'leaving') {
      el.getExposes().controls.complete();
    }
  });
</script>

<style>
${cssSnippet}
</style>
    `),
  },
  react: {
    'demo-base-transition-command': formatCode(`
import { BaseTransition } from '@prototype-libs/base';
import { useRef } from 'react';

export function DemoBaseTransitionCommandDemo() {
  const transitionRef = useRef(null);

  const handleEnter = () => {
    transitionRef.current?.invokeInCallbackScope(() => {
      transitionRef.current?.getExposes()?.controls?.enter();
    });
  };

  const handleLeave = () => {
    transitionRef.current?.invokeInCallbackScope(() => {
      transitionRef.current?.getExposes()?.controls?.leave();
    });
  };

  const handleComplete = () => {
    transitionRef.current?.invokeInCallbackScope(() => {
      transitionRef.current?.getExposes()?.controls?.complete();
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <BaseTransition ref={transitionRef} open appear className="transition-wrapper">
        <div className="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
          <span className="text-lg font-semibold">Animated Box</span>
        </div>
      </BaseTransition>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button onClick={handleEnter} className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer select-none">Enter</button>
        <button onClick={handleLeave} className="px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer select-none">Leave</button>
        <button onClick={handleComplete} className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md cursor-pointer select-none">Complete</button>
      </div>
    </div>
  );
}

/* transition.css — 通过 data-transition-state 属性驱动样式 */
/* .transition-wrapper[data-transition-state="closed"] .transition-box {     */
/*   opacity: 0;                                                              */
/*   transform: scale(0.95) translateY(-10px);                                */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="entering"] .transition-box {    */
/*   opacity: 0.7;                                                             */
/*   transform: scale(0.98) translateY(-2px);                                  */
/*   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);                        */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="entered"] .transition-box {     */
/*   opacity: 1;                                                              */
/*   transform: scale(1) translateY(0);                                        */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="leaving"] .transition-box {     */
/*   opacity: 0.5;                                                             */
/*   transform: scale(0.98) translateY(2px);                                   */
/*   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);                        */
/* }                                                                           */
    `),
    'demo-base-transition-controlled': formatCode(`
import { BaseTransition } from '@prototype-libs/base';
import { useState } from 'react';

export function DemoBaseTransitionControlledDemo() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <div className="flex flex-col items-center gap-4">
      <BaseTransition open={open} className="transition-wrapper">
        <div
          className="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none"
          onClick={toggleOpen}
        >
          <span className="text-lg font-semibold">Click Me</span>
        </div>
      </BaseTransition>
      <button
        onClick={toggleOpen}
        className="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 rounded-md cursor-pointer select-none"
      >
        Toggle Open
      </button>
    </div>
  );
}

/* transition.css — 通过 data-transition-state 属性驱动样式 */
/* .transition-wrapper[data-transition-state="closed"] .transition-box {     */
/*   opacity: 0;                                                              */
/*   transform: scale(0.95) translateY(-10px);                                */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="entering"] .transition-box {    */
/*   opacity: 0.7;                                                             */
/*   transform: scale(0.98) translateY(-2px);                                  */
/*   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);                        */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="entered"] .transition-box {     */
/*   opacity: 1;                                                              */
/*   transform: scale(1) translateY(0);                                        */
/* }                                                                           */
/*                                                                             */
/* .transition-wrapper[data-transition-state="leaving"] .transition-box {     */
/*   opacity: 0.5;                                                             */
/*   transform: scale(0.98) translateY(2px);                                   */
/*   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);                        */
/* }                                                                           */
    `),
  },
  vue: {
    'demo-base-transition-command': formatCode(`
<script setup lang="ts">
import { BaseTransition } from '@prototype-libs/base';
import { ref } from 'vue';

const transitionRef = ref();

const handleEnter = () => {
  transitionRef.value?.invokeInCallbackScope(() => {
    transitionRef.value?.getExposes()?.controls?.enter();
  });
};

const handleLeave = () => {
  transitionRef.value?.invokeInCallbackScope(() => {
    transitionRef.value?.getExposes()?.controls?.leave();
  });
};

const handleComplete = () => {
  transitionRef.value?.invokeInCallbackScope(() => {
    transitionRef.value?.getExposes()?.controls?.complete();
  });
};
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <BaseTransition ref="transitionRef" open appear class="transition-wrapper">
      <div class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box">
        <span class="text-lg font-semibold">Animated Box</span>
      </div>
    </BaseTransition>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button @click="handleEnter" class="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer select-none">Enter</button>
      <button @click="handleLeave" class="px-3 py-1.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-md cursor-pointer select-none">Leave</button>
      <button @click="handleComplete" class="px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md cursor-pointer select-none">Complete</button>
    </div>
  </div>
</template>

<style>
${cssSnippet}
</style>
    `),
    'demo-base-transition-controlled': formatCode(`
<script setup lang="ts">
import { BaseTransition } from '@prototype-libs/base';
import { ref } from 'vue';

const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <BaseTransition :open="open" class="transition-wrapper">
      <div
        class="w-64 h-40 rounded-xl flex flex-col items-center justify-center text-white shadow-xl transition-box cursor-pointer select-none"
        @click="toggleOpen"
      >
        <span class="text-lg font-semibold">Click Me</span>
      </div>
    </BaseTransition>
    <button
      @click="toggleOpen"
      class="px-3 py-1.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 rounded-md cursor-pointer select-none"
    >
      Toggle Open
    </button>
  </div>
</template>

<style>
${cssSnippet}
</style>
    `),
  },
};
