// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'camera-off' as const;
export const LUCIDE_CAMERA_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14.564 14.558a3 3 0 1 1-4.122-4.121' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175' }),
  svg.path({
    d: 'M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344',
  }),
];

export function renderLucideCameraOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CAMERA_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-camera-off-icon',
  prototypeName: 'lucide-camera-off-icon',
  shapeFactory: LUCIDE_CAMERA_OFF_SHAPE_FACTORY,
});

export const asLucideCameraOffIcon = fixed.asHook;
export const lucideCameraOffIcon = fixed.prototype;
export default lucideCameraOffIcon;
