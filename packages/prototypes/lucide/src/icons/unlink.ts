// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'unlink' as const;
export const LUCIDE_UNLINK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71',
  }),
  svg.path({
    d: 'm5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71',
  }),
  svg.line({ x1: 8, x2: 8, y1: 2, y2: 5 }),
  svg.line({ x1: 2, x2: 5, y1: 8, y2: 8 }),
  svg.line({ x1: 16, x2: 16, y1: 19, y2: 22 }),
  svg.line({ x1: 19, x2: 22, y1: 16, y2: 16 }),
];

export function renderLucideUnlinkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNLINK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-unlink-icon',
  prototypeName: 'lucide-unlink-icon',
  shapeFactory: LUCIDE_UNLINK_SHAPE_FACTORY,
});

export const asLucideUnlinkIcon = fixed.asHook;
export const lucideUnlinkIcon = fixed.prototype;
export default lucideUnlinkIcon;
