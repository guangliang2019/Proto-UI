// Run inside the cli-smoke workflow only. Imports a runtime path that exists
// in the smoke project (./proto-ui/components) but not in the source repo,
// so tsc must not pick this up — keep the extension as .mjs (Node ESM, JS).
//
// The script renders the generated React facade through real react-dom/server
// to catch adapter/prototype regressions that pure install-only assertions miss.
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ReactButton, ReactBaseButton } from './proto-ui/components/index.ts';

const shadcnHtml = renderToString(React.createElement(ReactButton, null, 'click'));
const baseHtml = renderToString(React.createElement(ReactBaseButton, null, 'click'));

if (!shadcnHtml.includes('<button')) {
  throw new Error('react smoke: shadcn ReactButton did not render <button>: ' + shadcnHtml);
}
if (!baseHtml.includes('<button')) {
  throw new Error('react smoke: base ReactBaseButton did not render <button>: ' + baseHtml);
}
console.log('react smoke ok | shadcn=' + shadcnHtml.length + 'B base=' + baseHtml.length + 'B');
