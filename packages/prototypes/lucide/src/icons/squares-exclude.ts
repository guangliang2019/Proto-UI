// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'squares-exclude' as const;
export const LUCIDE_SQUARES_EXCLUDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0',
  }),
  svg.path({
    d: 'M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2',
  }),
];

export function renderLucideSquaresExcludeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARES_EXCLUDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-squares-exclude-icon',
  prototypeName: 'lucide-squares-exclude-icon',
  shapeFactory: LUCIDE_SQUARES_EXCLUDE_SHAPE_FACTORY,
});

export const asLucideSquaresExcludeIcon = fixed.asHook;
export const lucideSquaresExcludeIcon = fixed.prototype;
export default lucideSquaresExcludeIcon;
