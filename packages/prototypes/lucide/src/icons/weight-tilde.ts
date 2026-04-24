// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'weight-tilde' as const;
export const LUCIDE_WEIGHT_TILDE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z',
  }),
  svg.path({ d: 'M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0' }),
  svg.circle({ cx: 12, cy: 5, r: 3 }),
];

export function renderLucideWeightTildeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WEIGHT_TILDE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-weight-tilde-icon',
  prototypeName: 'lucide-weight-tilde-icon',
  shapeFactory: LUCIDE_WEIGHT_TILDE_SHAPE_FACTORY,
});

export const asLucideWeightTildeIcon = fixed.asHook;
export const lucideWeightTildeIcon = fixed.prototype;
export default lucideWeightTildeIcon;
