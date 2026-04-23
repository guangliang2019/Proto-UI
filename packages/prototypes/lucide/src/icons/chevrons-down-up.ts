// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-down-up' as const;
export const LUCIDE_CHEVRONS_DOWN_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm7 20 5-5 5 5' }),
  svg.path({ d: 'm7 4 5 5 5-5' }),
];

export function renderLucideChevronsDownUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_DOWN_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-down-up-icon',
  prototypeName: 'lucide-chevrons-down-up-icon',
  shapeFactory: LUCIDE_CHEVRONS_DOWN_UP_SHAPE_FACTORY,
});

export const asLucideChevronsDownUpIcon = fixed.asHook;
export const lucideChevronsDownUpIcon = fixed.prototype;
export default lucideChevronsDownUpIcon;
