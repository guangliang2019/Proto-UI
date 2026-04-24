// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'equal-not' as const;
export const LUCIDE_EQUAL_NOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 5, x2: 19, y1: 9, y2: 9 }),
  svg.line({ x1: 5, x2: 19, y1: 15, y2: 15 }),
  svg.line({ x1: 19, x2: 5, y1: 5, y2: 19 }),
];

export function renderLucideEqualNotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EQUAL_NOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-equal-not-icon',
  prototypeName: 'lucide-equal-not-icon',
  shapeFactory: LUCIDE_EQUAL_NOT_SHAPE_FACTORY,
});

export const asLucideEqualNotIcon = fixed.asHook;
export const lucideEqualNotIcon = fixed.prototype;
export default lucideEqualNotIcon;
