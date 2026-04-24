// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'video' as const;
export const LUCIDE_VIDEO_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5' }),
  svg.rect({ x: 2, y: 6, width: 14, height: 12, rx: 2 }),
];

export function renderLucideVideoIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VIDEO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-video-icon',
  prototypeName: 'lucide-video-icon',
  shapeFactory: LUCIDE_VIDEO_SHAPE_FACTORY,
});

export const asLucideVideoIcon = fixed.asHook;
export const lucideVideoIcon = fixed.prototype;
export default lucideVideoIcon;
