// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lasso' as const;
export const LUCIDE_LASSO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3.704 14.467a10 8 0 1 1 3.115 2.375' }),
  svg.path({ d: 'M7 22a5 5 0 0 1-2-3.994' }),
  svg.circle({ cx: 5, cy: 16, r: 2 }),
];

export function renderLucideLassoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LASSO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lasso-icon',
  prototypeName: 'lucide-lasso-icon',
  shapeFactory: LUCIDE_LASSO_SHAPE_FACTORY,
});

export const asLucideLassoIcon = fixed.asHook;
export const lucideLassoIcon = fixed.prototype;
export default lucideLassoIcon;
