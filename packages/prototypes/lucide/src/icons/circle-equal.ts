// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-equal' as const;
export const LUCIDE_CIRCLE_EQUAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M7 10h10' }),
  svg.path({ d: 'M7 14h10' }),
];

export function renderLucideCircleEqualIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_EQUAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-equal-icon',
  prototypeName: 'lucide-circle-equal-icon',
  shapeFactory: LUCIDE_CIRCLE_EQUAL_SHAPE_FACTORY,
});

export const asLucideCircleEqualIcon = fixed.asHook;
export const lucideCircleEqualIcon = fixed.prototype;
export default lucideCircleEqualIcon;
