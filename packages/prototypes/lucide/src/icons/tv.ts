// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tv' as const;
export const LUCIDE_TV_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 2-5 5-5-5' }),
  svg.rect({ width: 20, height: 15, x: 2, y: 7, rx: 2 }),
];

export function renderLucideTvIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TV_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tv-icon',
  prototypeName: 'lucide-tv-icon',
  shapeFactory: LUCIDE_TV_SHAPE_FACTORY,
});

export const asLucideTvIcon = fixed.asHook;
export const lucideTvIcon = fixed.prototype;
export default lucideTvIcon;
