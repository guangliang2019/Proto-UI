// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'candy' as const;
export const LUCIDE_CANDY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 7v10.9' }),
  svg.path({ d: 'M14 6.1V17' }),
  svg.path({
    d: 'M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4',
  }),
  svg.path({
    d: 'M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07',
  }),
  svg.path({
    d: 'M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4',
  }),
];

export function renderLucideCandyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CANDY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-candy-icon',
  prototypeName: 'lucide-candy-icon',
  shapeFactory: LUCIDE_CANDY_SHAPE_FACTORY,
});

export const asLucideCandyIcon = fixed.asHook;
export const lucideCandyIcon = fixed.prototype;
export default lucideCandyIcon;
