// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-cent' as const;
export const LUCIDE_BADGE_CENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'M12 7v10' }),
  svg.path({ d: 'M15.4 10a4 4 0 1 0 0 4' }),
];

export function renderLucideBadgeCentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_CENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-cent-icon',
  prototypeName: 'lucide-badge-cent-icon',
  shapeFactory: LUCIDE_BADGE_CENT_SHAPE_FACTORY,
});

export const asLucideBadgeCentIcon = fixed.asHook;
export const lucideBadgeCentIcon = fixed.prototype;
export default lucideBadgeCentIcon;
