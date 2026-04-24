// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-10' as const;
export const LUCIDE_CLOCK_10_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 6v6l-4-2' }),
];

export function renderLucideClock10Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_10_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-10-icon',
  prototypeName: 'lucide-clock-10-icon',
  shapeFactory: LUCIDE_CLOCK_10_SHAPE_FACTORY,
});

export const asLucideClock10Icon = fixed.asHook;
export const lucideClock10Icon = fixed.prototype;
export default lucideClock10Icon;
