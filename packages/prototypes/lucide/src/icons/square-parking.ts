// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-parking' as const;
export const LUCIDE_SQUARE_PARKING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M9 17V7h4a3 3 0 0 1 0 6H9' }),
];

export function renderLucideSquareParkingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PARKING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-parking-icon',
  prototypeName: 'lucide-square-parking-icon',
  shapeFactory: LUCIDE_SQUARE_PARKING_SHAPE_FACTORY,
});

export const asLucideSquareParkingIcon = fixed.asHook;
export const lucideSquareParkingIcon = fixed.prototype;
export default lucideSquareParkingIcon;
