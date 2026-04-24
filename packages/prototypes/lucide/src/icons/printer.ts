// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'printer' as const;
export const LUCIDE_PRINTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6' }),
  svg.rect({ x: 6, y: 14, width: 12, height: 8, rx: 1 }),
];

export function renderLucidePrinterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PRINTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-printer-icon',
  prototypeName: 'lucide-printer-icon',
  shapeFactory: LUCIDE_PRINTER_SHAPE_FACTORY,
});

export const asLucidePrinterIcon = fixed.asHook;
export const lucidePrinterIcon = fixed.prototype;
export default lucidePrinterIcon;
