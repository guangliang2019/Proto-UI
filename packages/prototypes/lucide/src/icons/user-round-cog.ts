// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-cog' as const;
export const LUCIDE_USER_ROUND_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14.305 19.53.923-.382' }),
  svg.path({ d: 'm15.228 16.852-.923-.383' }),
  svg.path({ d: 'm16.852 15.228-.383-.923' }),
  svg.path({ d: 'm16.852 20.772-.383.924' }),
  svg.path({ d: 'm19.148 15.228.383-.923' }),
  svg.path({ d: 'm19.53 21.696-.382-.924' }),
  svg.path({ d: 'M2 21a8 8 0 0 1 10.434-7.62' }),
  svg.path({ d: 'm20.772 16.852.924-.383' }),
  svg.path({ d: 'm20.772 19.148.924.383' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
];

export function renderLucideUserRoundCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-cog-icon',
  prototypeName: 'lucide-user-round-cog-icon',
  shapeFactory: LUCIDE_USER_ROUND_COG_SHAPE_FACTORY,
});

export const asLucideUserRoundCogIcon = fixed.asHook;
export const lucideUserRoundCogIcon = fixed.prototype;
export default lucideUserRoundCogIcon;
