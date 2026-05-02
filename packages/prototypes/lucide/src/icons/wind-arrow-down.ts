// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wind-arrow-down' as const;
export const LUCIDE_WIND_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 2v8' }),
  svg.path({ d: 'M12.8 21.6A2 2 0 1 0 14 18H2' }),
  svg.path({ d: 'M17.5 10a2.5 2.5 0 1 1 2 4H2' }),
  svg.path({ d: 'm6 6 4 4 4-4' }),
];

export function renderLucideWindArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIND_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wind-arrow-down-icon',
  prototypeName: 'lucide-wind-arrow-down-icon',
  shapeFactory: LUCIDE_WIND_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideWindArrowDownIcon = fixed.asHook;
export const lucideWindArrowDownIcon = fixed.prototype;
export default lucideWindArrowDownIcon;
