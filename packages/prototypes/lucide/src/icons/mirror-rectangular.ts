// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mirror-rectangular' as const;
export const LUCIDE_MIRROR_RECTANGULAR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 6 8 9' }),
  svg.path({ d: 'm16 7-8 8' }),
  svg.rect({ x: 4, y: 2, width: 16, height: 20, rx: 2 }),
];

export function renderLucideMirrorRectangularIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MIRROR_RECTANGULAR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mirror-rectangular-icon',
  prototypeName: 'lucide-mirror-rectangular-icon',
  shapeFactory: LUCIDE_MIRROR_RECTANGULAR_SHAPE_FACTORY,
});

export const asLucideMirrorRectangularIcon = fixed.asHook;
export const lucideMirrorRectangularIcon = fixed.prototype;
export default lucideMirrorRectangularIcon;
