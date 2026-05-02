// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-left' as const;
export const LUCIDE_MOVE_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 8L2 12L6 16' }),
  svg.path({ d: 'M2 12H22' }),
];

export function renderLucideMoveLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-left-icon',
  prototypeName: 'lucide-move-left-icon',
  shapeFactory: LUCIDE_MOVE_LEFT_SHAPE_FACTORY,
});

export const asLucideMoveLeftIcon = fixed.asHook;
export const lucideMoveLeftIcon = fixed.prototype;
export default lucideMoveLeftIcon;
