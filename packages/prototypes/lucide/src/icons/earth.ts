// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'earth' as const;
export const LUCIDE_EARTH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21.54 15H17a2 2 0 0 0-2 2v4.54' }),
  svg.path({
    d: 'M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17',
  }),
  svg.path({ d: 'M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05' }),
  svg.circle({ cx: 12, cy: 12, r: 10 }),
];

export function renderLucideEarthIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EARTH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-earth-icon',
  prototypeName: 'lucide-earth-icon',
  shapeFactory: LUCIDE_EARTH_SHAPE_FACTORY,
});

export const asLucideEarthIcon = fixed.asHook;
export const lucideEarthIcon = fixed.prototype;
export default lucideEarthIcon;
