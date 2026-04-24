// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shopping-cart' as const;
export const LUCIDE_SHOPPING_CART_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 8, cy: 21, r: 1 }),
  svg.circle({ cx: 19, cy: 21, r: 1 }),
  svg.path({
    d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
  }),
];

export function renderLucideShoppingCartIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHOPPING_CART_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shopping-cart-icon',
  prototypeName: 'lucide-shopping-cart-icon',
  shapeFactory: LUCIDE_SHOPPING_CART_SHAPE_FACTORY,
});

export const asLucideShoppingCartIcon = fixed.asHook;
export const lucideShoppingCartIcon = fixed.prototype;
export default lucideShoppingCartIcon;
