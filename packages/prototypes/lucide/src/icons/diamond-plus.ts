// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'diamond-plus' as const;
export const LUCIDE_DIAMOND_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 8v8' }),
  svg.path({
    d: 'M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z',
  }),
  svg.path({ d: 'M8 12h8' }),
];

export function renderLucideDiamondPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DIAMOND_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-diamond-plus-icon',
  prototypeName: 'lucide-diamond-plus-icon',
  shapeFactory: LUCIDE_DIAMOND_PLUS_SHAPE_FACTORY,
});

export const asLucideDiamondPlusIcon = fixed.asHook;
export const lucideDiamondPlusIcon = fixed.prototype;
export default lucideDiamondPlusIcon;
