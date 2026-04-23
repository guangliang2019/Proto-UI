// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-pause' as const;
export const LUCIDE_CIRCLE_PAUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.line({ x1: 10, x2: 10, y1: 15, y2: 9 }),
  svg.line({ x1: 14, x2: 14, y1: 15, y2: 9 }),
];

export function renderLucideCirclePauseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_PAUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-pause-icon',
  prototypeName: 'lucide-circle-pause-icon',
  shapeFactory: LUCIDE_CIRCLE_PAUSE_SHAPE_FACTORY,
});

export const asLucideCirclePauseIcon = fixed.asHook;
export const lucideCirclePauseIcon = fixed.prototype;
export default lucideCirclePauseIcon;
