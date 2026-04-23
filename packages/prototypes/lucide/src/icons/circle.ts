// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle' as const;
export const LUCIDE_CIRCLE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.circle({ cx: 12, cy: 12, r: 10 });

export function renderLucideCircleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-icon',
  prototypeName: 'lucide-circle-icon',
  shapeFactory: LUCIDE_CIRCLE_SHAPE_FACTORY,
});

export const asLucideCircleIcon = fixed.asHook;
export const lucideCircleIcon = fixed.prototype;
export default lucideCircleIcon;
