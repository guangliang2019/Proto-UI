// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'coffee' as const;
export const LUCIDE_COFFEE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v2' }),
  svg.path({ d: 'M14 2v2' }),
  svg.path({
    d: 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1',
  }),
  svg.path({ d: 'M6 2v2' }),
];

export function renderLucideCoffeeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COFFEE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-coffee-icon',
  prototypeName: 'lucide-coffee-icon',
  shapeFactory: LUCIDE_COFFEE_SHAPE_FACTORY,
});

export const asLucideCoffeeIcon = fixed.asHook;
export const lucideCoffeeIcon = fixed.prototype;
export default lucideCoffeeIcon;
