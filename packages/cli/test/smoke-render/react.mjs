// Run inside the cli-smoke workflow only. Imports a runtime path that exists
// in the smoke project (./proto-ui/components/react) but not in the source
// repo, so tsc must not pick this up — keep the extension as .mjs (Node ESM,
// JS).
//
// We don't use react-dom/server here: the v0 React adapter renders a
// client-only host placeholder during SSR (output is `<div></div>`), so SSR
// would only test the placeholder, not the real button. happy-dom's
// GlobalRegistrator gives us a real DOM, then react-dom/client + a microtask
// flush lets the prototype mount and produce an actual `<button>` — matching
// what an SPA user sees in a browser.
//
// We also import from the per-host facade rather than the root re-export
// because the root index also re-exports the wc facade, whose
// AdaptToWebComponent extends HTMLElement at module load. Even with happy-dom
// registered globally, importing the root facade would still register
// customElements as a side effect of importing react bits, which we keep
// scoped to wc.mjs.
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

const React = await import('react');
const ReactDOMClient = await import('react-dom/client');
const { Button, BaseButton } = await import('./proto-ui/components/react/index.ts');

const flush = () => new Promise((resolve) => setTimeout(resolve, 50));

async function renderAndQueryButton(label, Component) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOMClient.createRoot(container);
  root.render(React.createElement(Component, null, 'click'));
  await flush();
  const btn = container.querySelector('button');
  if (!btn) {
    throw new Error(
      'react smoke: ' + label + ' did not produce <button>; container=' + container.innerHTML
    );
  }
  return btn;
}

const shadcn = await renderAndQueryButton('shadcn Button', Button);
const base = await renderAndQueryButton('base BaseButton', BaseButton);

console.log(
  'react smoke ok | shadcn=' + shadcn.outerHTML.length + 'B base=' + base.outerHTML.length + 'B'
);
