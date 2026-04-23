// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'equal' as const;
export const LUCIDE_EQUAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 5, x2: 19, y1: 9, y2: 9 }),
  svg.line({ x1: 5, x2: 19, y1: 15, y2: 15 }),
];

export function renderLucideEqualIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EQUAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-equal-icon',
  prototypeName: 'lucide-equal-icon',
  shapeFactory: LUCIDE_EQUAL_SHAPE_FACTORY,
});

export const asLucideEqualIcon = fixed.asHook;
export const lucideEqualIcon = fixed.prototype;
export default lucideEqualIcon;
