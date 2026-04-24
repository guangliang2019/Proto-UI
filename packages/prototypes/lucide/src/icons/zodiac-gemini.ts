// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-gemini' as const;
export const LUCIDE_ZODIAC_GEMINI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 4.525v14.948' }),
  svg.path({ d: 'M20 3A17 17 0 0 1 4 3' }),
  svg.path({ d: 'M4 21a17 17 0 0 1 16 0' }),
  svg.path({ d: 'M8 4.525v14.948' }),
];

export function renderLucideZodiacGeminiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_GEMINI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-gemini-icon',
  prototypeName: 'lucide-zodiac-gemini-icon',
  shapeFactory: LUCIDE_ZODIAC_GEMINI_SHAPE_FACTORY,
});

export const asLucideZodiacGeminiIcon = fixed.asHook;
export const lucideZodiacGeminiIcon = fixed.prototype;
export default lucideZodiacGeminiIcon;
