// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'flashlight-off' as const;
export const LUCIDE_FLASHLIGHT_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11.652 6H18' }),
  svg.path({ d: 'M12 13v1' }),
  svg.path({
    d: 'M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6',
  }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007' }),
];

export function renderLucideFlashlightOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FLASHLIGHT_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-flashlight-off-icon',
  prototypeName: 'lucide-flashlight-off-icon',
  shapeFactory: LUCIDE_FLASHLIGHT_OFF_SHAPE_FACTORY,
});

export const asLucideFlashlightOffIcon = fixed.asHook;
export const lucideFlashlightOffIcon = fixed.prototype;
export default lucideFlashlightOffIcon;
