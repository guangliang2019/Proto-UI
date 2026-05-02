// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dollar-sign' as const;
export const LUCIDE_DOLLAR_SIGN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 12, x2: 12, y1: 2, y2: 22 }),
  svg.path({ d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' }),
];

export function renderLucideDollarSignIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOLLAR_SIGN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dollar-sign-icon',
  prototypeName: 'lucide-dollar-sign-icon',
  shapeFactory: LUCIDE_DOLLAR_SIGN_SHAPE_FACTORY,
});

export const asLucideDollarSignIcon = fixed.asHook;
export const lucideDollarSignIcon = fixed.prototype;
export default lucideDollarSignIcon;
