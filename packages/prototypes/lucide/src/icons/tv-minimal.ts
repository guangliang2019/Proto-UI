// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tv-minimal' as const;
export const LUCIDE_TV_MINIMAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 21h10' }),
  svg.rect({ width: 20, height: 14, x: 2, y: 3, rx: 2 }),
];

export function renderLucideTvMinimalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TV_MINIMAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tv-minimal-icon',
  prototypeName: 'lucide-tv-minimal-icon',
  shapeFactory: LUCIDE_TV_MINIMAL_SHAPE_FACTORY,
});

export const asLucideTvMinimalIcon = fixed.asHook;
export const lucideTvMinimalIcon = fixed.prototype;
export default lucideTvMinimalIcon;
