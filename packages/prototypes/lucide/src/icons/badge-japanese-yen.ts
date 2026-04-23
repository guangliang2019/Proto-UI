// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-japanese-yen' as const;
export const LUCIDE_BADGE_JAPANESE_YEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'm9 8 3 3v7' }),
  svg.path({ d: 'm12 11 3-3' }),
  svg.path({ d: 'M9 12h6' }),
  svg.path({ d: 'M9 16h6' }),
];

export function renderLucideBadgeJapaneseYenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_JAPANESE_YEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-japanese-yen-icon',
  prototypeName: 'lucide-badge-japanese-yen-icon',
  shapeFactory: LUCIDE_BADGE_JAPANESE_YEN_SHAPE_FACTORY,
});

export const asLucideBadgeJapaneseYenIcon = fixed.asHook;
export const lucideBadgeJapaneseYenIcon = fixed.prototype;
export default lucideBadgeJapaneseYenIcon;
