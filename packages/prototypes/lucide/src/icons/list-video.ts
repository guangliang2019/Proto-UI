// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-video' as const;
export const LUCIDE_LIST_VIDEO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H3' }),
  svg.path({ d: 'M10 12H3' }),
  svg.path({ d: 'M10 19H3' }),
  svg.path({
    d: 'M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z',
  }),
];

export function renderLucideListVideoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_VIDEO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-video-icon',
  prototypeName: 'lucide-list-video-icon',
  shapeFactory: LUCIDE_LIST_VIDEO_SHAPE_FACTORY,
});

export const asLucideListVideoIcon = fixed.asHook;
export const lucideListVideoIcon = fixed.prototype;
export default lucideListVideoIcon;
