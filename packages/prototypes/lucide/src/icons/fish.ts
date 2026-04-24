// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fish' as const;
export const LUCIDE_FISH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z',
  }),
  svg.path({ d: 'M18 12v.5' }),
  svg.path({ d: 'M16 17.93a9.77 9.77 0 0 1 0-11.86' }),
  svg.path({
    d: 'M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33',
  }),
  svg.path({ d: 'M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4' }),
  svg.path({ d: 'm16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98' }),
];

export function renderLucideFishIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FISH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fish-icon',
  prototypeName: 'lucide-fish-icon',
  shapeFactory: LUCIDE_FISH_SHAPE_FACTORY,
});

export const asLucideFishIcon = fixed.asHook;
export const lucideFishIcon = fixed.prototype;
export default lucideFishIcon;
