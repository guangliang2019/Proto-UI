// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'equal-approximately' as const;
export const LUCIDE_EQUAL_APPROXIMATELY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0' }),
  svg.path({ d: 'M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0' }),
];

export function renderLucideEqualApproximatelyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EQUAL_APPROXIMATELY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-equal-approximately-icon',
  prototypeName: 'lucide-equal-approximately-icon',
  shapeFactory: LUCIDE_EQUAL_APPROXIMATELY_SHAPE_FACTORY,
});

export const asLucideEqualApproximatelyIcon = fixed.asHook;
export const lucideEqualApproximatelyIcon = fixed.prototype;
export default lucideEqualApproximatelyIcon;
