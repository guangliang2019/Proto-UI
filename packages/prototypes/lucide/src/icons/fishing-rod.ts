// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fishing-rod' as const;
export const LUCIDE_FISHING_ROD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 11h1' }),
  svg.path({ d: 'M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4' }),
  svg.circle({ cx: 18, cy: 18, r: 2 }),
];

export function renderLucideFishingRodIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FISHING_ROD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fishing-rod-icon',
  prototypeName: 'lucide-fishing-rod-icon',
  shapeFactory: LUCIDE_FISHING_ROD_SHAPE_FACTORY,
});

export const asLucideFishingRodIcon = fixed.asHook;
export const lucideFishingRodIcon = fixed.prototype;
export default lucideFishingRodIcon;
