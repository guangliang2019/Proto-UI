// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lightbulb' as const;
export const LUCIDE_LIGHTBULB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
  }),
  svg.path({ d: 'M9 18h6' }),
  svg.path({ d: 'M10 22h4' }),
];

export function renderLucideLightbulbIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIGHTBULB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lightbulb-icon',
  prototypeName: 'lucide-lightbulb-icon',
  shapeFactory: LUCIDE_LIGHTBULB_SHAPE_FACTORY,
});

export const asLucideLightbulbIcon = fixed.asHook;
export const lucideLightbulbIcon = fixed.prototype;
export default lucideLightbulbIcon;
