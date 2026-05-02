// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scan-barcode' as const;
export const LUCIDE_SCAN_BARCODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
  svg.path({ d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
  svg.path({ d: 'M8 7v10' }),
  svg.path({ d: 'M12 7v10' }),
  svg.path({ d: 'M17 7v10' }),
];

export function renderLucideScanBarcodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCAN_BARCODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scan-barcode-icon',
  prototypeName: 'lucide-scan-barcode-icon',
  shapeFactory: LUCIDE_SCAN_BARCODE_SHAPE_FACTORY,
});

export const asLucideScanBarcodeIcon = fixed.asHook;
export const lucideScanBarcodeIcon = fixed.prototype;
export default lucideScanBarcodeIcon;
