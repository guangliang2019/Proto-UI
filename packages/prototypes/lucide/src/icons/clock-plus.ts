// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-plus' as const;
export const LUCIDE_CLOCK_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v6l3.644 1.822' }),
  svg.path({ d: 'M16 19h6' }),
  svg.path({ d: 'M19 16v6' }),
  svg.path({ d: 'M21.92 13.267a10 10 0 1 0-8.653 8.653' }),
];

export function renderLucideClockPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-plus-icon',
  prototypeName: 'lucide-clock-plus-icon',
  shapeFactory: LUCIDE_CLOCK_PLUS_SHAPE_FACTORY,
});

export const asLucideClockPlusIcon = fixed.asHook;
export const lucideClockPlusIcon = fixed.prototype;
export default lucideClockPlusIcon;
