// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'venetian-mask' as const;
export const LUCIDE_VENETIAN_MASK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 11c-1.5 0-2.5.5-3 2' }),
  svg.path({
    d: 'M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z',
  }),
  svg.path({ d: 'M6 11c1.5 0 2.5.5 3 2' }),
];

export function renderLucideVenetianMaskIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VENETIAN_MASK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-venetian-mask-icon',
  prototypeName: 'lucide-venetian-mask-icon',
  shapeFactory: LUCIDE_VENETIAN_MASK_SHAPE_FACTORY,
});

export const asLucideVenetianMaskIcon = fixed.asHook;
export const lucideVenetianMaskIcon = fixed.prototype;
export default lucideVenetianMaskIcon;
