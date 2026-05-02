// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-down' as const;
export const LUCIDE_CHEVRONS_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 6 5 5 5-5' }),
  svg.path({ d: 'm7 13 5 5 5-5' }),
];

export function renderLucideChevronsDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-down-icon',
  prototypeName: 'lucide-chevrons-down-icon',
  shapeFactory: LUCIDE_CHEVRONS_DOWN_SHAPE_FACTORY,
});

export const asLucideChevronsDownIcon = fixed.asHook;
export const lucideChevronsDownIcon = fixed.prototype;
export default lucideChevronsDownIcon;
