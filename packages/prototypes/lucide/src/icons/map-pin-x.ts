// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin-x' as const;
export const LUCIDE_MAP_PIN_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077',
  }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'm21.5 15.5-5 5' }),
  svg.path({ d: 'm21.5 20.5-5-5' }),
];

export function renderLucideMapPinXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-x-icon',
  prototypeName: 'lucide-map-pin-x-icon',
  shapeFactory: LUCIDE_MAP_PIN_X_SHAPE_FACTORY,
});

export const asLucideMapPinXIcon = fixed.asHook;
export const lucideMapPinXIcon = fixed.prototype;
export default lucideMapPinXIcon;
