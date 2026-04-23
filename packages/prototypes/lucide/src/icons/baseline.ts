// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'baseline' as const;
export const LUCIDE_BASELINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 20h16' }),
  svg.path({ d: 'm6 16 6-12 6 12' }),
  svg.path({ d: 'M8 12h8' }),
];

export function renderLucideBaselineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BASELINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-baseline-icon',
  prototypeName: 'lucide-baseline-icon',
  shapeFactory: LUCIDE_BASELINE_SHAPE_FACTORY,
});

export const asLucideBaselineIcon = fixed.asHook;
export const lucideBaselineIcon = fixed.prototype;
export default lucideBaselineIcon;
