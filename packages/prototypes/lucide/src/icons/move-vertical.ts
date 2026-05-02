// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-vertical' as const;
export const LUCIDE_MOVE_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v20' }),
  svg.path({ d: 'm8 18 4 4 4-4' }),
  svg.path({ d: 'm8 6 4-4 4 4' }),
];

export function renderLucideMoveVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-vertical-icon',
  prototypeName: 'lucide-move-vertical-icon',
  shapeFactory: LUCIDE_MOVE_VERTICAL_SHAPE_FACTORY,
});

export const asLucideMoveVerticalIcon = fixed.asHook;
export const lucideMoveVerticalIcon = fixed.prototype;
export default lucideMoveVerticalIcon;
