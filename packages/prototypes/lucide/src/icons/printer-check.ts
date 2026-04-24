// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'printer-check' as const;
export const LUCIDE_PRINTER_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5' }),
  svg.path({ d: 'm16 19 2 2 4-4' }),
  svg.path({ d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6' }),
];

export function renderLucidePrinterCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PRINTER_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-printer-check-icon',
  prototypeName: 'lucide-printer-check-icon',
  shapeFactory: LUCIDE_PRINTER_CHECK_SHAPE_FACTORY,
});

export const asLucidePrinterCheckIcon = fixed.asHook;
export const lucidePrinterCheckIcon = fixed.prototype;
export default lucidePrinterCheckIcon;
