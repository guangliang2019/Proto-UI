// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'touchpad-off' as const;
export const LUCIDE_TOUCHPAD_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20v-6' }),
  svg.path({ d: 'M19.656 14H22' }),
  svg.path({ d: 'M2 14h12' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2' }),
  svg.path({ d: 'M9.656 4H20a2 2 0 0 1 2 2v10.344' }),
];

export function renderLucideTouchpadOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TOUCHPAD_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-touchpad-off-icon',
  prototypeName: 'lucide-touchpad-off-icon',
  shapeFactory: LUCIDE_TOUCHPAD_OFF_SHAPE_FACTORY,
});

export const asLucideTouchpadOffIcon = fixed.asHook;
export const lucideTouchpadOffIcon = fixed.prototype;
export default lucideTouchpadOffIcon;
