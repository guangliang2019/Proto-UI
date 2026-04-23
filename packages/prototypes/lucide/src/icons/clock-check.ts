// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-check' as const;
export const LUCIDE_CLOCK_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v6l4 2' }),
  svg.path({ d: 'M22 12a10 10 0 1 0-11 9.95' }),
  svg.path({ d: 'm22 16-5.5 5.5L14 19' }),
];

export function renderLucideClockCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-check-icon',
  prototypeName: 'lucide-clock-check-icon',
  shapeFactory: LUCIDE_CLOCK_CHECK_SHAPE_FACTORY,
});

export const asLucideClockCheckIcon = fixed.asHook;
export const lucideClockCheckIcon = fixed.prototype;
export default lucideClockCheckIcon;
