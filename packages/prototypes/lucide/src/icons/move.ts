// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'move' as const;
export const LUCIDE_MOVE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v20' }),
  svg.path({ d: 'm15 19-3 3-3-3' }),
  svg.path({ d: 'm19 9 3 3-3 3' }),
  svg.path({ d: 'M2 12h20' }),
  svg.path({ d: 'm5 9-3 3 3 3' }),
  svg.path({ d: 'm9 5 3-3 3 3' }),
];

export function renderLucideMoveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-move-icon',
  prototypeName: 'lucide-move-icon',
  shapeFactory: LUCIDE_MOVE_SHAPE_FACTORY,
});

export const asLucideMoveIcon = fixed.asHook;
export const lucideMoveIcon = fixed.prototype;
export default lucideMoveIcon;
