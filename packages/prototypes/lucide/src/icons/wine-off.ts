// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wine-off' as const;
export const LUCIDE_WINE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M8 22h8' }),
  svg.path({ d: 'M7 10h3m7 0h-1.343' }),
  svg.path({ d: 'M12 15v7' }),
  svg.path({
    d: 'M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198',
  }),
  svg.line({ x1: 2, x2: 22, y1: 2, y2: 22 }),
];

export function renderLucideWineOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WINE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wine-off-icon',
  prototypeName: 'lucide-wine-off-icon',
  shapeFactory: LUCIDE_WINE_OFF_SHAPE_FACTORY,
});

export const asLucideWineOffIcon = fixed.asHook;
export const lucideWineOffIcon = fixed.prototype;
export default lucideWineOffIcon;
