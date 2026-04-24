// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'glass-water' as const;
export const LUCIDE_GLASS_WATER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z',
  }),
  svg.path({ d: 'M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0' }),
];

export function renderLucideGlassWaterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GLASS_WATER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-glass-water-icon',
  prototypeName: 'lucide-glass-water-icon',
  shapeFactory: LUCIDE_GLASS_WATER_SHAPE_FACTORY,
});

export const asLucideGlassWaterIcon = fixed.asHook;
export const lucideGlassWaterIcon = fixed.prototype;
export default lucideGlassWaterIcon;
