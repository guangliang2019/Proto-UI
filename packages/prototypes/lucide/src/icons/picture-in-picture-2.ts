// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'picture-in-picture-2' as const;
export const LUCIDE_PICTURE_IN_PICTURE_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4' }),
  svg.rect({ width: 10, height: 7, x: 12, y: 13, rx: 2 }),
];

export function renderLucidePictureInPicture2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_PICTURE_IN_PICTURE_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-picture-in-picture-2-icon',
  prototypeName: 'lucide-picture-in-picture-2-icon',
  shapeFactory: LUCIDE_PICTURE_IN_PICTURE_2_SHAPE_FACTORY,
});

export const asLucidePictureInPicture2Icon = fixed.asHook;
export const lucidePictureInPicture2Icon = fixed.prototype;
export default lucidePictureInPicture2Icon;
