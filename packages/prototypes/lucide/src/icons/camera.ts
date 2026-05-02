// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'camera' as const;
export const LUCIDE_CAMERA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
  }),
  svg.circle({ cx: 12, cy: 13, r: 3 }),
];

export function renderLucideCameraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAMERA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-camera-icon',
  prototypeName: 'lucide-camera-icon',
  shapeFactory: LUCIDE_CAMERA_SHAPE_FACTORY,
});

export const asLucideCameraIcon = fixed.asHook;
export const lucideCameraIcon = fixed.prototype;
export default lucideCameraIcon;
