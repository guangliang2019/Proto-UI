// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ellipsis-vertical' as const;
export const LUCIDE_ELLIPSIS_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 1 }),
  svg.circle({ cx: 12, cy: 5, r: 1 }),
  svg.circle({ cx: 12, cy: 19, r: 1 }),
];

export function renderLucideEllipsisVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ELLIPSIS_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ellipsis-vertical-icon',
  prototypeName: 'lucide-ellipsis-vertical-icon',
  shapeFactory: LUCIDE_ELLIPSIS_VERTICAL_SHAPE_FACTORY,
});

export const asLucideEllipsisVerticalIcon = fixed.asHook;
export const lucideEllipsisVerticalIcon = fixed.prototype;
export default lucideEllipsisVerticalIcon;
