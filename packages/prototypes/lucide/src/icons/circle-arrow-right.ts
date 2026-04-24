// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-right' as const;
export const LUCIDE_CIRCLE_ARROW_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm12 16 4-4-4-4' }),
  svg.path({ d: 'M8 12h8' }),
];

export function renderLucideCircleArrowRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-right-icon',
  prototypeName: 'lucide-circle-arrow-right-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_RIGHT_SHAPE_FACTORY,
});

export const asLucideCircleArrowRightIcon = fixed.asHook;
export const lucideCircleArrowRightIcon = fixed.prototype;
export default lucideCircleArrowRightIcon;
