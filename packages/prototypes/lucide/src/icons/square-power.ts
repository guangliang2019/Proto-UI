// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-power' as const;
export const LUCIDE_SQUARE_POWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7v4' }),
  svg.path({ d: 'M7.998 9.003a5 5 0 1 0 8-.005' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideSquarePowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_POWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-power-icon',
  prototypeName: 'lucide-square-power-icon',
  shapeFactory: LUCIDE_SQUARE_POWER_SHAPE_FACTORY,
});

export const asLucideSquarePowerIcon = fixed.asHook;
export const lucideSquarePowerIcon = fixed.prototype;
export default lucideSquarePowerIcon;
