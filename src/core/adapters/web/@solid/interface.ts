import * as Solid from 'solid-js';
import { JSX } from 'solid-js';

export interface SolidRuntime {
  Solid: typeof Solid;
  SolidJsx: typeof JSX;
}
