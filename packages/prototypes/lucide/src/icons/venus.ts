// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'venus' as const;
export const LUCIDE_VENUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 15v7' }),
  svg.path({ d: 'M9 19h6' }),
  svg.circle({ cx: 12, cy: 9, r: 6 }),
];

export function renderLucideVenusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VENUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-venus-icon',
  prototypeName: 'lucide-venus-icon',
  shapeFactory: LUCIDE_VENUS_SHAPE_FACTORY,
});

export const asLucideVenusIcon = fixed.asHook;
export const lucideVenusIcon = fixed.prototype;
export default lucideVenusIcon;
