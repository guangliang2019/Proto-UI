// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shopping-bag' as const;
export const LUCIDE_SHOPPING_BAG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 10a4 4 0 0 1-8 0' }),
  svg.path({ d: 'M3.103 6.034h17.794' }),
  svg.path({
    d: 'M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z',
  }),
];

export function renderLucideShoppingBagIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHOPPING_BAG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shopping-bag-icon',
  prototypeName: 'lucide-shopping-bag-icon',
  shapeFactory: LUCIDE_SHOPPING_BAG_SHAPE_FACTORY,
});

export const asLucideShoppingBagIcon = fixed.asHook;
export const lucideShoppingBagIcon = fixed.prototype;
export default lucideShoppingBagIcon;
