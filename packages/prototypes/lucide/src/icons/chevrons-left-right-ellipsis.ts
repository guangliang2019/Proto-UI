// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-left-right-ellipsis' as const;
export const LUCIDE_CHEVRONS_LEFT_RIGHT_ELLIPSIS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 12h.01' }),
  svg.path({ d: 'M16 12h.01' }),
  svg.path({ d: 'm17 7 5 5-5 5' }),
  svg.path({ d: 'm7 7-5 5 5 5' }),
  svg.path({ d: 'M8 12h.01' }),
];

export function renderLucideChevronsLeftRightEllipsisIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_LEFT_RIGHT_ELLIPSIS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-left-right-ellipsis-icon',
  prototypeName: 'lucide-chevrons-left-right-ellipsis-icon',
  shapeFactory: LUCIDE_CHEVRONS_LEFT_RIGHT_ELLIPSIS_SHAPE_FACTORY,
});

export const asLucideChevronsLeftRightEllipsisIcon = fixed.asHook;
export const lucideChevronsLeftRightEllipsisIcon = fixed.prototype;
export default lucideChevronsLeftRightEllipsisIcon;
