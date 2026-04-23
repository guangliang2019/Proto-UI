// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin-check' as const;
export const LUCIDE_MAP_PIN_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728',
  }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'm16 18 2 2 4-4' }),
];

export function renderLucideMapPinCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-check-icon',
  prototypeName: 'lucide-map-pin-check-icon',
  shapeFactory: LUCIDE_MAP_PIN_CHECK_SHAPE_FACTORY,
});

export const asLucideMapPinCheckIcon = fixed.asHook;
export const lucideMapPinCheckIcon = fixed.prototype;
export default lucideMapPinCheckIcon;
