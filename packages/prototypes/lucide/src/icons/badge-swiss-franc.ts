// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-swiss-franc' as const;
export const LUCIDE_BADGE_SWISS_FRANC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'M11 17V8h4' }),
  svg.path({ d: 'M11 12h3' }),
  svg.path({ d: 'M9 16h4' }),
];

export function renderLucideBadgeSwissFrancIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_SWISS_FRANC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-swiss-franc-icon',
  prototypeName: 'lucide-badge-swiss-franc-icon',
  shapeFactory: LUCIDE_BADGE_SWISS_FRANC_SHAPE_FACTORY,
});

export const asLucideBadgeSwissFrancIcon = fixed.asHook;
export const lucideBadgeSwissFrancIcon = fixed.prototype;
export default lucideBadgeSwissFrancIcon;
