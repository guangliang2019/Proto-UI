// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'venus-and-mars' as const;
export const LUCIDE_VENUS_AND_MARS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 20h4' }),
  svg.path({ d: 'M12 16v6' }),
  svg.path({ d: 'M17 2h4v4' }),
  svg.path({ d: 'm21 2-5.46 5.46' }),
  svg.circle({ cx: 12, cy: 11, r: 5 }),
];

export function renderLucideVenusAndMarsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VENUS_AND_MARS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-venus-and-mars-icon',
  prototypeName: 'lucide-venus-and-mars-icon',
  shapeFactory: LUCIDE_VENUS_AND_MARS_SHAPE_FACTORY,
});

export const asLucideVenusAndMarsIcon = fixed.asHook;
export const lucideVenusAndMarsIcon = fixed.prototype;
export default lucideVenusAndMarsIcon;
