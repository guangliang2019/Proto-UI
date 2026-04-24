// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'zodiac-cancer' as const;
export const LUCIDE_ZODIAC_CANCER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 14.5A9 6.5 0 0 1 5.5 19' }),
  svg.path({ d: 'M3 9.5A9 6.5 0 0 1 18.5 5' }),
  svg.circle({ cx: 17.5, cy: 14.5, r: 3.5 }),
  svg.circle({ cx: 6.5, cy: 9.5, r: 3.5 }),
];

export function renderLucideZodiacCancerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ZODIAC_CANCER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-zodiac-cancer-icon',
  prototypeName: 'lucide-zodiac-cancer-icon',
  shapeFactory: LUCIDE_ZODIAC_CANCER_SHAPE_FACTORY,
});

export const asLucideZodiacCancerIcon = fixed.asHook;
export const lucideZodiacCancerIcon = fixed.prototype;
export default lucideZodiacCancerIcon;
