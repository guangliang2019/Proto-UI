// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radar' as const;
export const LUCIDE_RADAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19.07 4.93A10 10 0 0 0 6.99 3.34' }),
  svg.path({ d: 'M4 6h.01' }),
  svg.path({ d: 'M2.29 9.62A10 10 0 1 0 21.31 8.35' }),
  svg.path({ d: 'M16.24 7.76A6 6 0 1 0 8.23 16.67' }),
  svg.path({ d: 'M12 18h.01' }),
  svg.path({ d: 'M17.99 11.66A6 6 0 0 1 15.77 16.67' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
  svg.path({ d: 'm13.41 10.59 5.66-5.66' }),
];

export function renderLucideRadarIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radar-icon',
  prototypeName: 'lucide-radar-icon',
  shapeFactory: LUCIDE_RADAR_SHAPE_FACTORY,
});

export const asLucideRadarIcon = fixed.asHook;
export const lucideRadarIcon = fixed.prototype;
export default lucideRadarIcon;
