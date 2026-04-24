// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'printer-x' as const;
export const LUCIDE_PRINTER_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377' }),
  svg.path({ d: 'm16.5 16.5 5 5' }),
  svg.path({ d: 'm16.5 21.5 5-5' }),
  svg.path({ d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5' }),
  svg.path({ d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6' }),
];

export function renderLucidePrinterXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PRINTER_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-printer-x-icon',
  prototypeName: 'lucide-printer-x-icon',
  shapeFactory: LUCIDE_PRINTER_X_SHAPE_FACTORY,
});

export const asLucidePrinterXIcon = fixed.asHook;
export const lucidePrinterXIcon = fixed.prototype;
export default lucidePrinterXIcon;
