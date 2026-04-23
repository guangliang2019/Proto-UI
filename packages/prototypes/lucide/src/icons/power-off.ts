// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'power-off' as const;
export const LUCIDE_POWER_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18.36 6.64A9 9 0 0 1 20.77 15' }),
  svg.path({ d: 'M6.16 6.16a9 9 0 1 0 12.68 12.68' }),
  svg.path({ d: 'M12 2v4' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucidePowerOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POWER_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-power-off-icon',
  prototypeName: 'lucide-power-off-icon',
  shapeFactory: LUCIDE_POWER_OFF_SHAPE_FACTORY,
});

export const asLucidePowerOffIcon = fixed.asHook;
export const lucidePowerOffIcon = fixed.prototype;
export default lucidePowerOffIcon;
