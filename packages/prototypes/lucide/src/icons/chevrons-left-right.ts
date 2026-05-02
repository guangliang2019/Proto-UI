// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-left-right' as const;
export const LUCIDE_CHEVRONS_LEFT_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm9 7-5 5 5 5' }),
  svg.path({ d: 'm15 7 5 5-5 5' }),
];

export function renderLucideChevronsLeftRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_LEFT_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-left-right-icon',
  prototypeName: 'lucide-chevrons-left-right-icon',
  shapeFactory: LUCIDE_CHEVRONS_LEFT_RIGHT_SHAPE_FACTORY,
});

export const asLucideChevronsLeftRightIcon = fixed.asHook;
export const lucideChevronsLeftRightIcon = fixed.prototype;
export default lucideChevronsLeftRightIcon;
