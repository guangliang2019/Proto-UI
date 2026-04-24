// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-parking-off' as const;
export const LUCIDE_CIRCLE_PARKING_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.656 7H13a3 3 0 0 1 2.984 3.307' }),
  svg.path({ d: 'M13 13H9' }),
  svg.path({ d: 'M19.071 19.071A1 1 0 0 1 4.93 4.93' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.357 2.687a10 10 0 0 1 12.956 12.956' }),
  svg.path({ d: 'M9 17V9' }),
];

export function renderLucideCircleParkingOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PARKING_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-parking-off-icon',
  prototypeName: 'lucide-circle-parking-off-icon',
  shapeFactory: LUCIDE_CIRCLE_PARKING_OFF_SHAPE_FACTORY,
});

export const asLucideCircleParkingOffIcon = fixed.asHook;
export const lucideCircleParkingOffIcon = fixed.prototype;
export default lucideCircleParkingOffIcon;
