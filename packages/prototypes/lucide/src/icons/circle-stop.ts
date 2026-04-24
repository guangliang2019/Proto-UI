// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-stop' as const;
export const LUCIDE_CIRCLE_STOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.rect({ x: 9, y: 9, width: 6, height: 6, rx: 1 }),
];

export function renderLucideCircleStopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_STOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-stop-icon',
  prototypeName: 'lucide-circle-stop-icon',
  shapeFactory: LUCIDE_CIRCLE_STOP_SHAPE_FACTORY,
});

export const asLucideCircleStopIcon = fixed.asHook;
export const lucideCircleStopIcon = fixed.prototype;
export default lucideCircleStopIcon;
