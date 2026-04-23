// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-arrow-up' as const;
export const LUCIDE_CLOCK_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v6l1.56.78' }),
  svg.path({ d: 'M13.227 21.925a10 10 0 1 1 8.767-9.588' }),
  svg.path({ d: 'm14 18 4-4 4 4' }),
  svg.path({ d: 'M18 22v-8' }),
];

export function renderLucideClockArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-arrow-up-icon',
  prototypeName: 'lucide-clock-arrow-up-icon',
  shapeFactory: LUCIDE_CLOCK_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideClockArrowUpIcon = fixed.asHook;
export const lucideClockArrowUpIcon = fixed.prototype;
export default lucideClockArrowUpIcon;
