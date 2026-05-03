// Run inside the cli-smoke workflow only. Imports a runtime path that exists
// in the smoke project (./proto-ui/components/react) but not in the source
// repo, so tsc must not pick this up — keep the extension as .mjs (Node ESM,
// JS).
//
// We import from the per-host facade rather than the root re-export because
// the root index also re-exports the wc facade, whose AdaptToWebComponent
// extends HTMLElement at module load and would crash plain Node before any
// DOM shim is in scope. SSR users would hit the same trap; that decoupling
// is its own concern, out of this PR's scope.
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Button, BaseButton } from './proto-ui/components/react/index.ts';

const shadcnHtml = renderToString(React.createElement(Button, null, 'click'));
const baseHtml = renderToString(React.createElement(BaseButton, null, 'click'));

if (!shadcnHtml.includes('<button')) {
  throw new Error('react smoke: shadcn Button did not render <button>: ' + shadcnHtml);
}
if (!baseHtml.includes('<button')) {
  throw new Error('react smoke: base BaseButton did not render <button>: ' + baseHtml);
}
console.log('react smoke ok | shadcn=' + shadcnHtml.length + 'B base=' + baseHtml.length + 'B');
