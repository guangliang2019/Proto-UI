// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bell-minus' as const;
export const LUCIDE_BELL_MINUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.268 21a2 2 0 0 0 3.464 0' }),
  svg.path({ d: 'M15 8h6' }),
  svg.path({
    d: 'M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12',
  }),
];

export function renderLucideBellMinusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BELL_MINUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bell-minus-icon',
  prototypeName: 'lucide-bell-minus-icon',
  shapeFactory: LUCIDE_BELL_MINUS_SHAPE_FACTORY,
});

export const asLucideBellMinusIcon = fixed.asHook;
export const lucideBellMinusIcon = fixed.prototype;
export default lucideBellMinusIcon;
