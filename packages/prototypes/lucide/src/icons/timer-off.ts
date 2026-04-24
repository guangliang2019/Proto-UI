// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'timer-off' as const;
export const LUCIDE_TIMER_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2h4' }),
  svg.path({ d: 'M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7' }),
  svg.path({ d: 'M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M12 12v-2' }),
];

export function renderLucideTimerOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TIMER_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-timer-off-icon',
  prototypeName: 'lucide-timer-off-icon',
  shapeFactory: LUCIDE_TIMER_OFF_SHAPE_FACTORY,
});

export const asLucideTimerOffIcon = fixed.asHook;
export const lucideTimerOffIcon = fixed.prototype;
export default lucideTimerOffIcon;
