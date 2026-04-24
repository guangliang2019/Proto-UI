// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-left' as const;
export const LUCIDE_CIRCLE_ARROW_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm12 8-4 4 4 4' }),
  svg.path({ d: 'M16 12H8' }),
];

export function renderLucideCircleArrowLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-left-icon',
  prototypeName: 'lucide-circle-arrow-left-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_LEFT_SHAPE_FACTORY,
});

export const asLucideCircleArrowLeftIcon = fixed.asHook;
export const lucideCircleArrowLeftIcon = fixed.prototype;
export default lucideCircleArrowLeftIcon;
