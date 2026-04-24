// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'video-off' as const;
export const LUCIDE_VIDEO_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196' }),
  svg.path({ d: 'M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideVideoOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_VIDEO_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-video-off-icon',
  prototypeName: 'lucide-video-off-icon',
  shapeFactory: LUCIDE_VIDEO_OFF_SHAPE_FACTORY,
});

export const asLucideVideoOffIcon = fixed.asHook;
export const lucideVideoOffIcon = fixed.prototype;
export default lucideVideoOffIcon;
