// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin' as const;
export const LUCIDE_MAP_PIN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
  }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
];

export function renderLucideMapPinIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-icon',
  prototypeName: 'lucide-map-pin-icon',
  shapeFactory: LUCIDE_MAP_PIN_SHAPE_FACTORY,
});

export const asLucideMapPinIcon = fixed.asHook;
export const lucideMapPinIcon = fixed.prototype;
export default lucideMapPinIcon;
