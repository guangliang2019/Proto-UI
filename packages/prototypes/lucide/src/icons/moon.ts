// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'moon' as const;
export const LUCIDE_MOON_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
  });

export function renderLucideMoonIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOON_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-moon-icon',
  prototypeName: 'lucide-moon-icon',
  shapeFactory: LUCIDE_MOON_SHAPE_FACTORY,
});

export const asLucideMoonIcon = fixed.asHook;
export const lucideMoonIcon = fixed.prototype;
export default lucideMoonIcon;
