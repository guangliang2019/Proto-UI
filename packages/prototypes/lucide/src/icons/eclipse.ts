// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'eclipse' as const;
export const LUCIDE_ECLIPSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M12 2a7 7 0 1 0 10 10' }),
];

export function renderLucideEclipseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ECLIPSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-eclipse-icon',
  prototypeName: 'lucide-eclipse-icon',
  shapeFactory: LUCIDE_ECLIPSE_SHAPE_FACTORY,
});

export const asLucideEclipseIcon = fixed.asHook;
export const lucideEclipseIcon = fixed.prototype;
export default lucideEclipseIcon;
