// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-check-big' as const;
export const LUCIDE_CIRCLE_CHECK_BIG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21.801 10A10 10 0 1 1 17 3.335' }),
  svg.path({ d: 'm9 11 3 3L22 4' }),
];

export function renderLucideCircleCheckBigIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_CHECK_BIG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-check-big-icon',
  prototypeName: 'lucide-circle-check-big-icon',
  shapeFactory: LUCIDE_CIRCLE_CHECK_BIG_SHAPE_FACTORY,
});

export const asLucideCircleCheckBigIcon = fixed.asHook;
export const lucideCircleCheckBigIcon = fixed.prototype;
export default lucideCircleCheckBigIcon;
