// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-chevron-right' as const;
export const LUCIDE_CIRCLE_CHEVRON_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm10 8 4 4-4 4' }),
];

export function renderLucideCircleChevronRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_CHEVRON_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-chevron-right-icon',
  prototypeName: 'lucide-circle-chevron-right-icon',
  shapeFactory: LUCIDE_CIRCLE_CHEVRON_RIGHT_SHAPE_FACTORY,
});

export const asLucideCircleChevronRightIcon = fixed.asHook;
export const lucideCircleChevronRightIcon = fixed.prototype;
export default lucideCircleChevronRightIcon;
