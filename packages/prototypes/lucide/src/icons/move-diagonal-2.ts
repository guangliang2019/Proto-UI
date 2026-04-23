// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-diagonal-2' as const;
export const LUCIDE_MOVE_DIAGONAL_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 13v6h-6' }),
  svg.path({ d: 'M5 11V5h6' }),
  svg.path({ d: 'm5 5 14 14' }),
];

export function renderLucideMoveDiagonal2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_DIAGONAL_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-diagonal-2-icon',
  prototypeName: 'lucide-move-diagonal-2-icon',
  shapeFactory: LUCIDE_MOVE_DIAGONAL_2_SHAPE_FACTORY,
});

export const asLucideMoveDiagonal2Icon = fixed.asHook;
export const lucideMoveDiagonal2Icon = fixed.prototype;
export default lucideMoveDiagonal2Icon;
