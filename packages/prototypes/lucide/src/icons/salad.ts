// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'salad' as const;
export const LUCIDE_SALAD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 21h10' }),
  svg.path({ d: 'M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z' }),
  svg.path({
    d: 'M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1',
  }),
  svg.path({ d: 'm13 12 4-4' }),
  svg.path({ d: 'M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2' }),
];

export function renderLucideSaladIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SALAD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-salad-icon',
  prototypeName: 'lucide-salad-icon',
  shapeFactory: LUCIDE_SALAD_SHAPE_FACTORY,
});

export const asLucideSaladIcon = fixed.asHook;
export const lucideSaladIcon = fixed.prototype;
export default lucideSaladIcon;
