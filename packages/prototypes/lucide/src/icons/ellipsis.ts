// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ellipsis' as const;
export const LUCIDE_ELLIPSIS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 1 }),
  svg.circle({ cx: 19, cy: 12, r: 1 }),
  svg.circle({ cx: 5, cy: 12, r: 1 }),
];

export function renderLucideEllipsisIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ELLIPSIS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ellipsis-icon',
  prototypeName: 'lucide-ellipsis-icon',
  shapeFactory: LUCIDE_ELLIPSIS_SHAPE_FACTORY,
});

export const asLucideEllipsisIcon = fixed.asHook;
export const lucideEllipsisIcon = fixed.prototype;
export default lucideEllipsisIcon;
