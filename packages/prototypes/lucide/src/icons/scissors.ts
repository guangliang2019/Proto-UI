// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scissors' as const;
export const LUCIDE_SCISSORS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 6, r: 3 }),
  svg.path({ d: 'M8.12 8.12 12 12' }),
  svg.path({ d: 'M20 4 8.12 15.88' }),
  svg.circle({ cx: 6, cy: 18, r: 3 }),
  svg.path({ d: 'M14.8 14.8 20 20' }),
];

export function renderLucideScissorsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCISSORS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scissors-icon',
  prototypeName: 'lucide-scissors-icon',
  shapeFactory: LUCIDE_SCISSORS_SHAPE_FACTORY,
});

export const asLucideScissorsIcon = fixed.asHook;
export const lucideScissorsIcon = fixed.prototype;
export default lucideScissorsIcon;
