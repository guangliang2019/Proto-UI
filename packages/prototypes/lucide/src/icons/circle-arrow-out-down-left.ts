// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-out-down-left' as const;
export const LUCIDE_CIRCLE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 12a10 10 0 1 1 10 10' }),
  svg.path({ d: 'm2 22 10-10' }),
  svg.path({ d: 'M8 22H2v-6' }),
];

export function renderLucideCircleArrowOutDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-out-down-left-icon',
  prototypeName: 'lucide-circle-arrow-out-down-left-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_OUT_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideCircleArrowOutDownLeftIcon = fixed.asHook;
export const lucideCircleArrowOutDownLeftIcon = fixed.prototype;
export default lucideCircleArrowOutDownLeftIcon;
