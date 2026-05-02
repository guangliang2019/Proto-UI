// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'axis-3d' as const;
export const LUCIDE_AXIS_3D_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.5 10.5 15 9' }),
  svg.path({ d: 'M4 4v15a1 1 0 0 0 1 1h15' }),
  svg.path({ d: 'M4.293 19.707 6 18' }),
  svg.path({ d: 'm9 15 1.5-1.5' }),
];

export function renderLucideAxis3dIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AXIS_3D_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-axis-3d-icon',
  prototypeName: 'lucide-axis-3d-icon',
  shapeFactory: LUCIDE_AXIS_3D_SHAPE_FACTORY,
});

export const asLucideAxis3dIcon = fixed.asHook;
export const lucideAxis3dIcon = fixed.prototype;
export default lucideAxis3dIcon;
