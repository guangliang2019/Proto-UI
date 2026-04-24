// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-russian-ruble' as const;
export const LUCIDE_BADGE_RUSSIAN_RUBLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'M9 16h5' }),
  svg.path({ d: 'M9 12h5a2 2 0 1 0 0-4h-3v9' }),
];

export function renderLucideBadgeRussianRubleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_RUSSIAN_RUBLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-russian-ruble-icon',
  prototypeName: 'lucide-badge-russian-ruble-icon',
  shapeFactory: LUCIDE_BADGE_RUSSIAN_RUBLE_SHAPE_FACTORY,
});

export const asLucideBadgeRussianRubleIcon = fixed.asHook;
export const lucideBadgeRussianRubleIcon = fixed.prototype;
export default lucideBadgeRussianRubleIcon;
