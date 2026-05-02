// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-medium' as const;
export const LUCIDE_BATTERY_MEDIUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 14v-4' }),
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M6 14v-4' }),
  svg.rect({ x: 2, y: 6, width: 16, height: 12, rx: 2 }),
];

export function renderLucideBatteryMediumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_MEDIUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-medium-icon',
  prototypeName: 'lucide-battery-medium-icon',
  shapeFactory: LUCIDE_BATTERY_MEDIUM_SHAPE_FACTORY,
});

export const asLucideBatteryMediumIcon = fixed.asHook;
export const lucideBatteryMediumIcon = fixed.prototype;
export default lucideBatteryMediumIcon;
