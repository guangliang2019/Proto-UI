// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-minus-corner' as const;
export const LUCIDE_FILE_MINUS_CORNER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M14 18h6' }),
];

export function renderLucideFileMinusCornerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_MINUS_CORNER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-minus-corner-icon',
  prototypeName: 'lucide-file-minus-corner-icon',
  shapeFactory: LUCIDE_FILE_MINUS_CORNER_SHAPE_FACTORY,
});

export const asLucideFileMinusCornerIcon = fixed.asHook;
export const lucideFileMinusCornerIcon = fixed.prototype;
export default lucideFileMinusCornerIcon;
