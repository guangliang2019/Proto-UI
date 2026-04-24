// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sticker' as const;
export const LUCIDE_STICKER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z',
  }),
  svg.path({ d: 'M15 3v5a1 1 0 0 0 1 1h5' }),
  svg.path({ d: 'M8 13h.01' }),
  svg.path({ d: 'M16 13h.01' }),
  svg.path({ d: 'M10 16s.8 1 2 1c1.3 0 2-1 2-1' }),
];

export function renderLucideStickerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STICKER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sticker-icon',
  prototypeName: 'lucide-sticker-icon',
  shapeFactory: LUCIDE_STICKER_SHAPE_FACTORY,
});

export const asLucideStickerIcon = fixed.asHook;
export const lucideStickerIcon = fixed.prototype;
export default lucideStickerIcon;
