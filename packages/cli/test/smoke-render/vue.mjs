// Run inside the cli-smoke workflow only. Imports a runtime path that exists
// in the smoke project (./proto-ui/components/vue) but not in the source
// repo, so tsc must not pick this up — keep the extension as .mjs (Node ESM,
// JS).
//
// We don't use vue/server-renderer here: the v0 Vue adapter renders a
// client-only host placeholder during SSR (output is `<div></div>`), so SSR
// would only test the placeholder, not the real button. happy-dom's
// GlobalRegistrator gives us a real DOM, then createApp().mount() + a
// microtask flush lets the prototype mount and produce an actual `<button>`
// — matching what an SPA user sees in a browser.
//
// We also import from the per-host facade rather than the root re-export
// because the root index also re-exports the wc facade, whose
// AdaptToWebComponent extends HTMLElement at module load. Even with happy-dom
// registered globally, importing the root facade would still register
// customElements as a side effect of importing vue bits, which we keep
// scoped to wc.mjs.
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

const Vue = await import('vue');
const { Button } = await import('./proto-ui/components/vue/index.ts');

const flush = () => new Promise((resolve) => setTimeout(resolve, 50));

const container = document.createElement('div');
document.body.appendChild(container);

const app = Vue.createApp({
  render: () => Vue.h(Button, null, () => 'click'),
});
app.mount(container);
await flush();

const btn = container.querySelector('button');
if (!btn) {
  throw new Error('vue smoke: Button did not produce <button>; container=' + container.innerHTML);
}

console.log('vue smoke ok | ' + btn.outerHTML.length + 'B');
