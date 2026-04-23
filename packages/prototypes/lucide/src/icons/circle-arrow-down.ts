// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-arrow-down' as const;
export const LUCIDE_CIRCLE_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 8v8' }),
  svg.path({ d: 'm8 12 4 4 4-4' }),
];

export function renderLucideCircleArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-arrow-down-icon',
  prototypeName: 'lucide-circle-arrow-down-icon',
  shapeFactory: LUCIDE_CIRCLE_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideCircleArrowDownIcon = fixed.asHook;
export const lucideCircleArrowDownIcon = fixed.prototype;
export default lucideCircleArrowDownIcon;
