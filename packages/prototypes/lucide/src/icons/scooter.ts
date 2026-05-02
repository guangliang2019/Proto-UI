// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scooter' as const;
export const LUCIDE_SCOOTER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 4h-3.5l2 11.05' }),
  svg.path({ d: 'M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009' }),
  svg.circle({ cx: 19.5, cy: 17.5, r: 2.5 }),
  svg.circle({ cx: 4.5, cy: 17.5, r: 2.5 }),
];

export function renderLucideScooterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCOOTER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scooter-icon',
  prototypeName: 'lucide-scooter-icon',
  shapeFactory: LUCIDE_SCOOTER_SHAPE_FACTORY,
});

export const asLucideScooterIcon = fixed.asHook;
export const lucideScooterIcon = fixed.prototype;
export default lucideScooterIcon;
