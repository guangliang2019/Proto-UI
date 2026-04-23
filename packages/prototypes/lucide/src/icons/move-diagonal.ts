// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-diagonal' as const;
export const LUCIDE_MOVE_DIAGONAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 19H5v-6' }),
  svg.path({ d: 'M13 5h6v6' }),
  svg.path({ d: 'M19 5 5 19' }),
];

export function renderLucideMoveDiagonalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_DIAGONAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-diagonal-icon',
  prototypeName: 'lucide-move-diagonal-icon',
  shapeFactory: LUCIDE_MOVE_DIAGONAL_SHAPE_FACTORY,
});

export const asLucideMoveDiagonalIcon = fixed.asHook;
export const lucideMoveDiagonalIcon = fixed.prototype;
export default lucideMoveDiagonalIcon;
