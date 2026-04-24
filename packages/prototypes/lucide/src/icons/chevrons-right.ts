// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-right' as const;
export const LUCIDE_CHEVRONS_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm6 17 5-5-5-5' }),
  svg.path({ d: 'm13 17 5-5-5-5' }),
];

export function renderLucideChevronsRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-right-icon',
  prototypeName: 'lucide-chevrons-right-icon',
  shapeFactory: LUCIDE_CHEVRONS_RIGHT_SHAPE_FACTORY,
});

export const asLucideChevronsRightIcon = fixed.asHook;
export const lucideChevronsRightIcon = fixed.prototype;
export default lucideChevronsRightIcon;
