// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'club' as const;
export const LUCIDE_CLUB_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z',
  }),
  svg.path({ d: 'M12 17.66L12 22' }),
];

export function renderLucideClubIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLUB_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-club-icon',
  prototypeName: 'lucide-club-icon',
  shapeFactory: LUCIDE_CLUB_SHAPE_FACTORY,
});

export const asLucideClubIcon = fixed.asHook;
export const lucideClubIcon = fixed.prototype;
export default lucideClubIcon;
