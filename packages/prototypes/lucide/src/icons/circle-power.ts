// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-power' as const;
export const LUCIDE_CIRCLE_POWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 7v4' }),
  svg.path({ d: 'M7.998 9.003a5 5 0 1 0 8-.005' }),
];

export function renderLucideCirclePowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_POWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-power-icon',
  prototypeName: 'lucide-circle-power-icon',
  shapeFactory: LUCIDE_CIRCLE_POWER_SHAPE_FACTORY,
});

export const asLucideCirclePowerIcon = fixed.asHook;
export const lucideCirclePowerIcon = fixed.prototype;
export default lucideCirclePowerIcon;
