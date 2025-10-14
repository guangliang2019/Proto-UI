import type * as ReactTypes from 'react';
import type * as ReactDOMClient from 'react-dom/client';

export type ReactRuntime = {
  React: typeof ReactTypes;
  ReactDOM: typeof ReactDOMClient;
  version?: string;
};