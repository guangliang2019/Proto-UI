// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'thermometer' as const;
export const LUCIDE_THERMOMETER_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z' });

export function renderLucideThermometerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_THERMOMETER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-thermometer-icon',
  prototypeName: 'lucide-thermometer-icon',
  shapeFactory: LUCIDE_THERMOMETER_SHAPE_FACTORY,
});

export const asLucideThermometerIcon = fixed.asHook;
export const lucideThermometerIcon = fixed.prototype;
export default lucideThermometerIcon;
