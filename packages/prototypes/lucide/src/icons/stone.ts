// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'stone' as const;
export const LUCIDE_STONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z',
  }),
  svg.path({ d: 'M11.99 22 14 12l7.822 3.184' }),
  svg.path({ d: 'M14 12 8.47 2.302' }),
];

export function renderLucideStoneIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-stone-icon',
  prototypeName: 'lucide-stone-icon',
  shapeFactory: LUCIDE_STONE_SHAPE_FACTORY,
});

export const asLucideStoneIcon = fixed.asHook;
export const lucideStoneIcon = fixed.prototype;
export default lucideStoneIcon;
