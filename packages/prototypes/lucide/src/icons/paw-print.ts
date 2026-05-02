// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'paw-print' as const;
export const LUCIDE_PAW_PRINT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 4, r: 2 }),
  svg.circle({ cx: 18, cy: 8, r: 2 }),
  svg.circle({ cx: 20, cy: 16, r: 2 }),
  svg.path({
    d: 'M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z',
  }),
];

export function renderLucidePawPrintIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PAW_PRINT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-paw-print-icon',
  prototypeName: 'lucide-paw-print-icon',
  shapeFactory: LUCIDE_PAW_PRINT_SHAPE_FACTORY,
});

export const asLucidePawPrintIcon = fixed.asHook;
export const lucidePawPrintIcon = fixed.prototype;
export default lucidePawPrintIcon;
