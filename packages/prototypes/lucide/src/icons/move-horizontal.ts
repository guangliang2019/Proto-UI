// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-horizontal' as const;
export const LUCIDE_MOVE_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm18 8 4 4-4 4' }),
  svg.path({ d: 'M2 12h20' }),
  svg.path({ d: 'm6 8-4 4 4 4' }),
];

export function renderLucideMoveHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-horizontal-icon',
  prototypeName: 'lucide-move-horizontal-icon',
  shapeFactory: LUCIDE_MOVE_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideMoveHorizontalIcon = fixed.asHook;
export const lucideMoveHorizontalIcon = fixed.prototype;
export default lucideMoveHorizontalIcon;
