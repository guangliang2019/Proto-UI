// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-right' as const;
export const LUCIDE_MOVE_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 8L22 12L18 16' }),
  svg.path({ d: 'M2 12H22' }),
];

export function renderLucideMoveRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-right-icon',
  prototypeName: 'lucide-move-right-icon',
  shapeFactory: LUCIDE_MOVE_RIGHT_SHAPE_FACTORY,
});

export const asLucideMoveRightIcon = fixed.asHook;
export const lucideMoveRightIcon = fixed.prototype;
export default lucideMoveRightIcon;
