// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin-minus-inside' as const;
export const LUCIDE_MAP_PIN_MINUS_INSIDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
  }),
  svg.path({ d: 'M9 10h6' }),
];

export function renderLucideMapPinMinusInsideIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_MINUS_INSIDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-minus-inside-icon',
  prototypeName: 'lucide-map-pin-minus-inside-icon',
  shapeFactory: LUCIDE_MAP_PIN_MINUS_INSIDE_SHAPE_FACTORY,
});

export const asLucideMapPinMinusInsideIcon = fixed.asHook;
export const lucideMapPinMinusInsideIcon = fixed.prototype;
export default lucideMapPinMinusInsideIcon;
