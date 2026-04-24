// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'chevrons-right-left' as const;
export const LUCIDE_CHEVRONS_RIGHT_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm20 17-5-5 5-5' }),
  svg.path({ d: 'm4 17 5-5-5-5' }),
];

export function renderLucideChevronsRightLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CHEVRONS_RIGHT_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-chevrons-right-left-icon',
  prototypeName: 'lucide-chevrons-right-left-icon',
  shapeFactory: LUCIDE_CHEVRONS_RIGHT_LEFT_SHAPE_FACTORY,
});

export const asLucideChevronsRightLeftIcon = fixed.asHook;
export const lucideChevronsRightLeftIcon = fixed.prototype;
export default lucideChevronsRightLeftIcon;
