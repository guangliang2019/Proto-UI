// Vue SSR smoke. See react.mjs comment for the .mjs / runtime-path rationale.
import * as Vue from 'vue';
import { renderToString } from 'vue/server-renderer';
import { VueButton } from './proto-ui/components/index.ts';

const html = await renderToString(
  Vue.createSSRApp({
    render: () => Vue.h(VueButton, null, () => 'click'),
  })
);

if (!html.includes('<button')) {
  throw new Error('vue smoke: VueButton did not render <button>: ' + html);
}
console.log('vue smoke ok | ' + html.length + 'B');
