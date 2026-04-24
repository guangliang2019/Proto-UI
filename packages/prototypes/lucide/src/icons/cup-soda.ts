// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cup-soda' as const;
export const LUCIDE_CUP_SODA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8' }),
  svg.path({ d: 'M5 8h14' }),
  svg.path({ d: 'M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0' }),
  svg.path({ d: 'm12 8 1-6h2' }),
];

export function renderLucideCupSodaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CUP_SODA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cup-soda-icon',
  prototypeName: 'lucide-cup-soda-icon',
  shapeFactory: LUCIDE_CUP_SODA_SHAPE_FACTORY,
});

export const asLucideCupSodaIcon = fixed.asHook;
export const lucideCupSodaIcon = fixed.prototype;
export default lucideCupSodaIcon;
