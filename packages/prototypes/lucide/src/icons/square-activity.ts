// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-activity' as const;
export const LUCIDE_SQUARE_ACTIVITY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M17 12h-2l-2 5-2-10-2 5H7' }),
];

export function renderLucideSquareActivityIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ACTIVITY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-activity-icon',
  prototypeName: 'lucide-square-activity-icon',
  shapeFactory: LUCIDE_SQUARE_ACTIVITY_SHAPE_FACTORY,
});

export const asLucideSquareActivityIcon = fixed.asHook;
export const lucideSquareActivityIcon = fixed.prototype;
export default lucideSquareActivityIcon;
