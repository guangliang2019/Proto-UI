// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'goal' as const;
export const LUCIDE_GOAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 13V2l8 4-8 4' }),
  svg.path({ d: 'M20.561 10.222a9 9 0 1 1-12.55-5.29' }),
  svg.path({ d: 'M8.002 9.997a5 5 0 1 0 8.9 2.02' }),
];

export function renderLucideGoalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GOAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-goal-icon',
  prototypeName: 'lucide-goal-icon',
  shapeFactory: LUCIDE_GOAL_SHAPE_FACTORY,
});

export const asLucideGoalIcon = fixed.asHook;
export const lucideGoalIcon = fixed.prototype;
export default lucideGoalIcon;
