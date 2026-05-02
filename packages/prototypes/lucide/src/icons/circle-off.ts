// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-off' as const;
export const LUCIDE_CIRCLE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M8.35 2.69A10 10 0 0 1 21.3 15.65' }),
  svg.path({ d: 'M19.08 19.08A10 10 0 1 1 4.92 4.92' }),
];

export function renderLucideCircleOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-off-icon',
  prototypeName: 'lucide-circle-off-icon',
  shapeFactory: LUCIDE_CIRCLE_OFF_SHAPE_FACTORY,
});

export const asLucideCircleOffIcon = fixed.asHook;
export const lucideCircleOffIcon = fixed.prototype;
export default lucideCircleOffIcon;
