// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sliders-vertical' as const;
export const LUCIDE_SLIDERS_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 8h4' }),
  svg.path({ d: 'M12 21v-9' }),
  svg.path({ d: 'M12 8V3' }),
  svg.path({ d: 'M17 16h4' }),
  svg.path({ d: 'M19 12V3' }),
  svg.path({ d: 'M19 21v-5' }),
  svg.path({ d: 'M3 14h4' }),
  svg.path({ d: 'M5 10V3' }),
  svg.path({ d: 'M5 21v-7' }),
];

export function renderLucideSlidersVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SLIDERS_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sliders-vertical-icon',
  prototypeName: 'lucide-sliders-vertical-icon',
  shapeFactory: LUCIDE_SLIDERS_VERTICAL_SHAPE_FACTORY,
});

export const asLucideSlidersVerticalIcon = fixed.asHook;
export const lucideSlidersVerticalIcon = fixed.prototype;
export default lucideSlidersVerticalIcon;
