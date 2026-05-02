// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'switch-camera' as const;
export const LUCIDE_SWITCH_CAMERA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5' }),
  svg.path({ d: 'M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5' }),
  svg.circle({ cx: 12, cy: 12, r: 3 }),
  svg.path({ d: 'm18 22-3-3 3-3' }),
  svg.path({ d: 'm6 2 3 3-3 3' }),
];

export function renderLucideSwitchCameraIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SWITCH_CAMERA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-switch-camera-icon',
  prototypeName: 'lucide-switch-camera-icon',
  shapeFactory: LUCIDE_SWITCH_CAMERA_SHAPE_FACTORY,
});

export const asLucideSwitchCameraIcon = fixed.asHook;
export const lucideSwitchCameraIcon = fixed.prototype;
export default lucideSwitchCameraIcon;
