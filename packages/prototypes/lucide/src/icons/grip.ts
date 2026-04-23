// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'grip' as const;
export const LUCIDE_GRIP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 5, r: 1 }),
  svg.circle({ cx: 19, cy: 5, r: 1 }),
  svg.circle({ cx: 5, cy: 5, r: 1 }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
  svg.circle({ cx: 19, cy: 12, r: 1 }),
  svg.circle({ cx: 5, cy: 12, r: 1 }),
  svg.circle({ cx: 12, cy: 19, r: 1 }),
  svg.circle({ cx: 19, cy: 19, r: 1 }),
  svg.circle({ cx: 5, cy: 19, r: 1 }),
];

export function renderLucideGripIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GRIP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-grip-icon',
  prototypeName: 'lucide-grip-icon',
  shapeFactory: LUCIDE_GRIP_SHAPE_FACTORY,
});

export const asLucideGripIcon = fixed.asHook;
export const lucideGripIcon = fixed.prototype;
export default lucideGripIcon;
