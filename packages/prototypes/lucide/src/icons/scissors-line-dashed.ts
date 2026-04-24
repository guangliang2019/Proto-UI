// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scissors-line-dashed' as const;
export const LUCIDE_SCISSORS_LINE_DASHED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M5.42 9.42 8 12' }),
  svg.circle({ cx: 4, cy: 8, r: 2 }),
  svg.path({ d: 'm14 6-8.58 8.58' }),
  svg.circle({ cx: 4, cy: 16, r: 2 }),
  svg.path({ d: 'M10.8 14.8 14 18' }),
  svg.path({ d: 'M16 12h-2' }),
  svg.path({ d: 'M22 12h-2' }),
];

export function renderLucideScissorsLineDashedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCISSORS_LINE_DASHED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scissors-line-dashed-icon',
  prototypeName: 'lucide-scissors-line-dashed-icon',
  shapeFactory: LUCIDE_SCISSORS_LINE_DASHED_SHAPE_FACTORY,
});

export const asLucideScissorsLineDashedIcon = fixed.asHook;
export const lucideScissorsLineDashedIcon = fixed.prototype;
export default lucideScissorsLineDashedIcon;
