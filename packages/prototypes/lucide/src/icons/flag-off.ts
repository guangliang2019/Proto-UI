// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flag-off' as const;
export const LUCIDE_FLAG_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M4 22V4' }),
  svg.path({ d: 'M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347' }),
];

export function renderLucideFlagOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLAG_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flag-off-icon',
  prototypeName: 'lucide-flag-off-icon',
  shapeFactory: LUCIDE_FLAG_OFF_SHAPE_FACTORY,
});

export const asLucideFlagOffIcon = fixed.asHook;
export const lucideFlagOffIcon = fixed.prototype;
export default lucideFlagOffIcon;
