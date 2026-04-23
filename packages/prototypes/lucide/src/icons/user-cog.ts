// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-cog' as const;
export const LUCIDE_USER_COG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 15H6a4 4 0 0 0-4 4v2' }),
  svg.path({ d: 'm14.305 16.53.923-.382' }),
  svg.path({ d: 'm15.228 13.852-.923-.383' }),
  svg.path({ d: 'm16.852 12.228-.383-.923' }),
  svg.path({ d: 'm16.852 17.772-.383.924' }),
  svg.path({ d: 'm19.148 12.228.383-.923' }),
  svg.path({ d: 'm19.53 18.696-.382-.924' }),
  svg.path({ d: 'm20.772 13.852.924-.383' }),
  svg.path({ d: 'm20.772 16.148.924.383' }),
  svg.circle({ cx: 18, cy: 15, r: 3 }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
];

export function renderLucideUserCogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_COG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-cog-icon',
  prototypeName: 'lucide-user-cog-icon',
  shapeFactory: LUCIDE_USER_COG_SHAPE_FACTORY,
});

export const asLucideUserCogIcon = fixed.asHook;
export const lucideUserCogIcon = fixed.prototype;
export default lucideUserCogIcon;
