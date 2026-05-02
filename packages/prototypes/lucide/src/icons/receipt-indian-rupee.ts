// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'receipt-indian-rupee' as const;
export const LUCIDE_RECEIPT_INDIAN_RUPEE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
  }),
  svg.path({ d: 'M8 11h8' }),
  svg.path({ d: 'M8 7h8' }),
  svg.path({ d: 'M9 7a4 4 0 0 1 0 8H8l3 2' }),
];

export function renderLucideReceiptIndianRupeeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RECEIPT_INDIAN_RUPEE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-receipt-indian-rupee-icon',
  prototypeName: 'lucide-receipt-indian-rupee-icon',
  shapeFactory: LUCIDE_RECEIPT_INDIAN_RUPEE_SHAPE_FACTORY,
});

export const asLucideReceiptIndianRupeeIcon = fixed.asHook;
export const lucideReceiptIndianRupeeIcon = fixed.prototype;
export default lucideReceiptIndianRupeeIcon;
