// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dessert' as const;
export const LUCIDE_DESSERT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826',
  }),
  svg.path({ d: 'M20.804 14.869a9 9 0 0 1-17.608 0' }),
  svg.circle({ cx: 12, cy: 4, r: 2 }),
];

export function renderLucideDessertIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DESSERT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dessert-icon',
  prototypeName: 'lucide-dessert-icon',
  shapeFactory: LUCIDE_DESSERT_SHAPE_FACTORY,
});

export const asLucideDessertIcon = fixed.asHook;
export const lucideDessertIcon = fixed.prototype;
export default lucideDessertIcon;
