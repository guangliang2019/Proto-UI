import type * as VueTypes from 'vue';
import type * as VueRuntimeDom from '@vue/runtime-dom';

export type VueRuntime = {
  Vue: typeof VueTypes;
  VueDom: typeof VueRuntimeDom;
  version?: string;
};