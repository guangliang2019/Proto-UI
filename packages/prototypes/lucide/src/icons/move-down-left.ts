// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-down-left' as const;
export const LUCIDE_MOVE_DOWN_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 19H5V13' }),
  svg.path({ d: 'M19 5L5 19' }),
];

export function renderLucideMoveDownLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_DOWN_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-down-left-icon',
  prototypeName: 'lucide-move-down-left-icon',
  shapeFactory: LUCIDE_MOVE_DOWN_LEFT_SHAPE_FACTORY,
});

export const asLucideMoveDownLeftIcon = fixed.asHook;
export const lucideMoveDownLeftIcon = fixed.prototype;
export default lucideMoveDownLeftIcon;
