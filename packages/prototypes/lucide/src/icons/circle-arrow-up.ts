// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-up' as const;
export const LUCIDE_CIRCLE_ARROW_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm16 12-4-4-4 4' }),
  svg.path({ d: 'M12 16V8' }),
];

export function renderLucideCircleArrowUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-up-icon',
  prototypeName: 'lucide-circle-arrow-up-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_UP_SHAPE_FACTORY,
});

export const asLucideCircleArrowUpIcon = fixed.asHook;
export const lucideCircleArrowUpIcon = fixed.prototype;
export default lucideCircleArrowUpIcon;
