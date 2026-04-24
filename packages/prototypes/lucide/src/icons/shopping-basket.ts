// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shopping-basket' as const;
export const LUCIDE_SHOPPING_BASKET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 11-1 9' }),
  svg.path({ d: 'm19 11-4-7' }),
  svg.path({ d: 'M2 11h20' }),
  svg.path({ d: 'm3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4' }),
  svg.path({ d: 'M4.5 15.5h15' }),
  svg.path({ d: 'm5 11 4-7' }),
  svg.path({ d: 'm9 11 1 9' }),
];

export function renderLucideShoppingBasketIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHOPPING_BASKET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shopping-basket-icon',
  prototypeName: 'lucide-shopping-basket-icon',
  shapeFactory: LUCIDE_SHOPPING_BASKET_SHAPE_FACTORY,
});

export const asLucideShoppingBasketIcon = fixed.asHook;
export const lucideShoppingBasketIcon = fixed.prototype;
export default lucideShoppingBasketIcon;
