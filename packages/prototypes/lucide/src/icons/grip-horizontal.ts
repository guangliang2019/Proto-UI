// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grip-horizontal' as const;
export const LUCIDE_GRIP_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 9, r: 1 }),
  svg.circle({ cx: 19, cy: 9, r: 1 }),
  svg.circle({ cx: 5, cy: 9, r: 1 }),
  svg.circle({ cx: 12, cy: 15, r: 1 }),
  svg.circle({ cx: 19, cy: 15, r: 1 }),
  svg.circle({ cx: 5, cy: 15, r: 1 }),
];

export function renderLucideGripHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRIP_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grip-horizontal-icon',
  prototypeName: 'lucide-grip-horizontal-icon',
  shapeFactory: LUCIDE_GRIP_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideGripHorizontalIcon = fixed.asHook;
export const lucideGripHorizontalIcon = fixed.prototype;
export default lucideGripHorizontalIcon;
