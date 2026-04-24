// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'timer' as const;
export const LUCIDE_TIMER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 10, x2: 14, y1: 2, y2: 2 }),
  svg.line({ x1: 12, x2: 15, y1: 14, y2: 11 }),
  svg.circle({ cx: 12, cy: 14, r: 8 }),
];

export function renderLucideTimerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TIMER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-timer-icon',
  prototypeName: 'lucide-timer-icon',
  shapeFactory: LUCIDE_TIMER_SHAPE_FACTORY,
});

export const asLucideTimerIcon = fixed.asHook;
export const lucideTimerIcon = fixed.prototype;
export default lucideTimerIcon;
