// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lightbulb-off' as const;
export const LUCIDE_LIGHTBULB_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5' }),
  svg.path({ d: 'M9 18h6' }),
  svg.path({ d: 'M10 22h4' }),
];

export function renderLucideLightbulbOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIGHTBULB_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lightbulb-off-icon',
  prototypeName: 'lucide-lightbulb-off-icon',
  shapeFactory: LUCIDE_LIGHTBULB_OFF_SHAPE_FACTORY,
});

export const asLucideLightbulbOffIcon = fixed.asHook;
export const lucideLightbulbOffIcon = fixed.prototype;
export default lucideLightbulbOffIcon;
