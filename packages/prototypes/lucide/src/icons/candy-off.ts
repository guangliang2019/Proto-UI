// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'candy-off' as const;
export const LUCIDE_CANDY_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 10v7.9' }),
  svg.path({ d: 'M11.802 6.145a5 5 0 0 1 6.053 6.053' }),
  svg.path({ d: 'M14 6.1v2.243' }),
  svg.path({ d: 'm15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965' }),
  svg.path({
    d: 'M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4',
  }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({
    d: 'M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4',
  }),
];

export function renderLucideCandyOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CANDY_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-candy-off-icon',
  prototypeName: 'lucide-candy-off-icon',
  shapeFactory: LUCIDE_CANDY_OFF_SHAPE_FACTORY,
});

export const asLucideCandyOffIcon = fixed.asHook;
export const lucideCandyOffIcon = fixed.prototype;
export default lucideCandyOffIcon;
