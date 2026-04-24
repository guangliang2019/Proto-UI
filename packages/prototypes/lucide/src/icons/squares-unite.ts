// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'squares-unite' as const;
export const LUCIDE_SQUARES_UNITE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z',
  });

export function renderLucideSquaresUniteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARES_UNITE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-squares-unite-icon',
  prototypeName: 'lucide-squares-unite-icon',
  shapeFactory: LUCIDE_SQUARES_UNITE_SHAPE_FACTORY,
});

export const asLucideSquaresUniteIcon = fixed.asHook;
export const lucideSquaresUniteIcon = fixed.prototype;
export default lucideSquaresUniteIcon;
