// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-up-right' as const;
export const LUCIDE_MOVE_UP_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13 5H19V11' }),
  svg.path({ d: 'M19 5L5 19' }),
];

export function renderLucideMoveUpRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_UP_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-up-right-icon',
  prototypeName: 'lucide-move-up-right-icon',
  shapeFactory: LUCIDE_MOVE_UP_RIGHT_SHAPE_FACTORY,
});

export const asLucideMoveUpRightIcon = fixed.asHook;
export const lucideMoveUpRightIcon = fixed.prototype;
export default lucideMoveUpRightIcon;
