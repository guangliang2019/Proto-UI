// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'japanese-yen' as const;
export const LUCIDE_JAPANESE_YEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 9.5V21m0-11.5L6 3m6 6.5L18 3' }),
  svg.path({ d: 'M6 15h12' }),
  svg.path({ d: 'M6 11h12' }),
];

export function renderLucideJapaneseYenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_JAPANESE_YEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-japanese-yen-icon',
  prototypeName: 'lucide-japanese-yen-icon',
  shapeFactory: LUCIDE_JAPANESE_YEN_SHAPE_FACTORY,
});

export const asLucideJapaneseYenIcon = fixed.asHook;
export const lucideJapaneseYenIcon = fixed.prototype;
export default lucideJapaneseYenIcon;
