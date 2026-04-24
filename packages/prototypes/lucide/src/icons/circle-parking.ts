// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-parking' as const;
export const LUCIDE_CIRCLE_PARKING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M9 17V7h4a3 3 0 0 1 0 6H9' }),
];

export function renderLucideCircleParkingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PARKING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-parking-icon',
  prototypeName: 'lucide-circle-parking-icon',
  shapeFactory: LUCIDE_CIRCLE_PARKING_SHAPE_FACTORY,
});

export const asLucideCircleParkingIcon = fixed.asHook;
export const lucideCircleParkingIcon = fixed.prototype;
export default lucideCircleParkingIcon;
