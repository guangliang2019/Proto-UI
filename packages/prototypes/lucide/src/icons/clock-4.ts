// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-4' as const;
export const LUCIDE_CLOCK_4_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 6v6l4 2' }),
];

export function renderLucideClock4Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_4_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-4-icon',
  prototypeName: 'lucide-clock-4-icon',
  shapeFactory: LUCIDE_CLOCK_4_SHAPE_FACTORY,
});

export const asLucideClock4Icon = fixed.asHook;
export const lucideClock4Icon = fixed.prototype;
export default lucideClock4Icon;
