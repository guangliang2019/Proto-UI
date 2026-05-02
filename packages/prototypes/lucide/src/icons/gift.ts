// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gift' as const;
export const LUCIDE_GIFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 7v14' }),
  svg.path({ d: 'M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8' }),
  svg.path({ d: 'M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5' }),
  svg.rect({ x: 3, y: 7, width: 18, height: 4, rx: 1 }),
];

export function renderLucideGiftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GIFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gift-icon',
  prototypeName: 'lucide-gift-icon',
  shapeFactory: LUCIDE_GIFT_SHAPE_FACTORY,
});

export const asLucideGiftIcon = fixed.asHook;
export const lucideGiftIcon = fixed.prototype;
export default lucideGiftIcon;
