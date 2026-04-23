// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move-down' as const;
export const LUCIDE_MOVE_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 18L12 22L16 18' }),
  svg.path({ d: 'M12 2V22' }),
];

export function renderLucideMoveDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-down-icon',
  prototypeName: 'lucide-move-down-icon',
  shapeFactory: LUCIDE_MOVE_DOWN_SHAPE_FACTORY,
});

export const asLucideMoveDownIcon = fixed.asHook;
export const lucideMoveDownIcon = fixed.prototype;
export default lucideMoveDownIcon;
