// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wind' as const;
export const LUCIDE_WIND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12.8 19.6A2 2 0 1 0 14 16H2' }),
  svg.path({ d: 'M17.5 8a2.5 2.5 0 1 1 2 4H2' }),
  svg.path({ d: 'M9.8 4.4A2 2 0 1 1 11 8H2' }),
];

export function renderLucideWindIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wind-icon',
  prototypeName: 'lucide-wind-icon',
  shapeFactory: LUCIDE_WIND_SHAPE_FACTORY,
});

export const asLucideWindIcon = fixed.asHook;
export const lucideWindIcon = fixed.prototype;
export default lucideWindIcon;
