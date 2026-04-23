// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-m' as const;
export const LUCIDE_SQUARE_M_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16',
  }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideSquareMIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_M_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-m-icon',
  prototypeName: 'lucide-square-m-icon',
  shapeFactory: LUCIDE_SQUARE_M_SHAPE_FACTORY,
});

export const asLucideSquareMIcon = fixed.asHook;
export const lucideSquareMIcon = fixed.prototype;
export default lucideSquareMIcon;
