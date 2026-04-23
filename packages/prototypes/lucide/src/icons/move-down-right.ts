// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-down-right' as const;
export const LUCIDE_MOVE_DOWN_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 13V19H13' }),
  svg.path({ d: 'M5 5L19 19' }),
];

export function renderLucideMoveDownRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_DOWN_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-down-right-icon',
  prototypeName: 'lucide-move-down-right-icon',
  shapeFactory: LUCIDE_MOVE_DOWN_RIGHT_SHAPE_FACTORY,
});

export const asLucideMoveDownRightIcon = fixed.asHook;
export const lucideMoveDownRightIcon = fixed.prototype;
export default lucideMoveDownRightIcon;
