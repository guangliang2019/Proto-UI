// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-up-left' as const;
export const LUCIDE_MOVE_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 11V5H11' }),
  svg.path({ d: 'M5 5L19 19' }),
];

export function renderLucideMoveUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-up-left-icon',
  prototypeName: 'lucide-move-up-left-icon',
  shapeFactory: LUCIDE_MOVE_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideMoveUpLeftIcon = fixed.asHook;
export const lucideMoveUpLeftIcon = fixed.prototype;
export default lucideMoveUpLeftIcon;
