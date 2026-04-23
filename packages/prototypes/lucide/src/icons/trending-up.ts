// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'trending-up' as const;
export const LUCIDE_TRENDING_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 7h6v6' }),
  svg.path({ d: 'm22 7-8.5 8.5-5-5L2 17' }),
];

export function renderLucideTrendingUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRENDING_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-trending-up-icon',
  prototypeName: 'lucide-trending-up-icon',
  shapeFactory: LUCIDE_TRENDING_UP_SHAPE_FACTORY,
});

export const asLucideTrendingUpIcon = fixed.asHook;
export const lucideTrendingUpIcon = fixed.prototype;
export default lucideTrendingUpIcon;
