// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'pizza' as const;
export const LUCIDE_PIZZA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm12 14-1 1' }),
  svg.path({ d: 'm13.75 18.25-1.25 1.42' }),
  svg.path({ d: 'M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12' }),
  svg.path({ d: 'M18.8 9.3a1 1 0 0 0 2.1 7.7' }),
  svg.path({
    d: 'M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z',
  }),
];

export function renderLucidePizzaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PIZZA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-pizza-icon',
  prototypeName: 'lucide-pizza-icon',
  shapeFactory: LUCIDE_PIZZA_SHAPE_FACTORY,
});

export const asLucidePizzaIcon = fixed.asHook;
export const lucidePizzaIcon = fixed.prototype;
export default lucidePizzaIcon;
