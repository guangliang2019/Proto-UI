// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'map-pin-off' as const;
export const LUCIDE_MAP_PIN_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.75 7.09a3 3 0 0 1 2.16 2.16' }),
  svg.path({
    d: 'M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568',
  }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533' }),
  svg.path({ d: 'M9.13 9.13a3 3 0 0 0 3.74 3.74' }),
];

export function renderLucideMapPinOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAP_PIN_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-map-pin-off-icon',
  prototypeName: 'lucide-map-pin-off-icon',
  shapeFactory: LUCIDE_MAP_PIN_OFF_SHAPE_FACTORY,
});

export const asLucideMapPinOffIcon = fixed.asHook;
export const lucideMapPinOffIcon = fixed.prototype;
export default lucideMapPinOffIcon;
