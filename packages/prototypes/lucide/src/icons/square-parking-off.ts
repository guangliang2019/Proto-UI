// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-parking-off' as const;
export const LUCIDE_SQUARE_PARKING_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41' }),
  svg.path({ d: 'M3 8.7V19a2 2 0 0 0 2 2h10.3' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M13 13a3 3 0 1 0 0-6H9v2' }),
  svg.path({ d: 'M9 17v-2.3' }),
];

export function renderLucideSquareParkingOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PARKING_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-parking-off-icon',
  prototypeName: 'lucide-square-parking-off-icon',
  shapeFactory: LUCIDE_SQUARE_PARKING_OFF_SHAPE_FACTORY,
});

export const asLucideSquareParkingOffIcon = fixed.asHook;
export const lucideSquareParkingOffIcon = fixed.prototype;
export default lucideSquareParkingOffIcon;
