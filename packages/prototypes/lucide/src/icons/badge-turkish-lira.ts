// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-turkish-lira' as const;
export const LUCIDE_BADGE_TURKISH_LIRA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 7v10a5 5 0 0 0 5-5' }),
  svg.path({ d: 'm15 8-6 3' }),
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76',
  }),
];

export function renderLucideBadgeTurkishLiraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_TURKISH_LIRA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-turkish-lira-icon',
  prototypeName: 'lucide-badge-turkish-lira-icon',
  shapeFactory: LUCIDE_BADGE_TURKISH_LIRA_SHAPE_FACTORY,
});

export const asLucideBadgeTurkishLiraIcon = fixed.asHook;
export const lucideBadgeTurkishLiraIcon = fixed.prototype;
export default lucideBadgeTurkishLiraIcon;
