// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'motorbike' as const;
export const LUCIDE_MOTORBIKE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm18 14-1-3' }),
  svg.path({ d: 'm3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81' }),
  svg.path({ d: 'M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5' }),
  svg.circle({ cx: 19, cy: 17, r: 3 }),
  svg.circle({ cx: 5, cy: 17, r: 3 }),
];

export function renderLucideMotorbikeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MOTORBIKE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-motorbike-icon',
  prototypeName: 'lucide-motorbike-icon',
  shapeFactory: LUCIDE_MOTORBIKE_SHAPE_FACTORY,
});

export const asLucideMotorbikeIcon = fixed.asHook;
export const lucideMotorbikeIcon = fixed.prototype;
export default lucideMotorbikeIcon;
