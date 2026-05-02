// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-up' as const;
export const LUCIDE_MOVE_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 6L12 2L16 6' }),
  svg.path({ d: 'M12 2V22' }),
];

export function renderLucideMoveUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-up-icon',
  prototypeName: 'lucide-move-up-icon',
  shapeFactory: LUCIDE_MOVE_UP_SHAPE_FACTORY,
});

export const asLucideMoveUpIcon = fixed.asHook;
export const lucideMoveUpIcon = fixed.prototype;
export default lucideMoveUpIcon;
