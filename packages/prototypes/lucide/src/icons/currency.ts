// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'currency' as const;
export const LUCIDE_CURRENCY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 8 }),
  svg.line({ x1: 3, x2: 6, y1: 3, y2: 6 }),
  svg.line({ x1: 21, x2: 18, y1: 3, y2: 6 }),
  svg.line({ x1: 3, x2: 6, y1: 21, y2: 18 }),
  svg.line({ x1: 21, x2: 18, y1: 21, y2: 18 }),
];

export function renderLucideCurrencyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CURRENCY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-currency-icon',
  prototypeName: 'lucide-currency-icon',
  shapeFactory: LUCIDE_CURRENCY_SHAPE_FACTORY,
});

export const asLucideCurrencyIcon = fixed.asHook;
export const lucideCurrencyIcon = fixed.prototype;
export default lucideCurrencyIcon;
