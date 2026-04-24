// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'power' as const;
export const LUCIDE_POWER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v10' }),
  svg.path({ d: 'M18.4 6.6a9 9 0 1 1-12.77.04' }),
];

export function renderLucidePowerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_POWER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-power-icon',
  prototypeName: 'lucide-power-icon',
  shapeFactory: LUCIDE_POWER_SHAPE_FACTORY,
});

export const asLucidePowerIcon = fixed.asHook;
export const lucidePowerIcon = fixed.prototype;
export default lucidePowerIcon;
