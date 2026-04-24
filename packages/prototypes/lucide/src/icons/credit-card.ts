// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'credit-card' as const;
export const LUCIDE_CREDIT_CARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 20, height: 14, x: 2, y: 5, rx: 2 }),
  svg.line({ x1: 2, x2: 22, y1: 10, y2: 10 }),
];

export function renderLucideCreditCardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CREDIT_CARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-credit-card-icon',
  prototypeName: 'lucide-credit-card-icon',
  shapeFactory: LUCIDE_CREDIT_CARD_SHAPE_FACTORY,
});

export const asLucideCreditCardIcon = fixed.asHook;
export const lucideCreditCardIcon = fixed.prototype;
export default lucideCreditCardIcon;
