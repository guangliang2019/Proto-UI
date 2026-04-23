// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scale-3d' as const;
export const LUCIDE_SCALE_3D_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 7v11a1 1 0 0 0 1 1h11' }),
  svg.path({ d: 'M5.293 18.707 11 13' }),
  svg.circle({ cx: 19, cy: 19, r: 2 }),
  svg.circle({ cx: 5, cy: 5, r: 2 }),
];

export function renderLucideScale3dIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCALE_3D_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scale-3d-icon',
  prototypeName: 'lucide-scale-3d-icon',
  shapeFactory: LUCIDE_SCALE_3D_SHAPE_FACTORY,
});

export const asLucideScale3dIcon = fixed.asHook;
export const lucideScale3dIcon = fixed.prototype;
export default lucideScale3dIcon;
