// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin-plus' as const;
export const LUCIDE_MAP_PIN_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738',
  }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'M16 18h6' }),
  svg.path({ d: 'M19 15v6' }),
];

export function renderLucideMapPinPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-plus-icon',
  prototypeName: 'lucide-map-pin-plus-icon',
  shapeFactory: LUCIDE_MAP_PIN_PLUS_SHAPE_FACTORY,
});

export const asLucideMapPinPlusIcon = fixed.asHook;
export const lucideMapPinPlusIcon = fixed.prototype;
export default lucideMapPinPlusIcon;
