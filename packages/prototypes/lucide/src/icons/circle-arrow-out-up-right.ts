// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-out-up-right' as const;
export const LUCIDE_CIRCLE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 12A10 10 0 1 1 12 2' }),
  svg.path({ d: 'M22 2 12 12' }),
  svg.path({ d: 'M16 2h6v6' }),
];

export function renderLucideCircleArrowOutUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-out-up-right-icon',
  prototypeName: 'lucide-circle-arrow-out-up-right-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_OUT_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideCircleArrowOutUpRightIcon = fixed.asHook;
export const lucideCircleArrowOutUpRightIcon = fixed.prototype;
export default lucideCircleArrowOutUpRightIcon;
