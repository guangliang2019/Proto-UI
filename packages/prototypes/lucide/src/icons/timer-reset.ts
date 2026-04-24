// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'timer-reset' as const;
export const LUCIDE_TIMER_RESET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2h4' }),
  svg.path({ d: 'M12 14v-4' }),
  svg.path({ d: 'M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6' }),
  svg.path({ d: 'M9 17H4v5' }),
];

export function renderLucideTimerResetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TIMER_RESET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-timer-reset-icon',
  prototypeName: 'lucide-timer-reset-icon',
  shapeFactory: LUCIDE_TIMER_RESET_SHAPE_FACTORY,
});

export const asLucideTimerResetIcon = fixed.asHook;
export const lucideTimerResetIcon = fixed.prototype;
export default lucideTimerResetIcon;
