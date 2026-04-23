// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'trending-up-down' as const;
export const LUCIDE_TRENDING_UP_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14.828 14.828 21 21' }),
  svg.path({ d: 'M21 16v5h-5' }),
  svg.path({ d: 'm21 3-9 9-4-4-6 6' }),
  svg.path({ d: 'M21 8V3h-5' }),
];

export function renderLucideTrendingUpDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRENDING_UP_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-trending-up-down-icon',
  prototypeName: 'lucide-trending-up-down-icon',
  shapeFactory: LUCIDE_TRENDING_UP_DOWN_SHAPE_FACTORY,
});

export const asLucideTrendingUpDownIcon = fixed.asHook;
export const lucideTrendingUpDownIcon = fixed.prototype;
export default lucideTrendingUpDownIcon;
