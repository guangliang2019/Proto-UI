// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grip-vertical' as const;
export const LUCIDE_GRIP_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 9, cy: 12, r: 1 }),
  svg.circle({ cx: 9, cy: 5, r: 1 }),
  svg.circle({ cx: 9, cy: 19, r: 1 }),
  svg.circle({ cx: 15, cy: 12, r: 1 }),
  svg.circle({ cx: 15, cy: 5, r: 1 }),
  svg.circle({ cx: 15, cy: 19, r: 1 }),
];

export function renderLucideGripVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRIP_VERTICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grip-vertical-icon',
  prototypeName: 'lucide-grip-vertical-icon',
  shapeFactory: LUCIDE_GRIP_VERTICAL_SHAPE_FACTORY,
});

export const asLucideGripVerticalIcon = fixed.asHook;
export const lucideGripVerticalIcon = fixed.prototype;
export default lucideGripVerticalIcon;
