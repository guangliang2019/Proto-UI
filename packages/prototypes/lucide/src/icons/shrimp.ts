// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'shrimp' as const;
export const LUCIDE_SHRIMP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 12h.01' }),
  svg.path({ d: 'M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1' }),
  svg.path({
    d: 'M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8',
  }),
  svg.path({ d: 'M14 8a8.5 8.5 0 0 1 0 8' }),
  svg.path({ d: 'M16 16c2 0 4.5-4 4-6' }),
];

export function renderLucideShrimpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHRIMP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-shrimp-icon',
  prototypeName: 'lucide-shrimp-icon',
  shapeFactory: LUCIDE_SHRIMP_SHAPE_FACTORY,
});

export const asLucideShrimpIcon = fixed.asHook;
export const lucideShrimpIcon = fixed.prototype;
export default lucideShrimpIcon;
