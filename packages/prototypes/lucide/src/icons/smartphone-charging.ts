// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'smartphone-charging' as const;
export const LUCIDE_SMARTPHONE_CHARGING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }),
  svg.path({ d: 'M12.667 8 10 12h4l-2.667 4' }),
];

export function renderLucideSmartphoneChargingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SMARTPHONE_CHARGING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-smartphone-charging-icon',
  prototypeName: 'lucide-smartphone-charging-icon',
  shapeFactory: LUCIDE_SMARTPHONE_CHARGING_SHAPE_FACTORY,
});

export const asLucideSmartphoneChargingIcon = fixed.asHook;
export const lucideSmartphoneChargingIcon = fixed.prototype;
export default lucideSmartphoneChargingIcon;
