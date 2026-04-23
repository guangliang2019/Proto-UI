// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mars' as const;
export const LUCIDE_MARS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 3h5v5' }),
  svg.path({ d: 'm21 3-6.75 6.75' }),
  svg.circle({ cx: 10, cy: 14, r: 6 }),
];

export function renderLucideMarsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MARS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mars-icon',
  prototypeName: 'lucide-mars-icon',
  shapeFactory: LUCIDE_MARS_SHAPE_FACTORY,
});

export const asLucideMarsIcon = fixed.asHook;
export const lucideMarsIcon = fixed.prototype;
export default lucideMarsIcon;
