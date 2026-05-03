// Vue SSR smoke. See react.mjs comment for the .mjs / runtime-path / per-host
// rationale (importing from the root facade pulls in the wc module which
// extends HTMLElement at load time, crashing plain Node).
import * as Vue from 'vue';
import { renderToString } from 'vue/server-renderer';
import { Button } from './proto-ui/components/vue/index.ts';

const html = await renderToString(
  Vue.createSSRApp({
    render: () => Vue.h(Button, null, () => 'click'),
  })
);

if (!html.includes('<button')) {
  throw new Error('vue smoke: Button did not render <button>: ' + html);
}
console.log('vue smoke ok | ' + html.length + 'B');
