// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ellipse' as const;
export const LUCIDE_ELLIPSE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.ellipse({ cx: 12, cy: 12, rx: 10, ry: 6 });

export function renderLucideEllipseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ELLIPSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ellipse-icon',
  prototypeName: 'lucide-ellipse-icon',
  shapeFactory: LUCIDE_ELLIPSE_SHAPE_FACTORY,
});

export const asLucideEllipseIcon = fixed.asHook;
export const lucideEllipseIcon = fixed.prototype;
export default lucideEllipseIcon;
