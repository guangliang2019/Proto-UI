// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-ellipsis' as const;
export const LUCIDE_CIRCLE_ELLIPSIS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M17 12h.01' }),
  svg.path({ d: 'M12 12h.01' }),
  svg.path({ d: 'M7 12h.01' }),
];

export function renderLucideCircleEllipsisIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_ELLIPSIS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-ellipsis-icon',
  prototypeName: 'lucide-circle-ellipsis-icon',
  shapeFactory: LUCIDE_CIRCLE_ELLIPSIS_SHAPE_FACTORY,
});

export const asLucideCircleEllipsisIcon = fixed.asHook;
export const lucideCircleEllipsisIcon = fixed.prototype;
export default lucideCircleEllipsisIcon;
