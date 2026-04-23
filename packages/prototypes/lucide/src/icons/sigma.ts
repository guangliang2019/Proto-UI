// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sigma' as const;
export const LUCIDE_SIGMA_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2',
  });

export function renderLucideSigmaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGMA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sigma-icon',
  prototypeName: 'lucide-sigma-icon',
  shapeFactory: LUCIDE_SIGMA_SHAPE_FACTORY,
});

export const asLucideSigmaIcon = fixed.asHook;
export const lucideSigmaIcon = fixed.prototype;
export default lucideSigmaIcon;
