// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-small' as const;
export const LUCIDE_CIRCLE_SMALL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.circle({ cx: 12, cy: 12, r: 6 });

export function renderLucideCircleSmallIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_SMALL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-small-icon',
  prototypeName: 'lucide-circle-small-icon',
  shapeFactory: LUCIDE_CIRCLE_SMALL_SHAPE_FACTORY,
});

export const asLucideCircleSmallIcon = fixed.asHook;
export const lucideCircleSmallIcon = fixed.prototype;
export default lucideCircleSmallIcon;
