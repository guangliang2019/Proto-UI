// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'coins' as const;
export const LUCIDE_COINS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M13.744 17.736a6 6 0 1 1-7.48-7.48' }),
  svg.path({ d: 'M15 6h1v4' }),
  svg.path({ d: 'm6.134 14.768.866-.5 2 3.464' }),
  svg.circle({ cx: 16, cy: 8, r: 6 }),
];

export function renderLucideCoinsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COINS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-coins-icon',
  prototypeName: 'lucide-coins-icon',
  shapeFactory: LUCIDE_COINS_SHAPE_FACTORY,
});

export const asLucideCoinsIcon = fixed.asHook;
export const lucideCoinsIcon = fixed.prototype;
export default lucideCoinsIcon;
