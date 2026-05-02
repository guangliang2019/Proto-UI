// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flag' as const;
export const LUCIDE_FLAG_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528',
  });

export function renderLucideFlagIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flag-icon',
  prototypeName: 'lucide-flag-icon',
  shapeFactory: LUCIDE_FLAG_SHAPE_FACTORY,
});

export const asLucideFlagIcon = fixed.asHook;
export const lucideFlagIcon = fixed.prototype;
export default lucideFlagIcon;
