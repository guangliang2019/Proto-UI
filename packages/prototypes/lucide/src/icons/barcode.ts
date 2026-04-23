// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'barcode' as const;
export const LUCIDE_BARCODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 5v14' }),
  svg.path({ d: 'M8 5v14' }),
  svg.path({ d: 'M12 5v14' }),
  svg.path({ d: 'M17 5v14' }),
  svg.path({ d: 'M21 5v14' }),
];

export function renderLucideBarcodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BARCODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-barcode-icon',
  prototypeName: 'lucide-barcode-icon',
  shapeFactory: LUCIDE_BARCODE_SHAPE_FACTORY,
});

export const asLucideBarcodeIcon = fixed.asHook;
export const lucideBarcodeIcon = fixed.prototype;
export default lucideBarcodeIcon;
