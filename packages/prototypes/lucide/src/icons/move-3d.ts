// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-3d' as const;
export const LUCIDE_MOVE_3D_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 3v16h16' }),
  svg.path({ d: 'm5 19 6-6' }),
  svg.path({ d: 'm2 6 3-3 3 3' }),
  svg.path({ d: 'm18 16 3 3-3 3' }),
];

export function renderLucideMove3dIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_3D_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-3d-icon',
  prototypeName: 'lucide-move-3d-icon',
  shapeFactory: LUCIDE_MOVE_3D_SHAPE_FACTORY,
});

export const asLucideMove3dIcon = fixed.asHook;
export const lucideMove3dIcon = fixed.prototype;
export default lucideMove3dIcon;
