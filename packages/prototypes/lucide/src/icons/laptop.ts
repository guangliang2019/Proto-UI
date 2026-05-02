// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'laptop' as const;
export const LUCIDE_LAPTOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z',
  }),
  svg.path({ d: 'M20.054 15.987H3.946' }),
];

export function renderLucideLaptopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAPTOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-laptop-icon',
  prototypeName: 'lucide-laptop-icon',
  shapeFactory: LUCIDE_LAPTOP_SHAPE_FACTORY,
});

export const asLucideLaptopIcon = fixed.asHook;
export const lucideLaptopIcon = fixed.prototype;
export default lucideLaptopIcon;
