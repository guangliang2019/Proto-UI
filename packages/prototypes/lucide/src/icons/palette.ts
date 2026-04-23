// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'palette' as const;
export const LUCIDE_PALETTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z',
  }),
  svg.circle({ cx: 13.5, cy: 6.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 17.5, cy: 10.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 6.5, cy: 12.5, r: '.5', fill: 'currentColor' }),
  svg.circle({ cx: 8.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
];

export function renderLucidePaletteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PALETTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-palette-icon',
  prototypeName: 'lucide-palette-icon',
  shapeFactory: LUCIDE_PALETTE_SHAPE_FACTORY,
});

export const asLucidePaletteIcon = fixed.asHook;
export const lucidePaletteIcon = fixed.prototype;
export default lucidePaletteIcon;
