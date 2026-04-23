// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-out-down-right' as const;
export const LUCIDE_CIRCLE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 22a10 10 0 1 1 10-10' }),
  svg.path({ d: 'M22 22 12 12' }),
  svg.path({ d: 'M22 16v6h-6' }),
];

export function renderLucideCircleArrowOutDownRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-out-down-right-icon',
  prototypeName: 'lucide-circle-arrow-out-down-right-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_OUT_DOWN_RIGHT_SHAPE_FACTORY,
});

export const asLucideCircleArrowOutDownRightIcon = fixed.asHook;
export const lucideCircleArrowOutDownRightIcon = fixed.prototype;
export default lucideCircleArrowOutDownRightIcon;
