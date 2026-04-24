// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'clock-arrow-down' as const;
export const LUCIDE_CLOCK_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 6v6l2 1' }),
  svg.path({ d: 'M12.337 21.994a10 10 0 1 1 9.588-8.767' }),
  svg.path({ d: 'm14 18 4 4 4-4' }),
  svg.path({ d: 'M18 14v8' }),
];

export function renderLucideClockArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOCK_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-clock-arrow-down-icon',
  prototypeName: 'lucide-clock-arrow-down-icon',
  shapeFactory: LUCIDE_CLOCK_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideClockArrowDownIcon = fixed.asHook;
export const lucideClockArrowDownIcon = fixed.prototype;
export default lucideClockArrowDownIcon;
