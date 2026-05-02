// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sliders-horizontal' as const;
export const LUCIDE_SLIDERS_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 5H3' }),
  svg.path({ d: 'M12 19H3' }),
  svg.path({ d: 'M14 3v4' }),
  svg.path({ d: 'M16 17v4' }),
  svg.path({ d: 'M21 12h-9' }),
  svg.path({ d: 'M21 19h-5' }),
  svg.path({ d: 'M21 5h-7' }),
  svg.path({ d: 'M8 10v4' }),
  svg.path({ d: 'M8 12H3' }),
];

export function renderLucideSlidersHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SLIDERS_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sliders-horizontal-icon',
  prototypeName: 'lucide-sliders-horizontal-icon',
  shapeFactory: LUCIDE_SLIDERS_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideSlidersHorizontalIcon = fixed.asHook;
export const lucideSlidersHorizontalIcon = fixed.prototype;
export default lucideSlidersHorizontalIcon;
