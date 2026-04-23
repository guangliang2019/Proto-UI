// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'utility-pole' as const;
export const LUCIDE_UTILITY_POLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v20' }),
  svg.path({ d: 'M2 5h20' }),
  svg.path({ d: 'M3 3v2' }),
  svg.path({ d: 'M7 3v2' }),
  svg.path({ d: 'M17 3v2' }),
  svg.path({ d: 'M21 3v2' }),
  svg.path({ d: 'm19 5-7 7-7-7' }),
];

export function renderLucideUtilityPoleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UTILITY_POLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-utility-pole-icon',
  prototypeName: 'lucide-utility-pole-icon',
  shapeFactory: LUCIDE_UTILITY_POLE_SHAPE_FACTORY,
});

export const asLucideUtilityPoleIcon = fixed.asHook;
export const lucideUtilityPoleIcon = fixed.prototype;
export default lucideUtilityPoleIcon;
