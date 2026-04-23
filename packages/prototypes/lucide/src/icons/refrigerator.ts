// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'refrigerator' as const;
export const LUCIDE_REFRIGERATOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z' }),
  svg.path({ d: 'M5 10h14' }),
  svg.path({ d: 'M15 7v6' }),
];

export function renderLucideRefrigeratorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REFRIGERATOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-refrigerator-icon',
  prototypeName: 'lucide-refrigerator-icon',
  shapeFactory: LUCIDE_REFRIGERATOR_SHAPE_FACTORY,
});

export const asLucideRefrigeratorIcon = fixed.asHook;
export const lucideRefrigeratorIcon = fixed.prototype;
export default lucideRefrigeratorIcon;
