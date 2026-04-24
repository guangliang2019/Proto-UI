// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'picture-in-picture' as const;
export const LUCIDE_PICTURE_IN_PICTURE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 10h6V4' }),
  svg.path({ d: 'm2 4 6 6' }),
  svg.path({ d: 'M21 10V7a2 2 0 0 0-2-2h-7' }),
  svg.path({ d: 'M3 14v2a2 2 0 0 0 2 2h3' }),
  svg.rect({ x: 12, y: 14, width: 10, height: 7, rx: 1 }),
];

export function renderLucidePictureInPictureIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PICTURE_IN_PICTURE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-picture-in-picture-icon',
  prototypeName: 'lucide-picture-in-picture-icon',
  shapeFactory: LUCIDE_PICTURE_IN_PICTURE_SHAPE_FACTORY,
});

export const asLucidePictureInPictureIcon = fixed.asHook;
export const lucidePictureInPictureIcon = fixed.prototype;
export default lucidePictureInPictureIcon;
