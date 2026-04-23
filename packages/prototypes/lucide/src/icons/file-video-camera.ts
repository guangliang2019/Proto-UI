// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-video-camera' as const;
export const LUCIDE_FILE_VIDEO_CAMERA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2',
  }),
  svg.path({ d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
  svg.path({
    d: 'm10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157',
  }),
  svg.rect({ width: 7, height: 6, x: 3, y: 16, rx: 1 }),
];

export function renderLucideFileVideoCameraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_VIDEO_CAMERA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-video-camera-icon',
  prototypeName: 'lucide-file-video-camera-icon',
  shapeFactory: LUCIDE_FILE_VIDEO_CAMERA_SHAPE_FACTORY,
});

export const asLucideFileVideoCameraIcon = fixed.asHook;
export const lucideFileVideoCameraIcon = fixed.prototype;
export default lucideFileVideoCameraIcon;
