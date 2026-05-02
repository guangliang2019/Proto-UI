// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-chevron-down' as const;
export const LUCIDE_CIRCLE_CHEVRON_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'm16 10-4 4-4-4' }),
];

export function renderLucideCircleChevronDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_CHEVRON_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-chevron-down-icon',
  prototypeName: 'lucide-circle-chevron-down-icon',
  shapeFactory: LUCIDE_CIRCLE_CHEVRON_DOWN_SHAPE_FACTORY,
});

export const asLucideCircleChevronDownIcon = fixed.asHook;
export const lucideCircleChevronDownIcon = fixed.prototype;
export default lucideCircleChevronDownIcon;
