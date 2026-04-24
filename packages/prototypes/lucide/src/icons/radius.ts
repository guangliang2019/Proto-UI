// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'radius' as const;
export const LUCIDE_RADIUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20.34 17.52a10 10 0 1 0-2.82 2.82' }),
  svg.circle({ cx: 19, cy: 19, r: 2 }),
  svg.path({ d: 'm13.41 13.41 4.18 4.18' }),
  svg.circle({ cx: 12, cy: 12, r: 2 }),
];

export function renderLucideRadiusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RADIUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-radius-icon',
  prototypeName: 'lucide-radius-icon',
  shapeFactory: LUCIDE_RADIUS_SHAPE_FACTORY,
});

export const asLucideRadiusIcon = fixed.asHook;
export const lucideRadiusIcon = fixed.prototype;
export default lucideRadiusIcon;
