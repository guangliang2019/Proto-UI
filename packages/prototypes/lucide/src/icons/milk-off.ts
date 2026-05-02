// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'milk-off' as const;
export const LUCIDE_MILK_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 2h8' }),
  svg.path({
    d: 'M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3',
  }),
  svg.path({ d: 'M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435' }),
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
];

export function renderLucideMilkOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MILK_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-milk-off-icon',
  prototypeName: 'lucide-milk-off-icon',
  shapeFactory: LUCIDE_MILK_OFF_SHAPE_FACTORY,
});

export const asLucideMilkOffIcon = fixed.asHook;
export const lucideMilkOffIcon = fixed.prototype;
export default lucideMilkOffIcon;
