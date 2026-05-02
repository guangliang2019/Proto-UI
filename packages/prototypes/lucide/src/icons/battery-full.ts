// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-full' as const;
export const LUCIDE_BATTERY_FULL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 10v4' }),
  svg.path({ d: 'M14 10v4' }),
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M6 10v4' }),
  svg.rect({ x: 2, y: 6, width: 16, height: 12, rx: 2 }),
];

export function renderLucideBatteryFullIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_FULL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-full-icon',
  prototypeName: 'lucide-battery-full-icon',
  shapeFactory: LUCIDE_BATTERY_FULL_SHAPE_FACTORY,
});

export const asLucideBatteryFullIcon = fixed.asHook;
export const lucideBatteryFullIcon = fixed.prototype;
export default lucideBatteryFullIcon;
