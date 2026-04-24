// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-left' as const;
export const LUCIDE_CHEVRONS_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 17-5-5 5-5' }),
  svg.path({ d: 'm18 17-5-5 5-5' }),
];

export function renderLucideChevronsLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-left-icon',
  prototypeName: 'lucide-chevrons-left-icon',
  shapeFactory: LUCIDE_CHEVRONS_LEFT_SHAPE_FACTORY,
});

export const asLucideChevronsLeftIcon = fixed.asHook;
export const lucideChevronsLeftIcon = fixed.prototype;
export default lucideChevronsLeftIcon;
